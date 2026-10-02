import os
import re
import uuid
import secrets
import logging
from html import escape
from datetime import datetime, timezone
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, EmailStr, Field, field_validator

from email_service import send_email
from auth import get_current_admin
from database import db

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/audit-leads", tags=["audit-leads"])
public_router = APIRouter(prefix="/audit-view", tags=["audit-view"])

OWNER_EMAIL = os.environ["OWNER_EMAIL"]
PUBLIC_SITE_URL = os.environ["PUBLIC_SITE_URL"]
LOOM_RE = re.compile(r"^https://(www\.)?loom\.com/(share|embed)/([a-f0-9]{32})", re.I)
LEAD_STATUSES = ("new", "reviewing", "sent", "call_booked", "won", "closed")
LEAD_PROJECTION = {"_id": 0}


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



# ------------------------------------------------------------------ Admin
class LeadUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = Field(default=None, max_length=4000)

    @field_validator("status")
    @classmethod
    def valid_status(cls, v):
        if v is not None and v not in LEAD_STATUSES:
            raise ValueError("Invalid status")
        return v


class SendAuditRequest(BaseModel):
    video_url: str = Field(min_length=10, max_length=300)
    personal_note: str = Field(min_length=1, max_length=3000)

    @field_validator("video_url")
    @classmethod
    def valid_loom(cls, v: str) -> str:
        v = v.strip()
        if not LOOM_RE.match(v):
            raise ValueError("Please paste a Loom share link (https://www.loom.com/share/...)")
        return v


def _loom_id(url: str) -> str:
    return LOOM_RE.match(url).group(3)


def _site_origin(request: Request) -> str:
    origin = request.headers.get("origin", "")
    return origin if origin.startswith("https://") else PUBLIC_SITE_URL


def _build_delivery(lead: dict, view_url: str) -> str:
    name = escape(lead["first_name"])
    site = escape(lead["website"])
    brand = escape(os.environ["EMAIL_FROM_NAME"])
    note = escape(lead["personal_note"]).replace("\n", "<br>")
    brands = "City Civils Construction · LashMek &amp; Co · Celunéa Skincare · EDN Renovation Group"
    p = 'style="margin:0 0 16px;color:#111;font-size:15px;line-height:1.65"'
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        'style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto">'
        '<tr><td style="padding:28px 14px 8px">'
        '<p style="margin:0 0 18px;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#888">'
        'Your Personalised Website Audit</p>'
        f'<p {p}>Hi {name},</p>'
        f'<p {p}>Your audit is ready. I&#39;ve recorded a video walking through <strong>{site}</strong> — '
        f'what&#39;s working, what&#39;s holding it back and where the biggest opportunities are.</p>'
        f'<p style="margin:0 0 22px;padding:16px 18px;border-left:2px solid #111;color:#333;font-size:15px;line-height:1.65">{note}</p>'
        '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px"><tr><td '
        'style="background:#111;border-radius:999px">'
        f'<a href="{escape(view_url)}" style="display:inline-block;padding:14px 28px;color:#fff;text-decoration:none;'
        f'font-size:12px;letter-spacing:.2em;text-transform:uppercase;font-weight:bold">Watch My Audit</a></td></tr></table>'
        f'<p {p}>Once you&#39;ve watched it, if you&#39;d like to talk through the recommendations, there&#39;s a link on '
        f'the same page to book a call with me. No pressure either way — the recommendations are yours to keep.</p>'
        f'<p {p}>Speak soon,<br>Jay</p>'
        '</td></tr>'
        '<tr><td style="padding:18px 14px 28px;border-top:1px solid #eee">'
        '<p style="margin:0 0 6px;font-size:13px;color:#111"><span style="color:#111;letter-spacing:2px">★★★★★</span>'
        '&nbsp; <strong>5.0</strong> rated on Google</p>'
        f'<p style="margin:0 0 14px;font-size:12px;color:#777;line-height:1.6">Trusted by ambitious brands including {brands}.</p>'
        f'<p style="margin:0;font-size:12px;color:#999;line-height:1.6">{brand} — Web Designer &amp; Developer<br>'
        f'<a href="https://jayalminshawi.com" style="color:#999">jayalminshawi.com</a></p>'
        '</td></tr></table>'
    )


@router.get("", dependencies=[Depends(get_current_admin)])
async def list_audit_leads():
    return await db.audit_leads.find({}, LEAD_PROJECTION).sort("created_at", -1).to_list(1000)


@router.get("/{lead_id}", dependencies=[Depends(get_current_admin)])
async def get_audit_lead(lead_id: str):
    lead = await db.audit_leads.find_one({"id": lead_id}, LEAD_PROJECTION)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead


@router.patch("/{lead_id}", dependencies=[Depends(get_current_admin)])
async def update_audit_lead(lead_id: str, body: LeadUpdate):
    update = {k: v for k, v in body.model_dump().items() if v is not None}
    if not update:
        raise HTTPException(status_code=400, detail="Nothing to update")
    res = await db.audit_leads.update_one({"id": lead_id}, {"$set": update})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return await db.audit_leads.find_one({"id": lead_id}, LEAD_PROJECTION)


@router.post("/{lead_id}/send-audit", dependencies=[Depends(get_current_admin)])
async def send_audit(lead_id: str, body: SendAuditRequest, request: Request):
    lead = await db.audit_leads.find_one({"id": lead_id}, LEAD_PROJECTION)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    view_token = lead.get("view_token") or secrets.token_urlsafe(24)
    sent_at = datetime.now(timezone.utc).isoformat()
    delivery = {
        "video_url": body.video_url,
        "personal_note": body.personal_note,
        "view_token": view_token,
        "audit_sent_at": sent_at,
        "status": "sent",
    }
    view_url = f"{_site_origin(request)}/audit/view/{view_token}"
    try:
        await send_email(
            to=lead["email"],
            subject=f"{lead['first_name']}, your personalised website audit is ready",
            html=_build_delivery({**lead, **delivery}, view_url),
        )
    except Exception as e:
        logger.error(f"Audit delivery email failed for {lead_id}: {e}")
        raise HTTPException(status_code=502, detail="Email could not be sent. Please try again.")

    await db.audit_leads.update_one({"id": lead_id}, {"$set": {**delivery, "delivery_sent": True}})
    return await db.audit_leads.find_one({"id": lead_id}, LEAD_PROJECTION)


# ------------------------------------------------------------------ Public audit view
@public_router.get("/{token}")
async def view_audit(token: str):
    lead = await db.audit_leads.find_one(
        {"view_token": token, "delivery_sent": True},
        {"_id": 0, "first_name": 1, "company": 1, "website": 1, "video_url": 1, "personal_note": 1, "audit_sent_at": 1},
    )
    if not lead:
        raise HTTPException(status_code=404, detail="Audit not found")
    lead["embed_url"] = f"https://www.loom.com/embed/{_loom_id(lead['video_url'])}?hide_owner=true&hideEmbedTopBar=true"
    return lead
