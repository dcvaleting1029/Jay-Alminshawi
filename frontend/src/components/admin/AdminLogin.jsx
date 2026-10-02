import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Label, TextInput, FieldError } from "@/components/audit/FormPrimitives";
import { adminFetch, setToken } from "./adminApi";

export const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await adminFetch("/auth/login", { method: "POST", body: { email, password } });
      setToken(data.token);
      onLogin(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] grid place-items-center px-5">
      <motion.form
        onSubmit={submit}
        data-testid="admin-login-form"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px]"
      >
        <p className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/45 mb-5">
          <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
          Private
        </p>
        <h1 className="font-display uppercase text-white leading-[0.9] tracking-tight text-4xl sm:text-5xl mb-10">
          Leads<br />Dashboard.
        </h1>
        <div className="space-y-7">
          <div>
            <Label htmlFor="admin-email">Email</Label>
            <TextInput id="admin-email" testId="admin-email-input" type="email" autoComplete="username" value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="you@company.co.uk" autoFocus />
          </div>
          <div>
            <Label htmlFor="admin-password">Password</Label>
            <TextInput id="admin-password" testId="admin-password-input" type="password" autoComplete="current-password" value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
        </div>
        <FieldError testId="admin-login-error">{error}</FieldError>
        <button
          type="submit"
          data-testid="admin-login-submit"
          disabled={loading || !email || !password}
          className="group mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white text-black h-12 text-[12px] tracking-[0.22em] uppercase font-medium hover:bg-transparent hover:text-white transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : null}
          Sign In
        </button>
      </motion.form>
    </div>
  );
};

export default AdminLogin;
