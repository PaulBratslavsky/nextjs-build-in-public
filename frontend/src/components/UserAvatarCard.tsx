import { getStrapiMedia } from "@/lib/api-helpers";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import SocialLinks from "@/components/SocialLinks";

export default async function UserAvatarCard({ data }: { data: any}) {
  if (!data) return null;

  const fullImageUrl = data?.image
  ? getStrapiMedia(data.image.url)
  : "https://picsum.photos/200";

  return (
    <div className="space-y-6 mb-6">
      <Card className="flex flex-col items-center rounded-3xl border-0 shadow-[0_0_25px_5px_rgba(0,0,0,0.05)] px-6 py-10 z-10 bg-background/70 backdrop-blur sticky">
        <CardHeader className="p-2">EVENT ORGANIZER</CardHeader>
        <Separator className="mx-auto" />
        <CardContent className="mt-10 ">
          <Avatar className="h-[10rem] w-[10rem]">
            <AvatarImage src={fullImageUrl as string} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardContent>
        <CardTitle>{data.username || data.fullName}</CardTitle>
        <CardDescription className="py-2">
          {data.bio}
        </CardDescription>
        <CardFooter className="p-0 pt-6">
        <SocialLinks
            linkedin={data.linkedin}
            twitter={data.twitter}
            youtube={data.youtube}
            github={data.github}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
