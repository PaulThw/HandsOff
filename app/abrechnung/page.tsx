import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, Filter, QrCode, CheckCircle, Clock, Euro, FileText, Calendar } from "lucide-react"
import BottomNavigation from "@/components/bottom-navigation"
import QRCodeGenerator from "@/components/qr-code-generator"

const abrechnungen = [
  {
    id: "A001",
    terminId: "T1234567890",
    datum: "2025-01-10",
    uhrzeit: "14:00",
    dauer: 60,
    anlass: "Arzttermin",
    terminArt: "gesundheit" as const,
    kunde: "Dr. Müller Praxis",
    preis: 60,
    status: "bestaetigt" as const,
    kostentraeger: "Krankenkasse",
    bundesland: "Berlin",
  },
  {
    id: "A002",
    terminId: "T1234567891",
    datum: "2025-01-12",
    uhrzeit: "10:30",
    dauer: 120,
    anlass: "Elterngespräch",
    terminArt: "bildung" as const,
    kunde: "Grundschule Mitte",
    preis: 120,
    status: "offen" as const,
    kostentraeger: "Schulaufsicht / Senatsverwaltung für Bildung",
    bundesland: "Berlin",
  },
  {
    id: "A003",
    terminId: "T1234567892",
    datum: "2025-01-08",
    uhrzeit: "16:00",
    dauer: 90,
    anlass: "Bewerbungsgespräch",
    terminArt: "arbeit" as const,
    kunde: "Arbeitsagentur Berlin",
    preis: 90,
    status: "abgerechnet" as const,
    kostentraeger: "Arbeitsagentur / Integrationsamt",
    bundesland: "Berlin",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "bestaetigt":
      return "bg-green-600"
    case "offen":
      return "bg-yellow-600"
    case "abgerechnet":
      return "bg-blue-600"
    default:
      return "bg-gray-600"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "bestaetigt":
      return "Bestätigt"
    case "offen":
      return "Offen"
    case "abgerechnet":
      return "Abgerechnet"
    default:
      return "Unbekannt"
  }
}

export default function AbrechnungPage() {
  const gesamtOffen = abrechnungen
    .filter((a) => a.status === "offen" || a.status === "bestaetigt")
    .reduce((sum, a) => sum + a.preis, 0)

  const gesamtAbgerechnet = abrechnungen.filter((a) => a.status === "abgerechnet").reduce((sum, a) => sum + a.preis, 0)

  return (
    <main className="flex min-h-screen flex-col pb-20">
      <div className="bg-secondary p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Abrechnung</h1>
          <Button size="sm" className="bg-petrol-600 hover:bg-petrol-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Termin-ID, Kunde, Anlass..."
            className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
          />
          <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="container py-4">
        {/* Übersicht */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-secondary rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-gray-400">Offene Beträge</span>
            </div>
            <div className="text-2xl font-bold text-yellow-500">{gesamtOffen} €</div>
          </div>

          <div className="bg-secondary rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-400">Abgerechnet</span>
            </div>
            <div className="text-2xl font-bold text-green-500">{gesamtAbgerechnet} €</div>
          </div>

          <div className="bg-secondary rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Euro className="h-5 w-5 text-petrol-400" />
              <span className="text-sm text-gray-400">Gesamt</span>
            </div>
            <div className="text-2xl font-bold text-petrol-400">{gesamtOffen + gesamtAbgerechnet} €</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {["Alle", "Offen", "Bestätigt", "Abgerechnet"].map((filter, index) => (
            <Badge
              key={filter}
              variant={index === 0 ? "default" : "outline"}
              className={index === 0 ? "bg-petrol-600 hover:bg-petrol-700" : ""}
            >
              {filter}
            </Badge>
          ))}
        </div>

        {/* Abrechnungsliste */}
        <div className="space-y-4">
          {abrechnungen.map((abrechnung) => (
            <div key={abrechnung.id} className="bg-secondary rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold">{abrechnung.kunde}</h3>
                    <p className="text-sm text-gray-400">ID: {abrechnung.terminId}</p>
                  </div>
                  <Badge className={getStatusColor(abrechnung.status)}>{getStatusText(abrechnung.status)}</Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-petrol-400" />
                    <span>
                      {abrechnung.datum} um {abrechnung.uhrzeit} ({abrechnung.dauer} Min.)
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <FileText className="h-4 w-4 mr-2 text-apricot-400" />
                    <span>{abrechnung.anlass}</span>
                  </div>

                  <div className="bg-petrol-900/20 rounded p-2 mt-2">
                    <div className="flex items-center text-xs mb-1">
                      <FileText className="h-3 w-3 mr-1 text-petrol-400" />
                      <span className="text-gray-400">Kostenträger:</span>
                    </div>
                    <span className="text-xs text-petrol-300">{abrechnung.kostentraeger}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="font-bold text-xl text-apricot-500">{abrechnung.preis} €</div>

                  <div className="flex gap-2">
                    {abrechnung.status === "offen" && (
                      <Button size="sm" className="bg-petrol-600 hover:bg-petrol-700">
                        <QrCode className="h-4 w-4 mr-1" />
                        QR-Code
                      </Button>
                    )}

                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                  </div>
                </div>

                {/* QR-Code Generator für offene Termine */}
                {abrechnung.status === "offen" && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <QRCodeGenerator
                      terminData={{
                        terminId: abrechnung.terminId,
                        dolmetscherId: "D001",
                        terminArt: abrechnung.terminArt,
                        datum: abrechnung.datum,
                        uhrzeit: abrechnung.uhrzeit,
                        dauer: abrechnung.dauer,
                        preis: abrechnung.preis,
                        kostentraeger: abrechnung.kostentraeger,
                        bundesland: abrechnung.bundesland,
                        anlass: abrechnung.anlass,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </main>
  )
}
