import qs from "qs";
import getPublicEventsAction from "@/loaders/get-public-events-loader";
import UpcomingEvents from "@/components/UpcomingEvents";
import AllEvents from "@/components/AllEvents";
import type { StrapiEventData } from "@/types/strapi-custom-types";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";

export default async function EventsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const ITEMS_PER_PAGE = 10;

  const allEventsQuery = (currentPage: number, query?: string) =>
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
        ],
      },
      pagination: {
        pageSize: ITEMS_PER_PAGE,
        page: currentPage,
      },
    });

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const upcomingEventsResponse = await getPublicEventsAction(
    allEventsQuery(currentPage, query)
  );

  const events = upcomingEventsResponse?.data.data as StrapiEventData[];
  const pagination = upcomingEventsResponse?.data.meta.pagination;

  return (
    <div className="container mx-auto my-10 max-w-6xl min-h-screen">
      <SearchInput placeholder="Search events..." />
      <div>
        <UpcomingEvents events={events.slice(0, 4)} />
        <AllEvents events={events.slice(4, events.length)} />
      </div>
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={pagination.pageCount} />}
      </div>
    </div>
  );
}
