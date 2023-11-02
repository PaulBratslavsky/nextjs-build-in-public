import qs from "qs";
import type { StrapiEventData } from "@/types/strapi-custom-types";
import { Suspense } from "react";
import getPublicEventsAction from "@/actions/get-public-events";
import EventCardTile from "@/components/EventCardTile";
import EventCard from "@/components/EventCard";

const eventsQuery = qs.stringify({
  populate: {
    image: {
      fields: ["url", "alternativeText"],
    },
  },
  sort: ["date:desc"],
});

export default async function EventsPage() {
  const resEvents = await getPublicEventsAction(eventsQuery);
  const events = resEvents?.data.data as StrapiEventData[];
  return (
    <div className="container flex min-h-screen flex-col items-center justify-between">
      <div>
      <div className="mt-10 text-xl rounded-3xl bg-gradient-to-br from-secondary via-accent to-secondary text-primary-foreground px-6 py-4 w-fit mx-auto shadow">Upcoming events</div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="my-10 grid md:grid-cols-2 gap-8">
          {events &&
            events.map((data: StrapiEventData) => (
              <EventCardTile key={data.id} {...data} />
            ))}
        </div>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mt-10 text-xl rounded-3xl bg-gradient-to-br from-secondary via-accent to-secondary text-primary-foreground px-6 py-4 w-fit mx-auto shadow">All Events</div>
        <div className="my-10">
          {events &&
            events.map((data: StrapiEventData) => (
              <EventCard key={data.id} {...data} />
            ))}
        </div>
      </Suspense>
      <div className="my-10 text-xl rounded-3xl bg-gradient-to-br from-secondary via-accent to-secondary text-primary-foreground px-6 py-4 w-fit mx-auto shadow">Load more events ...</div>
    </div>
    </div>
  );
}
