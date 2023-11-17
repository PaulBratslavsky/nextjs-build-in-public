"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArchiveRestore, ArchiveX, Pencil } from "lucide-react"
import { formatTime } from "@/lib/api-helpers"
import { StrapiEventData } from "@/types/strapi-custom-types"
import Link from "next/link";
import { Button } from "@/components/ui/button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// type StrapiEventData = {
//   id: string
//   title: string
//   location: string
//   date: string
//   time: string
// }


export const columns: ColumnDef<StrapiEventData>[] = [
  {
    id: "title",
    accessorKey: "attributes.title",
    header: "Title",
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
    cell: ({ row }) => {
      const time = row.original.attributes.time        
      return <div>{formatTime(time)}</div>
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      console.log(row.original.id)
      return (
        <div className="flex gap-1">
        <Link href={`events/${row.original.id}`}><Button size="icon" variant="ghost" className="hover:text-white"><Pencil className="h-4 w-4" /></Button></Link>
        <Button size="icon" variant="ghost" className="hover:text-white"><ArchiveX className="h-5 w-5" /></Button>
        <Button size="icon" variant="ghost" className="hover:text-white"><ArchiveRestore className="h-5 w-5" /></Button>
        </div>
      )
    },
  },
]
