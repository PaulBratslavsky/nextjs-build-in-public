"use server";
import { cookies } from "next/headers";
import type { StrapiMEResponse } from "@/types/strapi-custom-types";
import meAction from "../loaders/get-me-loader";
import { revalidatePath } from "next/cache";

async function updateEventAction(formData: object, id: string) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) return { error: "No JWT", ok: false };

  const data = (await meAction()) as StrapiMEResponse;
  const userId = data?.data?.id;
  if (!userId) return { error: "No user id", ok: false };

  const eventResponse = await fetch(
    `${process.env.STRAPI_URL}/api/events/` + id,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const eventData = await eventResponse.json();
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/dashboard/events");
  return { ok: true, data: eventData };
}

export default updateEventAction;
