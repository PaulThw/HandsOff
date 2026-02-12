"use server"

import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function signIn(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Login error:", error.message)
    return { success: false, message: error.message }
  }

  // Fetch user profile to get the role
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
      console.error("Profile fetch error:", profileError?.message || "No profile found")
      return { success: false, message: "Could not retrieve user role." }
    }

    // Redirect based on role
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
        redirect("/dashboard/kunde") // Default redirect
    }
  }

  return { success: true, message: "Login successful, redirecting..." }
}

export async function signUp(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = (formData.get("role") as string) || "kunde" // Default to 'kunde' if not specified
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: role, // Pass role to the user metadata
      },
    },
  })

  if (error) {
    console.error("Signup error:", error.message)
    return { success: false, message: error.message }
  }

  // After successful signup, update the profile table with the role
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    const { error: updateError } = await supabase.from("profiles").update({ role: role }).eq("id", user.id)

    if (updateError) {
      console.error("Profile update error:", updateError.message)
      return { success: false, message: "Registration successful, but failed to set role." }
    }
  }

  return { success: true, message: "Registration successful! Please check your email for confirmation." }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}

export async function resetPassword(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${(await headers()).get("origin")}/auth/callback/password-reset`, // Adjust redirect URL as needed
  })

  if (error) {
    console.error("Password reset error:", error.message)
    return { success: false, message: error.message }
  }

  return { success: true, message: "Password reset email sent. Please check your inbox." }
}
