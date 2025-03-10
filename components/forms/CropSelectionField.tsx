// src/components/forms/CropSelectionField.tsx
import React, { useState } from "react";
import { CropType } from "@/types/loan";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "../ui/CheckBox";
interface CropSelectionFieldProps {
  selectedCrops: CropType[];
  onChange: (crops: CropType[]) => void;
}

export const CropSelectionField: React.FC<CropSelectionFieldProps> = ({
  selectedCrops,
  onChange,
}) => {
  const [otherCrop, setOtherCrop] = useState("");

  // Common crop types in India
  const commonCrops: CropType[] = [
    "rice",
    "wheat",
    "maize",
    "sugarcane",
    "cotton",
    "pulses",
    "soybeans",
    "vegetables",
    "fruits",
  ];

  const handleCropToggle = (crop: CropType) => {
    if (selectedCrops.includes(crop)) {
      onChange(selectedCrops.filter((c) => c !== crop));
    } else {
      onChange([...selectedCrops, crop]);
    }
  };

  const handleAddOther = () => {
    if (otherCrop && !selectedCrops.includes(otherCrop as CropType)) {
      onChange([...selectedCrops, otherCrop as CropType]);
      setOtherCrop("");
    }
  };

  return (
    <div className="space-y-3">
      <label className="block font-medium">Crop Types*</label>
      <p className="text-sm text-gray-600 mb-2">
        Select all crops you plan to cultivate with this loan
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {commonCrops.map((crop) => (
          <div key={crop} className="flex items-center">
            <Checkbox
              id={`crop-${crop}`}
              checked={selectedCrops.includes(crop)}
              onChange={() => handleCropToggle(crop)}
            />
            <label htmlFor={`crop-${crop}`} className="ml-2 capitalize">
              {crop}
            </label>
          </div>
        ))}
      </div>

      <div className="flex items-end gap-2 mt-2">
        <div className="flex-1">
          <label htmlFor="otherCrop" className="block text-sm font-medium mb-1">
            Other Crop
          </label>
          <input
            type="text"
            id="otherCrop"
            value={otherCrop}
            onChange={(e) => setOtherCrop(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Enter other crop type"
          />
        </div>
        <Button
          type="button"
          onClick={handleAddOther}
          disabled={!otherCrop}
          variant="outline"
          size="sm"
        >
          Add
        </Button>
      </div>

      {selectedCrops.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium">Selected crops:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {selectedCrops.map((crop) => (
              <span
                key={crop}
                className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
              >
                {crop}
                <button
                  type="button"
                  className="ml-1 text-blue-600 hover:text-blue-800"
                  onClick={() => handleCropToggle(crop)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
