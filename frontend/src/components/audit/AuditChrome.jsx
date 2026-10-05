import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const AuditTopbar = () => (
  <header
    data-testid="audit-topbar"
    className="relative z-20 mx-auto w-full px-[5vw] h-16 sm:h-[72px] flex items-center justify-between"
  >
    <Link to="/" data-testid="audit-brand" aria-label="Jay Alminshawi — home" className="flex items-center">
      <img src="/ja-logo.png" alt="Jay Alminshawi" className="h-7 sm:h-8 w-auto" />
    </Link>
    <Link
      to="/"
      data-testid="audit-back-to-website"
      className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] h-9 px-4 text-[13px] text-neutral-300 hover:text-white hover:border-white/35 transition-colors"
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
    className="relative mx-auto w-full px-[5vw] py-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px] text-neutral-500"
  >
    <p>© 2025 Jay Alminshawi. All rights reserved.</p>
    <p>Web design &amp; development — UK-wide</p>
  </footer>
);
