"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"
import { lookupKostentraeger, getTerminKategorie, type TerminKategorie } from "@/lib/kostentraeger"

interface KostentraegerSelectorProps {
  anlass: string
  bundesland: string
  onKostentraegerChange: (kostentraeger: string, kategorie: TerminKategorie) => void
}

export default function KostentraegerSelector({
  anlass,
  bundesland,
  onKostentraegerChange,
}: KostentraegerSelectorProps) {
  const [selectedKategorie, setSelectedKategorie] = useState<TerminKategorie | null>(null)

  // Automatische Kategoriezuordnung basierend auf Anlass
  const automaticKategorie = getTerminKategorie(anlass)
  const automaticKostentraeger = lookupKostentraeger(bundesland, automaticKategorie)

  const kategorien: { value: TerminKategorie; label: string; description: string }[] = [
    { value: "gesundheit", label: "Gesundheit", description: "Arzttermine, Therapien, Krankenhausaufenthalte" },
    { value: "bildung", label: "Bildung", description: "Schule, Universität, Elterngespräche" },
    { value: "arbeit", label: "Arbeit", description: "Bewerbungen, Arbeitsagentur, berufliche Termine" },
    { value: "gericht", label: "Gericht/Polizei", description: "Gerichtstermine, Polizei, Anwaltsgespräche" },
    { value: "alltag", label: "Alltag/Beratung", description: "Behördengänge, Beratungstermine, sonstige Termine" },
  ]

  const handleKategorieChange = (kategorie: TerminKategorie) => {
    setSelectedKategorie(kategorie)
    const kostentraeger = lookupKostentraeger(bundesland, kategorie)
    onKostentraegerChange(kostentraeger, kategorie)
  }

  return (
    <div className="space-y-4">
      <div className="bg-petrol-900/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="h-4 w-4 text-petrol-400" />
          <span className="text-sm font-medium">Automatische Zuordnung</span>
        </div>
        <p className="text-sm text-gray-300 mb-2">
          Basierend auf dem Anlass "{anlass}" wurde automatisch die Kategorie "{automaticKategorie}" erkannt.
        </p>
        <Badge className="bg-petrol-600 hover:bg-petrol-700">{automaticKostentraeger}</Badge>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Kategorie manuell auswählen (optional)</label>
        <Select onValueChange={handleKategorieChange}>
          <SelectTrigger className="bg-muted border-0 focus:ring-1 focus:ring-petrol-500">
            <SelectValue placeholder="Andere Kategorie wählen..." />
          </SelectTrigger>
          <SelectContent>
            {kategorien.map((kategorie) => (
              <SelectItem key={kategorie.value} value={kategorie.value}>
                <div>
                  <div className="font-medium">{kategorie.label}</div>
                  <div className="text-xs text-gray-400">{kategorie.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedKategorie && (
        <div className="bg-secondary rounded-lg p-4">
          <h4 className="font-medium mb-2">Zuständiger Kostenträger:</h4>
          <Badge variant="outline" className="text-sm">
            {lookupKostentraeger(bundesland, selectedKategorie)}
          </Badge>
        </div>
      )}
    </div>
  )
}
