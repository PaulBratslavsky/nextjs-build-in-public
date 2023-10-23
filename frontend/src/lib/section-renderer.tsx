import Hero from "@/components/Hero";

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case "layout.hero":
      return <Hero key={index} data={section} />;
    default:
      return null;
  }
}