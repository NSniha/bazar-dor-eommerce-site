"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LoaderCircle,
  LogOut,
  Mail,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import UserAvatar from "@/components/shared/UserAvatar";

export default function ProfileClient({
  user,
  initialUser,
  mode = "view",
}) {
  const router = useRouter();

  const currentUser = user || initialUser || {};

  const [name, setName] = useState(currentUser.name || "");
  const [updating, setUpdating] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const isEditing = mode === "edit";

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (updating) return;

    const updatedName = name.trim();

    if (updatedName.length < 2) {
      toast.error("Name must contain at least 2 characters.");
      return;
    }

    if (updatedName.length > 100) {
      toast.error("Name cannot exceed 100 characters.");
      return;
    }

    if (updatedName === currentUser.name) {
      toast("No changes to update.", {
        icon: "ℹ️",
      });
      return;
    }

    setUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: updatedName,
      });

      if (error) {
        toast.error(
          error.message || "Failed to update profile."
        );
        return;
      }

      toast.success("Profile updated successfully!");

      router.replace("/profile");
      router.refresh();
    } catch {
      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(
          error.message || "Unable to sign out."
        );
        return;
      }

      window.location.replace("/");
    } catch {
      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-180px)] flex-1 bg-[#f0f5f1] px-4 pt-10 pb-20 sm:pt-14 sm:pb-24">
      <div className="mx-auto w-full max-w-[736px]">

        {/* Page Heading */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-[13px] font-medium text-[#718076] transition-colors hover:text-[#008a45]"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <h1 className="text-[30px] font-bold tracking-[-0.8px] text-[#202b23] sm:text-[36px]">
            {isEditing ? "Update Information" : "My Profile"}
          </h1>

          <p className="mt-2 text-[14px] leading-relaxed text-[#718076] sm:text-[15px]">
            {isEditing
              ? "Keep your personal information up to date."
              : "Manage your account and personal information."}
          </p>
        </div>

        {/* Profile Summary */}
        <section className="rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] p-5 shadow-[0_8px_30px_rgba(35,65,44,0.035)] sm:p-7">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex min-w-0 items-center gap-4">
              <div className="shrink-0">
                <UserAvatar
                  user={currentUser}
                  size={80}
                />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-[20px] font-bold tracking-[-0.5px] text-[#202b23] sm:text-[22px]">
                  {currentUser.name || "User"}
                </h2>

                <p className="mt-1.5 flex items-center gap-2 text-[13px] text-[#718076] sm:text-[14px]">
                  <Mail
                    size={15}
                    className="shrink-0"
                  />

                  <span className="min-w-0 truncate">
                    {currentUser.email || "No email available"}
                  </span>
                </p>
              </div>
            </div>

            {!isEditing && (
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="inline-flex h-11 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#f3c7c7] bg-white px-5 text-[13px] font-semibold text-[#e54848] transition-all duration-200 hover:border-[#e54848] hover:bg-[#fff2f2] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {signingOut ? (
                  <LoaderCircle
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <LogOut size={17} />
                )}

                {signingOut ? "Signing Out..." : "Sign Out"}
              </button>
            )}
          </div>
        </section>

        {/* Profile Information */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] shadow-[0_8px_30px_rgba(35,65,44,0.035)]">

          <div className="border-b border-[#e8eee9] px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e7f4eb] text-[#008a45]">
                <UserRound size={20} />
              </span>

              <div>
                <h2 className="text-[17px] font-bold text-[#202b23] sm:text-[18px]">
                  Personal Information
                </h2>

                <p className="mt-1 text-[12px] text-[#829087] sm:text-[13px]">
                  Your account details
                </p>
              </div>
            </div>
          </div>

          {isEditing ? (
            /* Update Information Form */
            <form
              onSubmit={handleUpdate}
              className="px-5 py-6 sm:px-7"
            >
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-[14px] font-semibold text-[#202b23]"
                >
                  Full Name
                </label>

                <input
                  id="profile-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Enter your full name"
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  required
                  disabled={updating}
                  className="h-12 w-full rounded-lg border border-[#dce5de] bg-white px-4 text-[15px] text-[#202b23] outline-none transition-all duration-200 placeholder:text-[#86938a] focus:border-[#008a45] focus:ring-[3px] focus:ring-[#008a45]/10 disabled:opacity-60"
                />
              </div>

              <p className="mt-3 text-[12px] leading-relaxed text-[#829087]">
                Your updated name will appear on your profile
                and throughout Bazar Dor.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={updating}
                  className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#008a45] px-6 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-[#00783b] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {updating ? (
                    <>
                      <LoaderCircle
                        size={17}
                        className="animate-spin"
                      />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Check size={17} />
                      Update Information
                    </>
                  )}
                </button>

                <Link
                  href="/profile"
                  className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-[#dce5de] bg-white px-6 text-[14px] font-semibold text-[#526056] transition-all duration-200 hover:border-[#008a45] hover:text-[#008a45] sm:w-auto"
                >
                  Cancel
                </Link>
              </div>
            </form>
          ) : (
            /* Profile Details */
            <div className="px-5 py-6 sm:px-7">

              <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
                <div>
                  <p className="mb-2 text-[12px] font-medium text-[#829087]">
                    Full Name
                  </p>

                  <p className="text-[15px] font-semibold text-[#202b23]">
                    {currentUser.name || "Not provided"}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="mb-2 text-[12px] font-medium text-[#829087]">
                    Email Address
                  </p>

                  <p className="truncate text-[15px] font-semibold text-[#202b23]">
                    {currentUser.email || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="mt-7 border-t border-[#e8eee9] pt-6">
                <Link
                  href="/profile/update"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#008a45] px-6 text-[14px] font-semibold text-white shadow-[0_4px_12px_rgba(0,138,69,0.12)] transition-all duration-200 hover:bg-[#00783b] sm:w-auto"
                >
                  Update Information
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Footer Navigation */}
        <div className="mt-8 text-center">
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