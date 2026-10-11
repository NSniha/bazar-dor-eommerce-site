"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

const inputStyle =
  "h-12 w-full rounded-lg border border-[#dce5de] bg-white px-4 text-[16px] text-[#202b23] outline-none transition-all duration-200 placeholder:text-[15px] placeholder:text-[#86938a] focus:border-[#008a45] focus:ring-[3px] focus:ring-[#008a45]/10 disabled:opacity-60";

const labelStyle =
  "mb-2 block text-[15px] font-semibold text-[#202b23] sm:text-[16px]";

const socialStyle =
  "flex h-12 w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#dce5de] bg-white px-2 text-[13px] font-semibold text-[#202b23] transition-all duration-200 hover:border-[#008a45] hover:bg-[#f0f7f2] disabled:cursor-not-allowed disabled:opacity-60";

function SocialIcon({ provider }) {
  if (provider === "github") {
    return (
      <svg
        viewBox="0 0 16 16"
        width="18"
        height="18"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.014 8.014 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        fill="#4285F4"
        d="M21.35 11.1H12v3.8h5.35c-.23 1.22-.92 2.25-1.96 2.94v2.44h3.17c1.85-1.71 2.92-4.23 2.92-7.23 0-.65-.06-1.28-.13-1.95z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.69 0 4.95-.89 6.6-2.42l-3.17-2.44c-.88.59-2.01.94-3.43.94-2.63 0-4.86-1.78-5.66-4.18H3.08v2.5A10 10 0 0 0 12 22z"
      />
      <path
        fill="#FBBC05"
        d="M6.34 13.9a6 6 0 0 1 0-3.8V7.6H3.08a10 10 0 0 0 0 8.8z"
      />
      <path
        fill="#EA4335"
        d="M12 5.92c1.45 0 2.75.5 3.77 1.49l2.82-2.82C16.88 2.99 14.63 2 12 2a10 10 0 0 0-8.92 5.6l3.26 2.5C7.14 7.7 9.37 5.92 12 5.92z"
      />
    </svg>
  );
}

function getSafeRedirect(value) {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return "/profile";
  }

  if (/^\/(signin|signup)(\/|[?#]|$)/i.test(value)) {
    return "/profile";
  }

  return value;
}

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = getSafeRedirect(
    searchParams.get("callbackURL")
  );

  const signInUrl =
    redirectPath === "/profile"
      ? "/signin"
      : `/signin?callbackURL=${encodeURIComponent(redirectPath)}`;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
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

    if (name.length > 100) {
      toast.error("Name cannot exceed 100 characters.");
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

    if (form.password.length > 128) {
      toast.error("Password cannot exceed 128 characters.");
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
        toast.error(
          error.status >= 500
            ? "Server error. Please try again."
            : error.message || "Unable to create your account."
        );

        return;
      }

      toast.success(
        "Account created successfully! Please sign in."
      );

      router.replace(signInUrl);
    } catch {
      toast.error(
        "Unable to connect to the authentication server."
      );
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
        errorCallbackURL: signInUrl,
      });

      if (error) {
        toast.error(
          error.message || "Social authentication failed."
        );
      }
    } catch {
      toast.error(
        "Unable to connect to the authentication server."
      );
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="flex-1 bg-[#f0f5f1] px-4 pt-10 pb-20 sm:pt-12">
      <div className="mx-auto w-full max-w-[480px]">
        <div className="mb-7 text-center">
          <h1 className="text-[30px] font-bold tracking-[-0.7px] text-[#202b23]">
            Create Account
          </h1>

          <p className="mt-2 text-[14px] leading-relaxed text-[#68756d]">
            Join Bazar Dor to explore daily market prices and track price changes.
          </p>
        </div>

        <div className="rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] p-5 shadow-[0_8px_30px_rgba(35,65,44,0.035)] sm:p-[30px]">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="signup-name"
                className={labelStyle}
              >
                Full Name
              </label>

              <input
                id="signup-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                minLength={2}
                maxLength={100}
                required
                disabled={!!loading}
                className={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className={labelStyle}
              >
                Email Address
              </label>

              <input
                id="signup-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                required
                disabled={!!loading}
                className={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="signup-password"
                className={labelStyle}
              >
                Password
              </label>

              <input
                id="signup-password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={8}
                maxLength={128}
                required
                disabled={!!loading}
                className={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="signup-confirm"
                className={labelStyle}
              >
                Confirm Password
              </label>

              <input
                id="signup-confirm"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                autoComplete="new-password"
                minLength={8}
                maxLength={128}
                required
                disabled={!!loading}
                className={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={!!loading}
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#008a45] text-[15px] font-semibold text-white shadow-[0_4px_12px_rgba(0,138,69,0.15)] transition-all duration-200 hover:bg-[#00783b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading === "email" ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-[#dfe7e1]" />

            <span className="text-[11px] font-medium whitespace-nowrap text-[#829087]">
              OR CONTINUE WITH
            </span>

            <span className="h-px flex-1 bg-[#dfe7e1]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["google", "github"].map((provider) => (
              <button
                key={provider}
                type="button"
                disabled={!!loading}
                onClick={() => handleSocialLogin(provider)}
                className={socialStyle}
              >
                {loading === provider ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <SocialIcon provider={provider} />
                )}

                <span className="sm:hidden">
                  {provider === "google"
                    ? "Google"
                    : "GitHub"}
                </span>

                <span className="hidden whitespace-nowrap sm:inline">
                  {provider === "google"
                    ? "Continue with Google"
                    : "Continue with GitHub"}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-6 border-t border-[#edf1ed] pt-5 text-center text-[14px] text-[#68756d]">
            Already have an account?{" "}
            <Link
              href={signInUrl}
              className="font-semibold text-[#008a45] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>

        <div className="mt-7 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#7a887f] transition-colors hover:text-[#008a45]"
          >
            <ArrowLeft size={15} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[450px] flex-1 bg-[#f0f5f1]" />
      }
    >
      <SignUpForm />
    </Suspense>
  );
}