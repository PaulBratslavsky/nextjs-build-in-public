"use client";

import { useState } from "react";
import * as z from "zod";
import slugify from "slugify";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { checkAndFormatTime } from "@/lib/utils";
import { renderMessage } from "@/lib/render-message";
import { updateEventOnServer } from "@/lib/utils";

import checkSlug from "@/loaders/check-slug-loader";
import { Card } from "@/components/ui/card";
import EventForm from "@/components/EventForm";
import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";

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
  status: z.boolean(),
});

export function EditEventForm({ eventData }: { eventData: any }) {
  const { title, location, description, time, date, content, status } =
    eventData.data;

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
      status: status === "PUBLIC" ? true : false,
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

    const eventFormData = {
      data: {
        title: values.title,
        slug,
        time: values.time,
        isPublic: true,
        date: values.date,
        location: values.location,
        description: values.description,
        content: markdown,
        status: values.status ? "PUBLIC" : "DRAFT",
      },
    };

    await updateEventOnServer(eventFormData, eventData.data.id);
  }

  return (
    <Card className="p-8 border-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <EventForm
            form={form}
            onSubmit={onSubmit}
            markdown={markdown}
            setMarkdown={setMarkdown}
          />

          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
    </Card>
  );
}
