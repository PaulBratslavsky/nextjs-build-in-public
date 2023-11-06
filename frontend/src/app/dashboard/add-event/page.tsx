import PageHeading from "@/components/PageHeading";
import { AddEventForm } from "./AddEventForm";

export default function AddEventRoute() {
  return (
    <div className="space-y-6">
      <PageHeading heading="Add Event" subheading="Add a new event." />
      <AddEventForm />
    </div>
  );
}
