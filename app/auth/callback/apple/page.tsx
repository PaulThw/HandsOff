import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AppleCallbackPage({
  searchParams,
}: {
  searchParams: { code?: string }
}) {
  const code = searchParams.code
  const supabase = createClient()

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // After successful OAuth login, fetch user's role and redirect
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single()

        if (profileError || !profile) {
          console.error("Profile fetch error after OAuth:", profileError?.message || "No profile found")
          redirect("/login?message=Could not retrieve user role after OAuth.")
        }

        switch (profile.role) {
          case "kunde":
            redirect("/dashboard/kunde")
          case "dolmetscher":
            redirect("/dashboard/dolmetscher")
          case "amt":
            redirect("/dashboard/amt")
          case "krankenkasse":
            redirect("/dashboard/krankenkasse")
          default:
            redirect("/dashboard/kunde")
        }
      }
    }
  }

  // return to login page with error
  redirect("/login?message=Could not log in with Apple.")
}
