"use server";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const getEventsAuthLoader = async (query: string) => {
  noStore();
  const authToken = cookies().get("jwt")?.value;
  // if (!authToken) redirect("/signin");

  const url = query
    ? `${process.env.STRAPI_URL}/api/events?${query}`
    : `${process.env.STRAPI_URL}/api/events`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };
  
  try {
    const response: any = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      return { data: data, ok: true };
    } else return { error: data.error, ok: false };
  } catch (error) {
    console.log(error);
  }
};

export default getEventsAuthLoader;
