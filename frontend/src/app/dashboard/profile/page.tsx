import getMeLoader from "@/loaders/get-me-loader";
import { ProfileForm } from "./ProfileForm";
import PageHeading from "@/components/PageHeading";
import { UserImageForm } from "./UserImageForm"; 

export default async function ProfileRoute() {
  const userData = await getMeLoader();
  return (
    <div className="space-y-6">
      <PageHeading heading="Profile" subheading="Manage your profile." />
      <UserImageForm userData={userData} />
      <ProfileForm userData={userData}/>
    </div>
  );
}
