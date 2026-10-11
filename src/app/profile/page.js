import { headers } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileClient from "./ProfileClient";

export const metadata = {
  title: "My Profile | Bazar Dor",
  description: "View and manage your Bazar Dor account information.",
};

export default async function ProfilePage() {
  await connection();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Protect the profile page.
  if (!session?.user) {
    redirect("/signin?callbackURL=%2Fprofile");
  }

  // Get authenticated user information.
  const user = {
    id: session.user.id,
    name: session.user.name || "",
    email: session.user.email || "",
    image: session.user.image || null,
  };

  return <ProfileClient initialUser={user} />;
}