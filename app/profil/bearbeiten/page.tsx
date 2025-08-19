"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Camera, User, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import BottomNavigation from "@/components/bottom-navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilBearbeitenPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Jan",
    lastName: "Decker",
    email: "jan.decker@example.com",
    phone: "+49 30 12345678",
    address: "Musterstraße 123, 10115 Berlin",
    bio: "Ich nutze GebärdenNow regelmäßig für meine Arzttermine und bin sehr zufrieden mit dem Service.",
    preferredLanguages: ["Deutsche Gebärdensprache (DGS)"],
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simuliere API-Call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/profil?updated=true")
    } catch (error) {
      console.error("Fehler beim Speichern:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col pb-20">
      <div className="bg-secondary p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/profil">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Profil bearbeiten</h1>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="ml-auto bg-petrol-600 hover:bg-petrol-700"
            size="sm"
          >
            {isLoading ? "Speichern..." : "Speichern"}
            <Save className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Profilbild */}
        <div className="bg-secondary rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Profilbild</h2>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 rounded-full border-2 border-petrol-500">
              <AvatarImage src="/placeholder.svg?height=200&width=200" alt="Profilbild" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm" className="mb-2 bg-transparent">
                <Camera className="h-4 w-4 mr-2" />
                Foto ändern
              </Button>
              <p className="text-xs text-gray-400">JPG, PNG oder GIF. Max. 5MB</p>
            </div>
          </div>
        </div>

        {/* Persönliche Daten */}
        <div className="bg-secondary rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-petrol-400" />
            Persönliche Daten
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Vorname</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nachname</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Über mich</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Erzählen Sie etwas über sich..."
                className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
              />
            </div>
          </div>
        </div>

        {/* Kontaktdaten */}
        <div className="bg-secondary rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <Mail className="h-5 w-5 mr-2 text-petrol-400" />
            Kontaktdaten
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">E-Mail-Adresse</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
              />
            </div>

            <div>
              <Label htmlFor="phone">Telefonnummer</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
              />
            </div>

            <div>
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
              />
            </div>
          </div>
        </div>

        {/* Spracheinstellungen */}
        <div className="bg-secondary rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Spracheinstellungen</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="preferredLanguage">Bevorzugte Gebärdensprache</Label>
              <Select>
                <SelectTrigger className="bg-muted border-0 focus:ring-1 focus:ring-petrol-500">
                  <SelectValue placeholder="Sprache wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dgs">Deutsche Gebärdensprache (DGS)</SelectItem>
                  <SelectItem value="asl">Amerikanische Gebärdensprache (ASL)</SelectItem>
                  <SelectItem value="bsl">Britische Gebärdensprache (BSL)</SelectItem>
                  <SelectItem value="international">Internationale Gebärdensprache</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </main>
  )
}
