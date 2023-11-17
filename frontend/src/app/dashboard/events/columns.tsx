"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArchiveRestore, ArchiveX, Pencil } from "lucide-react";
import { StrapiEventData } from "@/types/strapi-custom-types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { updateEventOnServer } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// type StrapiEventData = {
//   id: string
//   title: string
//   location: string
//   date: string
//   time: string
// }

function ArchiveButton({ eventId }: { eventId: string }) {
  async function handleClick() {
    const eventFormData = {
      data: { status: "ARCHIVED" },
    };
    await updateEventOnServer(eventFormData, eventId);
  }
  return (
    <Button
      onClick={handleClick}
      size="icon"
      variant="ghost"
      className="hover:text-white"
    >
      <ArchiveX className="h-5 w-5" />
    </Button>
  );
}

function RestoreButton({ eventId }: { eventId: string }) {
  async function handleClick() {
    const eventFormData = {
      data: { status: "DRAFT" },
    };
    await updateEventOnServer(eventFormData, eventId);
  }
  return (
    <Button
      onClick={handleClick}
      size="icon"
      variant="ghost"
      className="hover:text-white"
    >
      <ArchiveRestore className="h-5 w-5" />
    </Button>
  );
}

export const columns: ColumnDef<StrapiEventData>[] = [
  {
    id: "title",
    accessorKey: "attributes.title",
    header: "Title",
  },
  {
    id: "status",
    accessorKey: "attributes.status",
    header: "Status",
  },
  {
    id: "location",
    accessorKey: "attributes.location",
    header: "Location",
  },
  {
    id: "date",
    accessorKey: "attributes.date",
    header: "Date",
  },
  {
    id: "time",
    accessorKey: "attributes.time",
    header: "Time",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          <Link href={`events/${row.original.id}`}>
            <Button size="icon" variant="ghost" className="hover:text-white">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <ArchiveButton eventId={String(row.original.id)} />
          <RestoreButton eventId={String(row.original.id)} />
        </div>
      );
    },
  },
];
