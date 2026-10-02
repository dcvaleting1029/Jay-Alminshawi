import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const AuditTopbar = () => (
  <header
    data-testid="audit-topbar"
    className="relative z-20 mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between"
  >
    <Link
      to="/"
      data-testid="audit-brand"
      className="font-heading text-[11px] sm:text-[13px] tracking-[0.28em] uppercase text-white/90 hover:text-white transition"
    >
      Jay Alminshawi
    </Link>
    <Link
      to="/"
      data-testid="audit-back-to-website"
      className="group inline-flex items-center gap-2 font-mono-grotesk text-[10.5px] sm:text-[11px] tracking-[0.24em] uppercase text-white/40 hover:text-white transition-colors"
    >
      <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
      <span className="hidden sm:inline">Back to website</span>
      <span className="sm:hidden">Back</span>
    </Link>
  </header>
);

export const AuditFooter = () => (
  <footer
    data-testid="audit-footer"
    className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12 py-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono-grotesk text-[10.5px] tracking-[0.28em] uppercase text-white/35"
  >
    <p>© 2025 Jay Alminshawi — All Rights Reserved</p>
    <p>Modern Web Design — UK-Wide</p>
  </footer>
);
