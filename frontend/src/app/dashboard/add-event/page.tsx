import { Separator } from "@/components/ui/separator";
import { AddEventForm } from "./AddEventForm";

export default function AddEventRoute() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Add Event</h3>
        <p className="text-sm text-muted-foreground">
          Add a new upcoming event.
        </p>
      </div>
      <Separator />
      <AddEventForm />
    </div>
  );
}
