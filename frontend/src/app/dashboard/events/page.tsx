
import qs from "qs";
import { Suspense } from "react";
import type { StrapiEventData } from "@/types/strapi-custom-types";
import getEventsAuthAction from "@/actions/get-events-auth-action";

import {  columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import PageHeading from "@/components/PageHeading";

const eventsQuery = qs.stringify({
  populate: {
    image: {
      fields: ["url", "alternativeText"],
    },
  },
  sort: ["date:desc"],
});


export default async function MyEventsRoute() {

  const resEvents = await getEventsAuthAction(eventsQuery);
  const events = resEvents?.data.data as StrapiEventData[];
  
  if (!events) return null;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="space-y-6">
      <PageHeading heading="My Events" subheading="Manage your events." />
      <DataTable columns={columns} data={events} />
    </div>
    </Suspense>
  );
}



