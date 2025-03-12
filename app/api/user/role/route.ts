// src/app/api/user/role/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ role: session.user.role });
  } catch (error) {
    console.error("Error fetching user role:", error);
    return NextResponse.json(
      { message: "Failed to fetch user role" },
      { status: 500 }
    );
  }
}
