// src/app/farmer/loans/apply/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoanPurpose, LoanStatus } from "@/types/loan";

export default function LoanApplicationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [loanData, setLoanData] = useState({
    amount: 0,
    term: 6, // Default term in months
    purpose: LoanPurpose.SEEDS,
    description: "",
    collateral: "",
    expectedYield: 0,
    cropType: "",
    interestRate: 0, // Annual interest rate
  });

  // Base interest rate and risk factors
  const baseInterestRate = 8.5; // 8.5% base rate
  const purposeRiskFactors: Record<LoanPurpose, number> = {
    [LoanPurpose.SEEDS]: 0.5,
    [LoanPurpose.FERTILIZER]: 0.75,
    [LoanPurpose.EQUIPMENT]: 1.25,
    [LoanPurpose.IRRIGATION]: 1.0,
    [LoanPurpose.LABOR]: 1.5,
    [LoanPurpose.LAND_LEASE]: 2.0,
    [LoanPurpose.STORAGE]: 1.0,
    [LoanPurpose.OTHER]: 2.5,
  };

  // Calculate interest rate based on loan parameters
  useEffect(() => {
    // Start with base rate
    let calculatedRate = baseInterestRate;

    // Adjust based on loan purpose
    calculatedRate += purposeRiskFactors[loanData.purpose];

    // Adjust based on loan amount (higher amounts = slightly lower rates)
    if (loanData.amount > 100000) {
      calculatedRate -= 0.5;
    } else if (loanData.amount < 10000) {
      calculatedRate += 1.0;
    }

    // Adjust based on term (longer terms = higher rates)
    if (loanData.term > 24) {
      calculatedRate += 1.5;
    } else if (loanData.term > 12) {
      calculatedRate += 0.75;
    }

    // Add collateral benefit (presence of collateral reduces rate)
    if (loanData.collateral.trim().length > 0) {
      calculatedRate -= 1.0;
    }

    // Ensure rate doesn't go below minimum
    calculatedRate = Math.max(calculatedRate, 6.0);

    // Update state with calculated rate (rounded to 2 decimal places)
    setLoanData((prevData) => ({
      ...prevData,
      interestRate: parseFloat(calculatedRate.toFixed(2)),
    }));
  }, [loanData.amount, loanData.term, loanData.purpose, loanData.collateral]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setLoanData({
      ...loanData,
      [name]:
        name === "amount" || name === "term" || name === "expectedYield"
          ? parseFloat(value) || 0
          : value,
    });
  };

  // Calculate monthly payment
  const calculateMonthlyPayment = (): number => {
    const principal = loanData.amount;
    const monthlyRate = loanData.interestRate / 100 / 12;
    const payments = loanData.term;

    if (principal <= 0 || payments <= 0 || monthlyRate <= 0) return 0;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, payments)) /
      (Math.pow(1 + monthlyRate, payments) - 1);

    return parseFloat(monthlyPayment.toFixed(2));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (loanData.amount <= 0) errors.amount = "Amount must be greater than 0";
    if (loanData.term < 1) errors.term = "Term must be at least 1 month";
    if (!loanData.description) errors.description = "Description is required";
    if (!loanData.cropType) errors.cropType = "Crop type is required";
    if (loanData.expectedYield <= 0)
      errors.expectedYield = "Expected yield must be greater than 0";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Submit the loan application
      const response = await fetch("/api/farmer/loans/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...loanData,
          status: LoanStatus.PENDING,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit loan application");
      }

      const data = await response.json();

      // Redirect to the loan details page
      router.push(`/farmer/loans/${data.id}`);
    } catch (error) {
      console.error("Error submitting loan application:", error);
      setFormErrors({
        form: "Failed to submit loan application. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total repayment amount
  const totalRepayment = calculateMonthlyPayment() * loanData.term;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Apply for a Loan</h1>

      {formErrors.form && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {formErrors.form}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Loan Amount */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="amount">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={loanData.amount}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                formErrors.amount ? "border-red-500" : "border-gray-300"
              }`}
              min="0"
              step="1000"
            />
            {formErrors.amount && (
              <p className="text-red-500 text-sm mt-1">{formErrors.amount}</p>
            )}
          </div>

          {/* Loan Term */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="term">
              Loan Term (months)
            </label>
            <input
              type="number"
              id="term"
              name="term"
              value={loanData.term}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                formErrors.term ? "border-red-500" : "border-gray-300"
              }`}
              min="1"
              max="60"
            />
            {formErrors.term && (
              <p className="text-red-500 text-sm mt-1">{formErrors.term}</p>
            )}
          </div>

          {/* Loan Purpose */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="purpose">
              Loan Purpose
            </label>
            <select
              id="purpose"
              name="purpose"
              value={loanData.purpose}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {Object.values(LoanPurpose).map((purpose) => (
                <option key={purpose} value={purpose}>
                  {purpose.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Crop Type */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="cropType">
              Crop Type
            </label>
            <input
              type="text"
              id="cropType"
              name="cropType"
              value={loanData.cropType}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                formErrors.cropType ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., Rice, Wheat, Cotton"
            />
            {formErrors.cropType && (
              <p className="text-red-500 text-sm mt-1">{formErrors.cropType}</p>
            )}
          </div>

          {/* Expected Yield */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="expectedYield">
              Expected Yield (tonnes)
            </label>
            <input
              type="number"
              id="expectedYield"
              name="expectedYield"
              value={loanData.expectedYield}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                formErrors.expectedYield ? "border-red-500" : "border-gray-300"
              }`}
              min="0"
              step="0.1"
            />
            {formErrors.expectedYield && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.expectedYield}
              </p>
            )}
          </div>

          {/* Collateral */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="collateral">
              Collateral (optional)
            </label>
            <input
              type="text"
              id="collateral"
              name="collateral"
              value={loanData.collateral}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g., Land deed, Equipment"
            />
          </div>
        </div>

        {/* Interest Rate Display */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-3">Loan Terms</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow-sm">
              <p className="text-gray-500 text-sm">Annual Interest Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {loanData.interestRate}%
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Based on loan parameters and risk assessment
              </p>
            </div>

            <div className="bg-white p-4 rounded shadow-sm">
              <p className="text-gray-500 text-sm">Monthly Payment</p>
              <p className="text-2xl font-bold text-blue-600">
                ₹{calculateMonthlyPayment().toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                For {loanData.term} months
              </p>
            </div>

            <div className="bg-white p-4 rounded shadow-sm">
              <p className="text-gray-500 text-sm">Total Repayment</p>
              <p className="text-2xl font-bold text-blue-600">
                ₹{totalRepayment.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">Principal + Interest</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            <strong>Note:</strong> The interest rate is calculated automatically
            based on various factors including loan amount, term, purpose, and
            collateral. Adding collateral can help reduce your interest rate.
          </p>
        </div>

        {/* Loan Description */}
        <div className="mt-6">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Loan Description
          </label>
          <textarea
            id="description"
            name="description"
            value={loanData.description}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              formErrors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows={4}
            placeholder="Describe how you plan to use the loan and your repayment strategy..."
          />
          {formErrors.description && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.description}
            </p>
          )}
        </div>

        {/* Document Upload Section */}
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Supporting Documents</h3>
          <p className="text-gray-600 mb-4">
            Please upload relevant documents to support your loan application.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-dashed border-gray-300 rounded p-4 text-center">
              <p className="text-gray-600 mb-2">Land Ownership Proof</p>
              <button
                type="button"
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
              >
                Upload Document
              </button>
            </div>

            <div className="border border-dashed border-gray-300 rounded p-4 text-center">
              <p className="text-gray-600 mb-2">Crop Plan</p>
              <button
                type="button"
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
              >
                Upload Document
              </button>
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-2">
            Supported file types: PDF, JPG, PNG (Max size: 5MB)
          </p>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              required
            />
            <span className="ml-2 text-gray-700">
              I agree to the terms and conditions and authorize the platform to
              verify my information and credit history.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
