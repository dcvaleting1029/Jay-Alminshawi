"""Tests for /api/auth, /api/audit-leads admin flows and public audit view."""
import os
import uuid
import pytest
import requests
from pymongo import MongoClient

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://jay-minimal-pro.preview.emergentagent.com").rstrip("/")
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "test_database")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "contact@jayalminshawi.com"
ADMIN_PASSWORD = "Jayisalive_10"
RESEND_SINK = "delivered@resend.dev"
VALID_LOOM = "https://www.loom.com/share/0123456789abcdef0123456789abcdef"


@pytest.fixture(scope="module")
def db():
    c = MongoClient(MONGO_URL)
    yield c[DB_NAME]
    c.close()


@pytest.fixture(scope="module")
def token():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=30)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["email"] == ADMIN_EMAIL
    assert "token" in data and len(data["token"]) > 20
    assert data["name"]
    return data["token"]


@pytest.fixture(scope="module")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# ---------- auth ----------
def test_login_wrong_password_401():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong_pw_123"}, timeout=30)
    assert r.status_code == 401


def test_me_without_token_401():
    r = requests.get(f"{API}/auth/me", timeout=30)
    assert r.status_code == 401


def test_me_with_token(auth_headers):
    r = requests.get(f"{API}/auth/me", headers=auth_headers, timeout=30)
    assert r.status_code == 200
    assert r.json()["email"] == ADMIN_EMAIL


def test_brute_force_lockout(db):
    # Use a fake email so we don't lock the real admin
    fake = f"lockme_{uuid.uuid4().hex[:6]}@example.com"
    # Clean any previous attempts
    db.login_attempts.delete_many({"identifier": {"$regex": fake}})
    codes = []
    # Up to 15 attempts: with 2 backend pods behind the ingress each needs 5+ fails
    # before locking, so 429 appears somewhere between attempt 6 and 12.
    for _ in range(15):
        r = requests.post(f"{API}/auth/login", json={"email": fake, "password": "nope"}, timeout=30)
        codes.append(r.status_code)
        if r.status_code == 429:
            break
    assert 429 in codes, f"Expected a 429 lockout within 15 attempts, got {codes}"
    # And the real admin email must NOT be locked out
    r_admin = requests.post(f"{API}/auth/login",
                            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=30)
    assert r_admin.status_code == 200
    # Cleanup lockout
    db.login_attempts.delete_many({"identifier": {"$regex": fake}})


# ---------- leads list/get ----------
def test_list_leads_requires_auth():
    r = requests.get(f"{API}/audit-leads", timeout=30)
    assert r.status_code == 401


def _create_lead(email=RESEND_SINK):
    unique = uuid.uuid4().hex[:8]
    payload = {
        "first_name": "TESTAdmin",
        "company": f"TEST Admin Co {unique}",
        "website": "www.testsend.co.uk",
        "specialism": "Renovations",
        "objectives": ["Generate more enquiries"],
        "lead_sources": ["Google organic / search"],
        "project_value": "£25,000 – £50,000",
        "enquiry_volume": "5–10",
        "website_issue": "Testing",
        "investment": "£2,500 – £5,000",
        "timeline": "Within 30 days",
        "decision_makers": "Just me",
        "email": email,
        "phone": "07123456789",
        "consent": True,
    }
    r = requests.post(f"{API}/audit-leads", json=payload, timeout=60)
    assert r.status_code == 200, r.text
    return r.json()["id"]


def test_list_leads_returns_sorted(auth_headers, db):
    lead_id = _create_lead()
    r = requests.get(f"{API}/audit-leads", headers=auth_headers, timeout=30)
    assert r.status_code == 200
    leads = r.json()
    assert isinstance(leads, list)
    assert any(l["id"] == lead_id for l in leads)
    # No _id leaked
    assert all("_id" not in l for l in leads)
    # Sorted newest first
    dates = [l["created_at"] for l in leads if "created_at" in l]
    assert dates == sorted(dates, reverse=True)
    db.audit_leads.delete_one({"id": lead_id})


def test_get_lead_by_id(auth_headers, db):
    lead_id = _create_lead()
    r = requests.get(f"{API}/audit-leads/{lead_id}", headers=auth_headers, timeout=30)
    assert r.status_code == 200
    assert r.json()["id"] == lead_id
    assert "_id" not in r.json()
    db.audit_leads.delete_one({"id": lead_id})


def test_patch_status_valid(auth_headers, db):
    lead_id = _create_lead()
    r = requests.patch(f"{API}/audit-leads/{lead_id}", headers=auth_headers,
                       json={"status": "reviewing"}, timeout=30)
    assert r.status_code == 200
    assert r.json()["status"] == "reviewing"
    db.audit_leads.delete_one({"id": lead_id})


def test_patch_status_invalid_422(auth_headers, db):
    lead_id = _create_lead()
    r = requests.patch(f"{API}/audit-leads/{lead_id}", headers=auth_headers,
                       json={"status": "notarealstatus"}, timeout=30)
    assert r.status_code == 422
    db.audit_leads.delete_one({"id": lead_id})


def test_patch_notes(auth_headers, db):
    lead_id = _create_lead()
    r = requests.patch(f"{API}/audit-leads/{lead_id}", headers=auth_headers,
                       json={"notes": "test notes"}, timeout=30)
    assert r.status_code == 200
    assert r.json()["notes"] == "test notes"
    db.audit_leads.delete_one({"id": lead_id})


# ---------- send-audit (ONE real send) ----------
def test_send_audit_invalid_url_422(auth_headers, db):
    lead_id = _create_lead()
    r = requests.post(f"{API}/audit-leads/{lead_id}/send-audit", headers=auth_headers,
                      json={"video_url": "https://youtube.com/watch?v=abc", "personal_note": "Hi"}, timeout=30)
    assert r.status_code == 422
    db.audit_leads.delete_one({"id": lead_id})


def test_send_audit_success_and_public_view(auth_headers, db):
    lead_id = _create_lead(email=RESEND_SINK)
    r = requests.post(f"{API}/audit-leads/{lead_id}/send-audit", headers=auth_headers,
                      json={"video_url": VALID_LOOM, "personal_note": "Hi there"}, timeout=60)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["status"] == "sent"
    assert data["delivery_sent"] is True
    assert data.get("audit_sent_at")
    token = data["view_token"]
    assert token and len(token) > 10

    # Public view works, no auth
    r2 = requests.get(f"{API}/audit-view/{token}", timeout=30)
    assert r2.status_code == 200
    v = r2.json()
    assert v["first_name"] == "TESTAdmin"
    assert v["website"]
    assert v["personal_note"] == "Hi there"
    assert v["embed_url"].startswith("https://www.loom.com/embed/")
    assert "0123456789abcdef0123456789abcdef" in v["embed_url"]

    # Bad token
    r3 = requests.get(f"{API}/audit-view/badtoken", timeout=30)
    assert r3.status_code == 404

    db.audit_leads.delete_one({"id": lead_id})
