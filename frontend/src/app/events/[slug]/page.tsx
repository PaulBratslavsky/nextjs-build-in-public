import { Suspense } from "react";
import getEventsDetails from "@/actions/get-event-details";
import UserAvatarCard from "@/components/UserAvatarCard";
import EventDetail from "@/components/EventDetail";

const DetailPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const eventDetailsResponse = await getEventsDetails(slug);
  const eventData = eventDetailsResponse?.data;
  console.dir(eventData, { depth: null });
  return (
    <div className="container my-10">
      <div className="grid lg:grid-cols-[auto,30%] gap-12 lg:gap-32">
        <Suspense fallback={<div>Loading...</div>}>
          <EventDetail data={eventData}/>
          <UserAvatarCard />
        </Suspense>
      </div>
    </div>
  );
};

export default DetailPage;
