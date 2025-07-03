from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import logging
import re
# ────── request / response models ──────
from models.request_models import QueryRequest
from models.response_models import ChatResponse

# ────── helper services ──────
from services.objection_service import contains_objection          # async bool
from services.lead_service import detect_service, is_hot_lead      # async str / bool
from services.supabase_service import upsert_conversation_memory, sync_qualified_lead, get_conversation_memory, get_conversation_history
from services.detect_intent_service import is_demo_request, is_positive_response, is_call_request

# ────── AI agents ──────
from agents.engagement_agent import run_engagement_agent
from agents.intent_agent import run_intent_agent
from agents.context_agent import retrieve_context
from agents.sales_agent import run_sales_agent
from agents.objection_agent import run_objection_agent
from agents.summary_agent import run_summary_agent
from agents.info_agent import run_info_agent
from config.logging import setup_logging

def build_updated_history(existing_history: list, user_query: str, bot_response: str) -> list:
    """
    Helper function to build updated history by adding the latest user query and bot response.
    
    Args:
        existing_history: Current history from request
        user_query: Latest user message
        bot_response: Latest bot response
        
    Returns:
        List of strings with User:/Bot: prefixes for storage
    """
    return existing_history + [f"User: {user_query}", f"Bot: {bot_response}"]


async def get_last_bot_messages(user_id: str, count: int = 2) -> list:
    """
    Fetch the last N bot messages from stored conversation history.
    
    Args:
        user_id: User ID to fetch history for
        count: Number of recent bot messages to return
        
    Returns:
        List of recent bot messages (newest first)
    """
    try:
        # Get structured history from Supabase
        structured_history = await get_conversation_history(user_id, as_strings=False)
        
        if not structured_history:
            return []
        
        # Extract bot messages from structured format, newest first
        bot_messages = []
        for conversation in reversed(structured_history):  # Start from newest
            if isinstance(conversation, dict) and conversation.get("bot"):
                bot_messages.append(conversation["bot"].lower())
                if len(bot_messages) >= count:
                    break
        
        return bot_messages
        
    except Exception as e:
        logging.error(f"Error fetching last bot messages: {e}")
        # Fallback: extract from current request history if Supabase fails
        fallback_messages = [
            l.lower() for l in reversed([msg for msg in [] if msg.lower().startswith("bot:")])
        ][:count]
        return fallback_messages

# New fool-proof helper to read the latest bot messages from the request itself

def extract_bot_lines(history: list, count: int = 2) -> list[str]:
    """Return the last *count* bot messages from the provided chat history.

    This works around eventual-consistency delays in Supabase because the
    frontend already ships the full transcript with every turn, making the
    in-request history the single source of truth for the most recent bot line.
    """
    bot_lines: list[str] = []
    for line in reversed(history):
        if line.lower().startswith("bot:"):
            # Strip the prefix and whitespace, keep lower-cased for detectors
            cleaned = line.split(":", 1)[1].strip().lower()
            bot_lines.append(cleaned)
            if len(bot_lines) >= count:
                break
    return bot_lines

setup_logging()


message_router = APIRouter()




