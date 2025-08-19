/**
 * Helper für Next.js-Middleware – liefert Supabase-Client + Response-Objekt
 */
import type { NextRequest, NextFetchEvent } from "next/server"
import { NextResponse } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import type { SupabaseClient } from "@supabase/supabase-js"

export function createClient(
  req: NextRequest,
  _ev?: NextFetchEvent,
): { supabase: SupabaseClient; response: NextResponse } {
  const response = NextResponse.next()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const supabase = createMiddlewareClient(
    { req, res: response },
    {
      supabaseUrl,
      supabaseKey,
    },
  )

  return { supabase, response }
}
