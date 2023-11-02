import qs from "qs";
import type { StrapiEventData } from "@/types/strapi-custom-types";
import { Suspense } from "react";
import getPublicEventsAction from "@/actions/get-public-events";
import EventCardTile from "@/components/EventCardTile";

const upcomingEventsQuery = qs.stringify({
  populate: {
    image: {
      fields: ["url", "alternativeText"],
    },
  },
  sort: ["date:desc"],
  pagination: {
    start: 0,
    limit: 4,
  },
});

export default async function UpcomingEvents() {
  const upcomingEventsResponse = await getPublicEventsAction(upcomingEventsQuery);
  const upcomingEvents = upcomingEventsResponse?.data.data as StrapiEventData[];
  
  if (!upcomingEvents) return null;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="my-10 grid md:grid-cols-2 gap-8">
        {upcomingEvents.map((data: StrapiEventData) => (
          <EventCardTile key={data.id} {...data} />
        ))}
      </div>
    </Suspense>
  );
}
