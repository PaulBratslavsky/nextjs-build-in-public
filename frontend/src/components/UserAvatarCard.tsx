import {
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
  GithubIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatarCard() {
  return (
    <div className="space-y-6 mb-6">
      <Card className="flex flex-col items-center rounded-3xl border-0 shadow-[0_0_25px_5px_rgba(0,0,0,0.05)] px-6 py-10 z-10 bg-background/70 backdrop-blur sticky">
        <CardHeader className="p-2">EVENT SPEAKER</CardHeader>
        <Separator className="mx-auto" />
        <CardContent className="mt-10 ">
          <Avatar className="h-[10rem] w-[10rem]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardContent>
        <CardTitle>Speaker Name</CardTitle>
        <CardDescription className="py-2">
          Speaker short description
        </CardDescription>
        <CardFooter className="p-0 pt-6">
          <ul className="flex flex-nowrap gap-4">
            <li>
              <a
                target="_blank"
                href="#"
                className="h-10 w-10 flex items-center justify-center bg-muted rounded-2xl hover:bg-secondary duration-200"
              >
                <LinkedinIcon />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="#"
                className="h-10 w-10 flex items-center justify-center bg-muted rounded-2xl hover:bg-secondary duration-200"
              >
                <TwitterIcon />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="#"
                className="h-10 w-10 flex items-center justify-center bg-muted rounded-2xl hover:bg-secondary duration-200"
              >
                <YoutubeIcon />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="#"
                className="h-10 w-10 flex items-center justify-center bg-muted rounded-2xl hover:bg-secondary duration-200"
              >
                <GithubIcon />
              </a>
            </li>
          </ul>
        </CardFooter>
      </Card>
    </div>
  );
}
