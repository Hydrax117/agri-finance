// src/components/forms/LandDetailsField.tsx
import React from "react";
import { Input } from "../ui/input";
import { Select } from "../ui/Select";

interface LandDetailsFieldProps {
  landSize: string;
  landUnit: string;
  landLocation: string;
  landOwnership: string;
  onChange: (field: string, value: string) => void;
}

export const LandDetailsField: React.FC<LandDetailsFieldProps> = ({
  landSize,
  landUnit,
  landLocation,
  landOwnership,
  onChange,
}) => {
  // India states for location dropdown
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block mb-2 font-medium">Land Size*</label>
          <div className="flex">
            <Input
              type="number"
              value={landSize}
              onChange={(e) => onChange("landSize", e.target.value)}
              placeholder="Enter size"
              className="rounded-r-none"
              required
            />
            <Select
              value={landUnit}
              onChange={(e) => onChange("landUnit", e.target.value)}
              className="w-24 rounded-l-none border-l-0"
            >
              <option value="acres">Acres</option>
              <option value="hectares">Hectares</option>
              <option value="bigha">Bigha</option>
              <option value="gunta">Gunta</option>
            </Select>
          </div>
        </div>

        <div className="flex-1">
          <label className="block mb-2 font-medium">Ownership Status</label>
          <Select
            value={landOwnership}
            onChange={(e) => onChange("landOwnership", e.target.value)}
          >
            <option value="owned">Owned</option>
            <option value="leased">Leased</option>
            <option value="familyOwned">Family Owned</option>
            <option value="partialOwnership">Partial Ownership</option>
          </Select>
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium">Land Location*</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            value={landLocation.split(",")[0] || ""}
            onChange={(e) => {
              const district = landLocation.split(",")[1] || "";
              onChange(
                "landLocation",
                `${e.target.value}${district ? "," + district : ""}`
              );
            }}
            required
          >
            <option value="">Select State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Select>

          <Input
            type="text"
            value={landLocation.split(",")[1] || ""}
            onChange={(e) => {
              const state = landLocation.split(",")[0] || "";
              onChange(
                "landLocation",
                `${state ? state + "," : ""}${e.target.value}`
              );
            }}
            placeholder="District/Village"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Land Details (optional)
        </label>
        <textarea
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          rows={2}
          placeholder="Additional details about your land (soil type, irrigation facilities, etc.)"
          onChange={(e) => onChange("landDetails", e.target.value)}
        />
      </div>
    </div>
  );
};
