import qs from "qs";
import type { StrapiEventData } from "@/types/strapi-custom-types";
import { Suspense } from "react";
import getPublicEventsAction from "@/loaders/get-public-events-loader";
import EventCardTile from "@/components/EventCardTile";
import { flattenAttributes } from "@/lib/utils";

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
  const upcomingEvents = upcomingEventsResponse?.data.data;
  const flattenResponse = flattenAttributes(upcomingEvents);

  if (!upcomingEvents) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="my-10 grid md:grid-cols-2 gap-8">
        {flattenResponse.map((data: StrapiEventData) => (
          <EventCardTile key={data.id} data={data} />
        ))}
      </div>
    </Suspense>
  );
}
