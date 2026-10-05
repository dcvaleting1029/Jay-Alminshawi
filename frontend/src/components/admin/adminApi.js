const API = process.env.REACT_APP_BACKEND_URL;
const TOKEN_KEY = "ja_admin_token";

export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setToken = (t) => sessionStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => sessionStorage.removeItem(TOKEN_KEY);

export const formatApiErrorDetail = (detail) => {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e?.msg || JSON.stringify(e)).join(" ");
  return detail.msg || String(detail);
};

export const adminFetch = async (path, { method = "GET", body } = {}) => {
  const res = await fetch(`${API}/api${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    clearToken();
    window.dispatchEvent(new Event("admin-logout"));
  }
  if (!res.ok) throw new Error(formatApiErrorDetail(data.detail));
  return data;
};

export const STATUS_LABELS = {
  new: "New",
  reviewing: "Reviewing",
  sent: "Audit sent",
  call_booked: "Call booked",
  won: "Won",
  closed: "Closed",
};

export const NUDGE_AFTER_DAYS = 3;

export const needsFollowUp = (lead) => {
  if (!lead.delivery_sent || lead.open_count || ["call_booked", "won", "closed"].includes(lead.status)) return false;
  const sent = new Date(lead.audit_sent_at).getTime();
  return Date.now() - sent >= NUDGE_AFTER_DAYS * 86400000;
};

export const daysSince = (iso) => Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);

export const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";

export const formatDateTime = (iso) =>
  iso
    ? new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
    : "—";
