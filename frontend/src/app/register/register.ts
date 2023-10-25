"use server";

import { cookies } from "next/headers";

interface StrapiRegister {
  username: string;
  email: string;
  password: string;
}

const register = async (data: StrapiRegister) => {
  const url = `${process.env.STRAPI_URL}/api/auth/local/register`;

  const body = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response: any = await fetch(url, body);

    // Set cookies
    cookies().set("jwt", response.jwt);

    console.log(response, "############### REGISTER RESPONSE ###############");

    return { ok: true };
  } catch (error) {
    console.log(error, "############### REGISTER ERROR ###############");
  }
};

export default register;
