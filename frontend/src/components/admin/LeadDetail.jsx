import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, Globe } from "lucide-react";
import { toast } from "sonner";
import { adminFetch, STATUS_LABELS, formatDate } from "./adminApi";
import { StatusBadge } from "./LeadsList";
import { SendAuditCard } from "./SendAuditCard";

const Row = ({ label, value }) => (
  <div className="grid sm:grid-cols-12 gap-1 sm:gap-6 py-3.5 border-b border-white/[0.06]">
    <dt className="sm:col-span-4 font-mono-grotesk text-[10px] tracking-[0.24em] uppercase text-white/35 pt-0.5">{label}</dt>
    <dd className="sm:col-span-8 text-[14px] text-white/80 leading-relaxed">
      {Array.isArray(value) ? value.join(", ") : value || "—"}
    </dd>
  </div>
);

const withOther = (v, other) => (other ? `${v} — ${other}` : v);

export const LeadDetail = ({ lead, onBack, onUpdated }) => {
  const [notes, setNotes] = useState(lead.notes || "");
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => setNotes(lead.notes || ""), [lead.id, lead.notes]);

  const patch = async (body, okMsg) => {
    try {
      const updated = await adminFetch(`/audit-leads/${lead.id}`, { method: "PATCH", body });
      onUpdated(updated);
      if (okMsg) toast.success(okMsg);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const saveNotes = async () => {
    setSavingNotes(true);
    await patch({ notes }, "Notes saved");
    setSavingNotes(false);
  };

  return (
    <motion.div
      key={lead.id}
      data-testid="lead-detail"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-8"
    >
      <button onClick={onBack} data-testid="lead-detail-back"
        className="lg:hidden inline-flex items-center gap-2 font-mono-grotesk text-[11px] tracking-[0.24em] uppercase text-white/40 hover:text-white transition-colors">
        <ArrowLeft size={13} /> All leads
      </button>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
        <div>
          <p className="font-mono-grotesk text-[10px] tracking-[0.28em] uppercase text-white/35 mb-2">Received {formatDate(lead.created_at)}</p>
          <h2 className="font-display uppercase text-white tracking-tight leading-[0.9] text-3xl sm:text-4xl">{lead.company}</h2>
          <p className="mt-2 text-[15px] text-white/55">{lead.first_name} · {withOther(lead.specialism, lead.specialism_other)}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={lead.status} />
          <select
            data-testid="lead-status-select"
            value={lead.status}
            onChange={(e) => patch({ status: e.target.value }, `Marked as ${STATUS_LABELS[e.target.value]}`)}
            className="h-9 rounded-full border border-white/15 bg-[#0b0b0b] px-3 font-mono-grotesk text-[10px] tracking-[0.2em] uppercase text-white outline-none focus:border-white/40"
          >
            {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
        <a href={`mailto:${lead.email}`} data-testid="lead-email-link" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Mail size={13} /> {lead.email}</a>
        <a href={`tel:${lead.phone}`} data-testid="lead-phone-link" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Phone size={13} /> {lead.phone}</a>
        <a href={/^https?:/.test(lead.website) ? lead.website : `https://${lead.website}`} target="_blank" rel="noopener noreferrer" data-testid="lead-website-link"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Globe size={13} /> {lead.website}</a>
      </div>

      <SendAuditCard key={`${lead.id}-${lead.audit_sent_at || ""}`} lead={lead} onUpdated={onUpdated} />

      <dl data-testid="lead-answers" className="border-t border-white/[0.08]">
        <Row label="Objectives" value={lead.objectives} />
        <Row label="Lead sources" value={[...(lead.lead_sources || []), ...(lead.lead_sources_other ? [`Other: ${lead.lead_sources_other}`] : [])]} />
        <Row label="Project value" value={lead.project_value} />
        <Row label="Enquiries / month" value={lead.enquiry_volume} />
        <Row label="Investment" value={lead.investment} />
        <Row label="Timeline" value={lead.timeline} />
        <Row label="Decision makers" value={withOther(lead.decision_makers, lead.decision_makers_other)} />
        <Row label="Biggest issue" value={lead.website_issue} />
        <Row label="Traffic source" value={lead.utm ? Object.entries(lead.utm).map(([k, v]) => `${k}=${v}`).join(", ") : "Direct"} />
      </dl>

      <div>
        <p className="font-mono-grotesk text-[10px] tracking-[0.24em] uppercase text-white/35 mb-3">Private notes</p>
        <textarea
          data-testid="lead-notes-input"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Anything worth remembering about this lead…"
          className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-[14px] text-white placeholder:text-white/25 outline-none focus:border-white/40 transition-colors leading-relaxed"
        />
        <button
          data-testid="lead-notes-save"
          onClick={saveNotes}
          disabled={savingNotes || notes === (lead.notes || "")}
          className="mt-3 inline-flex items-center rounded-full border border-white/15 px-5 h-9 font-mono-grotesk text-[10px] tracking-[0.22em] uppercase text-white hover:bg-white hover:text-black transition-all disabled:opacity-40 disabled:pointer-events-none"
        >
          Save notes
        </button>
      </div>
    </motion.div>
  );
};

export default LeadDetail;
