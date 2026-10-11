"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const inputStyle = "h-12 w-full rounded-lg border border-[#dce5de] bg-white px-4 text-[16px] text-[#202b23] outline-none transition-all duration-200 placeholder:text-[15px] placeholder:text-[#86938a] focus:border-[#008a45] focus:ring-[3px] focus:ring-[#008a45]/10 disabled:opacity-60";
const labelStyle = "mb-2 block text-[15px] font-semibold text-[#202b23] sm:text-[16px]";
const socialStyle = "flex h-12 w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#dce5de] bg-white px-2 text-[13px] font-semibold text-[#202b23] transition-all duration-200 hover:border-[#008a45] hover:bg-[#f0f7f2] disabled:cursor-not-allowed disabled:opacity-60";

function SocialIcon({ provider }) {
  if (provider === "github") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" className="shrink-0">
        <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.011-1.04-.016-2.042-3.338.725-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.303-5.467-1.333-5.467-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.301 1.23A11.53 11.53 0 0 1 12 6.85c1.018.005 2.044.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.605-.014 2.898-.014 3.293 0 .319.216.694.825.576C20.565 21.796 24 17.3 24 12 24 5.373 18.627 0 12 0z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true" className="shrink-0">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 5.38 6.51 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6C44.4 38.03 46.98 31.89 46.98 24.55z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.75-4.59l-7.98-6.2C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function getSafeRedirect(value) {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return "/";
  if (/^\/(signin|signup)(\/|[?#]|$)/i.test(value)) return "/";
  return value;
}

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = getSafeRedirect(searchParams.get("callbackURL"));
  const signInUrl = redirectPath === "/" ? "/signin" : `/signin?callbackURL=${encodeURIComponent(redirectPath)}`;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(null);

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (name.length < 2) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading("email");

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password: form.password,
      });

      if (error) {
        toast.error(error.status >= 500 ? "Server error. Please check the database connection." : error.message || "Unable to create your account.");
        return;
      }

      toast.success("Account created successfully! Please sign in.");
      router.replace(signInUrl);
    } catch {
      toast.error("Unable to connect to the authentication server.");
    } finally {
      setLoading(null);
    }
  };

  const handleSocialLogin = async (provider) => {
    if (loading) return;

    setLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: redirectPath,
      });

      if (error) {
        toast.error(error.message || "Social authentication failed.");
      }
    } catch {
      toast.error("Unable to connect to the authentication server.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="flex-1 bg-[#f0f5f1] px-4 pt-10 pb-20 sm:pt-12">
      <div className="mx-auto w-full max-w-[480px]">
        <div className="mb-7 text-center">
          <h1 className="text-[30px] font-bold tracking-[-0.7px] text-[#202b23]">Create Account</h1>
          <p className="mt-2 text-[14px] leading-relaxed text-[#68756d]">Join Bazar Dor to explore daily market prices and track price changes.</p>
        </div>

        <div className="rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] p-5 shadow-[0_8px_30px_rgba(35,65,44,0.035)] sm:p-[30px]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="signup-name" className={labelStyle}>Full Name</label>
              <input id="signup-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Enter your full name" autoComplete="name" minLength={2} maxLength={100} required disabled={!!loading} className={inputStyle} />
            </div>

            <div>
              <label htmlFor="signup-email" className={labelStyle}>Email Address</label>
              <input id="signup-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email address" autoComplete="email" autoCapitalize="none" spellCheck={false} required disabled={!!loading} className={inputStyle} />
            </div>

            <div>
              <label htmlFor="signup-password" className={labelStyle}>Password</label>
              <input id="signup-password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Create a password" autoComplete="new-password" minLength={8} maxLength={128} required disabled={!!loading} className={inputStyle} />
            </div>

            <div>
              <label htmlFor="signup-confirm" className={labelStyle}>Confirm Password</label>
              <input id="signup-confirm" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" autoComplete="new-password" required disabled={!!loading} className={inputStyle} />
            </div>

            <button type="submit" disabled={!!loading} className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#008a45] text-[15px] font-semibold text-white shadow-[0_4px_12px_rgba(0,138,69,0.15)] transition-all duration-200 hover:bg-[#00783b] disabled:cursor-not-allowed disabled:opacity-60">
              {loading === "email" ? <><LoaderCircle size={18} className="animate-spin" /> Creating Account...</> : "Create Account"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-[#dfe7e1]" />
            <span className="text-[11px] font-medium whitespace-nowrap text-[#829087]">OR CONTINUE WITH</span>
            <span className="h-px flex-1 bg-[#dfe7e1]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["google", "github"].map((provider) => (
              <button key={provider} type="button" disabled={!!loading} onClick={() => handleSocialLogin(provider)} className={socialStyle}>
                {loading === provider ? <LoaderCircle size={18} className="animate-spin" /> : <SocialIcon provider={provider} />}
                <span className="sm:hidden">{provider === "google" ? "Google" : "GitHub"}</span>
                <span className="hidden whitespace-nowrap sm:inline">{provider === "google" ? "Continue with Google" : "Continue with GitHub"}</span>
              </button>
            ))}
          </div>

          <p className="mt-6 border-t border-[#edf1ed] pt-5 text-center text-[14px] text-[#68756d]">
            Already have an account?{" "}
            <Link href={signInUrl} className="font-semibold text-[#008a45] hover:underline">Sign In</Link>
          </p>
        </div>

        <div className="mt-7 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[13px] font-medium text-[#7a887f] transition-colors hover:text-[#008a45]">
            <ArrowLeft size={15} /> Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<main className="min-h-[450px] flex-1 bg-[#f0f5f1]" />}>
      <SignUpForm />
    </Suspense>
  );
}