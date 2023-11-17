import type { EventFlattenProps } from "@/types/strapi-custom-types";
import { formatDate } from "@/lib/api-helpers";
import { CalendarCheck, AlarmCheck, MapPinned } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function EventInfoCard({ data }: { data: EventFlattenProps }) {
  const { time, location, date } = data;
  return (
    <div className="space-y-6">
      <Card className="flex flex-col w-full items-center rounded-3xl border-0 px-6 py-10 bg-muted/70 z-10  backdrop-blur">
        <CardHeader className="p-2 uppercase">event information</CardHeader>
        <Separator className="mx-auto" />
        <CardContent className="p-0 pt-6 w-full flex flex-col items-center gap-4">
          <span className="grid grid-cols-[1.5rem,auto] items-center gap-3 hover:scale-110 duration-200">
            <CalendarCheck className="text-primary h-5 w-5" />
            {formatDate(date)}
          </span>
          <span className="grid grid-cols-[1.5rem,auto] items-center gap-3 hover:scale-110 duration-200">
            <AlarmCheck className="text-primary h-5 w-5" />
            {time}
          </span>
          <span className="grid grid-cols-[1.5rem,auto] items-center gap-3 hover:scale-110 duration-200">
            <MapPinned className="text-primary h-5 w-5" />
            {location}
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
