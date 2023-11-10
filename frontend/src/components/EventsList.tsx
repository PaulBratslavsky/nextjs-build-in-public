import type { StrapiEventData } from "@/types/strapi-custom-types";
import { Suspense } from "react";
import getPublicEventsAction from "@/loaders/get-public-events-loader";
import EventCard from "@/components/EventCard";

export default async function EventsList({
  eventsQuery,
}: {
  readonly eventsQuery: string;
}) {
  const resEvents = await getPublicEventsAction(eventsQuery);
  const events = resEvents?.data.data as StrapiEventData[];
  if (!events) return null;
  return (
    <div className="px-6 max-w-6xl">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="my-10">
          {events.map((data: StrapiEventData) => <EventCard key={data.id} {...data} />)}
        </div>
      </Suspense>
    </div>
  );
}
