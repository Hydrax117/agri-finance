// src/app/farmer/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { FarmerProfile } from "@/types/user";

export default function FarmerProfilePage() {
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FarmerProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    async function fetchProfileData() {
      try {
        // In a real app, this would be an API call to your backend
        const data = await fetch("/api/farmer/profile").then((res) =>
          res.json()
        );
        setProfile(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfileData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleMultiSelectChange = (name: string, value: string) => {
    setFormData((prev) => {
      if (!prev) return null;

      const currentValues =
        (prev[name as keyof FarmerProfile] as string[]) || [];

      if (Array.isArray(currentValues)) {
        // If value already exists, remove it; otherwise, add it
        const newValues = currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value];

        return { ...prev, [name]: newValues };
      }

      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSaving(true);
    try {
      // In a real app, this would be an API call to update the profile
      await fetch("/api/farmer/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setProfile(formData);
      setIsEditing(false);
      setMessage({ text: "Profile updated successfully!", type: "success" });

      // Clear message after 3 seconds
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        text: "Failed to update profile. Please try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
        <p className="text-gray-600">
          Manage your personal and farm information
        </p>
      </div>

      {message.text && (
        <div
          className={`p-4 mb-6 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-white shadow rounded-lg mb-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                {profile?.profilePicture ? (
                  <img
                    src={profile.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-4xl">👨‍🌾</span>
                )}
              </div>
              <h2 className="text-xl font-bold">
                {profile?.firstName} {profile?.lastName}
              </h2>
              <p className="text-gray-600">{profile?.email}</p>
            </div>

            <div className="border-t pt-4">
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-500">
                  Member Since
                </h3>
                <p>
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-500">
                  Account Status
                </h3>
                <div className="flex items-center">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      profile?.isVerified ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  ></span>
                  <p>
                    {profile?.isVerified ? "Verified" : "Pending Verification"}
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-500">
                  Credit Score
                </h3>
                <p className="font-bold">
                  {profile?.creditScore || "Not available"}
                </p>
              </div>
            </div>

            {!isEditing && (
              <Button
                className="w-full mt-4"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </Card>

          <Card className="p-6 bg-white shadow rounded-lg">
            <h2 className="font-bold mb-4">Document Verification</h2>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>ID Verification</span>
                {profile?.documents?.idVerified ? (
                  <span className="text-green-500">✓ Verified</span>
                ) : (
                  <Button variant="secondary" size="sm">
                    Upload
                  </Button>
                )}
              </li>
              <li className="flex justify-between items-center">
                <span>Land Ownership</span>
                {profile?.documents?.landVerified ? (
                  <span className="text-green-500">✓ Verified</span>
                ) : (
                  <Button variant="secondary" size="sm">
                    Upload
                  </Button>
                )}
              </li>
              <li className="flex justify-between items-center">
                <span>Banking Details</span>
                {profile?.documents?.bankVerified ? (
                  <span className="text-green-500">✓ Verified</span>
                ) : (
                  <Button variant="secondary" size="sm">
                    Upload
                  </Button>
                )}
              </li>
            </ul>
          </Card>
        </div>

        {/* Right Column - Profile Details/Form */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-6">
              {isEditing ? "Edit Profile" : "Profile Details"}
            </h2>

            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData?.firstName || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData?.lastName || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData?.email || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData?.phone || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Address Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <Input
                        type="text"
                        name="address"
                        value={formData?.address || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <Input
                        type="text"
                        name="city"
                        value={formData?.city || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <Input
                        type="text"
                        name="state"
                        value={formData?.state || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <Input
                        type="text"
                        name="zipCode"
                        value={formData?.zipCode || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Farm Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Farm Name
                      </label>
                      <Input
                        type="text"
                        name="farmName"
                        value={formData?.farmName || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Farm Size (acres)
                      </label>
                      <Input
                        type="number"
                        name="farmSize"
                        value={formData?.farmSize || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Years of Experience
                      </label>
                      <Input
                        type="number"
                        name="farmingExperience"
                        value={formData?.farmingExperience || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Farm Type
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Crops",
                      "Livestock",
                      "Dairy",
                      "Poultry",
                      "Organic",
                      "Mixed",
                    ].map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`type-${type}`}
                          className="mr-2"
                          checked={formData?.farmType?.includes(type) || false}
                          onChange={() =>
                            handleMultiSelectChange("farmType", type)
                          }
                        />
                        <label htmlFor={`type-${type}`}>{type}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Crop Types
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Corn",
                      "Wheat",
                      "Rice",
                      "Soybeans",
                      "Cotton",
                      "Vegetables",
                      "Fruits",
                      "Coffee",
                      "Tea",
                      "Sugarcane",
                    ].map((crop) => (
                      <div key={crop} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`crop-${crop}`}
                          className="mr-2"
                          checked={formData?.cropTypes?.includes(crop) || false}
                          onChange={() =>
                            handleMultiSelectChange("cropTypes", crop)
                          }
                        />
                        <label htmlFor={`crop-${crop}`}>{crop}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Banking Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Name
                      </label>
                      <Input
                        type="text"
                        name="bankDetails.accountName"
                        value={formData?.bankDetails?.accountName || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Number
                      </label>
                      <Input
                        type="text"
                        name="bankDetails.accountNumber"
                        value={formData?.bankDetails?.accountNumber || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Name
                      </label>
                      <Input
                        type="text"
                        name="bankDetails.bankName"
                        value={formData?.bankDetails?.bankName || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        IFSC Code
                      </label>
                      <Input
                        type="text"
                        name="bankDetails.ifscCode"
                        value={formData?.bankDetails?.swiftCode || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="secondary"
                    className="mr-2"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">
                      First Name
                    </h3>
                    <p>{profile?.firstName || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">
                      Last Name
                    </h3>
                    <p>{profile?.lastName || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">
                      Email
                    </h3>
                    <p>{profile?.email || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">
                      Phone
                    </h3>
                    <p>{profile?.phone || "N/A"}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Address Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-semibold text-gray-500">
                        Address
                      </h3>
                      <p>{profile?.address || "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">
                        City
                      </h3>
                      <p>{profile?.city || "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">
                        State
                      </h3>
                      <p>{profile?.state || "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">
                        ZIP Code
                      </h3>
                      <p>{profile?.zipCode || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Farm Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">
                        Farm Name
                      </h3>
                      <p>{profile?.farmName || "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">
                        Farm Size (acres)
                      </h3>
                      <p>{profile?.farmSize || "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">
                        Years of Experience
                      </h3>
                      <p>{profile?.farmingExperience || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Farm Type
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {profile?.farmType?.map((type) => (
                      <div key={type} className="flex items-center">
                        <span className="mr-2">•</span>
                        <p>{type}</p>
                      </div>
                    )) || "N/A"}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Crop Types
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {profile?.cropTypes?.map((crop) => (
                      <div key={crop} className="flex items-center">
                        <span className="mr-2">•</span>
                        <p>{crop}</p>
                      </div>
                    )) || "N/A"}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Banking Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">
                        Account Name
                      </h3>
                      <p>{profile?.bankDetails?.accountName || "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">
                        Account Number
                      </h3>
                      <p>{profile?.bankDetails?.accountNumber || "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">
                        Bank Name
                      </h3>
                      <p>{profile?.bankDetails?.bankName || "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">
                        IFSC Code
                      </h3>
                      <p>{"N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
