"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, LogOut } from "lucide-react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import UserAvatar from "@/components/shared/UserAvatar";

export default function ProfileClient({ initialUser }) {
  const router = useRouter();

  const { refetch } = authClient.useSession();

  const [name, setName] = useState(initialUser.name || "");
  const [displayName, setDisplayName] = useState(
    initialUser.name || ""
  );

  const [updating, setUpdating] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const user = {
    ...initialUser,
    name: displayName,
  };

  // Update user profile
  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    if (updating || signingOut) return;

    const updatedName = name.trim();

    if (updatedName.length < 2) {
      toast.error("Name must contain at least 2 characters.");
      return;
    }

    if (updatedName.length > 100) {
      toast.error("Name cannot exceed 100 characters.");
      return;
    }

    if (updatedName === displayName) {
      toast("Your profile is already up to date.", {
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
        throw new Error(
          error.message || "Unable to update your profile."
        );
      }

      setDisplayName(updatedName);
      setName(updatedName);

      toast.success("Profile updated successfully.");

      await refetch();

      router.refresh();
    } catch (error) {
      toast.error(
        error.message || "Unable to update your profile."
      );
    } finally {
      setUpdating(false);
    }
  };

  // Sign out using Better Auth
  const handleSignOut = async () => {
    if (signingOut || updating) return;

    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(
          error.message || "Unable to sign out."
        );
      }

      toast.success("Signed out successfully.");

      window.location.replace("/");
    } catch (error) {
      toast.error(
        error.message || "Unable to sign out. Please try again."
      );

      setSigningOut(false);
    }
  };

  return (
    <main className="min-h-[calc(100svh-155px)] bg-[#f0f5f1] px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:pt-[118px]">
      <div className="mx-auto w-full max-w-[736px]">

        {/* Profile Heading */}
        <div className="mb-6 sm:mb-7">
          <h1 className="text-[25px] leading-tight font-bold tracking-[-0.7px] text-[#202b23] sm:text-[28px]">
            My Profile
          </h1>

          <p className="mt-1.5 text-[13px] leading-relaxed text-[#69756d] sm:text-[14px]">
            View and manage your account information.
          </p>
        </div>

        {/* User Profile Card */}
        <section className="rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] p-5 transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(30,65,40,0.04)] sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* User Information */}
            <div className="flex min-w-0 items-center gap-4">

              {/* Dynamic Profile Avatar */}
              <UserAvatar
                user={user}
                size={80}
                radius={14}
              />

              <div className="min-w-0">
                <h2 className="break-words text-[18px] leading-[1.4] font-semibold text-[#202b23] sm:text-[20px]">
                  {displayName || "User"}
                </h2>

                <p className="mt-1 break-all text-[13px] text-[#69756d] sm:text-[15px]">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut || updating}
              className="inline-flex h-10 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[9px] border border-[#ef4444] bg-transparent px-4 text-[13px] font-semibold text-[#ef4444] transition-all duration-200 hover:bg-[#fff0f0] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {signingOut ? (
                <LoaderCircle
                  size={16}
                  className="animate-spin"
                />
              ) : (
                <LogOut
                  size={16}
                  strokeWidth={1.8}
                />
              )}

              {signingOut ? "Signing Out..." : "Sign Out"}
            </button>
          </div>
        </section>

        {/* Profile Information Card */}
        <section className="mt-6 rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] p-5 sm:p-6">

          {/* Card Heading */}
          <h2 className="text-[17px] font-semibold text-[#202b23]">
            Information
          </h2>

          {/* Update Form */}
          <form
            onSubmit={handleUpdateProfile}
            className="mt-8 space-y-4"
          >

            {/* Name Field */}
            <div>
              <label
                htmlFor="profile-name"
                className="mb-2 block text-[14px] font-medium text-[#29352d]"
              >
                Name
              </label>

              <input
                id="profile-name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                minLength={2}
                maxLength={100}
                required
                disabled={updating || signingOut}
                className="h-11 w-full rounded-[9px] border border-[#dce5de] bg-transparent px-4 text-[15px] text-[#202b23] outline-none transition-all duration-200 placeholder:text-[#9ba79e] focus:border-[#008a45] focus:ring-[3px] focus:ring-[#008a45]/10 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={updating || signingOut}
              className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[9px] bg-[#008a45] px-5 text-[14px] font-semibold text-white shadow-[0_3px_0_rgba(0,0,0,0.12)] transition-all duration-200 hover:bg-[#00763a] active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
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
                "Update"
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}