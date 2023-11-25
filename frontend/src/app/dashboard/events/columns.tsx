"use client";

import { ColumnDef } from "@tanstack/react-table"
import { StrapiEventData } from "@/types/strapi-custom-types"
import CellActions from "./cell-actions"

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
    cell: ({ row }) => <div className="flex items-center justify-center"><CellActions data={row.original} /></div>,
  },
]
