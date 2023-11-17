import qs from "qs";
import { Suspense } from "react";
import type { StrapiEventData } from "@/types/strapi-custom-types";
import getEventsAuthLoader from "@/loaders/get-events-auth-loader";
import { Archive } from "lucide-react";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import PageHeading from "@/components/PageHeading";
import { Separator } from "@/components/ui/separator";

const eventsQuery = qs.stringify({
  filters: {
    status: {
      $ne: "ARCHIVED",
    },
  },
  sort: ["date:desc"],
});

const eventsArchivedQuery = qs.stringify({
  filters: {
    status: {
      $eq: "ARCHIVED",
    },
  },
  sort: ["date:desc"],
});

export default async function MyEventsRoute() {
  const resEvents = await getEventsAuthLoader(eventsQuery);
  const events = resEvents?.data.data as StrapiEventData[];

  const resEventsArchived = await getEventsAuthLoader(eventsArchivedQuery);
  const eventsArchived = resEventsArchived?.data.data as StrapiEventData[];

  if (!events) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="space-y-6">
        <PageHeading heading="My Events" subheading="Manage your events." />
        <DataTable columns={columns} data={events} />
      </div>
      <Separator className="my-10" />
      <div>
        <h3 className="text-sm flex gap-2">
          <Archive className="h-5 w-5" />
          Your passed and archived events
        </h3>
        <DataTable columns={columns} data={eventsArchived} />
      </div>
    </Suspense>
  );
}
