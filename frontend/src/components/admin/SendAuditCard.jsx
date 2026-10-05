import React, { useState } from "react";
import { Loader2, ExternalLink, Send, Check, Eye, EyeOff, BellRing, Mail } from "lucide-react";
import { toast } from "sonner";
import { Label, TextInput, FieldError } from "@/components/audit/FormPrimitives";
import { adminFetch, formatDate, formatDateTime, needsFollowUp, daysSince } from "./adminApi";

const defaultNote = (lead) =>
  `Hi ${lead.first_name}, I've spent some time going through ${lead.website} and recorded my thoughts. There are a few quick wins that could make a real difference to the number of enquiries you're getting — I walk through all of them in the video.`;

export const SendAuditCard = ({ lead, onUpdated }) => {
  const [videoUrl, setVideoUrl] = useState(lead.video_url || "");
  const [note, setNote] = useState(lead.personal_note || defaultNote(lead));
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const viewUrl = lead.view_token ? `${window.location.origin}/audit/view/${lead.view_token}?preview=1` : null;
  const nudge = needsFollowUp(lead);
  const [nudging, setNudging] = useState(false);

  const sendNudge = async () => {
    setNudging(true);
    try {
      const updated = await adminFetch(`/audit-leads/${lead.id}/nudge`, { method: "POST" });
      onUpdated(updated);
      toast.success(`Nudge email sent to ${lead.email}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setNudging(false);
    }
  };

  const send = async () => {
    setError("");
    if (!/^https:\/\/(www\.)?loom\.com\/(share|embed)\/[a-f0-9]{32}/i.test(videoUrl.trim())) {
      return setError("Paste a Loom share link, e.g. https://www.loom.com/share/…");
    }
    if (!note.trim()) return setError("Add a short personal note.");
    setSending(true);
    try {
      const updated = await adminFetch(`/audit-leads/${lead.id}/send-audit`, {
        method: "POST",
        body: { video_url: videoUrl.trim(), personal_note: note.trim() },
      });
      onUpdated(updated);
      toast.success(`Audit sent to ${lead.email}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div data-testid="send-audit-card" className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/55">
          {lead.delivery_sent ? "Audit Delivered" : "Send Audit"}
        </p>
        {lead.delivery_sent && (
          <span className="inline-flex items-center gap-1.5 font-mono-grotesk text-[10px] tracking-[0.2em] uppercase text-white/50">
            <Check size={11} /> Sent {formatDate(lead.audit_sent_at)}
          </span>
        )}
      </div>

      {lead.delivery_sent && (
        <div
          data-testid="audit-opened-status"
          className={`mb-6 flex items-center gap-3 rounded-xl border px-4 py-3 ${
            lead.open_count
              ? "border-emerald-400/30 bg-emerald-400/[0.05]"
              : nudge
                ? "border-amber-400/30 bg-amber-400/[0.05]"
                : "border-white/[0.08] bg-white/[0.02]"
          }`}
        >
          <span className={`grid place-items-center h-7 w-7 rounded-full ${
            lead.open_count ? "bg-emerald-400 text-black" : nudge ? "bg-amber-400 text-black" : "border border-white/15 text-white/40"
          }`}>
            {lead.open_count ? <Eye size={13} /> : nudge ? <BellRing size={13} /> : <EyeOff size={13} />}
          </span>
          <div className="min-w-0">
            <p className="font-heading text-[13.5px] text-white leading-tight">
              {lead.open_count
                ? `Opened ${lead.open_count === 1 ? "once" : `${lead.open_count} times`} — first on ${formatDateTime(lead.first_opened_at)}`
                : nudge
                  ? `Follow up — sent ${daysSince(lead.audit_sent_at)} days ago, still unopened`
                  : "Not opened yet"}
            </p>
            <p className="mt-0.5 text-[12px] text-white/45">
              {lead.open_count
                ? `Last viewed ${formatDateTime(lead.last_opened_at)}. Good moment to follow up.`
                : nudge
                  ? `A quick call or WhatsApp to ${lead.first_name} might be all it takes.`
                  : "You'll see it here the moment they open their audit page."}
            </p>
          </div>
          {nudge && (
            <div className="ml-auto shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button
                type="button"
                data-testid="follow-up-email-btn"
                onClick={sendNudge}
                disabled={nudging}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-amber-400 px-3.5 h-8 font-mono-grotesk text-[9.5px] tracking-[0.2em] uppercase text-black hover:bg-white transition-colors disabled:opacity-60 disabled:pointer-events-none"
              >
                {nudging ? <Loader2 size={11} className="animate-spin" /> : <Mail size={11} />}
                {lead.nudge_count ? `Nudge again (${lead.nudge_count})` : "Send nudge email"}
              </button>
              <a
                href={`https://wa.me/${lead.phone.replace(/\D/g, "").replace(/^0/, "44")}?text=${encodeURIComponent(`Hi ${lead.first_name}, Jay here — I sent over your personalised website audit for ${lead.website} a few days ago. Did it land OK? Happy to resend if not.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="follow-up-whatsapp"
                className="inline-flex items-center justify-center rounded-full border border-amber-400/40 px-3.5 h-8 font-mono-grotesk text-[9.5px] tracking-[0.2em] uppercase text-amber-300 hover:bg-amber-400 hover:text-black transition-colors"
              >
                WhatsApp
              </a>
            </div>
          )}
        </div>
      )}
      {lead.last_nudged_at && !lead.open_count && (
        <p data-testid="last-nudged" className="-mt-3 mb-6 font-mono-grotesk text-[10px] tracking-[0.2em] uppercase text-white/35">
          Last nudge email sent {formatDateTime(lead.last_nudged_at)}{lead.auto_nudged_at ? " · automatic" : ""}
        </p>
      )}
      {lead.call_booked_at && (
        <p data-testid="call-booked-info" className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 h-8 font-mono-grotesk text-[10px] tracking-[0.2em] uppercase text-white">
          <Check size={11} /> Call booked via Calendly · {formatDateTime(lead.call_booked_at)}
        </p>
      )}

      <div className="space-y-6">
        <div>
          <Label htmlFor="loom-url">Loom share link</Label>
          <TextInput id="loom-url" testId="send-audit-video-input" placeholder="https://www.loom.com/share/…" value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="personal-note">Personal note</Label>
          <textarea
            id="personal-note"
            data-testid="send-audit-note-input"
            rows={5}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-[14.5px] text-white placeholder:text-white/25 outline-none focus:border-white/40 transition-colors leading-relaxed"
          />
        </div>
      </div>
      <FieldError testId="send-audit-error">{error}</FieldError>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
        <button
          type="button"
          data-testid="send-audit-btn"
          onClick={send}
          disabled={sending}
          className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white text-black px-6 h-11 text-[11.5px] tracking-[0.22em] uppercase font-medium hover:bg-transparent hover:text-white transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none"
        >
          {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          {lead.delivery_sent ? "Resend Audit" : "Send Audit to Lead"}
        </button>
        {viewUrl && (
          <a
            href={viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="send-audit-view-link"
            className="inline-flex items-center gap-2 font-mono-grotesk text-[10.5px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
          >
            Preview audit page <ExternalLink size={12} />
          </a>
        )}
      </div>
      <p className="mt-4 text-[12px] text-white/35 leading-relaxed">
        Emails {lead.email} a branded link to a private page on your site that embeds the Loom video, your note, a 5-star Google rating and the brands you&apos;ve worked with.
      </p>
    </div>
  );
};

export default SendAuditCard;
