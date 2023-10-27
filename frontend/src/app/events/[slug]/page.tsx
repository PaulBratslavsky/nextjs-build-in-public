import type { StrapiEventData } from "@/types/strapi-custom-types";
import { formatDate, formatTime } from "@/lib/api-helpers";

import { LinkedinIcon, TwitterIcon, YoutubeIcon, GithubIcon, CalendarCheck, AlarmCheck, MapPinned, QuoteIcon, CheckCircle2,  } from 'lucide-react'

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {Separator} from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

const DetailPage = async ({ params }: { params: { slug: string } }) => {

  return (
      <div className="container my-10">
        {/* DetailPage of {params.slug} */}
        <div className="grid lg:grid-cols-[auto,30%] gap-12 lg:gap-32">
          <div className="space-y-10">
            <div className="relative w-full h-[200px] md:h-[400px] px-10 rounded-3xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1738&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" fill alt="Stock image" className="object-cover"/>
            </div>
            <div>
              <h2 className="uppercase text-3xl font-semibold leading-none tracking-tight my-6">Event awesome seo heading</h2>
              <p className="text-muted-foreground tracking-wide">Quam amet tristique adipisicing incididunt arcu, excepturi molestie turpis deserunt ducimus malesuada minus mauris veniam. Veniam exercitationem? Phasellus? Officia pulvinar sem cumque? Quo? Unde natus, ducimus non illum facilisi voluptatem quisque.</p>
            </div>

            <div className="bg-muted p-8 md:p-12 rounded-3xl grid grid-cols-[4rem,auto] items-center">
              <QuoteIcon className="rotate-180 h-12 w-12 text-muted-foreground/10 fill-foreground/20 self-start" />
              <p className="leading-relaxed text-lg text-muted-foreground">"Mus delectus incidunt tincidunt, placerat nobis dolore maiores etiam porttitor! Quo auctor laudantium praesent eleifend.Quia dignissimos quidem lectus nulla. "</p>
            </div>

            <div>
              <h3 className="uppercase text-lg py-2 font-semibold">key point of this session</h3>
              <Separator />
              <p className="text-muted-foreground tracking-wide pt-6">Quam amet tristique adipisicing incididunt arcu, excepturi molestie turpis deserunt ducimus malesuada minus mauris veniam. Veniam exercitationem? Phasellus? Officia pulvinar sem cumque? Quo? Unde natus, ducimus non illum facilisi voluptatem quisque.</p>
              <ul className="py-4 grid grid-cols-2 gap-1 group">
                <li className="grid grid-cols-[1rem,auto]  items-center gap-2 duration-200">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <p className="text-muted-foreground font-medium hover:text-secondary">Huge Achivement</p>
                </li>
                <li className="grid grid-cols-[1rem,auto] items-center gap-2 duration-200">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <p className="text-muted-foreground hover:text-secondary font-medium">Huge Achivement</p>
                </li>
                <li className="grid grid-cols-[1rem,auto] items-center gap-2 duration-200">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <p className="text-muted-foreground hover:text-secondary font-medium">Huge Achivement</p>
                </li>
                <li className="grid grid-cols-[1rem,auto] items-center gap-2 duration-200">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <p className="text-muted-foreground hover:text-secondary font-medium">Huge Achivement</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
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
              <CardDescription className="py-2">Speaker short description</CardDescription>
              <CardFooter className="p-0 pt-6">
                <ul className="flex flex-nowrap gap-4">
                  <li>
                    <a target="_blank" href="#" className="h-10 w-10 flex items-center justify-center bg-muted rounded-2xl hover:bg-secondary duration-200">
                      <LinkedinIcon />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="#" className="h-10 w-10 flex items-center justify-center bg-muted rounded-2xl hover:bg-secondary duration-200">
                      <TwitterIcon />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="#" className="h-10 w-10 flex items-center justify-center bg-muted rounded-2xl hover:bg-secondary duration-200">
                      <YoutubeIcon />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="#" className="h-10 w-10 flex items-center justify-center bg-muted rounded-2xl hover:bg-secondary duration-200">
                      <GithubIcon />
                    </a>
                  </li>
                </ul>
              </CardFooter>
            </Card>
            <Card className="flex flex-col w-full items-center rounded-3xl border-0 px-6 py-10 bg-muted/70 z-10  backdrop-blur">
              <CardHeader className="p-2 uppercase">event information</CardHeader>
              <Separator className="mx-auto" />
              <CardContent className="p-0 pt-6 w-full flex flex-col items-center gap-4">
                <span className="grid grid-cols-[1.5rem,auto] items-center gap-3 hover:scale-110 duration-200">
                   <CalendarCheck className="text-primary h-5 w-5" />  November 23, 2023{/*{formatDate(attributes.date)}*/} 
                </span>
                <span className="grid grid-cols-[1.5rem,auto] items-center gap-3 hover:scale-110 duration-200">
                  <AlarmCheck className="text-primary h-5 w-5" /> Time : 15:00 - 17:00{/*{formatTime(attributes.time)}*/}
                </span>
                <span className="grid grid-cols-[1.5rem,auto] items-center gap-3 hover:scale-110 duration-200">
                  <MapPinned className="text-primary h-5 w-5" /> Auditorium, 2nd {/*{attributes.location}*/}
                </span>
              </CardContent>
            </Card>
          </div>
        </div>        
      </div>
    )
}

export default DetailPage