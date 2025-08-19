"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone, MapPin, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Ihre Nachricht wurde gesendet! Wir werden uns in Kürze bei Ihnen melden.")
    // Hier könnte eine Server Action oder API-Route aufgerufen werden
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 mt-10">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex-grow text-center -ml-10">Kontaktieren Sie uns</h1>
          <div className="w-10" />
        </div>

        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <MessageSquare className="h-12 w-12 text-gray-600" />
          </div>
          <p className="text-gray-600">
            Haben Sie Fragen, Anregungen oder benötigen Sie Unterstützung? Wir helfen Ihnen gerne weiter!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-10">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Ihr Name
            </Label>
            <Input id="name" type="text" placeholder="Max Mustermann" className="h-12 mt-1 border-gray-300" required />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Ihre E-Mail-Adresse
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="max.mustermann@example.com"
              className="h-12 mt-1 border-gray-300"
              required
            />
          </div>
          <div>
            <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
              Betreff
            </Label>
            <Input
              id="subject"
              type="text"
              placeholder="Anfrage zu..."
              className="h-12 mt-1 border-gray-300"
              required
            />
          </div>
          <div>
            <Label htmlFor="user-type" className="text-sm font-medium text-gray-700">
              Ich bin ein/e
            </Label>
            <Select name="user-type">
              <SelectTrigger className="h-12 mt-1 border-gray-300">
                <SelectValue placeholder="Wählen Sie Ihren Benutzertyp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kunde">Kunde</SelectItem>
                <SelectItem value="dolmetscher">Dolmetscher</SelectItem>
                <SelectItem value="amt">Amt</SelectItem>
                <SelectItem value="krankenkasse">Krankenkasse</SelectItem>
                <SelectItem value="sonstige">Sonstige</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="message" className="text-sm font-medium text-gray-700">
              Ihre Nachricht
            </Label>
            <Textarea
              id="message"
              placeholder="Ihre Nachricht hier..."
              rows={5}
              className="mt-1 border-gray-300"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full h-14 bg-petrol-500 hover:bg-petrol-600 text-white font-semibold rounded-xl shadow-lg"
          >
            Nachricht senden
          </Button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ContactInfoCard icon={Mail} title="E-Mail" value="info@gebaerdennow.de" link="mailto:info@gebaerdennow.de" />
          <ContactInfoCard icon={Phone} title="Telefon" value="+49 30 98765432" link="tel:+493098765432" />
          <ContactInfoCard
            icon={MapPin}
            title="Büro"
            value="Hauptstraße 42, 10115 Berlin"
            link="https://maps.google.com/?q=Hauptstraße 42, 10115 Berlin"
          />
        </div>
      </div>
    </main>
  )
}

interface ContactInfoCardProps {
  title: string
  value: string
  icon: React.ElementType
  link: string
}

function ContactInfoCard({ title, value, icon: Icon, link }: ContactInfoCardProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      <div className="p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 bg-white text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Icon className="h-6 w-6 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-700 font-medium">{value}</p>
      </div>
    </a>
  )
}
