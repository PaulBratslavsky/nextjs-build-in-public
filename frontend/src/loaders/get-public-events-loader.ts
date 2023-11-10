"use server";
import { unstable_noStore as noStore } from 'next/cache';

const getPublicEventsLoader = async (query: string) => {
  noStore();
  const url = query
  ? `${process.env.STRAPI_URL}/api/events?${query}`
  : `${process.env.STRAPI_URL}/api/events`;

  try {
    const response: any = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      return { data: data, ok: true };
    } else return { error: data.error, ok: false };
  } catch (error) {
    console.log(error);
  }
};

export default getPublicEventsLoader;
