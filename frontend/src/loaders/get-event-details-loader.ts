"use server";
import qs from "qs";
import { flattenAttributes } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";

const query = (slug: string) =>
  qs.stringify({
    filters: {
      slug: slug,
    },
  });

const getEventsDetailsLoader = async (slug: string) => {
  noStore();
  const url = query
    ? `${process.env.STRAPI_URL}/api/events?${query(slug)}`
    : `${process.env.STRAPI_URL}/api/events`;

  try {
    const response: any = await fetch(url);
    const data = await response.json();
    const event = data.data[0];
    const eventFlattened = flattenAttributes(event);
    if (response.ok && event) {
      return { data: eventFlattened, ok: true };
    } else return { error: data.error, ok: false };
  } catch (error) {
    console.log(error);
  }
};

export default getEventsDetailsLoader;
