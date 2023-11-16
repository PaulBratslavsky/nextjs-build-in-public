"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import updateProfileAction from "@/actions/update-event-action";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/FormInput";
import { Textarea } from "@/components/ui/textarea";
import { getStrapiMedia } from "@/lib/api-helpers";

export function EditEventForm({ eventData }: { eventData: any }) {
  const initialState = null;
  const { username, email, bio, urls } = eventData.data;
  const [state, dispatch] = useFormState(updateProfileAction as any, initialState);

  console.log(state), "from action";

  return (
    <form action={dispatch} className="space-y-8 w-2/3">
      <FormInput
        name="username"
        label="Username"
        placeholder="Username"
        defaultValue={username}
        data={state}
      />

      <Button type="submit">Update profile</Button>
    </form>
  );
}
