"use server";
import type { StrapiMEResponse } from "@/types/strapi-custom-types";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from 'next/cache';


const meAction = async () => {
  noStore();
  const url = `${process.env.STRAPI_URL}/api/users/me`;
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) return { error: "No JWT", ok: false };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });
    const data = (await response.json()) as StrapiMEResponse;
    return { ok: true, data: data };
  } catch (error) {
    console.log(error);
  }
};

export default meAction;
