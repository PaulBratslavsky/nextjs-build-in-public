import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest ) {
  const url = `${process.env.STRAPI_URL}/api/upload`;
  const authToken = request.cookies.get('jwt')?.value;
  if (!authToken) return { error: "No JWT", ok: false };

  const formData = await request.formData()
  const file: File | null = formData.get('image') as unknown as File

  if (!file) return { error: "No file", ok: false };

  const newFormData = new FormData();
  newFormData.append('files', file, file.name);
  
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${authToken}`},
    body: newFormData,
  });

  const data = await response.json();
  console.log(data, "###### FROM UPLOAD API ######");
  return NextResponse.json({ data: data[0], ok: true });
}
