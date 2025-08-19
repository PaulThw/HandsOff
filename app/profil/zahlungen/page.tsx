"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CreditCard, Plus, Trash2, Shield } from "lucide-react"
import Link from "next/link"
import BottomNavigation from "@/components/bottom-navigation"

const zahlungsmethoden = [
  {
    id: 1,
    type: "visa",
    last4: "4242",
    expiryMonth: "12",
    expiryYear: "25",
    isDefault: true,
  },
  {
    id: 2,
    type: "mastercard",
    last4: "8888",
    expiryMonth: "08",
    expiryYear: "26",
    isDefault: false,
  },
]

export default function ZahlungenPage() {
  const [showAddCard, setShowAddCard] = useState(false)
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const handleAddCard = () => {
    // Hier würde die neue Karte gespeichert werden
    console.log("Neue Karte hinzufügen:", newCard)
    setShowAddCard(false)
    setNewCard({ number: "", expiry: "", cvv: "", name: "" })
  }

  const handleDeleteCard = (id: number) => {
    console.log("Karte löschen:", id)
  }

  const handleSetDefault = (id: number) => {
    console.log("Als Standard setzen:", id)
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
          <h1 className="text-xl font-bold">Zahlungsmethoden</h1>
          <Button onClick={() => setShowAddCard(true)} className="ml-auto bg-petrol-600 hover:bg-petrol-700" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Hinzufügen
          </Button>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Bestehende Zahlungsmethoden */}
        <div className="space-y-4">
          {zahlungsmethoden.map((card) => (
            <div key={card.id} className="bg-secondary rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-petrol-600 rounded p-2">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {card.type.toUpperCase()} •••• {card.last4}
                    </p>
                    <p className="text-sm text-gray-400">
                      Läuft ab {card.expiryMonth}/{card.expiryYear}
                    </p>
                    {card.isDefault && (
                      <span className="text-xs bg-petrol-600 text-white px-2 py-1 rounded">Standard</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {!card.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => handleSetDefault(card.id)}>
                      Standard
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteCard(card.id)}>
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Neue Karte hinzufügen */}
        {showAddCard && (
          <div className="bg-secondary rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Neue Karte hinzufügen</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Kartennummer</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={newCard.number}
                  onChange={(e) => setNewCard((prev) => ({ ...prev, number: e.target.value }))}
                  className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
                />
              </div>

              <div>
                <Label htmlFor="cardName">Name auf der Karte</Label>
                <Input
                  id="cardName"
                  placeholder="Max Mustermann"
                  value={newCard.name}
                  onChange={(e) => setNewCard((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Ablaufdatum</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/JJ"
                    value={newCard.expiry}
                    onChange={(e) => setNewCard((prev) => ({ ...prev, expiry: e.target.value }))}
                    className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">Sicherheitscode</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={newCard.cvv}
                    onChange={(e) => setNewCard((prev) => ({ ...prev, cvv: e.target.value }))}
                    className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-petrol-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowAddCard(false)} className="flex-1">
                  Abbrechen
                </Button>
                <Button onClick={handleAddCard} className="flex-1 bg-petrol-600 hover:bg-petrol-700">
                  Karte hinzufügen
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Sicherheitshinweis */}
        <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Sicherheit</span>
          </div>
          <p className="text-xs text-blue-200">
            Alle Zahlungsdaten werden verschlüsselt gespeichert und entsprechen den PCI-DSS Standards.
          </p>
        </div>
      </div>

      <BottomNavigation />
    </main>
  )
}
