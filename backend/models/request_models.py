from pydantic import BaseModel, EmailStr, Field, field_validator, constr
from typing import List, Optional, Union
from datetime import datetime


# Chat Request Model
class QueryRequest(BaseModel):
    user_id: str
    query: str
    history: Optional[List[str]] = []
    isReturningUser: Optional[bool] = False

class ChatRequest(BaseModel):
    user_id: str | None = None
    text: str

class ContactForm(BaseModel):
    user_id: str
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str

PHONE_E164_REGEX = r"^\+\d{8,15}$"  # + followed by 8-15 digits

class CallForm(BaseModel):
    user_id: str
    name: str
    phone_number: constr(pattern=PHONE_E164_REGEX) = Field(..., description="E.164 phone number, e.g. +15551234567")
    date: str  # e.g. "2025-06-23"
    time: str  # e.g. "14:00"
    tz: str = "America/Chicago"  # default timezone

    @field_validator("phone_number")
    @classmethod
    def phone_must_be_e164(cls, v):
        if not v.startswith("+"):
            raise ValueError("Phone number must include country code, e.g. +15551234567")
        return v
