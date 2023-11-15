"use server";
// https://stackblitz.com/edit/github-x5a9mx?file=components%2FContactForm.tsx
// https://stackoverflow.com/questions/72674930/zod-validator-validate-image

import { cookies } from "next/headers";
import type { StrapiMEResponse } from "@/types/strapi-custom-types";
import meAction from "../loaders/get-me-loader";
import { revalidatePath } from "next/cache";

import { z } from "zod";
import { redirect } from "next/navigation";


const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
});

async function updateUserProfileAction(prevState: any, formData: FormData) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) return { error: "No JWT", ok: false };

  const data = (await meAction()) as StrapiMEResponse;
  const userId = data?.data?.id;
  if (!userId) return { error: "No user id", ok: false };

  const validatedFields = formSchema.safeParse({
    username: formData.get("username"),
    file: formData.get("file"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const { username } = validatedFields.data;

  console.log(username, "FROM UPDATE PROFILE ACTION");
  return null;

//   if (currentDataValue) {
//     const dataObj = JSON.parse(currentDataValue as string);
//     const newObject = { ...dataObj, user: { connect: [userId] } };
//     const updatedDataValue = JSON.stringify(newObject);
//     formData.set("data", updatedDataValue);
//   }

//   const eventResponse = await fetch(
//     `${process.env.STRAPI_URL}/api/user/${userId}`,
//     {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//       body: formData,
//     }
//   );

//   const eventData = await eventResponse.json();
//   revalidatePath("/");
//   revalidatePath("/dashboard/profile");
//   return { ok: true, data: eventData };
// 
}

export default updateUserProfileAction;
