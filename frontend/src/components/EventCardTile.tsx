import { formatDate, formatTime, getStrapiMedia } from "@/lib/api-helpers";

import Link from "next/link";

export default function EventCard({ data }: { data: any }) {
  const { id, image, date, time, location, slug, title, description } = data;
  
  const fullImageUrl = image
    ? getStrapiMedia(image.url)
    : "https://picsum.photos/200";

  const altText = image?.alternativeText;
  return (
    <div
      key={data.id}
      className="group grid grid-cols-2 grid-rows-2 rounded-3xl overflow-hidden bg-muted w-full border hover:border-primary"
    >
      <div className="flex flex-col justify-center gap-4 p-4 items-center w-full h-full bg-primary text-white">
        <div className="flex flex-col items-center content-center text-center hover:scale-110 transition-transform duration-300">
          <div>{formatDate(date)}</div>
          <div>{time}</div>
        </div>
        <div className="text-center font-semibold hover:scale-110 transition-transform duration-300">
          {location}
        </div>
      </div>
      <img
        src={fullImageUrl as string}
        alt={altText}
        className="relative bg-white  w-full h-full  overflow-hidden"
      />

      <div className="col-span-2 text-center flex flex-col gap-2 md:gap-4 p-4 sm:px-8 md:px-12">
        <Link
          href={"/events/" + slug}
          key={id}
          className="text-lg sm:text-xl font-bold hover:text-accent"
        >
          {title}
        </Link>
        <div className="text-muted-foreground leading-5 whitespace-break-spaces line-clamp-2 sm:line-clamp-3">
          {description}
        </div>
        <Link
          href={"/events/" + slug}
          key={id}
          className="text-sm uppercase text-primary hover:text-accent"
        >
          learn more...
        </Link>
      </div>
    </div>
  );
}
