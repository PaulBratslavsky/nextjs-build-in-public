"use server";
import type { StrapiMEResponse } from "@/types/strapi-custom-types";
import { cookies } from "next/headers";
import meAction from "../loaders/get-me-loader";
import { revalidatePath } from "next/cache";

async function updateUserAction(formData: object, id: string) {
  try {
    const authToken = cookies().get("jwt")?.value;
    if (!authToken) return { error: "No JWT", ok: false };

    const data = (await meAction()) as StrapiMEResponse;
    const userId = data?.data?.id;
    if (!userId) return { error: "No user id", ok: false };

    const response = await fetch(`${process.env.STRAPI_URL}/api/users/` + id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    revalidatePath("/");
    revalidatePath("/dashboard/profile");
    return await response.json();
  } catch (error) {
    console.error("Error updating event:", error);
    return { error: "An error occurred during the update process", ok: false };
  }
}

export default updateUserAction;