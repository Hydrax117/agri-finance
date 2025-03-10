// src/app/farmer/loans/apply/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoan } from "@/hooks/useLoan";
import {
  LoanPurpose,
  LoanDuration,
  CropType,
  LandUnit,
  LandOwnership,
} from "@/types/loan";

// UI Components
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/CheckBox";
import { Spinner } from "@/components/ui/spinner";
import { Stepper } from "@/components/ui/stepper";

// Form components
import { CropSelectionField } from "@/components/forms/CropSelectionField";
import { LandDetailsField } from "@/components/forms/LandDetailsField";
import { FileUpload } from "@/components/forms/FileUplod";
export default function LoanApplicationPage() {
  const router = useRouter();
  const { submitLoanApplication, isSubmitting } = useLoan();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    loanAmount: "",
    purpose: "" as LoanPurpose,
    duration: "" as LoanDuration,
    cropType: [] as CropType[],
    landSize: "",
    landUnit: "acres" as LandUnit,
    landLocation: "",
    landOwnership: "owned" as LandOwnership,
    farmingExperience: "",
    previousLoans: false,
    previousLoanDetails: "",
    expectedYield: "",
    documents: {
      identityProof: null as File | null,
      landRecord: null as File | null,
      previousHarvestProof: null as File | null,
      bankStatement: null as File | null,
    },
    additionalInfo: "",
    agreeToTerms: false,
  });

  const handleInputChange = (
    field: string,
    value: string | number | boolean | CropType[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDocumentUpload = (docType: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [docType]: file },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await submitLoanApplication({
        ...formData,
        loanAmount: Number(formData.loanAmount),
      });
      router.push(`/farmer/loans/${result.loanId}`);
    } catch (error) {
      console.error("Error submitting loan application:", error);
      // Handle error (show notification, etc.)
    }
  };

  const validateCurrentStep = () => {
    if (currentStep === 1) {
      return formData.loanAmount && formData.purpose && formData.duration;
    } else if (currentStep === 2) {
      return (
        formData.cropType.length > 0 &&
        formData.landSize &&
        formData.landLocation
      );
    } else if (currentStep === 3) {
      return formData.documents.identityProof && formData.documents.landRecord;
    }
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Apply for Agricultural Loan</h1>

      <Stepper
        steps={[
          "Loan Details",
          "Farm Information",
          "Documents",
          "Review & Submit",
        ]}
        currentStep={currentStep}
      />

      <Card className="mt-6 p-6">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Loan Details */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Loan Details</h2>

              <div>
                <label className="block mb-2 font-medium">
                  Loan Amount (₹)*
                </label>
                <Input
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) =>
                    handleInputChange("loanAmount", e.target.value)
                  }
                  placeholder="Enter amount in ₹"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Loan Purpose*</label>
                <Select
                  value={formData.purpose}
                  onChange={(e) => handleInputChange("purpose", e.target.value)}
                  required
                >
                  <option value="">Select purpose</option>
                  <option value="seeds">Seeds & Fertilizers</option>
                  <option value="equipment">Farm Equipment</option>
                  <option value="irrigation">Irrigation System</option>
                  <option value="labor">Labor Costs</option>
                  <option value="storage">Storage Infrastructure</option>
                  <option value="other">Other</option>
                </Select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Loan Duration*</label>
                <Select
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                  required
                >
                  <option value="">Select duration</option>
                  <option value="3months">3 months</option>
                  <option value="6months">6 months</option>
                  <option value="1year">1 year</option>
                  <option value="2years">2 years</option>
                  <option value="5years">5 years</option>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2: Farm Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Farm Information</h2>

              <CropSelectionField
                selectedCrops={formData.cropType}
                onChange={(crops) => handleInputChange("cropType", crops)}
              />

              <LandDetailsField
                landSize={formData.landSize}
                landUnit={formData.landUnit}
                landLocation={formData.landLocation}
                landOwnership={formData.landOwnership}
                onChange={(field, value) => handleInputChange(field, value)}
              />

              <div>
                <label className="block mb-2 font-medium">
                  Farming Experience (years)
                </label>
                <Input
                  type="number"
                  value={formData.farmingExperience}
                  onChange={(e) =>
                    handleInputChange("farmingExperience", e.target.value)
                  }
                  placeholder="Years of farming experience"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Expected Yield (quintals)
                </label>
                <Input
                  type="number"
                  value={formData.expectedYield}
                  onChange={(e) =>
                    handleInputChange("expectedYield", e.target.value)
                  }
                  placeholder="Expected harvest yield"
                />
              </div>

              <div className="flex items-center">
                <Checkbox
                  checked={formData.previousLoans}
                  onChange={(e) =>
                    handleInputChange("previousLoans", e.target.checked)
                  }
                  id="previousLoans"
                />
                <label htmlFor="previousLoans" className="ml-2">
                  Have you taken agricultural loans before?
                </label>
              </div>

              {formData.previousLoans && (
                <div>
                  <label className="block mb-2 font-medium">
                    Previous Loan Details
                  </label>
                  <Textarea
                    value={formData.previousLoanDetails}
                    onChange={(e) =>
                      handleInputChange("previousLoanDetails", e.target.value)
                    }
                    placeholder="Provide details about previous loans and repayment history"
                    rows={3}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Document Upload */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Required Documents</h2>

              <div>
                <label className="block mb-2 font-medium">
                  Identity Proof (Aadhaar/PAN)*
                </label>
                <FileUpload
                  onFileSelect={(file) =>
                    handleDocumentUpload("identityProof", file)
                  }
                  acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
                  currentFile={formData.documents.identityProof}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Land Ownership Record*
                </label>
                <FileUpload
                  onFileSelect={(file) =>
                    handleDocumentUpload("landRecord", file)
                  }
                  acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
                  currentFile={formData.documents.landRecord}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Previous Harvest Proof (optional)
                </label>
                <FileUpload
                  onFileSelect={(file) =>
                    handleDocumentUpload("previousHarvestProof", file)
                  }
                  acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
                  currentFile={formData.documents.previousHarvestProof}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Bank Statement (last 6 months, optional)
                </label>
                <FileUpload
                  onFileSelect={(file) =>
                    handleDocumentUpload("bankStatement", file)
                  }
                  acceptedFileTypes=".pdf"
                  currentFile={formData.documents.bankStatement}
                />
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Loan Details</h3>
                <p>Amount: ₹{formData.loanAmount}</p>
                <p>Purpose: {formData.purpose}</p>
                <p>Duration: {formData.duration}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Farm Information</h3>
                <p>Crops: {formData.cropType.join(", ")}</p>
                <p>
                  Land: {formData.landSize} {formData.landUnit} (
                  {formData.landOwnership})
                </p>
                <p>Location: {formData.landLocation}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Documents Uploaded</h3>
                <p>
                  Identity Proof:{" "}
                  {formData.documents.identityProof?.name || "Not uploaded"}
                </p>
                <p>
                  Land Record:{" "}
                  {formData.documents.landRecord?.name || "Not uploaded"}
                </p>
                <p>
                  Harvest Proof:{" "}
                  {formData.documents.previousHarvestProof?.name ||
                    "Not uploaded"}
                </p>
                <p>
                  Bank Statement:{" "}
                  {formData.documents.bankStatement?.name || "Not uploaded"}
                </p>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Additional Information
                </label>
                <Textarea
                  value={formData.additionalInfo}
                  onChange={(e) =>
                    handleInputChange("additionalInfo", e.target.value)
                  }
                  placeholder="Any other information you'd like to share with potential lenders"
                  rows={3}
                />
              </div>

              <div className="flex items-center">
                <Checkbox
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    handleInputChange("agreeToTerms", e.target.checked)
                  }
                  id="agreeToTerms"
                  required
                />
                <label htmlFor="agreeToTerms" className="ml-2">
                  I confirm that all information provided is accurate and agree
                  to the terms and conditions*
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}

            {currentStep < 4 && (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!validateCurrentStep()}
                className="ml-auto"
              >
                Next
              </Button>
            )}

            {currentStep === 4 && (
              <Button
                type="submit"
                disabled={isSubmitting || !formData.agreeToTerms}
                className="ml-auto"
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" /> Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
