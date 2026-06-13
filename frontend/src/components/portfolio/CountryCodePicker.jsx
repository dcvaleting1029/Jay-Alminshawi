import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { COUNTRIES } from "../../data/countries";

/**
 * CountryCodePicker — dark, sleek combobox showing flag + dial code.
 * Props:
 *  - value: ISO 3166-1 alpha-2 code (e.g. "GB")
 *  - onChange(code, country): callback when user picks a country
 *  - testId: data-testid prefix
 */
export const CountryCodePicker = ({ value, onChange, testId = "country-picker" }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const selected = useMemo(
    () => COUNTRIES.find((c) => c.code === value) || COUNTRIES[0],
    [value]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.dial.includes(q)
    );
  }, [query]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Focus search input when opening
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  const toggle = () => {
    setOpen((v) => {
      const next = !v;
      if (!next) setQuery("");
      return next;
    });
  };

  const handleSelect = (code, c) => {
    onChange?.(code, c);
    setQuery("");
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        data-testid={`${testId}-toggle`}
        onClick={toggle}
        className="h-[42px] inline-flex items-center gap-2 pr-2 pl-1 border-b border-white/15 hover:border-white/40 focus:border-white/60 text-white text-[15px] outline-none transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-xl leading-none">{selected.flag}</span>
        <span className="font-mono-grotesk text-[13px] text-white/85 tabular-nums">
          {selected.dial}
        </span>
        <ChevronDown
          size={14}
          className={`text-white/40 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          data-testid={`${testId}-menu`}
          className="absolute z-30 left-0 mt-2 w-[300px] rounded-xl border border-white/10 bg-[#0b0b0b] shadow-2xl overflow-hidden"
        >
          {/* Search */}
          <div className="relative border-b border-white/[0.07] p-2.5">
            <Search size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              ref={inputRef}
              data-testid={`${testId}-search`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code"
              className="w-full bg-transparent border border-white/10 rounded-md pl-9 pr-3 h-9 text-[13px] text-white placeholder-white/30 outline-none focus:border-white/30"
            />
          </div>
          {/* List */}
          <ul
            data-testid={`${testId}-list`}
            role="listbox"
            className="max-h-64 overflow-y-auto py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-6 text-center text-[13px] text-white/40">
                No matches
              </li>
            ) : (
              filtered.map((c) => {
                const isSel = c.code === selected.code;
                return (
                  <li key={c.code}>
                    <button
                      type="button"
                      data-testid={`${testId}-option-${c.code}`}
                      onClick={() => handleSelect(c.code, c)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-[13px] text-left transition-colors ${
                        isSel
                          ? "bg-white/[0.06] text-white"
                          : "text-white/75 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      <span className="text-lg leading-none">{c.flag}</span>
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="font-mono-grotesk text-white/55 tabular-nums">
                        {c.dial}
                      </span>
                      {isSel && <Check size={13} className="text-white/70 ml-1" />}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountryCodePicker;
