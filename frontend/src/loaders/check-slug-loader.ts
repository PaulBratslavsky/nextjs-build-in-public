"use server";
import { unstable_noStore as noStore } from 'next/cache';

const checkSlugLoader = async (slug: string) => {
  noStore();
  const url = `${process.env.STRAPI_URL}/api/events/get-slug/${slug}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return { ok: true, data: data };
  } catch (error) {
    console.log(error);
  }
};

export default checkSlugLoader;
