"""
Backend tests for Jay Alminshawi Portfolio API.
Covers:
- Health endpoint (GET /api/)
- Contact endpoint (POST /api/contact) success + validation
- Contact list endpoint (GET /api/contact)
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # fallback: load frontend/.env for testing
    from pathlib import Path
    env_path = Path("/app/frontend/.env")
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip()
                break
BASE_URL = (BASE_URL or "").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root_message(self, client):
        r = client.get(f"{API}/", timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "message" in data
        assert "Jay Alminshawi Portfolio API" in data["message"]


# ---------- Contact ----------
class TestContact:
    def test_create_contact_and_list_persistence(self, client):
        unique = f"TEST_{uuid.uuid4().hex[:8]}"
        payload = {
            "name": f"TEST_User_{unique}",
            "email": f"test_{unique}@example.com",
            "company": "TEST_Co",
            "project_type": "Portfolio",
            "message": f"Hello from automated test {unique}",
        }
        r = client.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 201, r.text
        body = r.json()
        # field-level assertions
        assert body["name"] == payload["name"]
        assert body["email"] == payload["email"]
        assert body["company"] == payload["company"]
        assert body["project_type"] == payload["project_type"]
        assert body["message"] == payload["message"]
        assert "id" in body and isinstance(body["id"], str) and len(body["id"]) > 0
        assert "created_at" in body

        # Verify persistence via GET
        r2 = client.get(f"{API}/contact", timeout=20)
        assert r2.status_code == 200, r2.text
        items = r2.json()
        assert isinstance(items, list)
        match = [c for c in items if c.get("id") == body["id"]]
        assert match, f"Created contact {body['id']} not found in GET list"
        assert match[0]["email"] == payload["email"]

    def test_create_contact_minimal_optional_fields(self, client):
        unique = f"TEST_{uuid.uuid4().hex[:8]}"
        payload = {
            "name": f"TEST_Minimal_{unique}",
            "email": f"min_{unique}@example.com",
            "message": "Minimal payload",
        }
        r = client.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 201, r.text
        body = r.json()
        assert body["company"] is None
        assert body["project_type"] is None

    def test_invalid_email_returns_422(self, client):
        payload = {
            "name": "TEST_Bad",
            "email": "not-an-email",
            "message": "Bad email",
        }
        r = client.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 422, f"expected 422 got {r.status_code}: {r.text}"

    def test_missing_required_fields_returns_422(self, client):
        # missing name and message
        payload = {"email": "x@example.com"}
        r = client.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 422, f"expected 422 got {r.status_code}: {r.text}"

    def test_empty_name_returns_422(self, client):
        payload = {"name": "", "email": "x@example.com", "message": "hi"}
        r = client.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 422, f"expected 422 got {r.status_code}: {r.text}"

    def test_list_contacts_returns_list(self, client):
        r = client.get(f"{API}/contact", timeout=20)
        assert r.status_code == 200
        assert isinstance(r.json(), list)
