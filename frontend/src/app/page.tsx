import Link from "next/link";
import type { APIResponseCollection, APIResponseData } from "@/types/types";

// Lib
import fetcher from "@/lib/fetcher";
import { Card, CardHeader } from "@/components/ui/card";

export default async function Home() {
  const res = await fetcher("events");

  if (res === null) return <></>;

  const events = await res.json() as APIResponseCollection<"api::event.event">;

  console.log("page -- events", events);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="EventsList flex flex-col gap-8">
        {events.data.map((event: APIResponseData<"api::event.event">) => {
          const { id, attributes } = event;
          return (
            <Link href={"#"} key={id}>
              <Card>
                <CardHeader>{attributes.title}</CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
