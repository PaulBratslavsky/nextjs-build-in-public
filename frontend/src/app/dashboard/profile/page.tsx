import getMeLoader from "@/loaders/get-me-loader";
import { ProfileForm } from "./ProfileForm";
import PageHeading from "@/components/PageHeading";
import { UserImageForm } from "./UserImageForm";

export default async function ProfileRoute() {
  const userData = await getMeLoader();
  return (
    <div className="space-y-6 container mx-auto">
      <PageHeading heading="Profile" subheading="Manage your profile." />
      <div className="grid lg:grid-cols-[auto,30%] gap-8 lg:gap-16">
        <ProfileForm userData={userData} />
        <UserImageForm userData={userData} />
      </div>
    </div>
  );
}
