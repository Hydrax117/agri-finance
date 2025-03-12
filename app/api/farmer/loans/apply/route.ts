import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@/types/user";
import { LoanStatus, LoanPurpose } from "@/types/loan";
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== UserRole.FARMER) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const {
      amount,
      term,
      purpose,
      description,
      collateral,
      expectedYield,
      cropType,
    } = await request.json();

    // Validate input
    if (!amount || !term || !purpose) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if farmer profile is complete
    const farmer = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        kycStatus: true,
        farmSize: true,
        farmLocation: true,
        creditScore: true,
      },
    });

    if (!farmer || farmer.kycStatus !== "VERIFIED") {
      return NextResponse.json(
        { error: "Please complete your KYC verification first" },
        { status: 400 }
      );
    }

    if (!farmer.farmSize || !farmer.farmLocation) {
      return NextResponse.json(
        { error: "Please complete your farm profile first" },
        { status: 400 }
      );
    }

    // Get AI risk score (simplified for now)
    const aiRiskScore = farmer.creditScore || 65; // Default score if not available

    // Calculate interest rate based on risk score
    const baseRate = 8; // Base interest rate
    const riskAdjustment = Math.max(0, (70 - aiRiskScore) / 10);
    const interestRate = baseRate + riskAdjustment;

    // Create loan application
    const loan = await prisma.loan.create({
      data: {
        farmerId: userId,
        amount: parseFloat(amount),
        term: parseInt(term),
        purpose: purpose as LoanPurpose,
        description,
        collateral,
        expectedYield: expectedYield ? parseFloat(expectedYield) : null,
        cropType,
        status: LoanStatus.PENDING,
        interestRate,
        aiRiskScore,
      },
    });

    // Create notification for the farmer
    await prisma.notification.create({
      data: {
        userId,
        type: "LOAN_STATUS_CHANGE",
        message: "Your loan application has been submitted for review.",
        loanId: loan.id,
        actionUrl: `/farmer/loans/${loan.id}`,
      },
    });

    return NextResponse.json(loan, { status: 201 });
  } catch (error) {
    console.error("Loan application error:", error);
    return NextResponse.json(
      { error: "Failed to submit loan application" },
      { status: 500 }
    );
  }
}
