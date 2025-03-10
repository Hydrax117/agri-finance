// src/types/loan.ts
export interface Loan {
  id: string;
  farmerId: string;
  lenderId?: string;
  purpose: string;
  amount: number;
  interestRate: number;
  term: number; // in months
  status:
    | "pending"
    | "approved"
    | "active"
    | "completed"
    | "rejected"
    | "overdue";
  amountRepaid: number;
  disbursementDate: string;
  nextPaymentDate: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface WeatherForecast {
  location: string;
  currentCondition: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  forecast: string; // Text description of forecast
}

// src/types/loan.ts
/**
 * Types of agricultural loans based on purpose
 */
export type LoanPurpose =
  | "seeds" // Seeds and fertilizers
  | "equipment" // Farm equipment and machinery
  | "irrigation" // Irrigation system installation or repair
  | "labor" // Seasonal labor costs
  | "storage" // Storage facilities or infrastructure
  | "livestock" // Livestock purchase or maintenance
  | "marketing" // Post-harvest marketing and distribution
  | "land" // Land purchase or lease
  | "refinance" // Refinancing existing agricultural debt
  | "diversification" // Farm diversification projects
  | "other"; // Other agricultural purposes

/**
 * Standard loan duration periods
 */
export type LoanDuration =
  | "3months" // Short-term seasonal loan
  | "6months" // Half-year crop cycle
  | "1year" // Annual loan
  | "2years" // Medium-term loan
  | "3years" // Medium-term loan
  | "5years" // Long-term loan for infrastructure
  | "10years" // Long-term loan for major investments
  | "custom"; // Custom duration

/**
 * Common crop types grown in India
 * (extensible based on region-specific needs)
 */
export type CropType =
  | "rice" // Rice
  | "wheat" // Wheat
  | "maize" // Maize/Corn
  | "sugarcane" // Sugarcane
  | "cotton" // Cotton
  | "pulses" // Pulses (lentils, chickpeas, etc.)
  | "soybeans" // Soybeans
  | "vegetables" // Vegetables (general category)
  | "fruits" // Fruits (general category)
  | "tea" // Tea
  | "coffee" // Coffee
  | "spices" // Spices
  | "jute" // Jute
  | "millet" // Millet
  | "oilseeds" // Oilseeds
  | string; // Allow for other custom crops

/**
 * Loan application status tracking
 */
export type LoanStatus =
  | "draft" // Application saved but not submitted
  | "submitted" // Application submitted, awaiting review
  | "under_review" // Application under review by lenders
  | "additional_info" // Additional information requested
  | "approved" // Loan approved by a lender
  | "funded" // Loan funded, money disbursed
  | "rejected" // Loan application rejected
  | "completed" // Loan fully repaid
  | "defaulted"; // Loan in default

/**
 * Loan application interface
 */
export interface LoanApplication extends LoanApplicationData {
  id?: string;
  farmerId: string;
  loanAmount: number;
  purpose: LoanPurpose;
  duration: LoanDuration;
  cropTypes: CropType[];
  landSize: string;
  landUnit: LandUnit;
  landLocation: string;
  landOwnership: LandOwnership;
  farmingExperience: string;
  previousLoans: boolean;
  previousLoanDetails: string;
  expectedYield: string;
  documents: LoanDocuments;
  additionalInfo: string;
  agreeToTerms: boolean;
  status: LoanStatus;
  creditScore?: number; // AI-calculated credit score
  weatherRiskAssessment?: string; // AI-generated risk based on weather data
  createdAt: Date;
  updatedAt: Date;
  // Fields populated after loan is matched with lender
  lenderId?: string;
  approvedAmount?: number;
  interestRate?: number;
  disbursementDate?: Date;
  repaymentSchedule?: RepaymentSchedule[];
  appliedAt: string;
}

/**
 * Repayment schedule for an approved loan
 */
export interface RepaymentSchedule {
  installmentNumber: number;
  dueDate: Date;
  amount: number;
  status: "pending" | "paid" | "overdue" | "partially_paid";
  paidAmount?: number;
  paidDate?: Date;
}
// @/types/loan.ts

export type LandOwnership = "owned" | "leased" | "shared";

export type LandUnit = "acres" | "hectares" | "bigha" | "gunta";

export interface LoanDocuments {
  identityProof: File | null;
  landRecord: File | null;
  previousHarvestProof: File | null;
  bankStatement: File | null;
}

export interface LoanApplicationData {
  loanAmount: number;
  purpose: LoanPurpose;
  duration: LoanDuration;
  cropType: CropType[];
  landSize: string;
  landUnit: LandUnit;
  landLocation: string;
  landOwnership: LandOwnership;
  farmingExperience: string;
  previousLoans: boolean;
  previousLoanDetails: string;
  expectedYield: string;
  documents: LoanDocuments;
  additionalInfo: string;
  agreeToTerms: boolean;
}
