"use server";
import { cookies } from "next/headers";

async function createEvent(formData: FormData) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) return { error: "No JWT", ok: false };

  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    // date: formData.get("date"),
  };

  const eventResponse = await fetch(`${process.env.STRAPI_URL}/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ data: { ...data } }),
  });

  const eventData = await eventResponse.json();
  return { ok: true, data: eventData };
}

export default createEvent;
