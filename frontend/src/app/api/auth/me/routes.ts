import { NextResponse } from "next/server";
// TODO: IMPLEMENT STRAPI ME TO GET USER DATA

async function strapiMe() {
  const url = `${process.env.STRAPI_URL}/api/users/me`;
  // TODO: GET TOKEN FROM SESSION STORAGE
  const token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3Njk4MTE3LCJleHAiOjE3MDAyOTAxMTd9.nkBebZi4dIXsbKoDZPyzsymTmct1TOnfBO8FVn7weHg";
  const body = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  try {
    const response = await fetch(url, body);
    return response.json();
  } catch (error) {
    console.log(error, "############### REGISTER ERROR ###############");
  }
}

export async function GET() {
  try {
    const response = await strapiMe();
    if (response.error) return NextResponse.json({ error: response.error });
    else return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}


