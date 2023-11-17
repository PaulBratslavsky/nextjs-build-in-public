import UserAvatarCard from "@/components/UserAvatarCard";
import getMeLoader from "@/loaders/get-me-loader";
export default async function DashboardRoute() {
  const userData = await getMeLoader();
  return (
    <div className="container mx-auto px-8 h-screen">
      <UserAvatarCard  data={userData?.data}/>
    </div>
  );
}
