from agents.context_agent import retrieve_context
from fastapi import APIRouter, Query
from pydantic import BaseModel
from datetime import date

search_router = APIRouter()

class VapiSearchRequest(BaseModel):
    query: str

@search_router.post("/search", status_code=200)
async def search_handler(request: VapiSearchRequest):
    # Your logic to get the result for the query
    context = await retrieve_context(request.query)
    context_txt = "\n\n".join(context["chunks"])
    # You may want to format context as a string or object, depending on your needs
    return context_txt


@search_router.post("/todays_date", status_code=200)
async def todays_date_handler():
    today = date.today()
    formatted = today.strftime("%d %B %Y")
    return {"todays_date": formatted}