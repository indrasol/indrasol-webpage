# services/vapi_service.py
import os, requests, logging, datetime, asyncio
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo
from models.request_models import CallForm
from config.settings import VAPI_KEY, ASSISTANT_ID, PHONE_NUMBER_ID
from vapi import Vapi


# Validate VAPI_KEY before creating client
if not VAPI_KEY:
    logging.warning("VAPI_KEY is not set in environment variables - Vapi calls will be simulated")
    vapi_client = None
else:
    try:
        vapi_client = Vapi(token=VAPI_KEY)
        logging.info("Vapi client initialized successfully")
    except Exception as e:
        logging.error(f"Failed to initialize Vapi client: {e}")
        vapi_client = None

# ──────────────────────────────────────────────────────────────
# 2.  Build an inline assistant spec (custom model & voice)
#     – or just pass assistantId if you have a saved one
# ──────────────────────────────────────────────────────────────
ASSISTANT_SPEC = {
    "name": "IndraVoice Sales Agent",
    "systemPrompt": (
        "You are a persuasive yet consultative sales agent for Indrasol. "
        "Follow the Problem → Value → Proof → CTA structure."
    ),
    "model": { "provider": "openai", "model": "gpt-4o" },
    "voice": { "provider": "elevenlabs", "voiceId": "shimmer" },
    "transcriber": { "provider": "deepgram", "model": "nova-2" },
}
# ──────────────────────────────────────────────────────────────
# 3.  Helper: create a schedulePlan from user input
# ──────────────────────────────────────────────────────────────
def build_schedule_plan(
    date_str: str,          # e.g. "2025-06-23"
    time_str: str,          # e.g. "14:00"   (24-hour)
    user_tz: str = "America/Chicago",
    window_minutes: int = 5
) -> dict:
    """
    Return schedulePlan dict with earliestAt/latestAt in UTC ISO-8601.
    Raises ValueError if parsing fails or time is in the past.
    """
    try:
        # combine date+time, attach user timezone
        local_zone = ZoneInfo(user_tz)
        local_dt   = datetime.fromisoformat(f"{date_str}T{time_str}")
        local_dt   = local_dt.replace(tzinfo=local_zone)

        # refuse past times
        if local_dt < datetime.now(local_zone):
            raise ValueError("Chosen time is in the past.")

        earliest_utc = local_dt.astimezone(timezone.utc)
        latest_utc   = earliest_utc + timedelta(minutes=window_minutes)

        return {
            "earliestAt": earliest_utc.isoformat(timespec="seconds"),
            "latestAt":   latest_utc.isoformat(timespec="seconds"),
        }

    except Exception as e:
        raise ValueError(f"Invalid date/time: {e}")

# ──────────────────────────────────────────────────────────────
# 4.  Main entry – call from your FastAPI route
# ──────────────────────────────────────────────────────────────
async def schedule_vapi_call(form: CallForm) -> str:
    """
    Creates a Vapi call and returns its ID.
    """
    try:
        lead_name = form.name
        lead_phone = form.phone_number
        date_str = form.date
        time_str = form.time
        tz_str = form.tz  # default to "America/Chicago"
        
        logging.info(f"Scheduling Vapi call for {lead_name} at {date_str} {time_str} {tz_str}")
        
        plan = build_schedule_plan(date_str, time_str, tz_str)

        call = vapi_client.calls.create(
            name=f"Prospect lead – {lead_name}",
            assistant_id=ASSISTANT_ID,
            phone_number_id=PHONE_NUMBER_ID,
            customer={"number": lead_phone},
            schedule_plan=plan
        )
        
        logging.info(f"Vapi call scheduled successfully with ID: {call.id}")
        return call.id   # caller can log or return to FE
        
    except Exception as exc:
        logging.error(f"Failed to schedule Vapi call: {exc}", exc_info=exc)
        raise  # Re-raise the exception so the caller can handle it