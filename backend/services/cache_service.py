import hashlib
import difflib
import logging
import json
from typing import Any, Callable, Optional, List, Tuple
from redis.asyncio import Redis
import time  # Add this import

# Setup logger
logger = logging.getLogger("cache_service")
logger.setLevel(logging.INFO)

# Constants
DEFAULT_TTL = 86400  # seconds
SIMILARITY_THRESHOLD = 0.85
PROMPT_LIST_KEY = "GLOBAL_PROMPT_LIST"  # stores list of (prompt, key)

# Global Redis client (set from main)
redis_client: Optional[Redis] = None

# ------------ Redis Setup ------------ #

def init_redis_client(client: Redis):
    """Initialize Redis client globally."""
    global redis_client
    redis_client = client
    logger.info("Redis client initialized in cache_service")

# ------------ Helper Functions ------------ #

def _make_cache_key(prompt: str) -> str:
    """Generate a unique SHA256 key for a given prompt."""
    return hashlib.sha256(prompt.encode("utf-8")).hexdigest()


async def find_similar_prompt(prompt: str) -> Optional[str]:
    """Return the key of a similar prompt if it exists."""
    if redis_client is None:
        raise RuntimeError("Redis client not initialized")

    data = await redis_client.get(PROMPT_LIST_KEY)
    prompt_list: List[Tuple[str, str]] = json.loads(data) if data else []
    

    # Check for similarity with existing prompts
    # logger.info(f"Checking for similar prompts to: {prompt}")

    for cached_prompt, key in prompt_list:
        similarity = difflib.SequenceMatcher(None, prompt, cached_prompt).ratio()
        if similarity >= SIMILARITY_THRESHOLD:
            logger.info(f"Found similar prompt (similarity={similarity:.2f}) , returning key: {key}")
            return key

    return None


async def get_cached_response(prompt: str) -> Optional[Any]:
    """Try to get cached response by exact match or similar prompt."""
    if redis_client is None:
        raise RuntimeError("Redis client not initialized")

    key = _make_cache_key(prompt)
    result = await redis_client.get(key)

    if result:
        logger.info(f"Redis Cache HIT for key")
        return json.loads(result)

    # Try fuzzy match
    similar_key = await find_similar_prompt(prompt)
    if similar_key:
        result = await redis_client.get(similar_key)
        if result:
            logger.info(f"Redis Cache SIMILAR HIT for key")
            return json.loads(result)

    logger.info(f"Redis Cache MISS for prompt")
    return None


async def set_cached_response(prompt: str, response: Any, ttl: int = DEFAULT_TTL):
    """Set prompt-response pair in Redis with TTL, avoiding duplicates."""
    if redis_client is None:
        raise RuntimeError("Redis client not initialized")

    key = _make_cache_key(prompt)
    await redis_client.set(key, json.dumps(response), ex=ttl)

    # Update global prompt list
    data = await redis_client.get(PROMPT_LIST_KEY)
    prompt_list: List[Tuple[str, str]] = json.loads(data) if data else []

    # Avoid duplicates in the prompt list
    if not any(k == key for _, k in prompt_list):
        prompt_list.append((prompt, key))
        await redis_client.set(PROMPT_LIST_KEY, json.dumps(prompt_list), ex=ttl)

    logger.info(f"Stored prompt in Redis with TTL={ttl}s")


# async def async_cache_workflow(prompt: str, api_func: Callable[[str], Any], ttl: int = DEFAULT_TTL) -> tuple[Any, str]:
#     """Core workflow: check cache, or call API and store result."""
#     cached = await get_cached_response(prompt)
#     if cached:
#         return cached, "Cache"

#     response = await api_func(prompt)
#     await set_cached_response(prompt, response, ttl)
#     return response, "Fresh"


async def async_cache_workflow(
    prompt: str,
    api_func: Callable[[str], Any],
    ttl: int = DEFAULT_TTL
) -> tuple[Any, str, float]:
    """
    Try to get response from Redis cache or call API.
    
    Returns:
        (response, source, response_time)
        - response: dict or str
        - source: "Cache" or "Fresh"
        - response_time: in seconds (float)
    """
    start = time.monotonic()

    # Try cache first
    cached = await get_cached_response(prompt)
    if cached:
        duration = time.monotonic() - start
        logger.info(f"Returned from Redis cache in {duration:.4f}s")
        return cached, "Cache", duration

    # Call API
    response = await api_func(prompt)
    await set_cached_response(prompt, response, ttl)
    duration = time.monotonic() - start
    logger.info(f"Returned from OpenAI API in {duration:.4f}s")
    return response, "Fresh", duration














