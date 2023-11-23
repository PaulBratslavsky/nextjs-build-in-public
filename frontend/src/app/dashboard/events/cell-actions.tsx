"use client"
import { StrapiEventData } from "@/types/strapi-custom-types"

import { updateEventOnServer } from "@/lib/utils"
import {  ArchiveRestore, Eye, EyeOff, ArchiveX, Pencil, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'

interface CellActionProps {
  data: StrapiEventData
}

export const CellActions: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter()

  const toArchive = async (eventId: number) => {   
    const eventFormData = {data: { status: "ARCHIVED" }}
    await updateEventOnServer(eventFormData, eventId)
  }
  const toDraft = async (eventId: number) => {   
    const eventFormData = {data: { status: "DRAFT" }}
    await updateEventOnServer(eventFormData, eventId)
  }
  const toPublic = async (eventId: number) => {   
    const eventFormData = {data: { status: "PUBLIC" }}
    await updateEventOnServer(eventFormData, eventId)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 hover:text-white">
          <span className="sr-only">Open Actions Menu</span>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-1">
        <DropdownMenuLabel>
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="group p-2" onClick={() => router.push(`events/${data.id}`)}>
          <span className="flex items-center w-full rounded-md  group-hover:text-white">
            <Pencil className="h-4 w-4 mr-2" />Edit Event
          </span>          
        </DropdownMenuItem>
        {data.attributes.status === "ARCHIVED"        
          ? <DropdownMenuItem onClick={() => toPublic(data.id)} className="group p-2">
            <span className="flex items-center group-hover:text-white"><ArchiveRestore className="h-4 w-4 mr-2" />Unarchive Event</span>
          </DropdownMenuItem>
          : <DropdownMenuItem className="group p-2" onClick={() => toArchive(data.id)}>          
            <span className="flex items-center group-hover:text-white"><ArchiveX className="h-4 w-4 mr-2" />Archive Event</span>
          </DropdownMenuItem>
        }
        {data.attributes.status === "DRAFT"
          ? <DropdownMenuItem onClick={() => toPublic(data.id)} className="group p-2">
            <span className="flex items-center group-hover:text-white"><Eye className="h-5 w-5 mr-2 hover:text-white" />Publish Event</span>
          </DropdownMenuItem>
          : <DropdownMenuItem onClick={() => toDraft(data.id)} className="group p-2">
            <span className="flex items-center group-hover:text-white"><EyeOff className="h-5 w-5 mr-2 hover:text-white" />Draft Event</span>
          </DropdownMenuItem>
        }
      </DropdownMenuContent>
    </DropdownMenu>   
  )
}

export default CellActions