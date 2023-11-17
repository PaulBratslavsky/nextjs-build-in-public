import UpcomingEvents from "@/components/UpcomingEvents";
import AllEvents from "@/components/AllEvents";

export default async function EventsPage() {
  return (
    <div className="container mx-auto max-w-6xl min-h-screen">
      <div>
        <UpcomingEvents />
        <AllEvents />
      </div>
    </div>
  );
}
