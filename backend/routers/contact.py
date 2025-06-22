from fastapi import APIRouter, HTTPException, BackgroundTasks
from config.logging import setup_logging
import logging
from models.request_models import ContactForm, CallForm
from services.email_service import process_contact
from services.teams_service import format_teams_message, format_call_message
from services.supabase_service import sync_qualified_lead, insert_lead_log
from services.detect_intent_service import detect_interest
from services.supabase_service import get_conversation_history
from services.vapi_service import schedule_vapi_call

setup_logging()


contact_router = APIRouter()

@contact_router.post("/contact", status_code=202)
async def contact_handler(
    form: ContactForm,
    bt: BackgroundTasks
):
    """
    1. fire e-mail
    2. fire Teams
    3. sync lead → Supabase
    Background tasks are validated first, then logged based on success.
    """
    # ---------- Initialize channel list ----------
    channel = []
    
    # ---------- Try email process ----------
    email_success = False
    try:
        await process_contact(form)
        channel.append("email")
        email_success = True
    except Exception as e:
        logging.error(f"Email process failed: {e}")
    
    # ---------- Try Teams notification ----------
    teams_success = False
    try:
        await format_teams_message(form)
        channel.append("teams")
        teams_success = True
    except Exception as e:
        logging.error(f"Teams notification failed: {e}")
    
    # ---------- Throw error if both processes failed ----------
    if not email_success and not teams_success:
        raise HTTPException(
            status_code=500,
            detail="Failed to send notification. Please try again."
        )

    # ---------------- pull chat history for richer context ----------
    try:
        # This returns ["User: …", "Bot: …", …"] newest last
        hist_lines = await get_conversation_history(form.user_id, as_strings=True)
        history_txt = "\n".join(hist_lines[-30:])   # last ~30 exchanges is plenty
    except Exception:
        history_txt = ""

    # ---------- auto-tag product / service ----------
    product, service = detect_interest(history_txt, form.message or "")

    # ---------- log lead (dedup handled inside) ----------
    await sync_qualified_lead({
        "user_id":     form.user_id,
        "name":        form.name,
        "company":     form.company,
        "email":       form.email,
        "intent":      "Demo Booking",
        "product":     product,
        "service":     service,
        "qualified":   True,
        "last_message": form.message or "",
    })
    
    # ---------- log with validated channels only ----------
    await insert_lead_log({
        "user_id":     form.user_id,
        "name":        form.name,
        "company":     form.company,
        "email":       form.email,
        "message":     form.message or "",
        "channel":     channel,  # Only successful channels
    })

@contact_router.post("/call", status_code=202)
async def call_handler(
    form: CallForm,
    bt: BackgroundTasks
):
    try:
        channel = []
        
        # ---------- Try to schedule the Vapi call ----------
        call_schedule_success = False
        try:
            bt.add_task(schedule_vapi_call, form)
            channel.append("vapi")
            call_schedule_success = True
        except Exception as e:
            logging.error(f"Vapi call scheduling failed: {e}")

        # ---------- Try Teams notification ----------
        teams_success = False
        try:
            await format_call_message(form)
            channel.append("teams")
            teams_success = True
        except Exception as e:
            logging.error(f"Teams notification failed: {e}")
            
        # ---------- Throw error if both processes failed ----------
        if not call_schedule_success and not teams_success:
            raise HTTPException(
                status_code=500,
                detail="Failed to process call request. Please try again."
            )

        # 2) push to Supabase
        call_datetime_str = f"{form.date} {form.time} {form.tz}"
        await sync_qualified_lead({
            "user_id":  form.user_id,
            "name":     form.name,
            "phone":    form.phone_number,
            "intent":   "Scheduled Call",
            "qualified": True,
            "call_time": call_datetime_str
        })

        await insert_lead_log({
            "user_id": form.user_id,
            "name":    form.name,
            "phone":   form.phone_number,
            "call_time": call_datetime_str,
            "channel": channel  # Use the validated channels
        })

        return {"detail": "Call scheduled 👍"}
    except Exception as e:
        logging.exception("Vapi scheduling failed")
        raise HTTPException(status_code=500, detail=str(e))


# @contact_router.post("/email_contact", status_code=202)
# async def submit_contact_form(bg: BackgroundTasks, form: ContactForm):
#     """Accept the form and queue async email job."""
#     bg.add_task(process_contact, form, is_bot=False)
#     return {"detail": "Message accepted – we’ll be in touch soon!"}


# @contact_router.post("/notify_teams", status_code=202)
# async def notify_teams(bg: BackgroundTasks, form: ContactForm):
#     """Accept the form and queue async email job."""
#     bg.add_task(format_teams_message, form)
#     return {"detail": "Message accepted – we’ll be in touch soon!"}