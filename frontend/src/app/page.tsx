import type {
  APIResponseCollection,
  APIResponseData,
  APIResponse,
} from "@/types/types";
import qs from "qs";
import Link from "next/link";
import Image from 'next/image'

// Lib
import {formatDate, formatTime} from '@/lib/api-helpers'
import fetcher from "@/lib/fetcher";
import { sectionRenderer } from "@/lib/section-renderer";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

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
  const resHomePage = await fetcher("home-page", homePageQuery);
  
  const events =
  (await resEvents?.json()) as APIResponseCollection<"api::event.event">;
  
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
        {events.data.map((event: APIResponseData<"api::event.event">) => {
          const { id, attributes } = event;

          return (            
            <Card className="grid grid-cols-[22%,55%,23%] items-center rounded-3xl text-sm mb-6">
                <span className="flex flex-col justify-center items-center rounded-l-3xl h-full bg-[#ce1f3a] text-white">
                  <CardHeader className="flex flex-col items-center content-center">
                    <div>{formatDate(attributes.date)}</div>
                    <div>{formatTime(attributes.time)}</div>
                  </CardHeader>
                  <CardContent className="text-center font-semibold">
                    {attributes.location}
                  </CardContent>
                </span>
                <span className="flex flex-col gap-4 px-12">
                <CardTitle className="text-xl font-bold ">{attributes.title}</CardTitle>
                <CardDescription className="text-muted-foreground leading-5 whitespace-break-spaces">{attributes.description}</CardDescription>
                <Link href={"/events/" + attributes.slug} key={id} className="block text-sm uppercase text-[#ce1f3a]">learn more...</Link>
                </span>
                <span className="flex items-center rounded-r-3xl">
                  <CardFooter className="rounded-r-3xl w-full h-full p-4 text-center bg-[#e6e6e6]">
                    <Image
                      className="rounded-l-3xl w-full h-auto"
                      src={attributes.image?.attributes.url}
                      alt={attributes.image?.attributes.alternativeText}
                      width={100}
                      height={100}
                    />
                  </CardFooter>
                </span>
              </Card>
          );
        })}
      </div>
    </main>
  )
}
