import Image from 'next/image'
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

const Introduction = () => {

  return (
    <section className="px-6 max-w-6xl my-10">      
      <div className=" grid col-auto md:grid-cols-[25%,auto] gap-4">
        <div className="flex flex-wrap sm:flex-nowrap sm:flex-row md:flex-col gap-4 items-end">
          <figure className="flex-1 sm:flex-auto md:flex-grow-0">
              <img className="rounded-3xl w-full h-auto" src="/eventum-img33.jpg" alt="" />
          </figure>
          <figure className="order-3 w-full sm:w-auto sm:order-none">
              <img className="rounded-3xl w-full h-auto" src="/eventum-img35.jpg" alt="" />
          </figure>
          <figure className="flex-1 sm:flex-auto md:flex-grow-0">
              <img className="rounded-3xl w-full h-auto" src="/eventum-img34.jpg" alt="" />
          </figure>
        </div>
        <div className="flex flex-col gap-12 md:gap-0">
          <div className="flex-col md:flex md:flex-row items-center gap-12">
              <figure className="flex md:mt-14 basis-1/3 mb-4">
                  <img className="rounded-3xl w-full h-auto" src="/eventum-img36.jpg" alt="" />
              </figure>
              <div className="flex flex-col basis-8/12 gap-4">
                  <span className="text-sm font-bold leading-5 inline-block text-[#e23e57]">INTRODUCTION</span>
                  <h3 className="text-4xl md:text-3xl lg:text-4xl font-bold">
                      KNOW MORE ABOUT OUR GRAND EVENT
                  </h3>
                  <p className="text-muted-foreground leading-5 whitespace-break-spaces">
                      Consequat sociosqu sem officiis aute ridiculus repellat in aliquip at, metus sociosqu veritatis cubilia ac soluta? Faucibus ipsam, incidunt cras.
                  </p>
              </div>
          </div>
          <div className="flex-col gap-8 md:flex md:flex-row items-center md:gap-4">
            <figure className="flex items-center md:basis-2/5 px-8 mb-4 md:px-0">
              <img className="rounded-3xl w-full h-full" src="eventum-img37.jpg" alt="" />
            </figure>
            <div className="flex md:basis-3/5 md:pl-8">
              <div className="rounded-xl border-b-[3px] p-6 mb-6 bg-slate-100 border-b-[#e23e57]">
                <ul>
                  <li className="mb-4 flex items-center">
                    <CheckCircle className="h-14 w-14 text-slate-400" />
                    <span className="pl-4 text-slate-500">
                        Lusto tenetur temporibus repellendus aspernatur, blandit ullam cupidatat quisquam lacinia.
                    </span>
                  </li>
                  <li className="mb-4 flex items-center">
                    <CheckCircle className="h-14 w-14 text-slate-400" />
                    <span className="pl-4 text-slate-500">
                        Minima mattis laudantium nobis odit explicabo sapien nunc. Reprehenderit molestiae.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Introduction