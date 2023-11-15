import getMeLoader from "@/loaders/get-me-loader";
import { ProfileForm } from "./ProfileForm";
import PageHeading from "@/components/PageHeading";
import {ProfileImageForm } from "./ProfileImageForm";

export default async function ProfileRoute() {
  const userData = await getMeLoader();
  return (
    <div className="space-y-6">
      <PageHeading heading="Profile" subheading="Manage your profile." />
      <ProfileImageForm userData={userData} />
      <ProfileForm userData={userData}/>
    </div>
  );
}
