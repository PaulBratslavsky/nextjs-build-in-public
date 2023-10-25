import type { StrapiEventData } from "@/types/strapi-custom-types";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { formatDate, formatTime, getStrapiMedia } from "@/lib/api-helpers";

import Link from "next/link";
import Image from "next/image";

export default function EventCard(data: StrapiEventData) {
  const { id, attributes } = data;
  const urlImage = getStrapiMedia(attributes.image?.data.attributes.url);
  const altText = attributes.image?.data.attributes.alternativeText;
  return (
    <Card
      key={data.id}
      className="grid grid-cols-[22%,55%,23%] items-center rounded-3xl text-sm mb-6"
    >
      <span className="flex flex-col justify-center items-center rounded-l-3xl h-full bg-[#ce1f3a] text-white">
        <CardHeader className="flex flex-col items-center content-center">
          <div>{formatDate(attributes.date)}</div>
          <div>{formatTime(attributes.time)}</div>
        </CardHeader>
        <CardContent className="text-center font-semibold">
          {attributes.location}
        </CardContent>
      </span>
      <span className="flex flex-col gap-4 px-12">
        <CardTitle className="text-xl font-bold ">{attributes.title}</CardTitle>
        <CardDescription className="text-muted-foreground leading-5 whitespace-break-spaces">
          {attributes.description}
        </CardDescription>
        <Link
          href={"/events/" + attributes.slug}
          key={id}
          className="block text-sm uppercase text-[#ce1f3a]"
        >
          learn more...
        </Link>
      </span>
      <span className="flex items-center rounded-r-3xl">
        <CardFooter className="rounded-r-3xl w-full h-full p-4 text-center bg-[#e6e6e6]">
          {urlImage && (
            <Image
              className="rounded-l-3xl w-full h-auto"
              src={urlImage}
              alt={altText ? altText : "Event Image"}
              width={100}
              height={100}
            />
          )}
        </CardFooter>
      </span>
    </Card>
  );
}
