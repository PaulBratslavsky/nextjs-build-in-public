import type { StrapiEventData } from "@/types/strapi-custom-types";

import { formatDate, formatTime, getStrapiMedia } from "@/lib/api-helpers";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function EventCard(data: StrapiEventData) {
  const { id, attributes } = data;
  const urlImage = getStrapiMedia(attributes.image?.data.attributes.url);
  const altText = attributes.image?.data.attributes.alternativeText;
  return (
    <div
      key={data.id}
      className="group grid grid-cols-2 grid-rows-2 rounded-3xl overflow-hidden bg-muted w-full border hover:border-primary">
      <div className="flex flex-col justify-center gap-4 p-4 items-center w-full h-full bg-secondary text-white">
        <div className="flex flex-col items-center content-center text-center hover:scale-110 transition-transform duration-300">
          <div>{formatDate(attributes.date)}</div>
          <div>{formatTime(attributes.time)}</div>
        </div>
        <div className="text-center font-semibold hover:scale-110 transition-transform duration-300">
          {attributes.location}
        </div>
      </div>      
      <div className="relative bg-secondary/20 flex flex-col gap-2 items-center w-full h-full justify-center overflow-hidden transform duration-200 ">
          {urlImage && (
            <Avatar className="h-20 w-20 peer">
              <AvatarImage src={urlImage} />
              <AvatarFallback>{altText}</AvatarFallback>
            </Avatar>
          )}
          <p className="text-muted-foreground">Person Name</p>
      </div>
      <div className="col-span-2 text-center flex flex-col gap-2 md:gap-4 p-4 sm:px-8 md:px-12">
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
    </div>
  );
}
