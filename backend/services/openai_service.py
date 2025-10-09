import os, asyncio,backoff, logging
from config.logging import setup_logging
from config.settings import OPENAI_API_KEY, OPENAI_MODEL
from openai import OpenAI, APIError, APIConnectionError, APITimeoutError

setup_logging()

openai_client = OpenAI(api_key=OPENAI_API_KEY)

    
def _log_backoff(details):
    logging.warning(
        "OpenAI retry %s for %s: %s",
        details["tries"],
        details["target"].__name__,
        details["exception"]
    )

@backoff.on_exception(
    backoff.expo,                                 # exponential 1,2,4,8…
    (APITimeoutError, APIError, APIConnectionError),
    max_time=20,
    jitter=backoff.full_jitter,
    on_backoff=logging.exception
)
def _sync_completion(model: str, messages: list, temperature: float, max_tokens: int):
    import time
    _s = time.perf_counter()
    resp = openai_client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature,
        max_tokens=max_tokens,
        n=1
    )
    _d = time.perf_counter() - _s
    logging.info("OpenAI chat.completions.create in %.4fs (model=%s, input_tokens=%s)", _d, model, getattr(resp, 'usage', None) and resp.usage.prompt_tokens)
    return resp

async def run_openai_prompt(
    prompt: str,
    model: str = OPENAI_MODEL,
    temperature: float = 0.7,
    max_tokens: int = 300,
    system_prompt: str = "You are a helpful AI assistant."
) -> str:
    start = asyncio.get_event_loop().time()
    resp = await asyncio.to_thread(
        _sync_completion,
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ],
        temperature=temperature,
        max_tokens=max_tokens
    )
    duration = asyncio.get_event_loop().time() - start
    logging.info("OpenAI run_openai_prompt total %.4fs (model=%s, chars=%s)", duration, model, len(prompt or ""))
    return resp.choices[0].message.content.strip()