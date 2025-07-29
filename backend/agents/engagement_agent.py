import os
from pathlib import Path
from services.openai_service import run_openai_prompt
from services.bot_response_formatter_md import ensure_markdown
import logging

PROMPT_PATH = Path(__file__).parent.parent / "prompts/engagement_prompt.txt"

def format_history(turns: list) -> str:
    """
    Converts conversation history into a readable string format.
    """
    return "\n".join(
        f"User: {turn.get('user')}\nBot: {turn.get('bot')}"
        for turn in turns
        if isinstance(turn, dict) and (turn.get('user') or turn.get('bot'))
    )

async def run_engagement_agent(user_message: str, context: str = "", history: list = None) -> str:
    """
    Run the engagement agent with proper prompt formatting.
    """
    with open(PROMPT_PATH, "r", encoding="utf-8") as file:
        prompt_template = file.read()

    history_text = format_history(history or [])

    prompt = (
        f"{prompt_template}\n\n"
        f"user_message: {user_message}\n"
        f"chat_history: {history_text}\n"
        f"AI:"
    )

    response = await run_openai_prompt(prompt, model="gpt-4o-mini")
    return await ensure_markdown(response)





