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

export const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";
