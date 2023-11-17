"use client";
import "react-time-picker/dist/TimePicker.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import { useState } from "react";
import * as z from "zod";
import slugify from "slugify";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { checkAndFormatTime } from "@/lib/utils";
import { renderMessage } from "@/lib/render-message";
import { updateEventOnServer } from "@/lib/utils";

import checkSlug from "@/loaders/check-slug-loader";
import { Card } from "@/components/ui/card";

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
import { Button } from "@/components/ui/button";

type EventFormValues = z.infer<typeof eventFormSchema>;

const eventFormSchema = z.object({
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

export function EditEventForm({ eventData }: { eventData: any }) {
  const { title, location, description, time, date, content } = eventData.data;

  const [markdown, setMarkdown] = useState(content);

  // TODO: LEARN MORE ABOUT SETTING DATE AND TIME
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: title,
      location: location,
      description: description,
      time: time,
      date: new Date(date),
    },
    mode: "onChange",
  });

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

    const time = checkAndFormatTime(values.time);

    const eventFormData = {
      data: {
        title: values.title,
        slug,
        time,
        isPublic: true,
        date: values.date,
        location: values.location,
        description: values.description,
        content: markdown,
      },
    };

    await updateEventOnServer(eventFormData, eventData.data.id);
  }

  return (
    <Card className="p-8 border-none">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid lg:grid-cols-[auto,auto] gap-4 lg:gap-8">
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                <FormMessage />
              </FormItem>
            )}
          />
          <div data-color-mode="light">
            <MDEditor
              value={markdown}
              onChange={(value) => setMarkdown(value || "")}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
          </div>

          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </Card>
  );
}
