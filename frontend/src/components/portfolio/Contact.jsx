import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { CountryCodePicker } from "./CountryCodePicker";
import { COUNTRIES, DEFAULT_COUNTRY_CODE } from "../../data/countries";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const PROJECT_TYPES = [
  "Website Design",
  "Webflow Development",
  "Brand Identity",
  "E-commerce",
  "SEO / Maintenance",
  "Other",
];

export const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    nationalPhone: "",
    countryCode: DEFAULT_COUNTRY_CODE,
    company: "",
    project_type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === form.countryCode) || COUNTRIES[0],
    [form.countryCode]
  );

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.nationalPhone || !form.message) {
      toast.error("Please fill in name, phone and message.");
      return;
    }
    // Compose E.164: dial code + national digits only
    const digits = form.nationalPhone.replace(/[^\d]/g, "").replace(/^0+/, "");
    const fullPhone = `${country.dial}${digits}`;

    const payload = {
      name: form.name,
      phone: fullPhone,
      company: form.company,
      project_type: form.project_type,
      message: form.message,
    };

    setLoading(true);
    try {
      await axios.post(`${API}/contact`, payload);
      setSent(true);
      toast.success("Message sent — I'll be in touch soon.");
      setForm({
        name: "",
        nationalPhone: "",
        countryCode: DEFAULT_COUNTRY_CODE,
        company: "",
        project_type: "",
        message: "",
      });
    } catch (err) {
      const data = err?.response?.data?.detail;
      let msg = "Something went wrong. Please try again.";
      if (typeof data === "string") {
        msg = data;
      } else if (Array.isArray(data) && data[0]?.msg) {
        msg = data[0].msg.replace(/^Value error,\s*/i, "");
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-transparent border-b border-white/15 focus:border-white/60 text-white placeholder-white/30 py-3 px-1 text-[15px] outline-none transition-colors";

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-24 sm:py-32 bg-[#050505] border-t border-white/[0.05]"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Heading */}
          <div className="lg:col-span-5">
            <p className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5">
              <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
              Get In Touch
            </p>
            <h2 className="font-display uppercase text-white leading-[0.9] tracking-tight text-5xl sm:text-6xl lg:text-7xl">
              Build Your <br /> Website.
            </h2>
            <p className="mt-7 text-[15px] sm:text-base text-white/55 max-w-md leading-relaxed">
              Tell me about your brand, project, and goals. I&apos;ll reply
              with ideas, scope, and next steps within 24 hours.
            </p>

            <div className="mt-12 space-y-3 font-mono-grotesk text-[12px] tracking-[0.2em] uppercase text-white/45">
              <p><span className="text-white/30 mr-3">EMAIL</span> jayalminshawi@gmail.com</p>
              <p><span className="text-white/30 mr-3">BASED</span> Edinburgh, UK</p>
              <p><span className="text-white/30 mr-3">AVAILABILITY</span> Open for Q1 2026</p>
            </div>
          </div>

          {/* Form */}
          <motion.form
            data-testid="contact-form"
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0c0c0c] to-[#070707] p-7 sm:p-10"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <label className="block">
                <span className="font-mono-grotesk text-[10.5px] tracking-[0.26em] uppercase text-white/40">Name *</span>
                <input
                  data-testid="contact-name"
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your full name"
                  className={inputClasses}
                  required
                />
              </label>
              <label className="block">
                <span className="font-mono-grotesk text-[10.5px] tracking-[0.26em] uppercase text-white/40">Phone *</span>
                <div className="flex items-end gap-3">
                  <CountryCodePicker
                    value={form.countryCode}
                    onChange={(code) => setForm((f) => ({ ...f, countryCode: code }))}
                    testId="contact-country"
                  />
                  <input
                    data-testid="contact-phone"
                    type="tel"
                    inputMode="tel"
                    value={form.nationalPhone}
                    onChange={update("nationalPhone")}
                    placeholder="7700 900000"
                    className={`${inputClasses} flex-1`}
                    required
                  />
                </div>
              </label>
              <label className="block">
                <span className="font-mono-grotesk text-[10.5px] tracking-[0.26em] uppercase text-white/40">Company</span>
                <input
                  data-testid="contact-company"
                  type="text"
                  value={form.company}
                  onChange={update("company")}
                  placeholder="Brand / company name"
                  className={inputClasses}
                />
              </label>
              <label className="block">
                <span className="font-mono-grotesk text-[10.5px] tracking-[0.26em] uppercase text-white/40">Project Type</span>
                <select
                  data-testid="contact-project-type"
                  value={form.project_type}
                  onChange={update("project_type")}
                  className={`${inputClasses} appearance-none bg-[#0a0a0a]`}
                >
                  <option value="" className="bg-[#0a0a0a]">Select project type</option>
                  {PROJECT_TYPES.map((p) => (
                    <option key={p} value={p} className="bg-[#0a0a0a]">{p}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block mt-6">
              <span className="font-mono-grotesk text-[10.5px] tracking-[0.26em] uppercase text-white/40">Message *</span>
              <textarea
                data-testid="contact-message"
                value={form.message}
                onChange={update("message")}
                placeholder="Tell me about your project, goals and timeline…"
                rows={5}
                className={`${inputClasses} resize-none`}
                required
              />
            </label>

            <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
              <p className="font-mono-grotesk text-[10.5px] tracking-[0.26em] uppercase text-white/30">
                * Required fields
              </p>
              <button
                data-testid="contact-submit"
                type="submit"
                disabled={loading}
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white text-black px-7 h-12 text-[12px] tracking-[0.22em] uppercase font-medium hover:bg-transparent hover:text-white disabled:opacity-60 transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Sending
                  </>
                ) : sent ? (
                  <>
                    <Check size={14} /> Sent
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
