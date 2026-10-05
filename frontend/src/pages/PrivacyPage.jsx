import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { HomeNav as Navbar } from "@/components/home/HomeNav";
import { HomeFooter as Footer } from "@/components/home/ContactFooter";

const PAGE_TITLE = "Privacy Policy | Jay Alminshawi";
const LAST_UPDATED = "June 2026";

const SECTIONS = [
  {
    title: "Who I am",
    body: [
      "I'm Jay Alminshawi, a UK-based web designer and developer trading as a sole trader. This website (jayalminshawi.com) and the pages linked from it are operated by me. For anything related to your data, you can contact me at contact@jayalminshawi.com.",
    ],
  },
  {
    title: "What information I collect",
    body: [
      "When you request a website audit, book a call or get in touch, I may collect your name, company name, website address, business email, phone number and the answers you give about your business — for example your objectives, how you currently generate enquiries, typical project values, timelines and investment level.",
      "Basic technical information such as the campaign or link that brought you to the site (UTM parameters) may also be recorded so I can understand where enquiries come from.",
    ],
  },
  {
    title: "How I use it",
    body: [
      "Your details are used to personally review your website, prepare and send your audit, and to contact you about it. If you book a call, your details are used to schedule and prepare for that call.",
      "I may also use your information to follow up about services you've shown interest in. I will never sell, rent or share your data with third parties for their own marketing.",
    ],
  },
  {
    title: "Legal basis",
    body: [
      "I rely on your consent (given when you tick the box on the audit form or book a call) and my legitimate interest in responding to enquiries about my services. You can withdraw consent at any time by emailing me.",
    ],
  },
  {
    title: "Third-party services",
    body: [
      "Call bookings are handled by Calendly, and emails are delivered using a transactional email provider. Each operates under its own privacy policy. Form submissions are stored securely in a database managed by my hosting provider.",
    ],
  },
  {
    title: "How long I keep it",
    body: [
      "Audit requests and enquiries are kept for up to 24 months so I can follow up and refer back to our conversation, unless you ask me to delete them sooner. If we go on to work together, project information is kept for as long as needed to deliver and support your website and meet legal obligations.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "Under UK GDPR you have the right to access the personal data I hold about you, to have it corrected or deleted, to restrict or object to its use, and to receive a copy of it. To exercise any of these rights, email contact@jayalminshawi.com and I'll respond within 30 days. You also have the right to complain to the Information Commissioner's Office (ico.org.uk).",
    ],
  },
  {
    title: "Cookies",
    body: [
      "This site does not use advertising or tracking cookies. Embedded third-party tools (such as Calendly) may set their own cookies when you interact with them.",
    ],
  },
];

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const prev = document.title;
    document.title = PAGE_TITLE;
    return () => { document.title = prev; };
  }, []);

  return (
    <main data-testid="privacy-page" className="relative bg-[#09090b] text-white font-jakarta antialiased">
      <Navbar />
      <section className="relative pt-32 sm:pt-40 lg:pt-44 pb-20 sm:pb-28">
        <div className="absolute inset-0 vertical-panels opacity-60 pointer-events-none" />
        <div className="relative mx-auto w-full px-[5vw]">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <p className="font-heading text-[11px] tracking-widest uppercase text-white/45 mb-6">
                <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
                Legal
              </p>
              <h1 className="font-title font-medium text-white leading-[1.1] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
                Privacy<br />Policy.
              </h1>
              <p className="mt-6 text-[15px] sm:text-base text-white/55 leading-relaxed max-w-md">
                A plain-English summary of what I collect when you get in touch, why I collect it and how you can control it.
              </p>
              <p className="mt-8 font-mono-grotesk text-[10.5px] tracking-widest uppercase text-white/35">
                Last updated — {LAST_UPDATED}
              </p>
            </motion.div>

            <div className="lg:col-span-7 lg:pt-2">
              {SECTIONS.map((s, i) => (
                <motion.article
                  key={s.title}
                  data-testid={`privacy-section-${i + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="grid sm:grid-cols-12 gap-3 sm:gap-8 border-t border-white/[0.08] py-8 sm:py-10"
                >
                  <p className="sm:col-span-1 font-mono-grotesk text-[10.5px] tracking-widest text-white/35 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div className="sm:col-span-11">
                    <h2 className="font-heading text-lg sm:text-xl text-white tracking-tight mb-4">{s.title}</h2>
                    <div className="space-y-4">
                      {s.body.map((p, j) => (
                        <p key={j} className="text-[14.5px] sm:text-[15px] text-white/60 leading-relaxed">{p}</p>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default PrivacyPage;
