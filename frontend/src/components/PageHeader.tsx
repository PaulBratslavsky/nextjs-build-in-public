export default function PageHeader({ heading = "Heading" }: { heading: string;  })  {
  return (
    <div className="flex justify-center items-center">
      <h1>{heading}</h1>
    </div>
  )
}
