"""Waitlist / contact form endpoints (public, no auth required)."""

import logging

from fastapi import APIRouter, HTTPException

from app.schemas import WaitlistRequest, WaitlistResponse
from app.services.email import send_notification

logger = logging.getLogger("app")

router = APIRouter(tags=["waitlist"])


@router.post("/waitlist", response_model=WaitlistResponse)
async def join_waitlist(body: WaitlistRequest) -> WaitlistResponse:
    """Join waitlist or send a contact message. Notifies team via Resend."""
    logger.info(f"Waitlist signup: {body.email}")

    subject = f"New waitlist signup: {body.email}"
    html = f"""
    <h2>New waitlist signup</h2>
    <p><strong>Email:</strong> {body.email}</p>
    <p><strong>Name:</strong> {body.name or '(not provided)'}</p>
    <p><strong>Message:</strong> {body.message or '(none)'}</p>
    """

    try:
        await send_notification(subject, html)
    except Exception as e:
        logger.error(f"Failed to send notification: {e}")
        raise HTTPException(status_code=500, detail="Failed to process request")

    return WaitlistResponse()
