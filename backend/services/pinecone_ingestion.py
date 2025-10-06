import os
import uuid
from supabase import create_client
from openai import OpenAI
from config.settings import SUPABASE_URL, SUPABASE_SERVICE_KEY, OPENAI_API_KEY

openai_client = OpenAI(api_key=OPENAI_API_KEY)
supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

def embed(text: str):
    return openai_client.embeddings.create(input=text, model="text-embedding-3-small").data[0].embedding

def chunk_and_upload(docs: list):
    rows = []
    for doc in docs:
        embedding = embed(doc['text'])
        rows.append({
            "id": str(uuid.uuid4()),
            "namespace": doc.get("namespace", "sales"),
            "text": doc["text"],
            "source": doc.get("source"),
            "category": doc.get("category"),
            "type": doc.get("type"),
            "embedding": embedding
        })
    if rows:
        supabase.table("documents").upsert(rows).execute()

# Sample ingestion content
docs = [
    {"text": "SecureTrack enables 95% threat detection and saves 76% review time.", "category": "SecureTrack", "type": "benefit", "intent_stage": "consideration"},
    {"text": "BizRadar tracks over 2.5K+ contracts daily across 8 platforms.", "category": "BizRadar", "type": "stat", "intent_stage": "awareness"}
]

chunk_and_upload(docs)