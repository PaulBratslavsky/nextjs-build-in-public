import qs from "qs";
import { Suspense } from "react";
import type { StrapiEventData } from "@/types/strapi-custom-types";
import getEventsAuthLoader from "@/loaders/get-events-auth-loader";
import SearchInput from "@/components/SearchInput";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import PageHeading from "@/components/PageHeading";
import { Card } from "@/components/ui/card";
import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 10;

const myEventsQuery = (currentPage: number, query?: string) =>
  qs.stringify({
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
    },
    sort: ["date:desc"],
    filters: {
      $or: [
        {
          title: {
            $contains: query,
          },
        },
        {
          description: {
            $contains: query,
          },
        },
        {
          content: {
            name: {
              $contains: query,
            },
          },
        },
        {
          status: {
            $contains: query,
          },
        },
      ],
    },
    pagination: {
      pageSize: ITEMS_PER_PAGE,
      page: currentPage,
    },
  });

export default async function MyEventsRoute({
  searchParams,
}: {
  readonly searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const resEvents = await getEventsAuthLoader(
    myEventsQuery(currentPage, query)
  );

  const events = resEvents?.data.data as StrapiEventData[];

  if (!events) return null;
  return (
    <div className="space-y-6 container mx-auto">
      <PageHeading heading="My Events" subheading="Manage your events." />
      <Suspense fallback={<div>Loading...</div>}>
        <Card className="p-8  space-y-6 border-none">
          <SearchInput placeholder="Search events..." />
          <DataTable columns={columns} data={events} />
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={1} />
          </div>
        </Card>
      </Suspense>
    </div>
  );
}
