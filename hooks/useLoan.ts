import { useState } from "react";
import { LoanApplicationData } from "@/types/loan";

interface LoanSubmissionResult {
  success: boolean;
  loanId: string;
  message: string;
}

export function useLoan() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Submits a loan application to the API
   * @param formData The complete loan application data
   * @returns Promise with the submission result
   */
  const submitLoanApplication = async (
    formData: LoanApplicationData
  ): Promise<LoanSubmissionResult> => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Create a FormData object to handle file uploads
      const submissionData = new FormData();

      // Add all basic form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "documents" && key !== "cropType") {
          submissionData.append(key, String(value));
        }
      });

      // Add cropType as a JSON string
      submissionData.append("cropType", JSON.stringify(formData.cropType));

      // Add document files
      Object.entries(formData.documents).forEach(([docType, file]) => {
        if (file) {
          submissionData.append(`documents.${docType}`, file);
        }
      });

      // Send API request
      const response = await fetch("/api/farmer/loans/apply", {
        method: "POST",
        body: submissionData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to submit loan application"
        );
      }

      const result = await response.json();
      return {
        success: true,
        loanId: result.loanId,
        message: "Loan application submitted successfully",
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Retrieves a list of the user's loan applications
   */
  const getUserLoans = async () => {
    try {
      const response = await fetch("/api/farmer/loans", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch loans");
      }

      return await response.json();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    }
  };

  /**
   * Retrieves details for a specific loan application
   * @param loanId The ID of the loan to retrieve
   */
  const getLoanDetails = async (loanId: string) => {
    try {
      const response = await fetch(`/api/farmer/loans/${loanId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch loan details");
      }

      return await response.json();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    }
  };

  return {
    isSubmitting,
    error,
    submitLoanApplication,
    getUserLoans,
    getLoanDetails,
  };
}
