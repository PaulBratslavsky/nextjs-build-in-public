import qs from "qs";
import EventList from "@/components/EventsList";

const eventsQuery = qs.stringify({
  populate: {
    image: {
      fields: ["url", "alternativeText"],
    },
  },
});

export default async function EventsPage() {
  return (
    <div className="container flex min-h-screen flex-col items-center justify-between">
      <EventList eventsQuery={eventsQuery} />
    </div>
  );
}
