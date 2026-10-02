"""Tests for /api/audit-leads endpoint."""
import os
import uuid
import pytest
import requests
from pymongo import MongoClient

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://jay-minimal-pro.preview.emergentagent.com").rstrip("/")
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "test_database")

API = f"{BASE_URL}/api/audit-leads"


@pytest.fixture(scope="module")
def db():
    client = MongoClient(MONGO_URL)
    yield client[DB_NAME]
    client.close()


def _valid_payload(email_suffix="example.com"):
    unique = uuid.uuid4().hex[:8]
    return {
        "first_name": "TESTJay",
        "company": f"TEST Co {unique}",
        "website": "www.testbuilders.co.uk",
        "specialism": "Renovations",
        "specialism_other": None,
        "objectives": ["Generate more enquiries", "Rank better on Google"],
        "lead_sources": ["Google organic / search"],
        "lead_sources_other": None,
        "project_value": "£25,000 – £50,000",
        "enquiry_volume": "5–10",
        "website_issue": "Not enough enquiries converting.",
        "investment": "£2,500 – £5,000",
        "timeline": "Within 30 days",
        "decision_makers": "Just me",
        "decision_makers_other": None,
        "email": f"test_{unique}@{email_suffix}",
        "phone": "07123456789",
        "consent": True,
        "utm": {"utm_source": "test"},
    }


def test_create_audit_lead_success_and_persisted(db):
    payload = _valid_payload()
    r = requests.post(API, json=payload, timeout=60)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data and data["first_name"] == payload["first_name"]
    assert data["company"] == payload["company"]
    assert data["website"] == payload["website"]
    assert "email_sent" in data and isinstance(data["email_sent"], bool)

    # Verify Mongo persistence
    doc = db.audit_leads.find_one({"id": data["id"]})
    assert doc is not None
    assert doc["email"] == payload["email"]
    assert doc["objectives"] == payload["objectives"]
    assert doc["status"] == "new"

    # Cleanup
    db.audit_leads.delete_one({"id": data["id"]})


def test_consent_false_rejected():
    p = _valid_payload()
    p["consent"] = False
    r = requests.post(API, json=p, timeout=30)
    assert r.status_code == 422


def test_invalid_email_rejected():
    p = _valid_payload()
    p["email"] = "not-an-email"
    r = requests.post(API, json=p, timeout=30)
    assert r.status_code == 422


def test_missing_objectives_rejected():
    p = _valid_payload()
    p["objectives"] = []
    r = requests.post(API, json=p, timeout=30)
    assert r.status_code == 422


def test_missing_required_field_rejected():
    p = _valid_payload()
    del p["company"]
    r = requests.post(API, json=p, timeout=30)
    assert r.status_code == 422
