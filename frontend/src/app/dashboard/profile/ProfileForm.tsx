"use client";
import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { ImageField } from "../../../components/ImageField";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form} from "@/components/ui/form";
import { FormInput } from "@/components/FormInput";

import { Textarea } from "@/components/ui/textarea";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
  urls: [
    { value: "https://shadcn.com" },
    { value: "http://twitter.com/shadcn" },
  ],
};

export function ProfileForm() {
  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Step 1

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });


  function onSubmit(data: ProfileFormValues) {
    const formData = new FormData();
  
    // Append each form data
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
  
    // Append the file
    if (file) {
      formData.append('file', file); // 'file' here is the field name for the file, you can name it as per your backend's requirements
    }
  
    // Assuming you would be making an HTTP request, this would be an example using the fetch API:
    /*
    fetch("/your-api-endpoint", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(result => {
        console.log("Success:", result);
      })
      .catch(error => {
        console.error("Error:", error);
      });
    */
  
    // For now, just to check our FormData:
    for (let pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
    }
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-2/3">
        <ImageField
          file={file}
          onFileChange={setFile}
          previewImage={previewImage}
          onPreviewImageChange={setPreviewImage}
        />

        <FormInput 
          name="username"
          label="Username"
          placeholder="Username"
          data={form.formState}
        />
    
     
 

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
