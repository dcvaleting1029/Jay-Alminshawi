import os
import uuid
import logging
from html import escape
from datetime import datetime, timezone
from typing import List, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field, field_validator

from email_service import send_email

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/audit-leads", tags=["audit-leads"])

OWNER_EMAIL = os.environ["OWNER_EMAIL"]


class AuditLeadCreate(BaseModel):
    first_name: str = Field(min_length=1, max_length=80)
    company: str = Field(min_length=1, max_length=120)
    website: str = Field(min_length=3, max_length=200)
    specialism: str = Field(min_length=1, max_length=80)
    specialism_other: Optional[str] = Field(default=None, max_length=200)
    objectives: List[str] = Field(min_length=1, max_length=12)
    lead_sources: List[str] = Field(min_length=1, max_length=12)
    lead_sources_other: Optional[str] = Field(default=None, max_length=200)
    project_value: str = Field(min_length=1, max_length=60)
    enquiry_volume: str = Field(min_length=1, max_length=60)
    website_issue: Optional[str] = Field(default=None, max_length=2000)
    investment: str = Field(min_length=1, max_length=60)
    timeline: str = Field(min_length=1, max_length=60)
    decision_makers: str = Field(min_length=1, max_length=80)
    decision_makers_other: Optional[str] = Field(default=None, max_length=200)
    email: EmailStr
    phone: str = Field(min_length=6, max_length=30)
    consent: bool
    utm: Optional[dict] = None

    @field_validator("consent")
    @classmethod
    def must_consent(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Consent is required")
        return v


class AuditLeadResponse(BaseModel):
    id: str
    first_name: str
    company: str
    website: str
    email_sent: bool


def _row(label: str, value, raw: bool = False) -> str:
    if isinstance(value, list):
        value = ", ".join(value)
    value = str(value or "—") if raw else escape(str(value or "—"))
    return (
        f'<tr><td style="padding:10px 14px;border-bottom:1px solid #eee;color:#777;'
        f'font-size:12px;letter-spacing:.08em;text-transform:uppercase;width:38%;vertical-align:top">'
        f'{escape(label)}</td><td style="padding:10px 14px;border-bottom:1px solid #eee;'
        f'color:#111;font-size:14px;vertical-align:top">{value}</td></tr>'
    )


def _build_email(lead: AuditLeadCreate) -> str:
    specialism = lead.specialism + (f" — {lead.specialism_other}" if lead.specialism_other else "")
    sources = list(lead.lead_sources) + ([f"Other: {lead.lead_sources_other}"] if lead.lead_sources_other else [])
    decision = lead.decision_makers + (f" — {lead.decision_makers_other}" if lead.decision_makers_other else "")
    issue = escape(lead.website_issue or "—").replace("\n", "<br>")
    utm = ", ".join(f"{escape(k)}={escape(str(v))}" for k, v in (lead.utm or {}).items()) or "—"
    rows = "".join([
        _row("Name", lead.first_name),
        _row("Company", lead.company),
        _row("Website", lead.website),
        _row("Specialises in", specialism),
        _row("Objectives", lead.objectives),
        _row("Current lead sources", sources),
        _row("Typical project value", lead.project_value),
        _row("Enquiries / month", lead.enquiry_volume),
        _row("Investment level", lead.investment),
        _row("Timeline", lead.timeline),
        _row("Decision makers", decision),
        _row("Email", f'<a href="mailto:{escape(lead.email)}" style="color:#111">{escape(lead.email)}</a>', raw=True),
        _row("Phone", f'<a href="tel:{escape(lead.phone)}" style="color:#111">{escape(lead.phone)}</a>', raw=True),
        _row("Traffic source", utm, raw=True),
    ])
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        'style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto">'
        '<tr><td style="padding:28px 14px 10px">'
        '<p style="margin:0;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#888">'
        'New Audit Request</p>'
        f'<h1 style="margin:8px 0 0;font-size:24px;color:#111">{escape(lead.company)}</h1>'
        f'<p style="margin:6px 0 0;color:#555;font-size:14px">{escape(lead.first_name)} has requested a '
        'personalised website audit.</p></td></tr>'
        f'<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        f'style="border:1px solid #eee;border-radius:10px;border-collapse:separate;overflow:hidden">{rows}</table></td></tr>'
        '<tr><td style="padding:18px 14px 0">'
        '<p style="margin:0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#888">'
        'Biggest issue with current website</p>'
        f'<p style="margin:8px 0 0;color:#111;font-size:14px;line-height:1.6">{issue}</p></td></tr>'
        '<tr><td style="padding:28px 14px;font-size:12px;color:#999">'
        f'Sent by {escape(os.environ["EMAIL_FROM_NAME"])} — website audit funnel.</td></tr></table>'
    )


def _build_confirmation(lead: AuditLeadCreate) -> str:
    name = escape(lead.first_name)
    site = escape(lead.website)
    brand = escape(os.environ["EMAIL_FROM_NAME"])
    p = 'style="margin:0 0 16px;color:#111;font-size:15px;line-height:1.65"'
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        'style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto">'
        '<tr><td style="padding:28px 14px">'
        f'<p {p}>Hi {name},</p>'
        f'<p {p}>Thanks for requesting a website audit — I&#39;ve got your details and I&#39;ll be '
        f'taking a proper look at <strong>{site}</strong> myself over the next 48 hours.</p>'
        f'<p {p}>Just so you know what to expect: this isn&#39;t an automated report. I&#39;ll personally '
        f'review your design, user experience, positioning and enquiry journey, then record a short '
        f'video walking you through what I find and where the biggest opportunities are.</p>'
        f'<p {p}>If anything changes or you&#39;d like to add some context before I start, just reply '
        f'to this email.</p>'
        f'<p {p}>Speak soon,<br>Jay</p>'
        f'<p style="margin:28px 0 0;font-size:12px;color:#999;line-height:1.6">{brand} — Web Designer &amp; Developer<br>'
        f'<a href="https://jayalminshawi.com" style="color:#999">jayalminshawi.com</a></p>'
        '</td></tr></table>'
    )


@router.post("", response_model=AuditLeadResponse)
async def create_audit_lead(payload: AuditLeadCreate):
    from database import db

    lead_id = str(uuid.uuid4())
    doc = payload.model_dump()
    doc.update({
        "id": lead_id,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "new",
    })
    await db.audit_leads.insert_one(doc)

    email_sent = False
    try:
        await send_email(
            to=OWNER_EMAIL,
            subject=f"New website audit request — {payload.company}",
            html=_build_email(payload),
        )
        email_sent = True
    except Exception as e:  # lead is already saved; never fail the submission on email
        logger.error(f"Audit lead email failed for {lead_id}: {e}")

    confirmation_sent = False
    try:
        await send_email(
            to=payload.email,
            subject=f"Got your website audit request, {payload.first_name}",
            html=_build_confirmation(payload),
        )
        confirmation_sent = True
    except Exception as e:
        logger.error(f"Audit confirmation email failed for {lead_id}: {e}")

    await db.audit_leads.update_one(
        {"id": lead_id},
        {"$set": {"email_sent": email_sent, "confirmation_sent": confirmation_sent}},
    )
    return AuditLeadResponse(
        id=lead_id,
        first_name=payload.first_name,
        company=payload.company,
        website=payload.website,
        email_sent=email_sent,
    )
