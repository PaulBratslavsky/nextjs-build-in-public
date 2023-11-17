import type { StrapiEventData } from "@/types/strapi-custom-types";

import { formatDate, formatTime, getStrapiMedia } from "@/lib/api-helpers";

import Link from "next/link";
import Image from "next/image";

export default function EventCard(data: StrapiEventData) {
  const { id, attributes } = data;
  const urlImage = getStrapiMedia(attributes.image?.data.attributes.url);
  const altText = attributes.image?.data.attributes.alternativeText;
  return (
    <div
      key={data.id}
      className="relative group flex flex-col sm:grid sm:grid-cols-[30%,auto] lg:grid-cols-[22%,55%,23%] sm:h-[200px] items-center rounded-3xl text-sm mb-6 border hover:border-primary overflow-hidden"
    >
      <div className="grid grid-cols-[35%,65%] sm:flex sm:flex-col justify-center gap-4 p-4 items-center w-full h-full bg-primary text-white">
        <div className="flex flex-col items-center content-center text-center hover:scale-110 transition-transform duration-300">
          <div>{formatDate(attributes.date)}</div>
          <div>{attributes.time}</div>
        </div>
        <div className="text-center font-semibold hover:scale-110 transition-transform duration-300">
          {attributes.location}
        </div>
      </div>
      <div className="flex flex-col gap-2 md:gap-4 p-4 sm:px-8 md:px-12">
        <Link
          href={"/events/" + attributes.slug}
          key={id} className="text-lg sm:text-xl font-bold hover:text-accent">
            {attributes.title}
        </Link>
        <div className="text-muted-foreground leading-5 whitespace-break-spaces line-clamp-2 sm:line-clamp-3">
          {attributes.description}
        </div>
        <Link
          href={"/events/" + attributes.slug}
          key={id}
          className="text-sm uppercase text-primary hover:text-accent"
        >
          learn more...
        </Link>
      </div>
      <div className="relative hidden lg:flex md:items-center w-full h-full justify-center overflow-hidden">
          {urlImage && (
            <Image
              className="w-full h-full object-cover"
              src={urlImage}
              alt={altText ? altText : "Event Image"}
              width={100}
              height={100}
            /> 
          )}
          <div className="block absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-gradient-to-r from-white from-5% to-50% group-hover:opacity-0 transition-opacity duration-300"></div>
      </div>
    </div>
  );
}
