import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/middleware';

export const config = {
  // nur private Bereiche schützen – öffentliche Seiten bleiben sichtbar
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};

export async function middleware(req: NextRequest) {
  const { supabase, response } = createClient(req);
  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = req.nextUrl.clone();
    url.pathname = '/login'; // zentrale Login-Seite
    url.searchParams.set('next', req.nextUrl.pathname); // zurück nach Login
    return NextResponse.redirect(url);
  }

  return response;
}
