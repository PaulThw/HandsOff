"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowLeft, Building2 } from "lucide-react"
import Link from "next/link"
import OAuthButtons from "@/components/oauth-buttons"
import { signUp } from "@/app/auth/actions"
import { useFormState } from "react-dom"

export default function AmtRegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [newsletterOptIn, setNewsletterOptIn] = useState(false)
  const [state, formAction] = useFormState(signUp, undefined)

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <Link href="/registrieren">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Behörden-Registrierung</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col justify-center px-4 py-8">
        <div className="w-full max-w-md mx-auto">
          {/* Logo/Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Building2 className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Zugang für Ihre Behörde beantragen</h2>
            <p className="text-gray-600">Sicherer Zugang für autorisierte Stellen</p>
          </div>

          {state?.message && (
            <div
              className={`mb-6 p-4 rounded-xl ${state.success ? "bg-green-100 border border-green-200 text-green-800" : "bg-red-100 border border-red-200 text-red-800"}`}
            >
              <p className="text-sm text-center">{state.message}</p>
            </div>
          )}

          {/* Registration Form */}
          <form action={formAction} className="space-y-6">
            <input type="hidden" name="role" value="amt" />
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Dienstliche E-Mail-Adresse
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="vorname.nachname@amt.de"
                  className="h-12 mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Passwort
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mindestens 8 Zeichen"
                    className="h-12 pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                  Passwort bestätigen
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Passwort wiederholen"
                    className="h-12 pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={setAgreedToTerms}
                  className="border-gray-300"
                  required
                />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  Ich stimme den{" "}
                  <Link href="/agb" className="text-blue-600 hover:text-blue-700 font-medium">
                    AGB
                  </Link>{" "}
                  und der{" "}
                  <Link href="/datenschutz" className="text-blue-600 hover:text-blue-700 font-medium">
                    Datenschutzerklärung
                  </Link>{" "}
                  zu.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={newsletterOptIn}
                  onCheckedChange={setNewsletterOptIn}
                  className="border-gray-300"
                />
                <Label htmlFor="newsletter" className="text-sm text-gray-600">
                  Ich möchte den Newsletter erhalten.
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
              disabled={!agreedToTerms}
            >
              Zugang beantragen
            </Button>
          </form>

          {/* OAuth Buttons */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-blue-50 text-gray-500">Oder registrieren mit</span>
              </div>
            </div>
            <div className="mt-4">
              <OAuthButtons mode="register" />
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Bereits registriert?{" "}
              <Link href="/login/amt" className="text-blue-600 hover:text-blue-700 font-semibold">
                Jetzt anmelden
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 text-center">
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <Link href="/hilfe" className="hover:text-gray-700">
            IT-Support
          </Link>
          <Link href="/kontakt" className="hover:text-gray-700">
            Kontakt
          </Link>
          <Link href="/datenschutz" className="hover:text-gray-700">
            Datenschutz
          </Link>
        </div>
      </div>
    </main>
  )
}
