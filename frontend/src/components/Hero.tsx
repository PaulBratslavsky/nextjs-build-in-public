import Image from "next/image";
import { CheckCircle } from "lucide-react";


const Hero = () => {
  return (
    <section className="px-6 max-w-6xl my-10">
      <div className="grid md:grid-cols-2	gap-8">
        <div className="md:col-span-1">
          <div className="grid grid-cols-2 gap-4">
            <figure className="col-span-1">
              <img
                className="rounded-3xl w-full h-auto"
                src="/eventum-img33.jpg"
                alt=""
              />
            </figure>
            <figure className="col-span-1">
              <img
                className="rounded-3xl w-full h-auto"
                src="/eventum-img35.jpg"
                alt=""
              />
            </figure>
            <figure className="col-span-1">
              <img
                className="rounded-3xl w-full h-auto"
                src="/eventum-img34.jpg"
                alt=""
              />
            </figure>
            <figure className="col-span-1">
              <img
                className="rounded-3xl w-full h-auto"
                src="/eventum-img36.jpg"
                alt=""
              />
            </figure>      
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="p-4">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-bold leading-5 inline-block text-[#e23e57]">
                INTRODUCTION
              </span>
              <h3 className="text-4xl md:text-3xl lg:text-4xl font-bold">
                KNOW MORE ABOUT OUR GRAND EVENT
              </h3>
              <p className="text-muted-foreground leading-5 whitespace-break-spaces">
                Consequat sociosqu sem officiis aute ridiculus repellat in
                aliquip at, metus sociosqu veritatis cubilia ac soluta? Faucibus
                ipsam, incidunt cras.
              </p>
            </div>
          </div>
          <div className="">
            <div className="flex">
              <div className="rounded-xl border-b-[3px] p-6 mb-6 bg-slate-100 border-b-[#e23e57]">
                <ul>
                  <li className="mb-4 flex items-center">
                    <CheckCircle className="h-10 w-10 text-slate-400" />
                    <span className="pl-4 text-slate-500">
                      Lusto tenetur temporibus repellendus aspernatur, blandit
                      ullam cupidatat quisquam lacinia.
                    </span>
                  </li>
                  <li className="mb-4 flex items-center">
                    <CheckCircle className="h-10 w-10 text-slate-400" />
                    <span className="pl-4 text-slate-500">
                      Minima mattis laudantium nobis odit explicabo sapien nunc.
                      Reprehenderit molestiae.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
