// import { CheckCircle2 } from "lucide-react";
import type { EventFlattenProps } from "@/types/strapi-custom-types";
import { getStrapiMedia } from "@/lib/api-helpers";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import RichText from "./RichText";


function EventHeader({ data }: { data: EventFlattenProps }) {
  const urlImage = getStrapiMedia(data.image?.url);
  const altText = data.image?.alternativeText;
  const { title, description, location, date, time } = data;
  return (
    <>
      <div className="relative w-full h-[200px] md:h-[400px] rounded-3xl overflow-hidden">
        <Image
          src={urlImage ? urlImage : ""}
          fill
          alt={altText ? altText : "Event Image"}
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="uppercase text-3xl font-semibold leading-tight tracking-tight my-6">
          {title}
        </h2>
        <p className="text-muted-foreground tracking-wide">{description}</p>
      </div>
    </>
  );
}

function EventContent({ data }: { data: EventFlattenProps }) {
  const { content } = data;
  return (
    <div>
      <h3 className="uppercase text-lg py-2 font-semibold">Events Details</h3>
      <Separator />
      <RichText content={content} />
    </div>
  );
}

export default function EventDetails({ data }: { data: EventFlattenProps }) {
  return (
    <div className="space-y-10">
      <EventHeader data={data} />
      <EventContent data={data} />
    </div>
  );
}
