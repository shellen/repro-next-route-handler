// src/app/api/test/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  // Extract the 'id' from the request URL
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/");
  const id = segments[segments.length - 1]; // Assuming 'id' is the last segment

  return NextResponse.json({ id });
}
