import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@/types/user";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== UserRole.FARMER) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const loanId = params.id;

    const loan = await prisma.loan.findUnique({
      where: {
        id: loanId,
        farmerId: userId,
      },
      include: {
        lender: {
          select: {
            name: true,
            companyName: true,
          },
        },
        repayments: true,
        transactions: true,
      },
    });

    if (!loan) {
      return NextResponse.json({ error: "Loan not found" }, { status: 404 });
    }

    return NextResponse.json(loan);
  } catch (error) {
    console.error("Loan details error:", error);
    return NextResponse.json(
      { error: "Failed to fetch loan details" },
      { status: 500 }
    );
  }
}
