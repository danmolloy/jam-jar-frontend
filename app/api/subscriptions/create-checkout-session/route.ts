import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const authHeader = req.headers.get('authorization');

  const res = await fetch(`${BACKEND_URL}payments/create-checkout-session/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(authHeader ? { Authorization: authHeader } : {}),
    },
    body,
    // credentials: 'include', // Uncomment if you need cookies
  });

  const contentType = res.headers.get('content-type');
  let data;
  if (contentType && contentType.includes('application/json')) {
    data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } else {
    data = await res.text();
    return new NextResponse(data, { status: res.status });
  }
}