"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import { resetPassword } from "@/app/auth/actions"
import { useFormState } from "react-dom"

export default function ForgotPasswordPage() {
  const [state, formAction] = useFormState(resetPassword, undefined)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <Link href="/login">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 flex-grow text-center -ml-10">Passwort vergessen?</h1>
          <div className="w-10" /> {/* Placeholder for alignment */}
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-gray-600" />
          </div>
          <p className="text-gray-600">
            Kein Problem! Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen.
          </p>
        </div>

        {state?.message && (
          <div
            className={`mb-6 p-4 rounded-xl ${state.success ? "bg-green-100 border border-green-200 text-green-800" : "bg-red-100 border border-red-200 text-red-800"}`}
          >
            <p className="text-sm text-center">{state.message}</p>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              E-Mail-Adresse
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ihre.email@example.com"
              className="h-12 mt-1 border-gray-300 focus:border-petrol-500 focus:ring-petrol-500"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 bg-gradient-to-r from-petrol-500 to-petrol-600 hover:from-petrol-600 hover:to-petrol-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
          >
            Link senden
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Zurück zum{" "}
            <Link href="/login" className="text-petrol-600 hover:text-petrol-700 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
