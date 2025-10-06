import asyncio
from services.supabase_vector_service import query_supabase_vector


async def debug_sales():
    matches = await query_supabase_vector(
        query="cloud landing zones", 
        namespace="sales",
        filters={"category": {"$in": ["Cloud Engineering"]}},
        top_k=3
    )
    for m in matches:
        print(m["category"], m["type"], "→", m["text"][:80], "…")

asyncio.run(debug_sales())