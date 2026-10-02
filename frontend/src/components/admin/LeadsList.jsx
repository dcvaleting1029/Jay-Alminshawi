import React from "react";
import { STATUS_LABELS, formatDate } from "./adminApi";

export const StatusBadge = ({ status }) => {
  const sent = ["sent", "call_booked", "won"].includes(status);
  return (
    <span
      data-testid="lead-status-badge"
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono-grotesk text-[9.5px] tracking-[0.2em] uppercase whitespace-nowrap ${
        sent ? "border-white/30 text-white" : status === "closed" ? "border-white/10 text-white/35" : "border-white/15 text-white/60"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${status === "new" ? "bg-emerald-400" : sent ? "bg-white" : "bg-white/30"}`} />
      {STATUS_LABELS[status] || status}
    </span>
  );
};

export const LeadsList = ({ leads, selectedId, onSelect, filter, setFilter }) => {
  const filtered = leads.filter((l) => {
    if (filter === "all") return true;
    if (filter === "new") return l.status === "new" || l.status === "reviewing";
    return l.status === filter;
  });

  return (
    <div data-testid="leads-list" className="rounded-2xl border border-white/[0.08] bg-white/[0.015] overflow-hidden">
      <div className="flex items-center gap-1 px-3 py-3 border-b border-white/[0.08] overflow-x-auto scrollbar-hide">
        {[["all", "All"], ["new", "To review"], ["sent", "Sent"], ["call_booked", "Calls"], ["won", "Won"], ["closed", "Closed"]].map(([k, label]) => (
          <button
            key={k}
            data-testid={`leads-filter-${k}`}
            onClick={() => setFilter(k)}
            className={`shrink-0 rounded-full px-3.5 h-8 font-mono-grotesk text-[10px] tracking-[0.2em] uppercase transition-colors ${
              filter === k ? "bg-white text-black" : "text-white/50 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p data-testid="leads-empty" className="px-5 py-14 text-center text-[14px] text-white/40">No leads here yet.</p>
      ) : (
        <ul className="divide-y divide-white/[0.06] max-h-[70vh] overflow-y-auto">
          {filtered.map((l) => (
            <li key={l.id}>
              <button
                data-testid={`lead-row-${l.id}`}
                onClick={() => onSelect(l.id)}
                className={`w-full text-left px-5 py-4 transition-colors ${
                  selectedId === l.id ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-heading text-[15px] text-white truncate">{l.company}</p>
                    <p className="mt-0.5 text-[13px] text-white/50 truncate">{l.first_name} · {l.website}</p>
                  </div>
                  <StatusBadge status={l.status} />
                </div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono-grotesk text-[10px] tracking-[0.16em] uppercase text-white/35">
                  <span>{l.project_value}</span>
                  <span>Invest {l.investment}</span>
                  <span>{formatDate(l.created_at)}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LeadsList;
