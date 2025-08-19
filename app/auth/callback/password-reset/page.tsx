import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from "lucide-react"

export default async function PasswordResetCallbackPage({
  searchParams,
}: {
  searchParams: { error_description?: string; code?: string }
}) {
  const errorDescription = searchParams.error_description
  const code = searchParams.code
  const supabase = createClient()

  if (errorDescription) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-red-200 text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Passwort-Reset fehlgeschlagen</h1>
          <p className="text-gray-600 mb-6">{errorDescription}</p>
          <Link href="/passwort-vergessen">
            <Button className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl">
              Erneut versuchen
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  if (!code) {
    redirect("/login") // No code, redirect to login
  }

  // If there's a code, it means the user clicked the reset link and needs to set a new password
  // This page will handle setting the new password
  const updatePassword = async (formData: FormData) => {
    "use server"
    const newPassword = formData.get("password") as string
    const supabaseServer = createClient()

    const { error } = await supabaseServer.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      console.error("Error updating password:", error.message)
      redirect(`/auth/callback/password-reset?error_description=${encodeURIComponent(error.message)}`)
    }

    redirect("/login?message=Your password has been reset successfully. Please log in.")
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-green-200">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Neues Passwort festlegen</h1>
          <p className="text-gray-600">Bitte geben Sie Ihr neues Passwort ein.</p>
        </div>

        <form action={updatePassword} className="space-y-6">
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Neues Passwort
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Mindestens 8 Zeichen"
              className="h-12 mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
          >
            Passwort aktualisieren
          </Button>
        </form>
      </div>
    </main>
  )
}
