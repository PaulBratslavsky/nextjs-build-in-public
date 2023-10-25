"use server";
import type {
  StrapiLogin,
  StrapiAuthResponse,
} from "@/types/strapi-custom-types";
import { cookies } from "next/headers";

const loginAction = async (formData: StrapiLogin) => {
  const url = `${process.env.STRAPI_URL}/api/auth/local`;

  try {
    const response: any = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-cache",
    });
    const data = (await response.json()) as StrapiAuthResponse;
    if (response.ok && data.jwt) {
      cookies().set("jwt", data.jwt);
      return { data: data.user, ok: true };
    } else return { error: data.error, ok: false };
  } catch (error) {
    console.log(error);
  }
};

export default loginAction;
