"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import CreditScoreIndicator from "@/components/dashboard/CreditScoreIndicator";
import { getLoanApplicationById } from "@/services/loanService";
import type {
  LoanApplication,
  LoanDuration,
  LoanPurpose,
  LandUnit,
  LandOwnership,
} from "@/types/loan";

export default function LoanDetails() {
  const params = useParams();
  const router = useRouter();
  const [loan, setLoan] = useState<LoanApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [proposedInterestRate, setProposedInterestRate] = useState<number>(8);
  const [isInvesting, setIsInvesting] = useState(false);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        if (typeof params.id !== "string") {
          router.push("/lender/marketplace");
          return;
        }

        const loanData = await getLoanApplicationById(params.id);
        if (!loanData) {
          router.push("/lender/marketplace");
          return;
        }

        setLoan(loanData);
        setInvestmentAmount(loanData.loanAmount); // Default to full amount
      } catch (error) {
        console.error("Error fetching loan details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoanDetails();
  }, [params.id, router]);

  const handleInvest = async () => {
    if (!loan) return;

    setIsInvesting(true);

    try {
      // This would be an API call to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulating API call

      // Navigate to success page or portfolio
      router.push("/lender/portfolio?success=true");
    } catch (error) {
      console.error("Error processing investment:", error);
      setIsInvesting(false);
    }
  };

  const calculateRiskLevel = (
    creditScore: number | undefined
  ): "Low" | "Medium" | "High" => {
    if (!creditScore) return "High";
    if (creditScore >= 700) return "Low";
    if (creditScore >= 600) return "Medium";
    return "High";
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

  const formatLandUnit = (unit: LandUnit): string => {
    switch (unit) {
      case "acres":
        return "Acres";
      case "hectares":
        return "Hectares";
      case "bigha":
        return "Bigha";
      case "gunta":
        return "Gunta";
      default:
        return unit;
    }
  };

  const formatLandOwnership = (ownership: LandOwnership): string => {
    switch (ownership) {
      case "owned":
        return "Owned";
      case "leased":
        return "Leased";
      case "shared":
        return "Shared";
      default:
        return ownership;
    }
  };

  const calculatePotentialReturn = (
    amount: number,
    interestRate: number,
    duration: LoanDuration
  ) => {
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

    // Simple interest calculation
    const interest = (amount * interestRate * months) / 1200; // Monthly interest
    return (amount + interest).toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading loan details...
      </div>
    );
  }

  if (!loan) {
    return <div className="text-center py-8">Loan not found</div>;
  }

  const riskLevel = calculateRiskLevel(loan.creditScore);
  const potentialReturn = calculatePotentialReturn(
    investmentAmount,
    proposedInterestRate,
    loan.duration
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        onClick={() => router.push("/lender/marketplace")}
        variant="outline"
        className="mb-6"
      >
        ← Back to Marketplace
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    {formatPurpose(loan.purpose)}
                  </h1>
                  <p className="text-gray-600">Loan Application #{loan.id}</p>
                </div>
                {loan.creditScore && (
                  <CreditScoreIndicator score={loan.creditScore} />
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Requested Amount</p>
                  <p className="text-xl font-bold">
                    ${loan.loanAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="text-xl font-bold">
                    {formatDuration(loan.duration)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="text-xl font-bold capitalize">
                    {loan.status.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Risk Level</p>
                  <p
                    className={`text-xl font-bold ${
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
                <div>
                  <p className="text-sm text-gray-500">Crop Types</p>
                  <p className="text-lg font-bold">
                    {loan.cropTypes.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Application Date</p>
                  <p className="text-lg font-bold">
                    {new Date(loan.appliedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold mb-4">Loan Purpose</h2>
                <p className="text-gray-700 mb-4">
                  This loan will be used for{" "}
                  {formatPurpose(loan.purpose).toLowerCase()} in the{" "}
                  {loan.landLocation} region. The farmer has a credit score of{" "}
                  {loan.creditScore || "Unknown"}, indicating a{" "}
                  {riskLevel.toLowerCase()} risk level. The loan is requested
                  for a period of {formatDuration(loan.duration)}.
                </p>

                {loan.additionalInfo && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Additional Information</h3>
                    <p className="text-gray-700">{loan.additionalInfo}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Farm Information</h2>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Farm Size</p>
                  <p className="text-lg font-bold">
                    {loan.landSize} {formatLandUnit(loan.landUnit)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Land Ownership</p>
                  <p className="text-lg font-bold">
                    {formatLandOwnership(loan.landOwnership)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-lg font-bold">{loan.landLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Farming Experience</p>
                  <p className="text-lg font-bold">
                    {loan.farmingExperience} years
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-2">Crop Types</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {loan.cropTypes.map((crop, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {crop}
                    </span>
                  ))}
                </div>

                {/* {loan.farmingPractices && (
                  <>
                    <h3 className="font-semibold mb-2">Farming Practices</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {loan.farmingPractices.map((practice, index) => (
                        <span 
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {practice}
                        </span>
                      ))}
                    </div>
                  </>
                )}
                
                {loan.sustainabilityMeasures && (
                  <>
                    <h3 className="font-semibold mb-2">Sustainability Measures</h3>
                    <p className="text-gray-700">{loan.sustainabilityMeasures}</p>
                  </>
                )} */}
              </div>
            </div>
          </Card>
        </div>

        {/* Investment Card */}
        <div>
          <Card className="sticky top-8">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                Invest in this Loan
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Investment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) =>
                      setInvestmentAmount(Number(e.target.value))
                    }
                    min={100}
                    max={loan.loanAmount}
                    step={100}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <input
                  type="range"
                  min={100}
                  max={loan.loanAmount}
                  step={100}
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full mt-2"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proposed Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={proposedInterestRate}
                  onChange={(e) =>
                    setProposedInterestRate(Number(e.target.value))
                  }
                  min={1}
                  max={20}
                  step={0.5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.5}
                  value={proposedInterestRate}
                  onChange={(e) =>
                    setProposedInterestRate(Number(e.target.value))
                  }
                  className="w-full mt-2"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Investment Amount</span>
                  <span className="font-semibold">
                    ${investmentAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-semibold">{proposedInterestRate}%</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">
                    {formatDuration(loan.duration)}
                  </span>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t">
                  <span className="text-gray-800 font-medium">
                    Potential Return
                  </span>
                  <span className="text-green-600 font-bold">
                    ${potentialReturn}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleInvest}
                disabled={isInvesting || investmentAmount <= 0}
                className="w-full py-3"
              >
                {isInvesting ? "Processing..." : "Invest Now"}
              </Button>

              <div className="mt-4 text-center text-sm text-gray-500">
                By investing, you agree to our terms and conditions.
                <a
                  href="/terms"
                  className="text-green-600 hover:underline ml-1"
                >
                  Learn more
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
