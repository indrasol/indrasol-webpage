"""
supabase_vector service – backed by Supabase (pgvector).
Keeps the same public API shape except `query_supabase_vector` name.
"""
import os, asyncio, logging, hashlib
from typing import List, Dict, Any, Optional

from tenacity import retry, wait_exponential, stop_after_attempt
from openai import OpenAI
from supabase import create_client, Client
from config.settings import SUPABASE_URL, SUPABASE_SERVICE_KEY, OPENAI_API_KEY

# ── constants ─────────────────────────────────────────────────────────
EMBED_MODEL  = "text-embedding-3-small"   # 1536-d
EMBED_DIM    = 1536
BATCH_SIZE   = 100

logger = logging.getLogger("supabase_vector_service")

# ── OpenAI client (reuse global) ──────────────────────────────────────
openai_client = OpenAI(api_key=OPENAI_API_KEY)

# ── Supabase client ───────────────────────────────────────────────────
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async def embed_text(text: str) -> List[float]:
    """Returns 1536-d embedding list."""
    resp = await asyncio.to_thread(
        lambda: openai_client.embeddings.create(
            input=text,
            model=EMBED_MODEL
        )
    )
    return resp.data[0].embedding

# ── Retry wrappers for upsert / rpc ───────────────────────────────────
@retry(wait=wait_exponential(), stop=stop_after_attempt(5))
def _upsert_batch(rows: List[Dict[str, Any]]):
    supabase.table("documents").upsert(rows).execute()

@retry(wait=wait_exponential(), stop=stop_after_attempt(5))
def _rpc_match(payload: Dict[str, Any]):
    return supabase.rpc("match_documents", payload).execute()

# ── Public helpers ────────────────────────────────────────────────────
async def store_documents(
    chunks: List[str],
    namespace: str,
    source_id: str,
    category: str,
    doc_type: str = "benefit"
):
    """Batch-upsert text chunks with rich metadata to Supabase."""
    batch: List[Dict[str, Any]] = []
    for i, chunk in enumerate(chunks):
        vec = await embed_text(chunk)
        vid = f"{hashlib.md5((source_id + str(i)).encode()).hexdigest()}"
        batch.append({
            "id": vid,
            "namespace": namespace,
            "text": chunk,
            "source": source_id,
            "category": category,
            "type": doc_type,
            "embedding": vec,
        })
        if len(batch) >= BATCH_SIZE:
            _upsert_batch(batch)
            batch.clear()
    if batch:
        _upsert_batch(batch)
    logger.info("Upserted %s rows in '%s' (Supabase)", len(chunks), namespace)

async def query_supabase_vector(
    query: str,
    namespace: str = "",
    filters: Optional[Dict[str, Any]] = None,
    top_k: int = 5
) -> List[Dict[str, Any]]:
    """Returns list of matches with metadata from Supabase."""
    vec = await embed_text(query)

    filter_category: Optional[str] = None
    filter_type: Optional[str] = None
    if filters:
        cat = filters.get("category")
        if isinstance(cat, dict):
            filter_category = cat.get("$eq") or (cat.get("$in") or [None])[0]
        else:
            filter_category = cat
        typ = filters.get("type")
        if isinstance(typ, dict):
            filter_type = typ.get("$eq") or (typ.get("$in") or [None])[0]
        else:
            filter_type = typ

    res = _rpc_match({
        "query_embedding": vec,
        "match_count": top_k,
        "namespace": namespace,
        "filter_category": filter_category,
        "filter_type": filter_type
    })
    rows = res.data or []
    return [
        {
            "text": r.get("text"),
            "source": r.get("source"),
            "category": r.get("category"),
            "type": r.get("type"),
            "score": float(r.get("score", 0.0))
        }
        for r in rows
    ]


