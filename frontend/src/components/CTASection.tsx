import Link from "next/link"

const CTASection = ({
  subHeading,
  heading,
  text,
  linkLabel,
}: {
  subHeading: string;
  heading: string;
  text: string;
  linkLabel: string;
}) => {
  return (
    <div className="bg-secondary/40">
      <div className="max-w-5xl mx-auto p-16 lg:p-32 text-center">
        <div className="flex flex-col gap-4 items-center">
          <span className="font-bold leading-5 inline-block text-accent uppercase">
            {subHeading}
          </span>
          <h3 className="text-4xl md:text-3xl lg:text-4xl font-bold uppercase">
          {heading}
          </h3>
          <p className="text-muted-foreground leading-5 whitespace-break-spaces px-4 md:px-10">
          {text}
          </p>        
          <Link
              href="/events"
              className="inline-flex w-fit mt-4 items-center justify-center rounded-md text-sm font-medium uppercase text-primary-foreground h-12 px-6 py-2 bg-primary hover:bg-accent"
              >
              {linkLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CTASection