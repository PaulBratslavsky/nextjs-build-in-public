import UpcomingEvents from "@/components/UpcomingEvents";
import AllEvents from "@/components/AllEvents";

export default async function EventsPage() {
  return (
    <div className="container mx-auto max-w-6xl min-h-screen">
      <div>
        {/* <div className="mt-10 text-xl rounded-3xl bg-gradient-to-br from-primary via-accent to-secondary text-primary-foreground px-6 py-4 w-fit mx-auto shadow">
          Upcoming events
        </div> */}
        <UpcomingEvents />
        <AllEvents />
      </div>
    </div>
  );
}
