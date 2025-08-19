import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { signOut } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { Building2, FileCheck, Users, BarChart3, Shield, Settings, LogOut } from "lucide-react"
import Link from "next/link"

export default async function AmtDashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 mt-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Behörden-Dashboard</h1>
          <form action={signOut}>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Abmelden
            </Button>
          </form>
        </div>

        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Building2 className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Hallo, {user?.email || "Amt"}!</h2>
          <p className="text-gray-600">Verwalten Sie Anträge und Klienten.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Anträge bearbeiten"
            description="Neue und offene Anträge prüfen und bearbeiten."
            icon={FileCheck}
            bgColor="bg-blue-100"
            textColor="text-blue-700"
            link="/dashboard/amt/antraege"
          />
          <DashboardCard
            title="Klientenverwaltung"
            description="Übersicht und Verwaltung Ihrer Klienten."
            icon={Users}
            bgColor="bg-green-100"
            textColor="text-green-700"
            link="/dashboard/amt/klienten"
          />
          <DashboardCard
            title="Statistiken"
            description="Berichte und Auswertungen zur Nutzung."
            icon={BarChart3}
            bgColor="bg-purple-100"
            textColor="text-purple-700"
            link="/dashboard/amt/statistiken"
          />
          <DashboardCard
            title="Genehmigungen"
            description="Kostenübernahmen und Bewilligungen verwalten."
            icon={Shield}
            bgColor="bg-orange-100"
            textColor="text-orange-700"
            link="/dashboard/amt/genehmigungen"
          />
          <DashboardCard
            title="Dienstleister"
            description="Verwaltung der Dolmetscher und Partner."
            icon={Building2}
            bgColor="bg-indigo-100"
            textColor="text-indigo-700"
            link="/dashboard/amt/dienstleister"
          />
          <DashboardCard
            title="System-Einstellungen"
            description="Konfiguration des Behördenportals."
            icon={Settings}
            bgColor="bg-teal-100"
            textColor="text-teal-700"
            link="/dashboard/amt/verwaltung"
          />
        </div>
      </div>
    </main>
  )
}

interface DashboardCardProps {
  title: string
  description: string
  icon: React.ElementType
  bgColor: string
  textColor: string
  link: string
}

function DashboardCard({ title, description, icon: Icon, bgColor, textColor, link }: DashboardCardProps) {
  return (
    <Link href={link} className="block">
      <div className="p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 bg-white">
        <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center mb-4`}>
          <Icon className={`h-6 w-6 ${textColor}`} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  )
}
