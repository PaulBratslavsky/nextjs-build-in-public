"use server";
// https://stackblitz.com/edit/github-x5a9mx?file=components%2FContactForm.tsx
// https://stackoverflow.com/questions/72674930/zod-validator-validate-image

import { cookies } from "next/headers";
import type { StrapiMEResponse } from "@/types/strapi-custom-types";
import meAction from "../loaders/get-me-loader";
import { revalidatePath } from "next/cache";

import { z } from "zod";
import { redirect } from "next/navigation";

const MAX_FILE_SIZE = 200000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  file: z
    .any()
    .refine(
      (file) =>
        file === null ||
        file === undefined ||
        (Array.isArray(file) && file[0]?.size <= MAX_FILE_SIZE),
      `Max image size is 2MB.`
    )
    .refine(
      (file) =>
        file === null ||
        file === undefined ||
        (Array.isArray(file) && ACCEPTED_IMAGE_TYPES.includes(file[0]?.type)),
      "Only .jpg, .jpeg, .png, and .webp formats are supported."
    ),
});

async function updateProfileImageAction(prevState: any, formData: FormData) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) return { error: "No JWT", ok: false };

  const data = (await meAction()) as StrapiMEResponse;
  const userId = data?.data?.id;
  if (!userId) return { error: "No user id", ok: false };

  const validatedFields = formSchema.safeParse({
    username: formData.get("username"),
    file: formData.get("file"),
  });

  for (let pair of formData.entries()) {
    console.dir(pair[0] + ", " + pair[1]);
  }

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const { username } = validatedFields.data;

  console.log(username, "FROM UPDATE PROFILE ACTION");
  return null;

  if (currentDataValue) {
    const dataObj = JSON.parse(currentDataValue as string);
    const newObject = { ...dataObj, user: { connect: [userId] } };
    const updatedDataValue = JSON.stringify(newObject);
    formData.set("data", updatedDataValue);
  }

  const eventResponse = await fetch(
    `${process.env.STRAPI_URL}/api/user/${userId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    }
  );

  const eventData = await eventResponse.json();
  revalidatePath("/");
  revalidatePath("/dashboard/profile");
  return { ok: true, data: eventData };
}

export default updateProfileImageAction;
