import type { StrapiEventData } from "@/types/strapi-custom-types";
import { Suspense } from "react";
import getPublicEventsAction from "@/actions/get-public-events";
import EventCard from "@/components/EventCard";

export default async function EventsList({
  eventsQuery,
}: {
  eventsQuery: string;
}) {
  const resEvents = await getPublicEventsAction(eventsQuery);
  const events = resEvents?.data.data as StrapiEventData[];
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="my-10">
          {events &&
            events.map((data: StrapiEventData) => (
              <EventCard key={data.id} {...data} />
            ))}
        </div>
      </Suspense>
    </div>
  );
}
