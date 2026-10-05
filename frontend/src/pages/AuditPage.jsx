import React, { useEffect, useRef } from "react";
import { AuditTopbar, AuditFooter } from "@/components/audit/AuditChrome";
import { AuditHero } from "@/components/audit/AuditHero";
import { AuditSocialProof } from "@/components/audit/AuditSocialProof";
import { AuditFunnel } from "@/components/audit/AuditFunnel";
import { initMetaPixel, trackPixel } from "@/lib/metaPixel";

const PAGE_TITLE = "Free Website Audit for Building Firms | Jay Alminshawi";
const PAGE_DESCRIPTION =
  "A free, personally recorded website audit for UK building firms — renovation, construction, new build, kitchen & bathroom and extension companies. I'll review your design, user experience and enquiry journey and show you what's holding your website back.";

const setMeta = (name, content, attr = "name") => {
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const AuditPage = () => {
  const funnelRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    initMetaPixel();
    trackPixel("PageView");
    const prevTitle = document.title;
    document.title = PAGE_TITLE;
    setMeta("description", PAGE_DESCRIPTION);
    setMeta("og:title", PAGE_TITLE, "property");
    setMeta("og:description", PAGE_DESCRIPTION, "property");
    setMeta("robots", "noindex, nofollow");
    return () => {
      document.title = prevTitle;
      const r = document.querySelector('meta[name="robots"]');
      if (r) r.setAttribute("content", "index, follow");
    };
  }, []);

  const startFunnel = () => {
    funnelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => document.getElementById("first_name")?.focus({ preventScroll: true }), 750);
  };

  return (
    <main data-testid="audit-page" className="relative min-h-screen bg-[#09090b] text-white font-jakarta antialiased">
      <AuditTopbar />
      <AuditHero onStart={startFunnel} />
      <AuditSocialProof />
      <AuditFunnel ref={funnelRef} onSuccess={(lead) => trackPixel("Lead", { content_name: "Website Audit", content_category: lead.company })} />
      <AuditFooter />
    </main>
  );
};

export default AuditPage;
