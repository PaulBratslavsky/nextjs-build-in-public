"use server";
import type {
  StrapiLogin,
  StrapiAuthResponse,
} from "@/types/strapi-custom-types";
import { cookies } from "next/headers";

const loginAction = async (data: StrapiLogin) => {
  const url = `${process.env.STRAPI_URL}/api/auth/local`;

  const body = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response: any = await fetch(url, body);
    const data = (await response.json()) as StrapiAuthResponse;
    if (response.ok && data.jwt) {
      cookies().set("jwt", data.jwt);
      return { ok: true };
    } else return { error: data.error, ok: false };
  } catch (error) {
    console.log(error);
  }
};

export default loginAction;
