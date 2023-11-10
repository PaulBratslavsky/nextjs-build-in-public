"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash2 } from "lucide-react"

import { formatTime } from "@/lib/api-helpers"
import { StrapiEventData } from "@/types/strapi-custom-types"

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
      return (
        <div className="flex gap-1">
        <Button size="icon" variant="ghost" className="hover:text-white"><Pencil className="h-4 w-4" /></Button>
        <Button size="icon" variant="ghost" className="hover:text-white"><Trash2 className="h-4 w-4" /></Button>
        </div>
      )
    },
  },
]
