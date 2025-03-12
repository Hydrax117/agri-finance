import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@/types/user";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== UserRole.FARMER) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const farmer = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        kycStatus: true,
        farmSize: true,
        farmLocation: true,
        crops: true,
        farmingExperience: true,
        creditScore: true,
        lastCreditScoreUpdate: true,
        documents: {
          select: {
            id: true,
            type: true,
            fileName: true,
            isVerified: true,
          },
        },
      },
    });

    if (!farmer) {
      return NextResponse.json(
        { error: "Farmer profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(farmer);
  } catch (error) {
    console.error("Farmer profile error:", error);
    return NextResponse.json(
      { error: "Failed to fetch farmer profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== UserRole.FARMER) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { name, phone, farmSize, farmLocation, crops, farmingExperience } =
      await request.json();

    const updatedFarmer = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        phone,
        farmSize: farmSize ? parseFloat(farmSize) : undefined,
        farmLocation,
        crops: crops || [],
        farmingExperience: farmingExperience
          ? parseInt(farmingExperience)
          : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        farmSize: true,
        farmLocation: true,
        crops: true,
        farmingExperience: true,
      },
    });

    return NextResponse.json(updatedFarmer);
  } catch (error) {
    console.error("Update farmer profile error:", error);
    return NextResponse.json(
      { error: "Failed to update farmer profile" },
      { status: 500 }
    );
  }
}
