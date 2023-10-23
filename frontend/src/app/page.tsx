import type { APIResponseCollection, APIResponseData } from "@/types/types";
import Link from "next/link";

// Lib
import fetcher from "@/lib/fetcher";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Introduction from "@/components/Introduction";

export default async function Home() {
  
  const res = await fetcher("events");

  if (res === null) return <></>;

  const events = await res.json() as APIResponseCollection<"api::event.event">;

  console.log("page -- events", events);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
        <Introduction />

        <div className="col-span-3">
        <Card>
          <CardHeader>
            <h2 className="text-2xl">Share Your Local Event</h2>
          </CardHeader>
          <CardContent>
            <div>
              <h2>Turn this in to a hero section</h2>
              <p>With call to action</p>
              <div className="flex justify-between items-center my-4">
                <Link href={"/"}>Create Event</Link>
                <Link href={"/"}>See All Events</Link>
              </div>
            </div>

            <div className="flex justify-between items-center my-4">
              <Link href={"/register"}>Register</Link>
              <Link href={"/signin"}>Sign In</Link>
            </div>
          </CardContent>
        </Card>
      </div>
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
  )
}
