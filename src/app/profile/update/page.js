import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import { auth } from "@/lib/auth";
import ProfileClient from "../ProfileClient";

export default async function ProfileUpdatePage() {
  await connection();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(
      "/signin?callbackURL=%2Fprofile%2Fupdate&authRequired=1"
    );
  }

  const user = session.user;

  return (
    <ProfileClient
      initialUser={{
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image || null,
      }}
      mode="edit"
    />
  );
}