import type { StrapiEventData } from "@/types/strapi-custom-types";
import { Suspense } from "react";
import EventCard from "@/components/EventCard";

export default async function UpcomingEvents({
  events,
}: {
  events: StrapiEventData[];
}) {
  if (!events) return null;

  return (
    <div className="my-10">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="my-10">
          {events.map((data: StrapiEventData) => (
            <EventCard key={data.id} {...data} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