# from fastapi_cache import FastAPICache
# from fastapi_cache.backends.inmemory import InMemoryBackend
# from typing import Any, Callable, Optional
# import hashlib
# import json
# import logging
# import difflib

# # Set up logging
# logger = logging.getLogger("cache_service")
# logger.setLevel(logging.INFO)

# # In-memory cache backend (global for all users)
# _cache_backend = InMemoryBackend()
# FastAPICache.init(_cache_backend)

# # Default TTL for cache entries (in seconds)
# DEFAULT_TTL = 600  # 10 minutes

# SIMILARITY_THRESHOLD = 0.85  # Adjust as needed

# def _make_cache_key(prompt: str) -> str:
#     # Use a hash to avoid key length issues
#     return hashlib.sha256(prompt.encode("utf-8")).hexdigest()

# async def find_similar_prompt(prompt: str) -> Optional[str]:
#     """
#     Search the cache for a prompt similar to the given prompt.
#     Returns the cached prompt if found, else None.
#     """
#     # InMemoryBackend stores keys as hashes, so we need to keep a mapping
#     # We'll store a list of (prompt, key) pairs in a special cache key
#     prompt_list_key = "PROMPT_LIST"
#     prompt_list = await _cache_backend.get(prompt_list_key) or []
#     for cached_prompt, key in prompt_list:
#         similarity = difflib.SequenceMatcher(None, prompt, cached_prompt).ratio()
#         if similarity >= SIMILARITY_THRESHOLD:
#             logger.info(f"Found similar prompt in cache (similarity={similarity:.2f})")
#             return key
#     return None

# async def get_cached_response(prompt: str) -> Optional[Any]:
#     # First, try exact match
#     key = _make_cache_key(prompt)
#     value = await _cache_backend.get(key)
#     if value is not None:
#         logger.info(f"Local Cache HIT for key: {key}")
#         return value
#     # If not found, try similar prompt
#     similar_key = await find_similar_prompt(prompt)
#     if similar_key:
#         value = await _cache_backend.get(similar_key)
#         if value is not None:
#             logger.info(f"Local Cache SIMILAR HIT for key: {similar_key}")
#             return value
#     logger.info(f"Local Cache MISS for key: {key}")
#     return None

# async def set_cached_response(prompt: str, response: Any, ttl: int = DEFAULT_TTL):
#     key = _make_cache_key(prompt)
#     await _cache_backend.set(key, response, expire=ttl)
#     # Store prompt-key mapping for similarity search
#     prompt_list_key = "PROMPT_LIST"
#     prompt_list = await _cache_backend.get(prompt_list_key) or []
#     # Avoid duplicates
#     if not any(k == key for _, k in prompt_list):
#         prompt_list.append((prompt, key))
#         await _cache_backend.set(prompt_list_key, prompt_list, expire=ttl)
#     logger.info(f"Stored response in Local Cache for key: {key} (TTL={ttl}s)")


# async def async_cache_workflow(prompt: str, openai_api_func: Callable[[str], Any], ttl: int = DEFAULT_TTL) -> tuple[Any, str]:
#     """
#     Async cache workflow for async OpenAI calls returning a string or dict.
#     Returns (response, cache_source)
#     """
#     cached = await get_cached_response(prompt)
#     logging.info(f"Cached: {cached}")
#     if cached is not None:
#         cache_source = "Local Cache"
#         return cached, cache_source

#     # Call OpenAI API (async)
#     #response = await openai_api_func(prompt)
#     cached_tokens = 0
#     cached_tokens = get_cached_tokens_from_response(cached) if cached else 0
#     #logger.info(f"Cached tokens: {cached_tokens}")
#     if cached_tokens > 0:
#         cache_source = "OpenAI Cache"
#         #logger.info("OpenAI Cache used!")
#     else:
#         cache_source = "Fresh API Call"
#         logger.info("Fresh prompt processed.")
#         response = await openai_api_func(prompt)
        
#     await set_cached_response(prompt, response, ttl=ttl)
#     return response, cache_source

# def get_cached_tokens_from_response(response: dict) -> int:
#     """
#     Extracts the number of cached tokens from an OpenAI response dict.
#     Returns 0 if not present or on error.
#     """
#     try:
#         return response.get('usage', {}).get('prompt_tokens_details', {}).get('cached_tokens', 0)
#     except Exception:
#         return 0