@message_router.post("/message", response_model=ChatResponse)
async def chat_controller(req: QueryRequest):
    try:
         # ========== 0. First message → Engagement ==========
        if not req.history and re.match(r"^\s*(hi|hello|hey|greetings|howdy|yo)\b", req.query, re.I):
            logging.info("Engagement Agent taking over")
            response = await run_engagement_agent(req.query)
            # logging.info(f"Engagement Agent response: {response}")
            if not response or not isinstance(response, str):
                raise HTTPException(status_code=500, detail="Engagement Agent failed to respond")
            
            # Build history for first message
            full_history = build_updated_history([], req.query, response)
            await upsert_conversation_memory(
                user_id=req.user_id,
                memory={
                    "intent": "Engagement",
                    "product": "",
                    "service": "",
                    "qualified": False,
                    "last_agent": "EngagementAgent"
                },
                history=full_history
            )
            return ChatResponse(response=response, routed_agent="engagement")

        # ========== 1. Objection shortcut ==========
        if await contains_objection(req.query):
            logging.info("Objection detected, routing to Objection Agent")
            summary = await run_summary_agent(req.history)
            response = await run_objection_agent(req.query, summary)
            logging.info(f"Objection Agent response: {response}")
            if not response or not isinstance(response, str):
                raise HTTPException(status_code=500, detail="Objection Agent returned invalid response")
                           # → persist memory (not yet qualified)
            full_history = build_updated_history(req.history, req.query, response)
            await upsert_conversation_memory(
                user_id=req.user_id,
                memory={
                    "intent": "Objection",
                    "product": "",
                    "service": "",
                    "qualified": False,
                    "last_agent": "ObjectionAgent"
                },
                history=full_history
            )
            return ChatResponse(response=response, routed_agent="objection")
        
        # =====================================================================
        # 1. DEMO-FLOW (follow-up agent) – Only for explicit demo requests and ongoing collections
        # =====================================================================
        memory_row   = await get_conversation_memory(req.user_id) or {}

        # --- Retrieve the very latest bot line (prefer in-request transcript) ---
        last_bot_msgs = extract_bot_lines(req.history, 1)

        # If history is empty (first message or malformed), fall back to DB
        if not last_bot_msgs:
            last_bot_msgs = await get_last_bot_messages(req.user_id, 1)

        assistant_ln = (last_bot_msgs or [""])[0].lower()

        user_text    = req.query.lower().strip()

        # ------------------------------------------------------------------
        # 2) detectors
        # ------------------------------------------------------------------
        explicit_demo_request   = is_demo_request(user_text)
        explicit_call_request   = is_call_request(user_text)
        user_positive_only      = is_positive_response(user_text) and not (explicit_demo_request or explicit_call_request)

        bot_offered_demo = is_demo_request(assistant_ln)
        bot_offered_call = is_call_request(assistant_ln)

        user_accepted_offer = is_positive_response(user_text)

        demo_offered_and_accepted = bot_offered_demo and user_accepted_offer
        call_offered_and_accepted = bot_offered_call  and user_accepted_offer

        # ------------------------------------------------------------------
        # 3) branch A – user picked one explicitly
        # ------------------------------------------------------------------
        if explicit_demo_request or explicit_call_request:
            is_call        = explicit_call_request
            cta_type       = "call" if is_call else "demo"
            intent_label   = "Call Booking" if is_call else "Demo Booking"
            stage_key      = "collecting_call_info" if is_call else "collecting_info"

            reply = (
                f"Great! I can get that {cta_type} scheduled. "
                "Please fill in the quick form so our team can reach out."
            )

            full_history = build_updated_history(req.history, req.query, reply)
            await upsert_conversation_memory(
                user_id=req.user_id,
                memory={
                    "intent":     intent_label,
                    "product":    "",
                    "service":    "",
                    "qualified":  True,
                    "last_agent": "CTA",
                    "demo_stage": stage_key
                },
                history=full_history
            )
            return ChatResponse(
                response     = reply,
                intent       = intent_label,
                routed_agent = "CTA",
                action       = "contact_form"        # FE shows the form directly
            )

        # ------------------------------------------------------------------
        # 4) User said "yes" but didn't specify
        # ------------------------------------------------------------------
        if user_positive_only and (bot_offered_demo or bot_offered_call):

            # 4a) Bot previously offered BOTH options → ask for choice
            if bot_offered_demo and bot_offered_call:
                clarify_reply = (
                    "Sure thing! Would you prefer a **live demo** or a **quick call**? _(Demo / Call)_"
                )
                full_history = build_updated_history(req.history, req.query, clarify_reply)
                await upsert_conversation_memory(
                    user_id=req.user_id,
                    memory={
                        "intent":     "Clarify Method",
                        "product":    "",
                        "service":    "",
                        "qualified":  True,
                        "last_agent": "CTA",
                        "demo_stage": "awaiting_choice"
                    },
                    history=full_history
                )
                return ChatResponse(
                    response     = clarify_reply,
                    intent       = "Clarify Method",
                    routed_agent = "CTA",
                    action       = "choose_contact_method"   # FE shows Demo / Call buttons
                )

            # ------------------------------------------------------------------
            # 4) Bot offered only one option → proceed automatically
            # ------------------------------------------------------------------
            is_call        = bot_offered_call and not bot_offered_demo
            cta_type       = "call" if is_call else "demo"
            intent_label   = "Call Booking" if is_call else "Demo Booking"
            stage_key      = "collecting_call_info" if is_call else "collecting_info"

            reply = (
                f"Perfect! Let's lock in that {cta_type}. "
                "Just fill in the quick form so our team can reach out."
            )

            full_history = build_updated_history(req.history, req.query, reply)
            await upsert_conversation_memory(
                user_id=req.user_id,
                memory={
                    "intent":     intent_label,
                    "product":    "",
                    "service":    "",
                    "qualified":  True,
                    "last_agent": "CTA",
                    "demo_stage": stage_key
                },
                history=full_history
            )
            return ChatResponse(
                response     = reply,
                intent       = intent_label,
                routed_agent = "CTA",
                action       = "contact_form"
            )

        # ------------------------------------------------------------------
        # 5) If user was mid-demo but asks unrelated question → clear state
        # ------------------------------------------------------------------
        if (memory_row.get("last_agent") == "CTA" and
            memory_row.get("demo_stage") in {"collecting_info", "collecting_call_info"}):

            # simple heuristic: anything longer than 5 tokens & starting with a WH-word
            first = user_text.split()[0] if user_text else ""
            unrelated = first in {"what", "where", "how", "why", "when", "who"} or len(user_text.split()) > 5

            if unrelated:
                await upsert_conversation_memory(
                    user_id=req.user_id,
                    memory={
                        "intent": "General Inquiry",
                        "product": "",
                        "service": "",
                        "qualified": False,
                        "last_agent": "InfoAgent",
                        "demo_stage": ""
                    },
                    history=req.history
                )

        # ========== 2. Intent classification ==========
        conv_summary = await run_summary_agent(req.history)
        intent = await run_intent_agent(req.query, conv_summary)
        logging.info(f"Intent = {intent}")

        # --------- Cold ----------
        if intent == "Cold":
            logging.info("Cold intent detected, routing to Info Agent")
            quick_ctx = await retrieve_context(req.query)
            if quick_ctx["chunks"]:
                info_reply = await run_info_agent(req.query, quick_ctx["chunks"])
                logging.info(f"Info Agent response: {info_reply}")

                # Persist as Info Request (not qualified)
                full_history = build_updated_history(req.history, req.query, info_reply)
                await upsert_conversation_memory(
                    user_id=req.user_id,
                    memory={
                        "intent": "Info Request",
                        "qualified": False,
                        "last_agent": "InfoAgent"
                    },
                    history=full_history
                )
                return ChatResponse(
                    response=info_reply,
                    intent="Info Request",
                    routed_agent="info"
                )
            # Persist neutral response
            neutral_response = "Glad to help! Let me know what you're exploring — products, services, or just browsing."
            full_history = build_updated_history(req.history, req.query, neutral_response)
            await upsert_conversation_memory(
                user_id=req.user_id,
                memory={
                    "intent": "Cold",
                    "qualified": False,
                    "last_agent": "InfoAgent"
                },
                history=full_history
            )
            return ChatResponse(
                response=neutral_response,
                intent=intent,
                routed_agent="neutral"
            )
        
        # --------- Interested (Product / Service) ----------
        if intent in ("Interested in Product", "Interested in Services","Info Request"):
            logging.info("Interested intent detected, routing to Sales Agent / Info Agent")
            context  = await retrieve_context(req.query)
            if not context["chunks"]:
                logging.warning("No RAG context found.")
                # Persist neutral response when no context found
                neutral_response = "Tell me a bit more so I can point you to the right solution."
                full_history = build_updated_history(req.history, req.query, neutral_response)
                await upsert_conversation_memory(
                    user_id=req.user_id,
                    memory={
                        "intent": intent,
                        "qualified": False,
                        "last_agent": "InfoAgent"
                    },
                    history=full_history
                )
                return ChatResponse(
                    response=neutral_response,
                    intent=intent,
                    routed_agent="neutral"
                )

            # logging.info("Interested intent detected, routing to Sales Agent")

            context_txt = "\n\n".join(context["chunks"])
            # logging.info(f"Sales Agent context text: {context_txt}")
            reply = await run_sales_agent(req.query, context_txt, conv_summary)
            # logging.info(f"Sales Agent response: {reply}")

            # Detect product / service mentioned
            product_name  = ("SecureTrack" if "securetrack" in context_txt.lower()
                             else "BizRadar"  if "bizradar"   in context_txt.lower()
                             else "")
            service_name  = await detect_service(context_txt) or ""

            memory={
                    "intent": intent,
                    "product": product_name,
                    "service": service_name,
                    "qualified": intent != "Cold",
                    "last_agent": "SalesAgent"
                }
            logging.info(f"Sales Agent memory: {memory}")

            # ---------- Persist memory ----------
            full_history = build_updated_history(req.history, req.query, reply)
            await upsert_conversation_memory(
                user_id=req.user_id,
                memory=memory,
                history=full_history
            )

            # ---------- Push hot lead if intent escalates ----------
            if await is_hot_lead(intent):
                await sync_qualified_lead({
                    "user_id": req.user_id,
                    "email": None,                   # capture later
                    "intent": intent,
                    "product": product_name,
                    "service": service_name,
                    "qualified": True,
                    "last_message": req.query
                })

            return ChatResponse(response=reply, intent=intent, routed_agent="sales")

        # --------- Ready to engage (immediate CTA) ----------
        if intent == "Ready to engage":
            # Persist & push lead immediately
            cta_response = "Awesome! Would you like to book a demo or speak to our expert team directly?"
            full_history = build_updated_history(req.history, req.query, cta_response)
            await upsert_conversation_memory(
                user_id=req.user_id,
                memory={
                    "intent": intent,
                    "product": "",
                    "service": "",
                    "qualified": True,
                    "last_agent": "CTA"
                },
                history=full_history
            )
            await sync_qualified_lead({
                "user_id": req.user_id,
                "email": None,
                "intent": intent,
                "product": "",
                "service": "",
                "qualified": True,
                "last_message": req.query
            })

            return ChatResponse(
                response     = cta_response,
                intent       = intent,
                routed_agent = "cta",
                action       = "choose_contact_method"   # FE shows Demo / Call buttons immediately
            )

        # --------- Fallback ----------
        fallback_response = "I'm here to help, but need a bit more detail. Could you tell me what you're looking for?"
        full_history = build_updated_history(req.history, req.query, fallback_response)
        await upsert_conversation_memory(
            user_id=req.user_id,
            memory={
                "intent": "Unknown",
                "qualified": False,
                "last_agent": "FallbackAgent"
            },
            history=full_history
        )
        return ChatResponse(
            response=fallback_response,
            routed_agent="fallback"
        )

    except Exception as e:
        logging.exception("Chat controller crashed")
        raise HTTPException(status_code=500, detail=str(e))