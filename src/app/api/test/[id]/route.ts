// src/app/api/test/[id]/route.ts
import { NextRequest } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return Response.json({ id: params.id });
}