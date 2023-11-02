import { Metadata } from "next";
import Image from "next/image";
import { SidebarNav } from "@/components/SideBarNav";
import DashboardHeader from "@/components/DashboardHeader";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "My Events",
    href: "/dashboard/events",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
  },
  {
    title: "Add Event",
    href: "/dashboard/add-event",
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}


export default function DashboardLayout({ children }: DashboardLayoutProps) {

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="md:block bg-gray-50 max-h-screen">
        <div className="flex flex-col lg:flex-row">
          <aside className="lg:w-1/4 p-6 bg-muted/70 h-auto lg:min-h-screen">
            <DashboardHeader />
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 w-full p-6 h-[calc(100vh-64px)] overflow-auto">{children}</div>
        </div>
      </div>
    </>
  );
}
