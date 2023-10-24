// Lib
import fetcher from "@/lib/fetcher";

const DetailPage = async ({ params }: { params: { slug: string } }) => {
	const resEvents = await fetcher("events", params.slug);
  
  return (
      <div className="p-10">DetailPage of {params.slug}</div>
    )
}

export default DetailPage