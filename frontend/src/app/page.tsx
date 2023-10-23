import type { APIResponseCollection, APIResponseData } from "@/types/types";
import qs from "qs";
import Link from "next/link";

// Lib
import fetcher from "@/lib/fetcher";
import { Card, CardHeader } from "@/components/ui/card";
import Introduction from "@/components/Hero";

const homePageQuery = qs.stringify({
  populate: {
    sections: {
      populate: {
        images: {
          populate: "*",
        }
      }
    }
  },
});

export default async function Home() {
  const resEvents = await fetcher("events");
  const resHopePage = await fetcher("home-page", homePageQuery);

  const events =
    (await resEvents?.json()) as APIResponseCollection<"api::event.event">;
  
    const homePage =
    (await resHopePage?.json()) as APIResponseData<"api::home-page.home-page">;

    console.dir(homePage, { depth: null });

    // TODO: USE THE RESPONSE DATA AND SECTION RENDER FUNCTION THAT WILL BUILD OUT THE HOME PAGE
    // Example: https://github.com/strapi/nextjs-corporate-starter/blob/main/frontend/src/app/%5Blang%5D/page.tsx

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Introduction />
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
