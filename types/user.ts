// src/types/user.ts

export enum UserRole {
  FARMER = "FARMER",
  LENDER = "LENDER",
  ADMIN = "ADMIN",
}

export enum KYCStatus {
  PENDING = "PENDING",
  SUBMITTED = "SUBMITTED",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
}

export interface User {
  id: string;
  email: string;
  password: string; // Hashed
  name: string;
  role: UserRole;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  kycStatus: KYCStatus;
  isActive: boolean;
}

export interface Farmer extends User {
  role: UserRole.FARMER;
  farmSize?: number;
  farmLocation?: string;
  crops?: string[];
  farmingExperience?: number;
  creditScore?: number;
  lastCreditScoreUpdate?: Date;
}

export interface Lender extends User {
  role: UserRole.LENDER;
  companyName?: string;
  companyRegistrationNumber?: string;
  totalInvestment?: number;
  activeLoans?: number;
}

export interface Admin extends User {
  role: UserRole.ADMIN;
  department?: string;
}
