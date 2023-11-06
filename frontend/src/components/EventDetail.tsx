import { QuoteIcon, CheckCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface EventDetails {
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  location: string;
  date: string;
  time: string;
  id: string;
}

interface EventHeader {
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  location: string;
  date: string;
  time: string;
  id: string;
}

function EventHeader({ data }: { data: EventHeader}) {
  const {title, description, location, date, time} = data;
  return (
    <div>
      <div className="relative w-full h-[200px] md:h-[400px] px-10 rounded-3xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1738&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          fill
          alt="Stock image"
          className="object-cover"
        />
      </div>

      <div>
        <h2 className="uppercase text-3xl font-semibold leading-tight tracking-tight my-6">
          {title}
        </h2>
        <p className="text-muted-foreground tracking-wide">
          {description}
        </p>
      </div>

      <div className="bg-muted mt-8 p-8 md:p-12 rounded-3xl grid grid-cols-[4rem,auto] items-center">
        <QuoteIcon className="rotate-180 h-12 w-12 text-muted-foreground/10 fill-foreground/20 self-start" />
        <p className="leading-relaxed text-lg text-muted-foreground">
          "Mus delectus incidunt tincidunt, placerat nobis dolore maiores etiam
          porttitor! Quo auctor laudantium praesent eleifend.Quia dignissimos
          quidem lectus nulla. "
        </p>
      </div>
    </div>
  );
}

function EventContent() {
  return (
    <div>
      <h3 className="uppercase text-lg py-2 font-semibold">
        key point of this session
      </h3>
      <Separator />
      <p className="text-muted-foreground tracking-wide pt-6">
        Quam amet tristique adipisicing incididunt arcu, excepturi molestie
        turpis deserunt ducimus malesuada minus mauris veniam. Veniam
        exercitationem? Phasellus? Officia pulvinar sem cumque? Quo? Unde natus,
        ducimus non illum facilisi voluptatem quisque.
      </p>
      <ul className="py-4 grid grid-cols-2 gap-1 group">
        <li className="grid grid-cols-[1rem,auto]  items-center gap-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <p className="text-muted-foreground font-medium hover:text-secondary">
            Huge Achivement
          </p>
        </li>
        <li className="grid grid-cols-[1rem,auto] items-center gap-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <p className="text-muted-foreground hover:text-secondary font-medium">
            Huge Achivement
          </p>
        </li>
        <li className="grid grid-cols-[1rem,auto] items-center gap-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <p className="text-muted-foreground hover:text-secondary font-medium">
            Huge Achivement
          </p>
        </li>
        <li className="grid grid-cols-[1rem,auto] items-center gap-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <p className="text-muted-foreground hover:text-secondary font-medium">
            Huge Achivement
          </p>
        </li>
      </ul>
    </div>
  );
}

export default function EventDetails({ data }: { data: EventDetails }) {
  return (
    <div className="space-y-10">
      <EventHeader data={data} />
      <EventContent />
    </div>
  );
}
