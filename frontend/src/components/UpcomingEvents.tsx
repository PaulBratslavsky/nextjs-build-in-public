import type { StrapiEventData } from "@/types/strapi-custom-types";
import { Suspense } from "react";
import EventCardTile from "@/components/EventCardTile";

import { flattenAttributes } from "@/lib/utils";

export default async function UpcomingEvents({
  events,
}: {
  events: StrapiEventData[];
}) {
  if (!events) return null;

  const flattenedEvents = flattenAttributes(events);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="my-10 grid md:grid-cols-2 gap-8">
        {flattenedEvents.map((data: StrapiEventData) => (
          <EventCardTile key={data.id} data={data} />
        ))}
      </div>
    </Suspense>
  );
}
