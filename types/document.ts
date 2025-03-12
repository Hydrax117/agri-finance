// src/types/document.ts
export enum DocumentType {
  ID_PROOF = "ID_PROOF",
  ADDRESS_PROOF = "ADDRESS_PROOF",
  LAND_OWNERSHIP = "LAND_OWNERSHIP",
  BANK_STATEMENT = "BANK_STATEMENT",
  CROP_PLAN = "CROP_PLAN",
  LOAN_AGREEMENT = "LOAN_AGREEMENT",
  OTHER = "OTHER",
}

export interface Document {
  id: string;
  userId: string;
  type: DocumentType;
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
  expiryDate?: Date;
  isVerified: boolean;
  loanId?: string;
}
