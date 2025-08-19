import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LifeBuoy, Mail, Phone, MapPin, BookOpen, Lightbulb } from "lucide-react"

export default function HelpPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 mt-10">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex-grow text-center -ml-10">Hilfe & Support</h1>
          <div className="w-10" />
        </div>

        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <LifeBuoy className="h-12 w-12 text-gray-600" />
          </div>
          <p className="text-gray-600">
            Wir sind für Sie da! Finden Sie Antworten auf Ihre Fragen oder kontaktieren Sie uns direkt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <HelpCard
            title="Häufig gestellte Fragen (FAQ)"
            description="Schnelle Antworten auf die gängigsten Fragen."
            icon={BookOpen}
            link="/faq"
          />
          <HelpCard
            title="Anleitungen & Tutorials"
            description="Schritt-für-Schritt-Anleitungen zur Nutzung der Plattform."
            icon={Lightbulb}
            link="/tutorials"
          />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Direkter Kontakt</h2>
          <p className="text-gray-600 mb-6">
            Wenn Sie persönliche Unterstützung benötigen, erreichen Sie uns über folgende Kanäle:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ContactInfoCard
            icon={Mail}
            title="E-Mail"
            value="support@gebaerdennow.de"
            link="mailto:support@gebaerdennow.de"
          />
          <ContactInfoCard icon={Phone} title="Telefon" value="+49 30 12345678" link="tel:+493012345678" />
          <ContactInfoCard
            icon={MapPin}
            title="Adresse"
            value="Musterstraße 1, 10115 Berlin"
            link="https://maps.google.com/?q=Musterstraße 1, 10115 Berlin"
          />
        </div>
      </div>
    </main>
  )
}

interface HelpCardProps {
  title: string
  description: string
  icon: React.ElementType
  link: string
}

function HelpCard({ title, description, icon: Icon, link }: HelpCardProps) {
  return (
    <Link href={link} className="block">
      <div className="p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 bg-white text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Icon className="h-6 w-6 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
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
