from services.openai_service import run_openai_prompt
from pathlib import Path
from services.bot_response_formatter_md import ensure_markdown
from services.cache_service import async_cache_workflow
import logging
from config.settings import OPENAI_MODEL
PROMPT_PATH = Path(__file__).parent.parent / "prompts/sales_prompt.txt"

async def run_sales_agent(user_message: str, context: str, history: str) -> str:
    # with open(PROMPT_PATH, "r") as file:
    #     prompt_template = file.read()
    with open(PROMPT_PATH, "r", encoding="utf-8") as file:
        prompt_template = file.read()
    prompt = (
        f"{prompt_template}\n\n"
        f"User message: {user_message}\n\n"
        f"Context:\n{context}\n\n"
        f"Chat History:\n{history}\n\n"
        f"Sales Agent:"
    )
    async def sales_func(prompt):
        return await run_openai_prompt(prompt, model=OPENAI_MODEL)
    response, cache_source, response_time = await async_cache_workflow(prompt, sales_func)
    logging.info(f"Sales Agent Greeting response: {response} (Cache Source: {cache_source}, Response Time: {response_time:.4f}s)")

    #response = await run_openai_prompt(prompt, model=OPENAI_MODEL)
    return await ensure_markdown(response)