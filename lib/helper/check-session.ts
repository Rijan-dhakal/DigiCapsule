"use server"

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const checkSession = async function (message: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login")
  }

  return session;
};
