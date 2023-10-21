import type {
  APIResponseCollection,
  APIResponseData,
  APIResponse,
} from "@/types/types";
import qs from "qs";
import Link from "next/link";

// Lib
import fetcher from "@/lib/fetcher";
import { sectionRenderer } from "@/lib/section-renderer";
import { Card, CardHeader } from "@/components/ui/card";

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

export default async function Home() {
  const resEvents = await fetcher("events");
  const resHopePage = await fetcher("home-page", homePageQuery);

  const events =
    (await resEvents?.json()) as APIResponseCollection<"api::event.event">;

  const homePage =
    (await resHopePage?.json()) as APIResponse<"api::home-page.home-page">;

  const sections = homePage.data.attributes.sections;
  if (!sections) return <div>No Sections Found</div>;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {sections.map((section: any, index: number) =>
        sectionRenderer(section, index)
      )}
      <div className="EventsList col-span-2">
        {events.data.map((event: APIResponseData<"api::event.event">) => {
          const { id, attributes } = event;
          return (
            <Link href={"#"} key={id}>
              <Card className="mb-4">
                <CardHeader>{attributes.title}</CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
