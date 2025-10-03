import os
from hashlib import md5
import asyncio
from services.supabase_vector_service import query_supabase_vector
_SALES_HASH_FILE = ".sales_hash"

async def sales_content_changed() -> bool:
    with open("knowledge_base/sales_content.py", "rb") as f:
        current = md5(f.read()).hexdigest()
    if os.path.exists(_SALES_HASH_FILE):
        with open(_SALES_HASH_FILE) as f:
            if f.read().strip() == current:
                return False
    with open(_SALES_HASH_FILE, "w") as f:
        f.write(current)
    return True

