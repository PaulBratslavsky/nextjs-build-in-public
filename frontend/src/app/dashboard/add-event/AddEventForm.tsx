"use client";

import slugify from "slugify";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImageField } from "../../../components/ImageField";

import checkSlug from "@/loaders/check-slug-loader";
import { renderMessage } from "@/lib/render-message";
import { uploadImage, createEventOnServer } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EventForm from "@/components/EventForm";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type EventFormValues = z.infer<typeof eventFormSchema>;

const eventFormSchema = z.object({
  image: z.any().refine((file) => {
    return file !== undefined;
  }, "Image is required."),

  location: z
    .string()
    .min(2, {
      message: "Location must be at least 2 characters.",
    })
    .max(144, {
      message: "Location must not be longer than 144 characters.",
    }),
  title: z.string().min(2).max(75),
  time: z.string(),
  date: z.date(),
  description: z.string().max(160).min(4),
  status: z.boolean(),
});

// This can come from your database or API.
const defaultValues: Partial<EventFormValues> = {
  title: "My Awesome Event",
  location: "My Awesome Location",
  description: "Tell us about your awesome event.",
  time: "10:00",
  status: false,
};

export function AddEventForm() {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [markdown, setMarkdown] = useState("**Hello world!!!**");

  const [previewImage, setPreviewImage] = useState<string | null>(null); // Step 1

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
    mode: "onChange",
  });

  type EventFormValues = z.infer<typeof eventFormSchema>;

  async function onSubmit(values: EventFormValues) {
    const slug = slugify(values.title, {
      lower: true,
      strict: true,
      trim: true,
    });
    const hasSlug = await checkSlug(slug);

    if (hasSlug?.data.slugAlreadyExists) {
      renderMessage("Event with this title already exists.", "error");
      return;
    }

    renderMessage("Starting image upload.", "success");
    const imageId = await uploadImage(values.image);

    if (!imageId) return; // uploadImage function handles the message in case of an error.

    const eventFormData = new FormData();
    eventFormData.append(
      "data",
      JSON.stringify({
        title: values.title,
        slug,
        time: values.time,
        date: values.date,
        location: values.location,
        description: values.description,
        content: markdown,
        image: imageId,
        status: values.status ? "PUBLIC" : "DRAFT",
      })
    );

    renderMessage("Creating your awesome event.", "success");
    const eventCreated = await createEventOnServer(eventFormData);

    if (eventCreated) {
      renderMessage("Event created successfully.", "success");
      router.push("/dashboard/events");
    }
  }

  // TODO: ADD IS PUBLIC FIELD TO FORM AND TO SCHEMA

  return (
    <Card className="p-8 border-none w-2/3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
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
                <FormDescription>Add cool image of the event.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <EventForm
            form={form}
            onSubmit={onSubmit}
            markdown={markdown}
            setMarkdown={setMarkdown}
          />

          <Button type="submit">Create Event</Button>
        </form>
      </Form>
    </Card>
  );
}
