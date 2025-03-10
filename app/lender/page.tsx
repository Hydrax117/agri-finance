import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";

async function getLenderDashboardData() {
  // In a real app, this would fetch from your API
  // This is just mock data for demonstration
  return {
    portfolioSummary: {
      totalInvested: 156000,
      activeLoans: 12,
      averageInterestRate: 8.2,
      averageRiskScore: "B+",
      upcomingRepayments: 3,
    },
    recentTransactions: [
      {
        id: "tx1",
        date: "2025-03-08",
        type: "Investment",
        amount: 10000,
        farmer: "John Mwaniki",
        status: "Completed",
      },
      {
        id: "tx2",
        date: "2025-03-05",
        type: "Repayment",
        amount: 2500,
        farmer: "Sarah Ochieng",
        status: "Completed",
      },
      {
        id: "tx3",
        date: "2025-02-28",
        type: "Investment",
        amount: 15000,
        farmer: "Daniel Kimani",
        status: "Completed",
      },
    ],
    opportunitiesPreview: [
      {
        id: "loan1",
        farmer: "Mary Wanjiku",
        amount: 25000,
        duration: "6 months",
        interestRate: 9.0,
        riskScore: "A-",
        purpose: "Irrigation Equipment",
      },
      {
        id: "loan2",
        farmer: "James Omondi",
        amount: 18000,
        duration: "12 months",
        interestRate: 8.5,
        riskScore: "B+",
        purpose: "Crop Inputs",
      },
      {
        id: "loan3",
        farmer: "Lucy Muthoni",
        amount: 30000,
        duration: "9 months",
        interestRate: 9.5,
        riskScore: "A",
        purpose: "Storage Facility",
      },
    ],
  };
}

export default async function LenderDashboard() {
  const data = await getLenderDashboardData();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Lender</h1>
        <p className="text-gray-600">
          Your investment portfolio is performing well. You have{" "}
          {data.portfolioSummary.upcomingRepayments} upcoming repayments this
          week.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-gray-500 text-sm font-medium">Total Invested</h3>
          <p className="text-2xl font-bold mt-1">
            KES {data.portfolioSummary.totalInvested.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 mt-2">
            Across {data.portfolioSummary.activeLoans} active loans
          </p>
        </Card>

        <Card className="p-4">
          <h3 className="text-gray-500 text-sm font-medium">
            Average Interest Rate
          </h3>
          <p className="text-2xl font-bold mt-1">
            {data.portfolioSummary.averageInterestRate}%
          </p>
          <p className="text-sm text-blue-600 mt-2">
            Average risk score: {data.portfolioSummary.averageRiskScore}
          </p>
        </Card>

        <Card className="p-4">
          <h3 className="text-gray-500 text-sm font-medium">Actions</h3>
          <div className="mt-3 space-y-2">
            <Link href="/lender/marketplace" className="block">
              <Button className="w-full">Browse Marketplace</Button>
            </Link>
            <Link href="/lender/portfolio" className="block">
              <Button variant="outline" className="w-full">
                View Portfolio
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium">Recent Transactions</h2>
          <Link
            href="/lender/transactions"
            className="text-blue-600 text-sm hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Farmer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.recentTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tx.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tx.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    KES {tx.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tx.farmer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Investment Opportunities */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium">New Investment Opportunities</h2>
          <Link
            href="/lender/marketplace"
            className="text-blue-600 text-sm hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {data.opportunitiesPreview.map((loan) => (
            <Card
              key={loan.id}
              className="p-4 border hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">
                  {loan.purpose}
                </span>
                <span
                  className={`text-sm font-bold ${
                    loan.riskScore.startsWith("A")
                      ? "text-green-600"
                      : loan.riskScore.startsWith("B")
                      ? "text-blue-600"
                      : "text-yellow-600"
                  }`}
                >
                  {loan.riskScore}
                </span>
              </div>
              <h3 className="font-bold mt-1">{loan.farmer}</h3>
              <p className="text-lg font-semibold mt-2">
                KES {loan.amount.toLocaleString()}
              </p>
              <div className="mt-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{loan.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest Rate:</span>
                  <span>{loan.interestRate}%</span>
                </div>
              </div>
              <Link href={`/lender/marketplace/${loan.id}`}>
                <Button className="w-full mt-4">View Details</Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
