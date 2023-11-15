import qs from "qs";
import type { StrapiEventData } from "@/types/strapi-custom-types";
import { Suspense } from "react";
import getPublicEventsAction from "@/loaders/get-public-events-loader";
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
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="my-10">
          {upcomingEvents.map((data: StrapiEventData) => (
            <EventCard key={data.id} {...data} />
          ))}
        </div>
      </Suspense>
      <div className="my-10 text-xl rounded-3xl bg-primary text-primary-foreground px-6 py-4 w-fit mx-auto shadow">
        Load more events ...
      </div>
    </div>
  );
}
