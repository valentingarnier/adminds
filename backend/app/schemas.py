import uuid
from datetime import datetime

from pydantic import BaseModel


# --- User ---

class UserProfile(BaseModel):
    id: uuid.UUID
    email: str
    subscription_status: str | None = None  # ACTIVE, PAST_DUE, CANCELED, or None


# --- Checkout / Subscription ---

class CheckoutResponse(BaseModel):
    checkout_url: str


class SubscriptionResponse(BaseModel):
    status: str  # ACTIVE, PAST_DUE, CANCELED
    current_period_end: datetime | None = None


# --- Health ---

class HealthResponse(BaseModel):
    status: str = "ok"
    version: str = "0.1.0"


# --- Waitlist / Contact ---

class WaitlistRequest(BaseModel):
    email: str
    name: str = ""
    message: str = ""


class WaitlistResponse(BaseModel):
    ok: bool = True


# --- Errors ---

class ErrorResponse(BaseModel):
    detail: str
    code: str | None = None
