import type { APIResponse } from "@/types/types";
import qs from "qs";

// Lib
import fetcher from "@/lib/fetcher";
import { sectionRenderer } from "@/lib/section-renderer";
import EventList from "@/components/EventsList";
import CTASection from "@/components/CTASection";

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
  sort: ["date:desc"],
  pagination: {
    pageSize: 5,
    page: 1,
  },
});

export default async function Home() {
  const resHomePage = await fetcher("home-page", homePageQuery);
  const homePage =
    (await resHomePage?.json()) as APIResponse<"api::home-page.home-page">;

  const sections = homePage.data.attributes.sections;
  if (!sections) return <div>No Sections Found</div>;

  return (
    <div>
      <div className="container flex min-h-screen flex-col items-center justify-between">
        {sections.map((section: any, index: number) =>
          sectionRenderer(section, index)
        )}
        <EventList eventsQuery={eventsQuery} />
      </div>
      <CTASection
        subHeading="join the event"
        heading="don't miss the opportunity, grab your tickets now!"
        text="Quam amet tristique adipisicing incididunt arcu, excepturi molestie turpis deserunt ducimus malesuada minus mauris veniam.excepturi molestie turpis deserunt ducimus malesuada minus mauris veniam."
        linkLabel="Choose your event"
      />
    </div>
  );
}
