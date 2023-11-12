import { getStrapiMedia } from "@/lib/api-helpers";
import { CheckCircle } from "lucide-react";
import Image from 'next/image'
interface HeroFeature {
  id: string;
  text: string;
}

interface HeroImage {
  id: string;
  attributes: {
    name: string;
    alternativeText: string;
    url: string;
  };
}

interface HeroProps {
  id: string;
  __component: string;
  heading: string;
  subHeading: string;
  text: string;
  features: HeroFeature[];
  images: {
    data: HeroImage[];
  };
}

const Hero = ({ data }: { data: HeroProps }) => {
  const { heading, subHeading, text, features, images } = data;
  return (
    <section className="px-6 max-w-6xl my-10">
      <div className="grid md:grid-cols-2	gap-8">
        <div className="md:col-span-1">
          <div className="grid grid-cols-2 gap-4">
            {images &&
              images.data.map((image: HeroImage) => {
                const imageUrl = getStrapiMedia(image.attributes.url);
                if (!imageUrl) return null;
                return (
                  <figure className="col-span-1" key={image.id}>
                    <Image
                      className="rounded-3xl w-full h-auto"
                      src={imageUrl}
                      alt={image.attributes.alternativeText}
                      width={100}
                      height={100}
                    />
                  </figure>
                );
              })}
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="p-4">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-bold leading-5 inline-block text-primary uppercase">
                {subHeading}
              </span>
              <h3 className="text-4xl md:text-3xl lg:text-4xl font-bold uppercase">
                {heading}
              </h3>
              <p className="text-muted-foreground leading-5 whitespace-break-spaces">
                {text}
              </p>
            </div>
          </div>
          <div className="">
            <div className="flex">
              <div className="rounded-xl border-b-[3px] p-6 mb-6 bg-slate-100 border-b-primary">
                <ul>
                  {features.map((feature: HeroFeature) => (
                    <li className="mb-4 flex items-center" key={feature.id}>
                      <CheckCircle className="h-10 w-10 text-slate-400" />
                      <span className="pl-4 text-slate-500">
                        {feature.text}
                      </span>
                    </li>
                  ))}
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
