// src/types/loan.ts
export enum LoanStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  FUNDED = "FUNDED",
  REJECTED = "REJECTED",
  REPAYING = "REPAYING",
  COMPLETED = "COMPLETED",
  DEFAULTED = "DEFAULTED",
}

export enum LoanPurpose {
  SEEDS = "SEEDS",
  FERTILIZER = "FERTILIZER",
  EQUIPMENT = "EQUIPMENT",
  IRRIGATION = "IRRIGATION",
  LABOR = "LABOR",
  LAND_LEASE = "LAND_LEASE",
  STORAGE = "STORAGE",
  OTHER = "OTHER",
}

export interface Loan {
  id: string;
  farmerId: string;
  lenderId?: string;
  amount: number;
  term: number; // In months
  interestRate: number;
  purpose: LoanPurpose;
  description?: string;
  status: LoanStatus;
  createdAt: Date;
  updatedAt: Date;
  approvedAt?: Date;
  fundedAt?: Date;
  completedAt?: Date;
  collateral?: string;
  expectedYield?: number;
  cropType?: string;
  aiRiskScore?: number;
  weatherRiskFactor?: number;
}

// src/types/transaction.ts
export enum TransactionType {
  LOAN_DISBURSEMENT = "LOAN_DISBURSEMENT",
  LOAN_REPAYMENT = "LOAN_REPAYMENT",
  INVESTMENT = "INVESTMENT",
  WITHDRAWAL = "WITHDRAWAL",
  FEE = "FEE",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  userId: string;
  loanId?: string;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  paymentMethod?: string;
  reference?: string;
}

// src/types/notification.ts
export enum NotificationType {
  LOAN_STATUS_CHANGE = "LOAN_STATUS_CHANGE",
  PAYMENT_DUE = "PAYMENT_DUE",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
  KYC_STATUS_CHANGE = "KYC_STATUS_CHANGE",
  SYSTEM = "SYSTEM",
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  createdAt: Date;
  loanId?: string;
  actionUrl?: string;
}
