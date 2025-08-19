"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, Clock, MapPin, Video, CreditCard, FileText } from "lucide-react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import BottomNavigation from "@/components/bottom-navigation"
import KostentraegerSelector from "@/components/kostentraeger-selector"
import { kostentraegerData, type TerminKategorie } from "@/lib/kostentraeger"

export default function BuchungPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const day = searchParams.get("day") || "Heute"
  const time = searchParams.get("time") || "14:00"

  const [bookingType, setBookingType] = useState("persönlich")
  const [step, setStep] = useState(1)
  const [anlass, setAnlass] = useState("")
  const [bundesland, setBundesland] = useState("Berlin")
  const [kostentraeger, setKostentraeger] = useState("")
  const [kategorie, setKategorie] = useState<TerminKategorie | null>(null)

  const handleKostentraegerChange = (newKostentraeger: string, newKategorie: TerminKategorie) => {
    setKostentraeger(newKostentraeger)
    setKategorie(newKategorie)
  }

  return (
    <main className="flex min-h-screen flex-col pb-20">
      <div className="bg-secondary p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href={`/dolmetscher/${params.id}`}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Termin buchen</h1>
        </div>
      </div>

      <div className="container py-6">
        {step === 1 && (
          <>
            <div className="bg-secondary rounded-lg p-4 mb-6">
              <h2 className="text-lg font-bold mb-4">Termindetails</h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-petrol-400" />
                  <div>
                    <p className="text-sm text-gray-400">Datum</p>
                    <p className="font-medium">{day}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-petrol-400" />
                  <div>
                    <p className="text-sm text-gray-400">Uhrzeit</p>
                    <p className="font-medium">{time} Uhr</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bundesland" className="text-sm text-gray-400">
                    Bundesland
                  </Label>
                  <Select value={bundesland} onValueChange={setBundesland}>
                    <SelectTrigger className="mt-1 bg-muted border-0 focus:ring-1 focus:ring-petrol-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {kostentraegerData.map((data) => (
                        <SelectItem key={data.bundesland} value={data.bundesland}>
                          {data.bundesland}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-petrol-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Ort</p>
                    <Input
                      placeholder="Adresse eingeben"
                      className="mt-1 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-4 mb-6">
              <h2 className="text-lg font-bold mb-4">Art des Termins</h2>

              <RadioGroup value={bookingType} onValueChange={setBookingType} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="persönlich" id="persönlich" />
                  <Label htmlFor="persönlich" className="flex items-center cursor-pointer">
                    <MapPin className="h-5 w-5 mr-2 text-petrol-400" />
                    Persönlich vor Ort
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="video" id="video" />
                  <Label htmlFor="video" className="flex items-center cursor-pointer">
                    <Video className="h-5 w-5 mr-2 text-petrol-400" />
                    Video-Dolmetschen
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="bg-secondary rounded-lg p-4 mb-6">
              <h2 className="text-lg font-bold mb-4">Zusätzliche Informationen</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="anlass" className="text-sm text-gray-400">
                    Anlass des Dolmetschens
                  </Label>
                  <Input
                    id="anlass"
                    value={anlass}
                    onChange={(e) => setAnlass(e.target.value)}
                    placeholder="z.B. Arzttermin, Behördengang, Schultermin"
                    className="mt-1 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
                  />
                </div>

                <div>
                  <Label htmlFor="details" className="text-sm text-gray-400">
                    Weitere Details (optional)
                  </Label>
                  <Textarea
                    id="details"
                    placeholder="Besondere Anforderungen oder Informationen"
                    className="mt-1 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
                  />
                </div>
              </div>
            </div>

            {anlass && (
              <div className="bg-secondary rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-petrol-400" />
                  <h2 className="text-lg font-bold">Kostenträger</h2>
                </div>
                <KostentraegerSelector
                  anlass={anlass}
                  bundesland={bundesland}
                  onKostentraegerChange={handleKostentraegerChange}
                />
              </div>
            )}

            <Button className="w-full bg-petrol-600 hover:bg-petrol-700" onClick={() => setStep(2)}>
              Weiter zur Zahlung
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="bg-secondary rounded-lg p-4 mb-6">
              <h2 className="text-lg font-bold mb-4">Buchungsübersicht</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Termin</span>
                  <span>
                    {day}, {time} Uhr
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Art</span>
                  <span>{bookingType === "persönlich" ? "Vor Ort" : "Video"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Anlass</span>
                  <span>{anlass}</span>
                </div>
                {kostentraeger && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Kostenträger</span>
                    <span className="text-sm">{kostentraeger}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-3">
                <h3 className="font-medium mb-2">Zahlungsübersicht</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dolmetscher (1 Stunde)</span>
                    <span>60,00 €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Servicegebühr</span>
                    <span>5,00 €</span>
                  </div>
                  {bookingType === "persönlich" && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Anfahrtspauschale</span>
                      <span>10,00 €</span>
                    </div>
                  )}
                  <div className="border-t border-border pt-2 flex justify-between font-bold">
                    <span>Gesamtbetrag</span>
                    <span className="text-apricot-500">{bookingType === "persönlich" ? "75,00 €" : "65,00 €"}</span>
                  </div>
                </div>
              </div>

              {kostentraeger && (
                <div className="mt-4 p-3 bg-petrol-900/20 rounded-lg">
                  <p className="text-sm text-petrol-300">
                    <strong>Hinweis:</strong> Die Kosten können direkt mit dem Kostenträger "{kostentraeger}"
                    abgerechnet werden. Sie müssen möglicherweise keinen Eigenanteil zahlen.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-secondary rounded-lg p-4 mb-6">
              <h2 className="text-lg font-bold mb-4">Zahlungsmethode</h2>

              <div className="space-y-3">
                <div className="flex items-center p-3 border border-border rounded-lg">
                  <CreditCard className="h-5 w-5 mr-3 text-petrol-400" />
                  <div className="flex-1">
                    <p className="font-medium">Kreditkarte</p>
                    <p className="text-sm text-gray-400">Visa, Mastercard, American Express</p>
                  </div>
                  <RadioGroupItem value="card" id="card" checked />
                </div>

                <div>
                  <Label htmlFor="cardNumber" className="text-sm text-gray-400">
                    Kartennummer
                  </Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="mt-1 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry" className="text-sm text-gray-400">
                      Ablaufdatum
                    </Label>
                    <Input
                      id="expiry"
                      placeholder="MM/JJ"
                      className="mt-1 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-sm text-gray-400">
                      Sicherheitscode
                    </Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      className="mt-1 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Zurück
              </Button>
              <Link href="/termine" className="flex-1">
                <Button className="w-full bg-petrol-600 hover:bg-petrol-700">Jetzt buchen</Button>
              </Link>
            </div>
          </>
        )}
      </div>

      <BottomNavigation />
    </main>
  )
}
