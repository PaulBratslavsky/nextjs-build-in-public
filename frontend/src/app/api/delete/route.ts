import { cookies } from "next/headers";

export async function POST(request: Request ): Promise<Response> {
  const formData = await request.formData();

  const body = formData.get("body");
  const id = JSON.parse(body as string).id;
  const url = `${process.env.STRAPI_URL}/api/upload/files/${id}`;

  const cookieStore = cookies();
  const authToken = cookieStore.get("jwt")?.value;

  if (!authToken) {
    return new Response(JSON.stringify({ error: "No JWT", ok: false }), {
      status: 401,
    });
  }

  const response = await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${authToken}` },
  });

  const data = await response.json();
  return Response.json({ data: data.id, ok: true })

}
