"use client";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

function returnName(pathname: string) {
  if (pathname === "/dashboard/events") {
    return "Events";
  }
  if (pathname === "/dashboard/profile") {
    return "Profile";
  }
  if (pathname === "/dashboard/add-event") {
    return "Add Event";
  }
  return "Dashboard";
}

export default function DashboardHeader() {
  const pathname = usePathname();
  return (
    <div>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{returnName(pathname)}</h2>
        <p className="text-muted-foreground">Hey friend. How are you today.</p>
      </div>
      <Separator className="my-6" />
    </div>
  );
}