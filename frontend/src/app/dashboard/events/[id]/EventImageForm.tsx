"use client";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { ImageField } from "@/components/ImageField";
import { Button } from "@/components/ui/button";
import { getStrapiMedia } from "@/lib/api-helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { renderMessage } from "@/lib/render-message";
import { uploadImage, deleteImage, updateEventOnServer } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function EventImageForm({ eventData }: { readonly eventData: any }) {
  const { image } = eventData.data;
  const currentImageId = image?.id;

  const fullImageUrl = image
    ? getStrapiMedia(image.url)
    : "https://picsum.photos/200";

  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | null>(
    fullImageUrl || null
  );

  const eventFormSchema = z.object({
    image: z.any().refine((file) => {
      return file !== undefined;
    }, "Image is required."),
  });

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    mode: "onChange",
  });

  type EventFormValues = z.infer<typeof eventFormSchema>;

  async function onSubmit(values: EventFormValues) {
    if (currentImageId) {
      renderMessage("Removing old image.", "success");
      await deleteImage(currentImageId);
    }

    renderMessage("Starting image upload.", "success");
    const imageId = await uploadImage(values.image);

    if (!imageId) {
      renderMessage("No image id provided.", "error");
      return;
    }

    const eventFormData = { data: { image: imageId } };

    const eventUpdated = await updateEventOnServer(
      eventFormData,
      eventData.data.id
    );

    if (eventUpdated) renderMessage("Image updated successfully.", "success");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Image</FormLabel>
              <FormControl>
                <ImageField
                  file={file}
                  onFileChange={(selected) => {
                    setFile(selected);
                    field.onChange(selected);
                  }}
                  previewImage={previewImage}
                  onPreviewImageChange={setPreviewImage}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Image</Button>
      </form>
    </Form>
  );
}
