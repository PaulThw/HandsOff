import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, Building2, Heart, Briefcase } from "lucide-react"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Willkommen bei <span className="text-petrol-600">GebärdenNow</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Ihr Portal für barrierefreie Kommunikation. Wählen Sie Ihren Zugangstyp:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        <RoleCard
          title="Kunde"
          description="Dolmetscher buchen und Termine verwalten."
          icon={User}
          bgColor="bg-petrol-500"
          hoverBgColor="hover:bg-petrol-600"
          link="/login/kunde"
        />
        <RoleCard
          title="Dolmetscher"
          description="Aufträge annehmen und Abrechnungen erstellen."
          icon={Briefcase}
          bgColor="bg-apricot-500"
          hoverBgColor="hover:bg-apricot-600"
          link="/login/dolmetscher"
        />
        <RoleCard
          title="Amt"
          description="Anträge bearbeiten und Klienten verwalten."
          icon={Building2}
          bgColor="bg-blue-500"
          hoverBgColor="hover:bg-blue-600"
          link="/login/amt"
        />
        <RoleCard
          title="Krankenkasse"
          description="Kostenübernahmen prüfen und Berichte einsehen."
          icon={Heart}
          bgColor="bg-green-500"
          hoverBgColor="hover:bg-green-600"
          link="/login/krankenkasse"
        />
      </div>

      <div className="mt-12 text-center text-gray-600">
        <p className="mb-2">Noch keinen Account?</p>
        <Link href="/registrieren">
          <Button variant="link" className="text-lg text-gray-700 hover:text-gray-900 font-semibold">
            Jetzt registrieren
          </Button>
        </Link>
      </div>
    </main>
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
          Login
        </Button>
      </div>
    </Link>
  )
}
