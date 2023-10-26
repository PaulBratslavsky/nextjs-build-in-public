"use client";
import "react-time-picker/dist/TimePicker.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImageField } from "../../../components/ImageField";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";
import * as z from "zod";

// import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const eventFormSchema = z.object({
  location: z
    .string()
    .min(2, {
      message: "Location must be at least 2 characters.",
    })
    .max(144, {
      message: "Location must not be longer than 144 characters.",
    }),
  time: z.string(),
  date: z.date(),
  description: z.string().max(160).min(4),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<EventFormValues> = {
  description: "Tell us about your awesome event.",
  time: "10:00",
  date: new Date(),
};

export function AddEventForm() {
  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Step 1

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: EventFormValues) {
    const formData = new FormData();

    // Append each form data
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    // Append the file
    if (file) {
      formData.append("file", file); // 'file' here is the field name for the file, you can name it as per your backend's requirements
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
      console.log(pair[0] + ", " + pair[1]);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ImageField
          file={file}
          onFileChange={setFile}
          previewImage={previewImage}
          onPreviewImageChange={setPreviewImage}
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
