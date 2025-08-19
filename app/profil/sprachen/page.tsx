"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Languages, X } from "lucide-react"
import Link from "next/link"
import BottomNavigation from "@/components/bottom-navigation"

const verfuegbareSprachenListe = [
  { code: "dgs", name: "Deutsche Gebärdensprache (DGS)", flag: "🇩🇪" },
  { code: "asl", name: "Amerikanische Gebärdensprache (ASL)", flag: "🇺🇸" },
  { code: "bsl", name: "Britische Gebärdensprache (BSL)", flag: "🇬🇧" },
  { code: "lsf", name: "Französische Gebärdensprache (LSF)", flag: "🇫🇷" },
  { code: "lis", name: "Italienische Gebärdensprache (LIS)", flag: "🇮🇹" },
  { code: "oegs", name: "Österreichische Gebärdensprache (ÖGS)", flag: "🇦🇹" },
  { code: "rsl", name: "Russische Gebärdensprache (РЖЯ)", flag: "🇷🇺" },
  { code: "uksl", name: "Ukrainische Gebärdensprache (УЖМ)", flag: "🇺🇦" },
  { code: "international", name: "Internationale Gebärdensprache", flag: "🌍" },
]

export default function SprachenPage() {
  const [selectedLanguages, setSelectedLanguages] = useState(["dgs"])
  const [primaryLanguage, setPrimaryLanguage] = useState("dgs")

  const handleLanguageToggle = (code: string) => {
    setSelectedLanguages((prev) => (prev.includes(code) ? prev.filter((lang) => lang !== code) : [...prev, code]))
  }

  const handleSetPrimary = (code: string) => {
    setPrimaryLanguage(code)
    if (!selectedLanguages.includes(code)) {
      setSelectedLanguages((prev) => [...prev, code])
    }
  }

  const handleSave = () => {
    console.log("Spracheinstellungen speichern:", {
      selected: selectedLanguages,
      primary: primaryLanguage,
    })
    // Hier würde die API aufgerufen werden
  }

  const getLanguageName = (code: string) => {
    return verfuegbareSprachenListe.find((lang) => lang.code === code)?.name || code
  }

  const getLanguageFlag = (code: string) => {
    return verfuegbareSprachenListe.find((lang) => lang.code === code)?.flag || "🌐"
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
          <h1 className="text-xl font-bold">Spracheinstellungen</h1>
          <Button onClick={handleSave} className="ml-auto bg-petrol-600 hover:bg-petrol-700" size="sm">
            Speichern
          </Button>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Aktuelle Sprachen */}
        <div className="bg-secondary rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <Languages className="h-5 w-5 mr-2 text-petrol-400" />
            Meine Sprachen
          </h2>

          {selectedLanguages.length > 0 ? (
            <div className="space-y-3">
              {selectedLanguages.map((code) => (
                <div key={code} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getLanguageFlag(code)}</span>
                    <div>
                      <p className="font-medium">{getLanguageName(code)}</p>
                      {code === primaryLanguage && (
                        <Badge className="bg-petrol-600 hover:bg-petrol-700 text-xs">Hauptsprache</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {code !== primaryLanguage && (
                      <Button variant="outline" size="sm" onClick={() => handleSetPrimary(code)}>
                        Als Hauptsprache
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => handleLanguageToggle(code)}>
                      <X className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">Keine Sprachen ausgewählt</p>
          )}
        </div>

        {/* Verfügbare Sprachen */}
        <div className="bg-secondary rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Verfügbare Gebärdensprachen</h2>
          <div className="space-y-3">
            {verfuegbareSprachenListe.map((language) => (
              <div
                key={language.code}
                className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={language.code}
                    checked={selectedLanguages.includes(language.code)}
                    onCheckedChange={() => handleLanguageToggle(language.code)}
                  />
                  <span className="text-xl">{language.flag}</span>
                  <Label htmlFor={language.code} className="cursor-pointer">
                    {language.name}
                  </Label>
                </div>
                {selectedLanguages.includes(language.code) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetPrimary(language.code)}
                    disabled={language.code === primaryLanguage}
                  >
                    {language.code === primaryLanguage ? "Hauptsprache" : "Als Hauptsprache"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hinweis */}
        <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
          <p className="text-sm text-blue-200">
            <strong>Hinweis:</strong> Ihre Sprachauswahl hilft uns dabei, passende Dolmetscher für Sie zu finden. Die
            Hauptsprache wird bei der Suche bevorzugt angezeigt.
          </p>
        </div>
      </div>

      <BottomNavigation />
    </main>
  )
}
