import React, { useCallback, useMemo, useState } from "react";
import axios from "axios";
import { Lock, RefreshCw, Phone, ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const ADMIN_PASSCODE = "jay2026"; // basic frontend gate; rotate later or back with real auth
const STORAGE_KEY = "jay_admin_unlocked";

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const PasscodeGate = ({ onUnlock }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (code === ADMIN_PASSCODE) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      onUnlock();
    } else {
      setErr("Incorrect passcode.");
    }
  };
  return (
    <div className="min-h-screen grid place-items-center bg-[#050505] px-5">
      <form
        onSubmit={submit}
        data-testid="admin-gate-form"
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-gradient-to-b from-[#0c0c0c] to-[#070707] p-8"
      >
        <div className="grid place-items-center h-12 w-12 rounded-xl border border-white/10 mb-6">
          <Lock size={18} className="text-white/80" />
        </div>
        <h1 className="font-heading text-2xl text-white mb-2">Admin Access</h1>
        <p className="text-sm text-white/55 mb-6">
          Enter your passcode to view contact submissions.
        </p>
        <input
          data-testid="admin-passcode-input"
          type="password"
          autoFocus
          value={code}
          onChange={(e) => { setCode(e.target.value); setErr(""); }}
          placeholder="Passcode"
          className="w-full bg-transparent border-b border-white/15 focus:border-white/60 text-white placeholder-white/30 py-3 px-1 outline-none transition-colors"
        />
        {err && (
          <p data-testid="admin-gate-error" className="mt-3 text-[12px] text-red-400">{err}</p>
        )}
        <button
          data-testid="admin-gate-submit"
          type="submit"
          className="mt-8 w-full rounded-full border border-white/20 bg-white text-black h-11 text-[12px] tracking-[0.22em] uppercase font-medium hover:bg-transparent hover:text-white transition-all duration-300"
        >
          Unlock
        </button>
        <Link
          to="/"
          data-testid="admin-back-home"
          className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-white/45 hover:text-white"
        >
          <ArrowLeft size={12} /> Back to site
        </Link>
      </form>
    </div>
  );
};

const AdminContacts = () => {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(STORAGE_KEY) === "1");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [query, setQuery] = useState("");
  const [loadedOnce, setLoadedOnce] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      const { data } = await axios.get(`${API}/contact`);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr("Failed to load submissions.");
    } finally {
      setLoading(false);
      setLoadedOnce(true);
    }
  }, []);

  // Trigger initial load once the gate is unlocked.
  if (unlocked && !loadedOnce && !loading) {
    // Fire-and-forget; subsequent state updates re-render normally.
    fetchItems();
  }

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((c) =>
      [c.name, c.phone, c.company, c.project_type, c.message]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [items, query]);

  if (!unlocked) return <PasscodeGate onUnlock={() => setUnlocked(true)} />;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="border-b border-white/[0.06] sticky top-0 z-30 backdrop-blur-xl bg-black/55">
        <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              data-testid="admin-back-link"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-white/55 hover:text-white"
            >
              <ArrowLeft size={12} /> Site
            </Link>
            <span className="h-4 w-px bg-white/10" />
            <h1 className="font-heading text-[13px] tracking-[0.26em] uppercase text-white/90">
              Admin · Contact Submissions
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              data-testid="admin-refresh"
              onClick={fetchItems}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 h-9 text-[11px] tracking-[0.22em] uppercase text-white hover:bg-white hover:text-black transition-all"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button
              data-testid="admin-logout"
              onClick={() => { sessionStorage.removeItem(STORAGE_KEY); setUnlocked(false); }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 h-9 text-[11px] tracking-[0.22em] uppercase text-white/70 hover:text-white"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="font-mono-grotesk text-[10.5px] tracking-[0.28em] uppercase text-white/40 mb-2">
              {items.length} submission{items.length === 1 ? "" : "s"}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight">
              Inbox
            </h2>
          </div>
          <label className="relative inline-flex items-center w-full sm:w-80">
            <Search size={14} className="absolute left-4 text-white/40" />
            <input
              data-testid="admin-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, phone, message…"
              className="w-full rounded-full bg-white/[0.03] border border-white/10 pl-10 pr-4 h-10 text-[13px] text-white placeholder-white/30 focus:border-white/40 outline-none"
            />
          </label>
        </div>

        {err && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-300">
            {err}
          </div>
        )}

        {loading && items.length === 0 ? (
          <div data-testid="admin-loading" className="text-white/50 py-10">Loading…</div>
        ) : filtered.length === 0 ? (
          <div data-testid="admin-empty" className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-10 text-center text-white/55">
            {items.length === 0
              ? "No submissions yet — share your portfolio to start collecting enquiries."
              : "No submissions match your search."}
          </div>
        ) : (
          <div data-testid="admin-list" className="space-y-3">
            {filtered.map((c) => (
              <article
                key={c.id}
                data-testid={`admin-row-${c.id}`}
                className="rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#0c0c0c] to-[#070707] p-5 sm:p-6 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-heading text-lg font-semibold text-white truncate">
                        {c.name}
                      </h3>
                      {c.company && (
                        <span className="font-mono-grotesk text-[10.5px] tracking-[0.22em] uppercase text-white/45">
                          @ {c.company}
                        </span>
                      )}
                    </div>
                    <a
                      href={`tel:${c.phone}`}
                      className="inline-flex items-center gap-2 text-[13px] text-white/65 hover:text-white"
                    >
                      <Phone size={12} /> {c.phone}
                    </a>
                  </div>
                  <div className="text-right shrink-0">
                    {c.project_type && (
                      <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-3 h-7 text-[10.5px] tracking-[0.22em] uppercase text-white/75 mb-2">
                        {c.project_type}
                      </span>
                    )}
                    <p className="font-mono-grotesk text-[10.5px] tracking-[0.22em] uppercase text-white/40">
                      {formatDate(c.created_at)}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-[14px] text-white/70 leading-relaxed whitespace-pre-wrap">
                  {c.message}
                </p>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminContacts;
