// src/lib/auth/requireAuth.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserRole } from "@/types/user";

export async function requireAuth(allowedRoles?: UserRole[]) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  if (allowedRoles && !allowedRoles.includes(session.user.role as UserRole)) {
    redirect("/unauthorized");
  }

  return session.user;
}
