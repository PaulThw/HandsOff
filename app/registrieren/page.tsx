"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Mail, Lock, Phone, ArrowRight, Loader2, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RegistrierenPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptNewsletter, setAcceptNewsletter] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "",
  })
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "",
    terms: "",
    general: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      userType: "",
      terms: "",
      general: "",
    }
    let isValid = true

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Vorname ist erforderlich"
      isValid = false
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Nachname ist erforderlich"
      isValid = false
    }

    if (!formData.email) {
      newErrors.email = "E-Mail-Adresse ist erforderlich"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ungültige E-Mail-Adresse"
      isValid = false
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefonnummer ist erforderlich"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "Passwort ist erforderlich"
      isValid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "Passwort muss mindestens 8 Zeichen lang sein"
      isValid = false
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwörter stimmen nicht überein"
      isValid = false
    }

    if (!formData.userType) {
      newErrors.userType = "Bitte wählen Sie einen Kontotyp"
      isValid = false
    }

    if (!acceptTerms) {
      newErrors.terms = "Sie müssen den AGB zustimmen"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors((prev) => ({ ...prev, general: "" }))

    try {
      // Simuliere API-Call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Erfolgreiche Registrierung
      router.push("/login?registered=true")
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header */}
      <div className="relative h-[25vh] bg-gradient-to-b from-petrol-900 to-black flex items-center justify-center">
        <Link
          href="/login"
          className="absolute top-4 left-4 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">GebärdenNow</h1>
          <p className="text-petrol-200">Konto erstellen</p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-secondary rounded-2xl p-6 shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Registrieren</h2>
              <p className="text-gray-400">Erstellen Sie Ihr GebärdenNow Konto</p>
            </div>

            {errors.general && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Kontotyp */}
              <div className="space-y-2">
                <Label htmlFor="userType" className="text-sm font-medium text-gray-300">
                  Ich bin...
                </Label>
                <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
                  <SelectTrigger
                    className={`bg-muted border-0 focus:ring-2 focus:ring-petrol-500 ${
                      errors.userType ? "ring-2 ring-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Wählen Sie Ihren Kontotyp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kunde">Kunde (benötige Dolmetscher)</SelectItem>
                    <SelectItem value="dolmetscher">Dolmetscher</SelectItem>
                    <SelectItem value="praxis">Arztpraxis/Einrichtung</SelectItem>
                  </SelectContent>
                </Select>
                {errors.userType && <p className="text-red-400 text-xs">{errors.userType}</p>}
              </div>

              {/* Name */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-300">
                    Vorname
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Max"
                      className={`pl-10 bg-muted border-0 focus-visible:ring-2 focus-visible:ring-petrol-500 ${
                        errors.firstName ? "ring-2 ring-red-500" : ""
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.firstName && <p className="text-red-400 text-xs">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-300">
                    Nachname
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Mustermann"
                    className={`bg-muted border-0 focus-visible:ring-2 focus-visible:ring-petrol-500 ${
                      errors.lastName ? "ring-2 ring-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                  {errors.lastName && <p className="text-red-400 text-xs">{errors.lastName}</p>}
                </div>
              </div>

              {/* E-Mail */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                  E-Mail-Adresse
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="max@example.com"
                    className={`pl-10 bg-muted border-0 focus-visible:ring-2 focus-visible:ring-petrol-500 ${
                      errors.email ? "ring-2 ring-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
              </div>

              {/* Telefon */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-300">
                  Telefonnummer
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+49 30 12345678"
                    className={`pl-10 bg-muted border-0 focus-visible:ring-2 focus-visible:ring-petrol-500 ${
                      errors.phone ? "ring-2 ring-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
              </div>

              {/* Passwort */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Passwort
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Mindestens 8 Zeichen"
                    className={`pl-10 pr-10 bg-muted border-0 focus-visible:ring-2 focus-visible:ring-petrol-500 ${
                      errors.password ? "ring-2 ring-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
              </div>

              {/* Passwort bestätigen */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                  Passwort bestätigen
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="Passwort wiederholen"
                    className={`pl-10 pr-10 bg-muted border-0 focus-visible:ring-2 focus-visible:ring-petrol-500 ${
                      errors.confirmPassword ? "ring-2 ring-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword}</p>}
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => {
                      setAcceptTerms(checked as boolean)
                      if (errors.terms) {
                        setErrors((prev) => ({ ...prev, terms: "" }))
                      }
                    }}
                    disabled={isLoading}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer leading-relaxed">
                    Ich akzeptiere die{" "}
                    <Link href="/agb" className="text-petrol-400 hover:text-petrol-300">
                      AGB
                    </Link>{" "}
                    und{" "}
                    <Link href="/datenschutz" className="text-petrol-400 hover:text-petrol-300">
                      Datenschutzerklärung
                    </Link>
                  </Label>
                </div>
                {errors.terms && <p className="text-red-400 text-xs">{errors.terms}</p>}

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={acceptNewsletter}
                    onCheckedChange={(checked) => setAcceptNewsletter(checked as boolean)}
                    disabled={isLoading}
                    className="mt-1"
                  />
                  <Label htmlFor="newsletter" className="text-sm text-gray-400 cursor-pointer leading-relaxed">
                    Ich möchte über Neuigkeiten und Updates informiert werden (optional)
                  </Label>
                </div>
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-petrol-600 hover:bg-petrol-700 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Konto wird erstellt...
                  </>
                ) : (
                  <>
                    Konto erstellen
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Bereits ein Konto?{" "}
              <Link href="/login" className="text-apricot-400 hover:text-apricot-300 font-medium transition-colors">
                Jetzt anmelden
              </Link>
            </p>
          </div>
          {/* Alternative Registration Methods */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">Oder registrieren mit</span>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {/* Google Registration */}
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-gray-50 text-gray-900 border-gray-300 font-medium py-3 transition-all duration-200 transform hover:scale-[1.02]"
                onClick={() => {
                  // Hier würde die Google OAuth Integration stehen
                  console.log("Google Registration clicked")
                }}
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 2.43-4.53 6.16-4.53z"
                  />
                </svg>
                Mit Google registrieren
              </Button>

              {/* Apple Registration */}
              <Button
                variant="outline"
                className="w-full bg-black hover:bg-gray-900 text-white border-gray-700 font-medium py-3 transition-all duration-200 transform hover:scale-[1.02]"
                onClick={() => {
                  // Hier würde die Apple OAuth Integration stehen
                  console.log("Apple Registration clicked")
                }}
              >
                <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Mit Apple registrieren
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Role Cards */}
      <div className="mt-12 text-center text-gray-600">
        <p className="mb-2">Bereits registriert?</p>
        <Link href="/login">
          <Button variant="link" className="text-lg text-gray-700 hover:text-gray-900 font-semibold">
            Zum Login
          </Button>
        </Link>
      </div>
    </div>
  )
}

interface RoleCardProps {
  title: string
  description: string
  icon: React.ElementType
  bgColor: string
  hoverBgColor: string
  link: string
}

function RoleCard({ title, description, icon: Icon, bgColor, hoverBgColor, link }: RoleCardProps) {
  return (
    <Link href={link} className="block">
      <div
        className={`relative p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${bgColor} ${hoverBgColor} text-white flex flex-col items-center text-center h-full`}
      >
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-sm opacity-90 flex-grow">{description}</p>
        <Button
          variant="secondary"
          className="mt-6 w-full bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-200"
        >
          Registrieren
        </Button>
      </div>
    </Link>
  )
}
