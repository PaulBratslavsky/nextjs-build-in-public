import UpcomingEvents from "@/components/UpcomingEvents";
import AllEvents from "@/components/AllEvents";
import getPublicEventsAction from '@/actions/get-public-events'
import { StrapiEventData } from "@/types/strapi-custom-types"
import qs from "qs"

const eventsQuery = qs.stringify({
  populate: {
    image: {
      fields: ["url", "alternativeText"],
    },
  },
  sort: ["date:desc"],
  pagination: {
    pageSize: 5,
    page: 1,
  },
});

export default async function EventsPage() {
  const resEvents = await getPublicEventsAction(eventsQuery);
  const events = resEvents?.data.data as StrapiEventData[];
  return (
    <div className="container mx-auto max-w-6xl min-h-screen">
      <div>
        {/* <div className="mt-10 text-xl rounded-3xl bg-gradient-to-br from-primary via-accent to-secondary text-primary-foreground px-6 py-4 w-fit mx-auto shadow">
          Upcoming events
        </div> */}
        <UpcomingEvents />
        <AllEvents />
        <div className="my-10 text-xl rounded-3xl bg-primary text-primary-foreground px-6 py-4 w-fit mx-auto shadow">
          Load more events ...
        </div>
      </div>
    </div>
  );
}
