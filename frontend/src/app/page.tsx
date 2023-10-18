import Image from "next/image";
import Link from "next/link";

// Lib
import fetcher from "@/lib/fetcher";
import { Card, CardHeader } from "@/components/ui/card";

export default async function Home() {
  const res = await fetcher("events");
  // const res = await fetch("http://127.0.0.1:1337/api/events");

  if (res === null) return <></>;

  const events = await res.json();

  console.log("page -- events", events);

  /**
   * {
   * id: num,
   * attributes: {
   *  ????
   *  }
   * }
   */

  type Attributes = {
    title: string;
    slug: string;
    created_at: string;
    updated_at: string;
    published_at: string;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="EventsList flex flex-col gap-8">
        {events.data.map((event) => {
          const { id, attributes }: { id: string; attributes: Attributes } =
            event;

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
