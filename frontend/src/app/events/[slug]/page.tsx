import { Suspense } from "react";
import getEventsDetails from "@/loaders/get-event-details-loader";
import UserAvatarCard from "@/components/UserAvatarCard";
import EventInfoCard from "@/components/EventInfoCard";
import EventDetail from "@/components/EventDetail";

const DetailPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const eventDetailsResponse = await getEventsDetails(slug);
  const eventData = eventDetailsResponse?.data;

  if (!eventData) return <div>Event not found.</div>;

  return (
    <div className="container my-10">
      <div className="grid grid-cols-1 lg:grid-cols-[auto,30%] gap-12 lg:gap-20">
        <Suspense fallback={<div>Loading...</div>}>
          <EventDetail data={eventData}/>
          <div>
            <UserAvatarCard data={eventData.user}/>
            <EventInfoCard data={eventData}/>
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default DetailPage;
