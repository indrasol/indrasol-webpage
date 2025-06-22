from pydantic import BaseModel, EmailStr
from typing import List, Optional, Union
from datetime import datetime


# Chat Request Model
class QueryRequest(BaseModel):
    user_id: str
    query: str
    history: Optional[List[str]] = []

class ChatRequest(BaseModel):
    user_id: str | None = None
    text: str

class ContactForm(BaseModel):
    user_id: str
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str

class CallForm(BaseModel):
    user_id: str
    name: str
    phone_number: str
    date: str  # e.g. "2025-06-23"
    time: str  # e.g. "14:00"
    tz: str = "America/Chicago"  # default timezone
