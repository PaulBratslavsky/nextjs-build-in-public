"use client";
import React from "react";
import { Input } from "@/components/ui/input";

interface ImageFieldProps {
  file: File | undefined;
  onFileChange: (file: File | undefined) => void;
  previewImage: string | null;
  onPreviewImageChange: (image: string | null) => void;
  existingPreviewUrl?: string;
  rest?: any;
}

export function ImageField({
  file,
  onFileChange,
  previewImage,
  onPreviewImageChange,
  existingPreviewUrl,
  ...rest
}: ImageFieldProps) {
  
  const FILE_SIZE_LIMIT = 2 * 1024 * 1024; // 2MB
  const SUPPORTED_FILE_TYPES = ['image/jpeg', 'image/png'];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    // File Size Validation
    if (selectedFile && selectedFile.size > FILE_SIZE_LIMIT) {
      alert("File size exceeds the 2MB limit.");
      return;
    }

    // File Type Validation
    if (selectedFile && !SUPPORTED_FILE_TYPES.includes(selectedFile.type)) {
      alert("Unsupported file type. Please upload a JPEG or PNG image.");
      return;
    }

    onFileChange(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          onPreviewImageChange(event.target.result as string);
        }
      };

      reader.readAsDataURL(selectedFile);
    } else {
      onPreviewImageChange(null);
    }
  };

  const displayedPreview = previewImage || existingPreviewUrl;

  return (
    <React.Fragment>
      <Input type="file"  onChange={handleImageChange} { ...rest }/>
      {displayedPreview && (
        <div className="mt-4">
          <img
            src={displayedPreview}
            alt="Profile Preview"
            style={{ maxWidth: "200px" }}
          />
        </div>
      )}
    </React.Fragment>
  );
}
