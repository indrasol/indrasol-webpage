import os
from typing import List
from pathlib import Path
from services.openai_service import run_openai_prompt
import logging

PROMPT_PATH = Path(__file__).parent.parent / "prompts/info_prompt.txt"

async def run_info_agent(user_message: str, context_chunks: List[str]) -> str:
    """
    Answers factual / company-info questions using the RAG chunks.
    """
    # with open(PROMPT_PATH, "r") as f:
    #     prompt_template = f.read()
    with open(PROMPT_PATH, "r", encoding="utf-8") as f:
        prompt_template = f.read()

    context = "\n\n".join(context_chunks)
    prompt = (
        f"{prompt_template}\n\n"
        f"Context:\n{context}\n\n"
        f"User: {user_message}\n"
        f"Answer:"
    )
    return await run_openai_prompt(prompt, max_tokens=120, temperature=0.4)
