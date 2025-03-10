// src/components/forms/FileUpload.tsx
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  acceptedFileTypes: string;
  currentFile: File | null;
  maxSizeMB?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedFileTypes,
  currentFile,
  maxSizeMB = 5, // Default 5MB max size
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
      onFileSelect(null);
      setError(null);
      return;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      onFileSelect(null);
      return;
    }

    // Validate file type
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const acceptedTypes = acceptedFileTypes
      .split(",")
      .map((type) => type.trim().toLowerCase().replace(".", ""));

    if (fileExtension && !acceptedTypes.includes(fileExtension)) {
      setError(`Invalid file type. Accepted: ${acceptedFileTypes}`);
      onFileSelect(null);
      return;
    }

    setError(null);
    onFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileSelect(null);
    setError(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
          className="hidden"
        />

        <Button
          type="button"
          onClick={handleClick}
          variant="outline"
          className="mr-2"
        >
          Browse Files
        </Button>

        <span className="text-sm text-gray-500">
          {currentFile ? currentFile.name : "No file selected"}
        </span>

        {currentFile && (
          <button
            type="button"
            onClick={removeFile}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <p className="text-xs text-gray-500">
        Accepted file types: {acceptedFileTypes.replace(/\./g, "")} (Max size:{" "}
        {maxSizeMB}MB)
      </p>
    </div>
  );
};
