import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { AuditTopbar, AuditFooter } from "@/components/audit/AuditChrome";
import { AuditSocialProof } from "@/components/audit/AuditSocialProof";
import { CalendlyInline } from "@/components/portfolio/CalendlyInline";

const API = process.env.REACT_APP_BACKEND_URL;
const ease = [0.22, 1, 0.36, 1];
const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease } },
};

const NotFound = () => (
  <div className="min-h-[60vh] grid place-items-center px-5 text-center">
    <div>
      <p className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/45 mb-5">Audit not found</p>
      <h1 className="font-display uppercase text-white tracking-tight text-3xl sm:text-4xl mb-6">This link isn&apos;t valid.</h1>
      <p className="text-white/55 text-[15px] max-w-md mx-auto">The audit link may have been copied incorrectly. Reply to Jay&apos;s email and he&apos;ll resend it.</p>
      <Link to="/audit" data-testid="audit-view-request-link" className="mt-8 inline-flex items-center gap-3 text-[12px] tracking-[0.22em] uppercase text-white/70 hover:text-white transition-colors">
        Request a free audit <span className="inline-block w-8 h-px bg-white/40" />
      </Link>
    </div>
  </div>
);

const AuditViewPage = () => {
  const { token } = useParams();
  const [audit, setAudit] = useState(undefined);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Your Personalised Website Audit | Jay Alminshawi";
    let m = document.querySelector('meta[name="robots"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("name", "robots"); document.head.appendChild(m); }
    m.setAttribute("content", "noindex, nofollow");
    const preview = new URLSearchParams(window.location.search).get("preview") === "1";
    fetch(`${API}/api/audit-view/${token}${preview ? "?preview=true" : ""}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setAudit)
      .catch(() => setAudit(null));
    return () => m.setAttribute("content", "index, follow");
  }, [token]);

  return (
    <main data-testid="audit-view-page" className="relative min-h-screen bg-[#050505] text-white">
      <AuditTopbar />
      {audit === undefined ? (
        <div className="min-h-[60vh] grid place-items-center text-white/40"><Loader2 className="animate-spin" /></div>
      ) : audit === null ? (
        <NotFound />
      ) : (
        <>
          <section className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-24">
            <div className="absolute inset-0 vertical-panels opacity-60 pointer-events-none" />
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[1200px] rounded-full bg-white/[0.04] blur-[160px] pointer-events-none" />
            <motion.div
              initial="hidden" animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
              className="relative mx-auto max-w-[1100px] px-5 sm:px-8"
            >
              <motion.p variants={item} className="font-heading text-[11px] sm:text-[12px] tracking-[0.32em] uppercase text-white/55 mb-6">
                <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
                Your Personalised Website Audit
              </motion.p>
              <motion.h1 variants={item} data-testid="audit-view-heading"
                className="font-display uppercase text-white leading-[0.9] tracking-tight text-4xl sm:text-5xl lg:text-6xl text-balance">
                {audit.first_name}, here&apos;s what I found<br className="hidden sm:block" /> on {audit.website}.
              </motion.h1>
              <motion.p variants={item} className="mt-6 text-[15px] sm:text-base text-white/55 max-w-xl leading-relaxed">
                Recorded specifically for {audit.company}. Grab a coffee — it&apos;s worth watching all the way through.
              </motion.p>

              <motion.div variants={item} className="mt-10 sm:mt-14 rounded-[20px] overflow-hidden border border-white/10 bg-black shadow-[0_50px_140px_-40px_rgba(0,0,0,0.9)]">
                <div className="relative aspect-video">
                  <iframe
                    data-testid="audit-view-video"
                    src={audit.embed_url}
                    title="Personalised website audit"
                    allowFullScreen
                    allow="autoplay; fullscreen; picture-in-picture"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </motion.div>

              <motion.blockquote variants={item} data-testid="audit-view-note"
                className="mt-10 sm:mt-14 max-w-2xl border-l border-white/20 pl-6 sm:pl-8 text-[15.5px] sm:text-[17px] text-white/75 leading-relaxed whitespace-pre-line">
                {audit.personal_note}
                <footer className="mt-5 font-mono-grotesk text-[10.5px] tracking-[0.28em] uppercase text-white/40 not-italic">— Jay Alminshawi</footer>
              </motion.blockquote>
            </motion.div>
          </section>

          <AuditSocialProof />

          <section data-testid="audit-view-cta" className="mx-auto max-w-[1100px] px-5 sm:px-8 py-20 sm:py-28">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5">
                  <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
                  Next Step — Optional
                </p>
                <h2 className="font-display uppercase text-white leading-[0.9] tracking-tight text-3xl sm:text-4xl lg:text-5xl">
                  Want to talk<br />it through?
                </h2>
                <p className="mt-6 text-[15px] sm:text-base text-white/55 leading-relaxed max-w-md">
                  If the recommendations resonate, pick a time for a 30-minute call and we&apos;ll map out exactly what a new website could do for {audit.company}. No pressure — the audit is yours to keep either way.
                </p>
              </div>
              <div className="lg:col-span-7">
                <CalendlyInline height={720} testId="audit-view-calendly" />
              </div>
            </div>
          </section>
        </>
      )}
      <AuditFooter />
    </main>
  );
};

export default AuditViewPage;
