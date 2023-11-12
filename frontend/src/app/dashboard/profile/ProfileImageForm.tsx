"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import updateUserProfileImageAction from "@/actions/update-user-profile-image-action";

import { ImageField } from "../../../components/ImageField";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/FormInput";
import { Textarea } from "@/components/ui/textarea";
import { getStrapiMedia } from "@/lib/api-helpers";

export function ProfileImageForm({ userData }: { userData: any }) {
  const { image } = userData.data;
  const fullImageUrl = getStrapiMedia(image.url);
  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | null>(
    fullImageUrl || null
  );

  const initialState = null;
  const [state, dispatch] = useFormState(
    updateUserProfileImageAction,
    initialState
  );

  console.log(state), "from action";

  return (
    <form action={dispatch} className="space-y-8 w-2/3">
      <ImageField
        name="file"
        file={file}
        onFileChange={setFile}
        previewImage={previewImage}
        onPreviewImageChange={setPreviewImage}
      />

      <Button type="submit">Update Profile Image</Button>
    </form>
  );
}
