"""Email notifications via Resend."""

import logging

import resend

from app.config import settings

logger = logging.getLogger("app")


def _configure() -> None:
    resend.api_key = settings.resend_api_key


async def send_notification(subject: str, html: str) -> str | None:
    """Send a notification email to the configured notification address.

    Returns the email ID on success, None if Resend is not configured.
    """
    if not settings.resend_api_key or not settings.notification_email:
        logger.warning("Resend not configured, skipping email")
        return None

    _configure()

    params: resend.Emails.SendParams = {
        "from": "Admind <notifications@admind.ch>",
        "to": [settings.notification_email],
        "subject": subject,
        "html": html,
    }

    email = resend.Emails.send(params)
    logger.info(f"Notification sent: {email['id']}")
    return email["id"]
