import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./ProfileForm";
import PageHeading from "@/components/PageHeading";

export default function ProfileRoute() {
  return (
    <div className="space-y-6">
      <PageHeading heading="Profile" subheading="Manage your profile." />
      <ProfileForm />
    </div>
  );
}
