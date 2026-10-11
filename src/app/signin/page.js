"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.011-1.04-.016-2.042-3.338.725-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.303-5.467-1.333-5.467-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.301 1.23A11.53 11.53 0 0 1 12 6.85c1.018.005 2.044.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.605-.014 2.898-.014 3.293 0 .319.216.694.825.576C20.565 21.796 24 17.3 24 12 24 5.373 18.627 0 12 0z" />
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

function getAuthErrorMessage(error) {
  switch (error) {
    case "account_not_linked":
      return "This account is not linked. Please sign in with your original method.";

    case "access_denied":
      return "Access was denied. Please try again.";

    case "invalid_callback":
      return "Authentication failed. Please try again.";

    case "invalid_state":
      return "Your authentication session expired. Please try again.";

    case "unable_to_link_account":
      return "Unable to link this account. Please try again.";

    default:
      return "Social authentication failed. Please try again.";
  }
}

function SignInForm() {
  const searchParams = useSearchParams();

  const redirectPath = getSafeRedirect(
    searchParams.get("callbackURL")
  );

  const signUpUrl =
    redirectPath === "/profile"
      ? "/signup"
      : `/signup?callbackURL=${encodeURIComponent(redirectPath)}`;

  const authRequired =
    searchParams.get("authRequired") === "1";

  const authError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (authRequired) {
      toast("Please sign in to view product details.", {
        id: "auth-required",
        icon: "🔒",
        duration: 4000,
      });
    }
  }, [authRequired]);

  useEffect(() => {
    if (!authError) return;

    toast.error(getAuthErrorMessage(authError), {
      id: "authentication-error",
      duration: 5000,
    });

    const params = new URLSearchParams(
      window.location.search
    );

    params.delete("error");
    params.delete("error_description");

    const query = params.toString();

    const cleanUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;

    window.history.replaceState(
      window.history.state,
      "",
      cleanUrl
    );
  }, [authError]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setLoading("email");

    try {
      const { error } = await authClient.signIn.email({
        email: normalizedEmail,
        password,
      });

      if (error) {
        toast.error(
          error.status >= 500
            ? "Server error. Please try again."
            : error.message || "Invalid email or password."
        );

        return;
      }

      toast.success("Signed in successfully!");

      window.location.replace(redirectPath);
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
        errorCallbackURL: "/signin",
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
            Sign In
          </h1>

          <p className="mt-2 text-[14px] leading-relaxed text-[#68756d]">
            Sign in to explore market prices, comparisons, and your profile.
          </p>
        </div>

        <div className="rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] p-5 shadow-[0_8px_30px_rgba(35,65,44,0.035)] sm:p-[30px]">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="signin-email"
                className={labelStyle}
              >
                Email Address
              </label>

              <input
                id="signin-email"
                name="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
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
                htmlFor="signin-password"
                className={labelStyle}
              >
                Password
              </label>

              <input
                id="signin-password"
                name="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
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
                  Signing In...
                </>
              ) : (
                "Sign In"
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
            Don&apos;t have an account?{" "}
            <Link
              href={signUpUrl}
              className="font-semibold text-[#008a45] hover:underline"
            >
              Sign Up
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

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[450px] flex-1 bg-[#f0f5f1]" />
      }
    >
      <SignInForm />
    </Suspense>
  );
}