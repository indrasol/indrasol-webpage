from pydantic import BaseModel
import logging

# This module previously handled Pinecone index refreshes.
# Supabase-backed refresh is implemented in services.bot_service.refresh_url/refresh_urls.

def refresh_url(url):
    logging.warning("refresh_service.refresh_url is deprecated. Use services.bot_service.refresh_url (async).")

def refresh_urls(urls_to_refresh):
    logging.warning("refresh_service.refresh_urls is deprecated. Use services.bot_service.refresh_urls (async).")

class RefreshRequest(BaseModel):
    refresh_urls: list[str] = []