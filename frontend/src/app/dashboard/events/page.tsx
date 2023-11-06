
import qs from "qs";
import EventListAuth from "@/components/EventListAuth"

const eventsQuery = qs.stringify({
  populate: {
    image: {
      fields: ["url", "alternativeText"],
    },
  },
  sort: ["date:desc"],
});
import PageHeading from "@/components/PageHeading";

export default function MyEventsRoute() {
  return (
    <div className="space-y-6">
      <PageHeading heading="My Event" subheading="Manage your events." />
      <EventListAuth eventsQuery={eventsQuery} />
    </div>
  );
}



