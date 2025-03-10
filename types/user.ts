// src/types/user.ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "farmer" | "lender" | "admin";
  creditScore?: number;
  location?: string;
}

export interface FarmerProfile extends User {
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  farmName?: string;
  farmSize?: number;
  farmType?: string[];
  cropTypes?: string[];
  farmingExperience?: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    swiftCode?: string;
  };
  documents?: {
    idVerified: boolean;
    landVerified: boolean;
    bankVerified: boolean;
  };
  profilePicture?: string;
}
