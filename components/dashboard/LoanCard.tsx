// src/components/dashboard/LoanCard.tsx
import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/Button";
import { Loan } from "@/types/loan";

interface LoanCardProps {
  loan: Loan;
}

export default function LoanCard({ loan }: LoanCardProps) {
  // Calculate progress percentage for repayment
  const progressPercentage = (loan.amountRepaid / loan.amount) * 100;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Calculate days remaining or overdue
  const calculateDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return "Due today";
    } else {
      return `${diffDays} days remaining`;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg">{loan.purpose}</h3>
            <p className="text-sm text-gray-600">Loan #{loan.id}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              loan.status
            )}`}
          >
            {loan.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="font-semibold">{formatCurrency(loan.amount)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Interest Rate</p>
            <p className="font-semibold">{loan.interestRate}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Disbursed On</p>
            <p className="font-semibold">
              {new Date(loan.disbursementDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Next Payment</p>
            <p className="font-semibold">
              {new Date(loan.nextPaymentDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Repayment Progress</span>
            <span>{progressPercentage.toFixed(0)}%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm mb-4">
          <span>
            {formatCurrency(loan.amountRepaid)} of {formatCurrency(loan.amount)}
          </span>
          <span
            className={
              loan.status.toLowerCase() === "overdue"
                ? "text-red-600 font-medium"
                : "text-gray-600"
            }
          >
            {calculateDaysRemaining(loan.nextPaymentDate)}
          </span>
        </div>

        <div className="flex space-x-2">
          <Button variant="primary" size="sm" className="flex-1">
            Make Payment
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
