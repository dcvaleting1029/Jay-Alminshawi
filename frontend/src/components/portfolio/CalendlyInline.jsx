import React, { useEffect, useRef } from "react";

export const CALENDLY_URL =
  "https://calendly.com/contact-jayalminshawi/30min?background_color=1a1a1a&text_color=ffffff&primary_color=ffffff";
const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

export const CalendlyInline = ({ url = CALENDLY_URL, height = 720, className = "", testId = "calendly-inline", onScheduled }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!onScheduled) return;
    const handler = (e) => {
      if (!/https:\/\/([a-z0-9-]+\.)?calendly\.com$/.test(e.origin)) return;
      if (e.data?.event === "calendly.event_scheduled") {
        onScheduled({
          event_uri: e.data.payload?.event?.uri || null,
          invitee_uri: e.data.payload?.invitee?.uri || null,
        });
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onScheduled]);

  useEffect(() => {
    let cancelled = false;
    const mount = () => {
      const node = containerRef.current;
      if (cancelled || !node || !window.Calendly?.initInlineWidget) return;
      node.innerHTML = "";
      window.Calendly.initInlineWidget({ url, parentElement: node });
    };

    const existing = document.querySelector(`script[src="${CALENDLY_SCRIPT}"]`);
    if (window.Calendly?.initInlineWidget) {
      mount();
    } else if (existing) {
      existing.addEventListener("load", mount, { once: true });
    } else {
      const s = document.createElement("script");
      s.src = CALENDLY_SCRIPT;
      s.async = true;
      s.addEventListener("load", mount, { once: true });
      document.body.appendChild(s);
    }
    return () => { cancelled = true; };
  }, [url]);

  return (
    <div
      ref={containerRef}
      data-testid={testId}
      style={{ minWidth: 320, height }}
      className={`w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[#1a1a1a] ${className}`}
    />
  );
};

export default CalendlyInline;
