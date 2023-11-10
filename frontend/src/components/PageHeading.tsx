import React from "react";
import { Separator } from "@/components/ui/separator";
export default function PageHeading({
  heading = "Heading",
  subheading = "Subheading",
}: {
  heading: string;
  subheading: string;
}) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium">{heading}</h3>
        <p className="text-sm text-muted-foreground">
          {subheading}
        </p>
      </div>
      <Separator />
    </div>
  );
}
