"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Clock, CreditCard, FileText } from "lucide-react"
import { getQRCodeColor } from "@/lib/qr-code"
import BottomNavigation from "@/components/bottom-navigation"

export default function TerminBestaetigungPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isConfirming, setIsConfirming] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const terminData = {
    terminId: searchParams.get("terminId") || "",
    dolmetscherId: searchParams.get("dolmetscherId") || "",
    terminArt: searchParams.get("terminArt") || "gesundheit",
    datum: searchParams.get("datum") || "",
    uhrzeit: searchParams.get("uhrzeit") || "",
    dauer: Number.parseInt(searchParams.get("dauer") || "60"),
    preis: Number.parseFloat(searchParams.get("preis") || "60"),
    kostentraeger: searchParams.get("kostentraeger") || "",
    bundesland: searchParams.get("bundesland") || "",
    anlass: searchParams.get("anlass") || "",
  }

  const qrColor = getQRCodeColor(terminData.terminArt)

  const handleConfirm = async () => {
    setIsConfirming(true)

    // Simuliere API-Call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsConfirming(false)
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <main className="flex min-h-screen flex-col pb-20">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-6 max-w-md">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
            <div>
              <h1 className="text-2xl font-bold mb-2">Termin bestätigt!</h1>
              <p className="text-gray-400">
                Der Dolmetsch-Termin wurde erfolgreich bestätigt und die Abrechnung wurde eingeleitet.
              </p>
            </div>

            <div className="bg-secondary rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Termin-ID:</span>
                <span className="font-mono text-sm">{terminData.terminId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Betrag:</span>
                <span className="font-bold text-green-500">{terminData.preis} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <Badge className="bg-green-600">Bestätigt</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={() => router.push("/termine")} className="w-full bg-petrol-600 hover:bg-petrol-700">
                Zu meinen Terminen
              </Button>
              <Button onClick={() => router.push("/")} variant="outline" className="w-full">
                Zur Startseite
              </Button>
            </div>
          </div>
        </div>
        <BottomNavigation />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col pb-20">
      <div className="bg-secondary p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold">Termin bestätigen</h1>
      </div>

      <div className="container py-6 space-y-6">
        <div className="bg-secondary rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h2 className="text-lg font-bold">QR-Code erfolgreich gescannt</h2>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Termin-ID:</span>
              <span className="font-mono text-sm">{terminData.terminId}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Datum & Zeit:</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-petrol-400" />
                <span>
                  {terminData.datum} um {terminData.uhrzeit}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Dauer:</span>
              <span>{terminData.dauer} Minuten</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Anlass:</span>
              <span>{terminData.anlass}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Kategorie:</span>
              <Badge style={{ backgroundColor: qrColor, color: "white" }}>{terminData.terminArt}</Badge>
            </div>
          </div>
        </div>

        <div className="bg-secondary rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-apricot-400" />
            <h2 className="text-lg font-bold">Abrechnung</h2>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Dolmetscher-Honorar:</span>
              <span>{terminData.preis} €</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Servicegebühr:</span>
              <span>5,00 €</span>
            </div>

            <div className="border-t border-border pt-3 flex justify-between font-bold">
              <span>Gesamtbetrag:</span>
              <span className="text-apricot-500">{terminData.preis + 5} €</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-petrol-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-petrol-400" />
              <span className="text-sm font-medium">Kostenträger</span>
            </div>
            <p className="text-sm text-petrol-300">{terminData.kostentraeger}</p>
            <p className="text-xs text-gray-400 mt-1">Die Abrechnung erfolgt direkt mit dem Kostenträger</p>
          </div>
        </div>

        <div className="bg-secondary rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4">Bestätigung durch</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm text-gray-400">
                Name der bestätigenden Person
              </Label>
              <Input
                id="name"
                placeholder="Ihr vollständiger Name"
                className="mt-1 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
              />
            </div>

            <div>
              <Label htmlFor="position" className="text-sm text-gray-400">
                Position/Funktion
              </Label>
              <Input
                id="position"
                placeholder="z.B. Arzt, Sachbearbeiter, etc."
                className="mt-1 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
              />
            </div>

            <div>
              <Label htmlFor="organisation" className="text-sm text-gray-400">
                Organisation/Praxis
              </Label>
              <Input
                id="organisation"
                placeholder="Name der Einrichtung"
                className="mt-1 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleConfirm} disabled={isConfirming} className="w-full bg-petrol-600 hover:bg-petrol-700">
          {isConfirming ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Bestätige Termin...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Termin bestätigen und Abrechnung starten
            </>
          )}
        </Button>
      </div>

      <BottomNavigation />
    </main>
  )
}
