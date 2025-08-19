/**
 * Supabase-Client für Server / React-Server-Components
 */
import { createServerComponentClient, type CookieOptions } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { SupabaseClient } from "@supabase/supabase-js"

export function createServerClient(cookieOptions?: CookieOptions): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createServerComponentClient(
    {
      cookies,
      cookieOptions,
    },
    {
      supabaseUrl,
      supabaseKey,
    },
  )
}
