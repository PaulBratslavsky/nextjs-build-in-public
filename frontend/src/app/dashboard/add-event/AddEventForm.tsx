"use client";
import "react-time-picker/dist/TimePicker.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import slugify from "slugify";
import * as z from "zod";
import { format, parse } from "date-fns";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { ImageField } from "../../../components/ImageField";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";
import checkSlug from "@/loaders/check-slug-loader";
import { renderMessage } from "@/lib/render-message";
import { uploadImage, createEventOnServer } from "@/lib/utils";

import { Button } from "@/components/ui/button";
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
    console.log(file, "from validation");
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
});

// This can come from your database or API.
const defaultValues: Partial<EventFormValues> = {
  title: "My Awesome Event",
  location: "My Awesome Location",
  description: "Tell us about your awesome event.",
  time: "10:00",
  date: new Date(),
};

export function AddEventForm() {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Step 1

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
    mode: "onChange",
  });

  type EventFormValues = z.infer<typeof eventFormSchema>;

  async function onSubmit(values: EventFormValues) {
    const slug = slugify(values.title, { lower: true });
    const hasSlug = await checkSlug(slug);

    if (hasSlug?.data.slugAlreadyExists) {
      renderMessage("Event with this title already exists.", "error");
      return;
    }

    renderMessage("Starting image upload.", "success");
    const imageId = await uploadImage(values.image);

    if (!imageId) return; // uploadImage function handles the message in case of an error.

    const time = format(
      parse(values.time, "HH:mm", new Date()),
      "HH:mm:ss.SSS"
    );

    const eventFormData = new FormData();
    eventFormData.append(
      "data",
      JSON.stringify({
        title: values.title,
        slug,
        time,
        date: values.date,
        location: values.location,
        description: values.description,
        image: imageId,
      })
    );

    renderMessage("Creating your awesome event.", "success");
    const eventCreated = await createEventOnServer(eventFormData);

    if (eventCreated) {
      renderMessage("Event created successfully.", "success");
      router.push("/dashboard/events");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-2/3">
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
              <FormDescription>Location of the event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Title of the event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Location of the event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <TimePicker
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                  disableClock
                />
              </FormControl>
              <FormDescription>Time of the event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                />
              </FormControl>
              <FormDescription>Date of the event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cool event description."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Tell us more about your awesome event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Event</Button>
      </form>
    </Form>
  );
}
