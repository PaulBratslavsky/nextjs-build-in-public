import qs from "qs";
import type { StrapiEventData } from "@/types/strapi-custom-types";
import { Suspense } from "react";
import getPublicEventsAction from "@/actions/get-public-events";
import EventCard from "@/components/EventCard";

const allEventsQuery = qs.stringify({
  populate: {
    image: {
      fields: ["url", "alternativeText"],
    },
  },
  sort: ["date:desc"],
  pagination: {
    start: 4,
    limit: 10,
  },
});

export default async function UpcomingEvents() {
  const upcomingEventsResponse = await getPublicEventsAction(allEventsQuery);
  const upcomingEvents = upcomingEventsResponse?.data.data as StrapiEventData[];

  if (!upcomingEvents) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="my-10">
        {upcomingEvents.map((data: StrapiEventData) => (
          <EventCard key={data.id} {...data} />
        ))}
      </div>
    </Suspense>
  );
}
