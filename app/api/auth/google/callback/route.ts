import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_URL = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:5000';

export async function GET(request: NextRequest) {
  // Get all query parameters from the Google callback
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();

  // Redirect to the backend's Google callback endpoint
  const backendCallbackUrl = `${API_URL}/auth/google/callback${queryString ? `?${queryString}` : ''}`;

  return NextResponse.redirect(backendCallbackUrl);
}
