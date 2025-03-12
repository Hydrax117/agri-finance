// src/app/api/farmer/dashboard/route.ts
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

    // Get farmer's active loans
    const loans = await prisma.loan.findMany({
      where: {
        farmerId: userId,
        status: {
          in: ["PENDING", "APPROVED", "FUNDED", "REPAYING"],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    // Get upcoming repayments
    const upcomingRepayments = await prisma.loanRepayment.findMany({
      where: {
        loan: {
          farmerId: userId,
        },
        status: "PENDING",
        dueDate: {
          gte: new Date(),
        },
      },
      orderBy: {
        dueDate: "asc",
      },
      take: 3,
      include: {
        loan: {
          select: {
            id: true,
            amount: true,
            purpose: true,
          },
        },
      },
    });

    // Get recent transactions
    const recentTransactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    // Get credit score
    const farmer = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        creditScore: true,
        lastCreditScoreUpdate: true,
      },
    });

    // Get loan stats
    const loanStats = await prisma.$transaction([
      prisma.loan.count({
        where: {
          farmerId: userId,
        },
      }),
      prisma.loan.count({
        where: {
          farmerId: userId,
          status: "COMPLETED",
        },
      }),
      prisma.loan.aggregate({
        where: {
          farmerId: userId,
          status: "FUNDED",
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    // Get unread notifications
    const notifications = await prisma.notification.findMany({
      where: {
        userId: userId,
        isRead: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return NextResponse.json({
      loans,
      upcomingRepayments,
      recentTransactions,
      creditScore: farmer?.creditScore,
      lastCreditScoreUpdate: farmer?.lastCreditScoreUpdate,
      loanStats: {
        totalLoans: loanStats[0],
        completedLoans: loanStats[1],
        currentFunding: loanStats[2]._sum.amount || 0,
      },
      notifications,
    });
  } catch (error) {
    console.error("Farmer dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
