from supabase import create_client, Client
from config.settings import SUPABASE_URL, SUPABASE_SERVICE_KEY
from fastapi import HTTPException
from functools import lru_cache
import asyncio
import httpx
from concurrent.futures import ThreadPoolExecutor
from config.logging import setup_logging
import logging

setup_logging()
# Global thread pool for running Supabase operations asynchronously
thread_pool = ThreadPoolExecutor()

# Initialize Supabase client
@lru_cache
def get_supabase_client():
    # http_client = httpx.Client()
    supbase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    return supbase

# Helper to run Supabase operations asynchronously
async def run_supabase_async(func):
    return await asyncio.get_event_loop().run_in_executor(
        thread_pool, func
    )

# Helper for safer Supabase operations with error handling
async def safe_supabase_operation(operation, error_message="Supabase operation failed"):
    start = asyncio.get_event_loop().time()
    try:
        result = await run_supabase_async(operation)
        duration = asyncio.get_event_loop().time() - start
        logging.info(f"Supabase op ok in {duration:.4f}s: {getattr(operation, '__name__', 'lambda')}" )
        return result
    except Exception as e:
        duration = asyncio.get_event_loop().time() - start
        logging.exception(f"{error_message} after {duration:.4f}s: {str(e)}")
        raise HTTPException(status_code=500, detail=f"{error_message}: {str(e)}")

