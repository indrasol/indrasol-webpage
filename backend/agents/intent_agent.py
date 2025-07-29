from services.openai_service import run_openai_prompt
from pathlib import Path
from services.cache_service import async_cache_workflow
import logging

PROMPT_PATH = Path(__file__).parent.parent / "prompts/intent_prompt.txt"

async def run_intent_agent(user_message: str, history: str) -> str:
    # with open(PROMPT_PATH, "r") as file:
    #     prompt_template = file.read()
    with open(PROMPT_PATH, "r", encoding="utf-8") as file:
        prompt_template = file.read()


    prompt = (
        f"{prompt_template}\n\n"
        f"User: {user_message}\n"
        f"History: {history}\n→"
    )
    async def intent_func(prompt):
        return await run_openai_prompt(prompt, model="gpt-4o-mini")
    response, cache_source, response_time = await async_cache_workflow(prompt, intent_func)
    logging.info(f"Intent Agent Greeting response: {response} (Cache Source: {cache_source}, Response Time: {response_time:.4f}s)")
    #response = await run_openai_prompt(prompt)
    return response
