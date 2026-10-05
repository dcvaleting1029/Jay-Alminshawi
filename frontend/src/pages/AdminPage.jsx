import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, RefreshCw, Loader2 } from "lucide-react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { LeadsList } from "@/components/admin/LeadsList";
import { LeadDetail } from "@/components/admin/LeadDetail";
import { adminFetch, getToken, clearToken, needsFollowUp } from "@/components/admin/adminApi";

const AdminPage = () => {
  const [authed, setAuthed] = useState(!!getToken());
  const [leads, setLeads] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    document.title = "Leads Dashboard | Jay Alminshawi";
    const onLogout = () => setAuthed(false);
    window.addEventListener("admin-logout", onLogout);
    return () => window.removeEventListener("admin-logout", onLogout);
  }, []);

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      setLeads(await adminFetch("/audit-leads"));
    } catch {
      setLeads([]);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { if (authed) load(); }, [authed, load]);

  const logout = () => { clearToken(); setAuthed(false); setLeads(null); setSelectedId(null); };
  const onUpdated = (updated) => setLeads((ls) => ls.map((l) => (l.id === updated.id ? updated : l)));
  const selected = leads?.find((l) => l.id === selectedId) || null;
  const newCount = leads?.filter((l) => l.status === "new").length ?? 0;
  const followUps = leads?.filter(needsFollowUp).length ?? 0;

  return (
    <main data-testid="admin-page" className="relative min-h-screen bg-[#09090b] text-white font-jakarta antialiased">
      <header className="mx-auto w-full px-[5vw] h-16 sm:h-20 flex items-center justify-between">
        <Link to="/" className="font-heading text-[11px] sm:text-[13px] tracking-widest uppercase text-white/90 hover:text-white transition">
          Jay Alminshawi
        </Link>
        {authed && (
          <div className="flex items-center gap-2">
            <button data-testid="admin-refresh" onClick={load} aria-label="Refresh"
              className="grid place-items-center h-9 w-9 rounded-full border border-white/15 text-white/70 hover:bg-white hover:text-black transition-colors">
              {refreshing ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
            </button>
            <button data-testid="admin-logout" onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 h-9 font-mono-grotesk text-[10px] tracking-wider uppercase text-white/70 hover:bg-white hover:text-black transition-colors">
              <LogOut size={13} /> Sign out
            </button>
          </div>
        )}
      </header>

      {!authed ? (
        <AdminLogin onLogin={() => setAuthed(true)} />
      ) : (
        <section className="mx-auto w-full px-[5vw] pt-8 sm:pt-12 pb-24">
          <div className="flex items-end justify-between gap-6 mb-8 sm:mb-10">
            <div>
              <p className="font-heading text-[11px] tracking-widest uppercase text-white/45 mb-3">
                <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
                Website Audit Requests
              </p>
              <h1 className="font-title font-medium text-white leading-[1.1] tracking-tight text-4xl sm:text-5xl">Leads.</h1>
            </div>
            <p data-testid="admin-lead-count" className="font-mono-grotesk text-[11px] tracking-wider uppercase text-white/40 text-right">
              {leads ? `${leads.length} total · ${newCount} new${followUps ? ` · ${followUps} to follow up` : ""}` : "Loading…"}
            </p>
          </div>

          {leads === null ? (
            <div className="py-24 grid place-items-center text-white/40"><Loader2 className="animate-spin" /></div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div className={`lg:col-span-5 xl:col-span-4 ${selected ? "hidden lg:block" : ""}`}>
                <LeadsList leads={leads} selectedId={selectedId} onSelect={setSelectedId} filter={filter} setFilter={setFilter} />
              </div>
              <div className={`lg:col-span-7 xl:col-span-8 ${selected ? "" : "hidden lg:block"}`}>
                {selected ? (
                  <LeadDetail lead={selected} onBack={() => setSelectedId(null)} onUpdated={onUpdated} />
                ) : (
                  <div data-testid="lead-detail-empty" className="h-full min-h-[320px] grid place-items-center rounded-2xl border border-dashed border-white/[0.08] text-white/35 text-[14px]">
                    Select a lead to review their answers and send their audit.
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default AdminPage;
