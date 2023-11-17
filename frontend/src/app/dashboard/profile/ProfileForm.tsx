"use client";
import { useFormState } from "react-dom";
import updateUserAction from "@/actions/update-user-action";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/FormInput";
import { Card } from "@/components/ui/card";

export function ProfileForm({ userData }: { userData: any }) {
  const initialState = null;
  const { username, email, bio, urls } = userData.data;
  const [state, dispatch] = useFormState(updateUserAction as any, initialState);

  return (
    <Card className="p-8 border-none">

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
    </Card>
  );
}
