import { NextRequest, NextResponse } from "next/server";
// TODO: IMPLEMENT STRAPI REGISTER IN REGISTER FORM TO REGISTER USER

interface StrapiRegister {
  username: string;
  email: string;
  password: string;
}

async function strapiRegister(data: StrapiRegister) {
  const url = `${process.env.STRAPI_URL}/api/auth/local/register`;
  const body = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, body);
    return response.json();
  } catch (error) {
    console.log(error, "############### REGISTER ERROR ###############");
  }
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as StrapiRegister;
  try {
    const response = await strapiRegister(data);
    if (response.error) return NextResponse.json({ error: response.error });
    else return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
