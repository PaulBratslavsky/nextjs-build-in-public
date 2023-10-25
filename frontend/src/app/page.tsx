import type { APIResponse } from "@/types/types";
import type {
  StrapiEventData,
  StrapiEventDataCollection,
} from "@/types/strapi-custom-types";
import qs from "qs";

// Lib
import fetcher from "@/lib/fetcher";
import { sectionRenderer } from "@/lib/section-renderer";
import EventCard from "@/components/EventCard";

const homePageQuery = qs.stringify({
  populate: {
    sections: {
      populate: {
        images: {
          populate: "*",
        },
        features: {
          populate: "*",
        },
      },
    },
  },
});

const eventsQuery = qs.stringify({
  populate: {
    image: {
      fields: ["url", "alternativeText"],
    },
  },
});

export default async function Home() {
  const resEvents = await fetcher("events", eventsQuery);
  const resHomePage = await fetcher("home-page", homePageQuery);

  const events = (await resEvents?.json()) as StrapiEventDataCollection;

  const homePage =
    (await resHomePage?.json()) as APIResponse<"api::home-page.home-page">;

  const sections = homePage.data.attributes.sections;
  if (!sections) return <div>No Sections Found</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {sections.map((section: any, index: number) =>
        sectionRenderer(section, index)
      )}
      <div className="px-6 max-w-6xl my-10">
        {events.data.map((data: StrapiEventData) => (
          <EventCard key={data.id} {...data} />
        ))}
      </div>
    </main>
  );
}
