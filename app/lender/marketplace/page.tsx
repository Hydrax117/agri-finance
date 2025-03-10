// src/app/lender/marketplace/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import CreditScoreIndicator from "@/components/dashboard/CreditScoreIndicator";
import { getLoanApplications } from "@/services/loanService";
import type { LoanApplication, LoanPurpose, LoanDuration } from "@/types/loan";

export default function LenderMarketplace() {
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>(
    []
  );
  const [filteredLoans, setFilteredLoans] = useState<LoanApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    minAmount: "",
    maxAmount: "",
    minScore: "",
    cropType: "",
    region: "",
    purpose: "",
    duration: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        const data = await getLoanApplications();
        setLoanApplications(data);
        setFilteredLoans(data);
      } catch (error) {
        console.error("Error fetching loan applications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoanApplications();
  }, []);

  useEffect(() => {
    // Apply filters whenever filters state changes
    let result = [...loanApplications];

    if (filters.minAmount) {
      result = result.filter(
        (loan) => loan.loanAmount >= Number(filters.minAmount)
      );
    }

    if (filters.maxAmount) {
      result = result.filter(
        (loan) => loan.loanAmount <= Number(filters.maxAmount)
      );
    }

    if (filters.minScore) {
      result = result.filter(
        (loan) =>
          loan.creditScore !== undefined &&
          loan.creditScore >= Number(filters.minScore)
      );
    }

    if (filters.cropType) {
      result = result.filter((loan) =>
        loan.cropTypes.some((crop) =>
          crop.toLowerCase().includes(filters.cropType.toLowerCase())
        )
      );
    }

    if (filters.region) {
      result = result.filter((loan) =>
        loan.landLocation.toLowerCase().includes(filters.region.toLowerCase())
      );
    }

    if (filters.purpose) {
      result = result.filter((loan) =>
        loan.purpose.toLowerCase().includes(filters.purpose.toLowerCase())
      );
    }

    if (filters.duration) {
      result = result.filter((loan) =>
        loan.duration.toLowerCase().includes(filters.duration.toLowerCase())
      );
    }

    setFilteredLoans(result);
  }, [filters, loanApplications]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleViewDetails = (loanId: string) => {
    router.push(`/lender/marketplace/${loanId}`);
  };

  const calculateRiskLevel = (
    creditScore: number | undefined
  ): "Low" | "Medium" | "High" => {
    if (!creditScore) return "High";
    if (creditScore >= 700) return "Low";
    if (creditScore >= 600) return "Medium";
    return "High";
  };

  const formatDuration = (duration: LoanDuration): string => {
    switch (duration) {
      case "3months":
        return "3 months";
      case "6months":
        return "6 months";
      case "1year":
        return "1 year";
      case "2years":
        return "2 years";
      case "3years":
        return "3 years";
      case "5years":
        return "5 years";
      case "10years":
        return "10 years";
      case "custom":
        return "Custom";
      default:
        return duration;
    }
  };

  const formatPurpose = (purpose: LoanPurpose): string => {
    switch (purpose) {
      case "seeds":
        return "Seeds & Fertilizers";
      case "equipment":
        return "Farm Equipment";
      case "irrigation":
        return "Irrigation System";
      case "labor":
        return "Seasonal Labor";
      case "storage":
        return "Storage Facilities";
      case "livestock":
        return "Livestock";
      case "marketing":
        return "Marketing & Distribution";
      case "land":
        return "Land Purchase/Lease";
      case "refinance":
        return "Refinancing";
      case "diversification":
        return "Farm Diversification";
      case "other":
        return "Other Agricultural Purpose";
      default:
        return purpose;
    }
  };

  const calculateEstimatedRoi = (
    loanAmount: number,
    interestRate: number = 8,
    duration: LoanDuration
  ): number => {
    // Convert duration to months
    let months;
    switch (duration) {
      case "3months":
        months = 3;
        break;
      case "6months":
        months = 6;
        break;
      case "1year":
        months = 12;
        break;
      case "2years":
        months = 24;
        break;
      case "3years":
        months = 36;
        break;
      case "5years":
        months = 60;
        break;
      case "10years":
        months = 120;
        break;
      case "custom":
        months = 12;
        break; // Default to 12 for custom
      default:
        months = 12;
    }

    // Simple interest ROI calculation
    const totalInterest = (loanAmount * interestRate * months) / 1200; // Monthly interest
    const roi = (totalInterest / loanAmount) * 100;
    return parseFloat(roi.toFixed(2));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading marketplace data...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Loan Marketplace</h1>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Loan Amount
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                name="minAmount"
                placeholder="Min"
                value={filters.minAmount}
                onChange={handleFilterChange}
                className="w-full"
              />
              <Input
                type="number"
                name="maxAmount"
                placeholder="Max"
                value={filters.maxAmount}
                onChange={handleFilterChange}
                className="w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Credit Score
            </label>
            <Input
              type="number"
              name="minScore"
              placeholder="Minimum Score"
              value={filters.minScore}
              onChange={handleFilterChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Crop Type</label>
            <Input
              type="text"
              name="cropType"
              placeholder="e.g. Rice, Wheat"
              value={filters.cropType}
              onChange={handleFilterChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Region</label>
            <Input
              type="text"
              name="region"
              placeholder="e.g. North, South"
              value={filters.region}
              onChange={handleFilterChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Purpose</label>
            <Input
              type="text"
              name="purpose"
              placeholder="e.g. Seeds, Equipment"
              value={filters.purpose}
              onChange={handleFilterChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Duration</label>
            <Input
              type="text"
              name="duration"
              placeholder="e.g. 1year, 3years"
              value={filters.duration}
              onChange={handleFilterChange}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Available Loan Applications ({filteredLoans.length})
        </h2>
      </div>

      {filteredLoans.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">
            No loan applications match your criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLoans.map((loan) => {
            const riskLevel = calculateRiskLevel(loan.creditScore);
            const estimatedRoi = calculateEstimatedRoi(
              loan.loanAmount,
              loan.interestRate || 8,
              loan.duration
            );

            return (
              <Card key={loan.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {formatPurpose(loan.purpose)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Farmer ID: {loan.farmerId}
                      </p>
                    </div>
                    {loan.creditScore && (
                      <CreditScoreIndicator score={loan.creditScore} />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-semibold">
                        ${loan.loanAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold">
                        {formatDuration(loan.duration)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Estimated Interest
                      </p>
                      <p className="font-semibold">{loan.interestRate || 8}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Est. ROI</p>
                      <p className="font-semibold text-green-600">
                        {estimatedRoi}%
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Crop Types</p>
                    <p className="font-medium">{loan.cropTypes.join(", ")}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Risk Level</p>
                    <p
                      className={`font-medium ${
                        riskLevel === "Low"
                          ? "text-green-600"
                          : riskLevel === "Medium"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {riskLevel}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Application Date</p>
                    <p className="font-medium">
                      {new Date(loan.appliedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <Button
                    onClick={() => loan.id && handleViewDetails(loan.id)}
                    className="w-full"
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
