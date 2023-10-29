"use server";
import { cookies } from "next/headers";


async function uploadImage(formData: FormData) {
  const url = `${process.env.STRAPI_URL}/api/upload`;
  const authToken= cookies().get("jwt")?.value;
  if (!authToken) return { error: "No JWT", ok: false };

  const image = formData.get("image");
  const newFormData = new FormData();
  newFormData.append("files", image as Blob);


  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${authToken}`},
    body: newFormData,
  });

  const data = await response.json()
  return { ok: true, data: data};
}

export default uploadImage;


    // ref: "event",
    // refId: "60b2d0d2a5d7a60015d3e9d6",
    // field: "image",
    // source: "users-permissions",
    // path: "image",