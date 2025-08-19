"use client"

import type React from "react"
import { signOut } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { User, Calendar, Calculator, FileText, Clock, TrendingUp, LogOut, Check, X } from "lucide-react"
import Link from "next/link"
import { useActionState } from "react"
import { updateAppointmentStatus, getDolmetscherAppointments } from "./actions"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface Appointment {
  id: string
  date: string
  time: string
  duration_minutes: number
  type: string
  location: string | null
  description: string | null
  status: string
  anlass: string | null
  kostentraeger: { id: string; name: string } | null
  price: number | null
}

export default function DolmetscherDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  const [acceptState, acceptAction] = useActionState(async (prevState: any, formData: FormData) => {
    const id = formData.get("id") as string
    const result = await updateAppointmentStatus(id, "accepted")
    if (result.success) {
      toast.success(result.message)
      fetchAppointments() // Refresh appointments after update
    } else {
      toast.error(result.message)
    }
    return result
  }, null)

  const [declineState, declineAction] = useActionState(async (prevState: any, formData: FormData) => {
    const id = formData.get("id") as string
    const result = await updateAppointmentStatus(id, "declined")
    if (result.success) {
      toast.success(result.message)
      fetchAppointments() // Refresh appointments after update
    } else {
      toast.error(result.message)
    }
    return result
  }, null)

  const fetchAppointments = async () => {
    setLoading(true)
    const data = await getDolmetscherAppointments()
    setAppointments(data as Appointment[])
    setLoading(false)
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const pendingAppointments = appointments.filter((a) => a.status === "pending")

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-apricot-50 to-apricot-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 mt-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dolmetscher-Dashboard</h1>
          <form action={signOut}>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Abmelden
            </Button>
          </form>
        </div>

        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-apricot-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Hallo, Dolmetscher!</h2>
          <p className="text-gray-600">Verwalten Sie Ihre Aufträge und Verfügbarkeiten.</p>
        </div>

        {/* Offene Terminanfragen */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Offene Terminanfragen</h2>
          {loading ? (
            <p className="text-gray-600">Termine werden geladen...</p>
          ) : pendingAppointments.length === 0 ? (
            <p className="text-gray-600">Keine offenen Terminanfragen.</p>
          ) : (
            <div className="space-y-4">
              {pendingAppointments.map((termin) => (
                <Card key={termin.id} className="bg-secondary">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>
                        {termin.anlass || "Unbekannter Anlass"} -{" "}
                        {termin.type === "persoenlich" ? "Persönlich" : "Video"}
                      </span>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        Anfrage
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <Calendar className="inline-block h-4 w-4 mr-2 text-petrol-400" />
                      {new Date(termin.date).toLocaleDateString("de-DE")}, {termin.time} Uhr ({termin.duration_minutes}{" "}
                      Min.)
                    </p>
                    {termin.location && (
                      <p className="text-sm text-gray-600">
                        <User className="inline-block h-4 w-4 mr-2 text-petrol-400" />
                        Ort: {termin.location}
                      </p>
                    )}
                    {termin.kostentraeger && (
                      <p className="text-sm text-gray-600">
                        <FileText className="inline-block h-4 w-4 mr-2 text-apricot-400" />
                        Kostenträger: {termin.kostentraeger.name}
                      </p>
                    )}
                    {termin.price && (
                      <p className="text-sm text-gray-600">
                        <Calculator className="inline-block h-4 w-4 mr-2 text-green-600" />
                        Vergütung: {termin.price} €
                      </p>
                    )}
                    <div className="flex gap-2 mt-4">
                      <form action={acceptAction}>
                        <input type="hidden" name="id" value={termin.id} />
                        <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">
                          <Check className="h-4 w-4 mr-2" />
                          Annehmen
                        </Button>
                      </form>
                      <form action={declineAction}>
                        <input type="hidden" name="id" value={termin.id} />
                        <Button
                          type="submit"
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Ablehnen
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Terminkalender"
            description="Ihre gebuchten und verfügbaren Termine."
            icon={Calendar}
            bgColor="bg-apricot-100"
            textColor="text-apricot-700"
            link="/dashboard/dolmetscher/termine"
          />
          <DashboardCard
            title="Abrechnungen"
            description="Erstellen und verwalten Sie Ihre Rechnungen."
            icon={Calculator}
            bgColor="bg-green-100"
            textColor="text-green-700"
            link="/dashboard/dolmetscher/abrechnungen"
          />
          <DashboardCard
            title="Profil & Qualifikationen"
            description="Aktualisieren Sie Ihr Profil und Ihre Spezialisierungen."
            icon={User}
            bgColor="bg-blue-100"
            textColor="text-blue-700"
            link="/dashboard/dolmetscher/profil"
          />
          <DashboardCard
            title="Offene Aufträge"
            description="Neue Anfragen und potenzielle Aufträge."
            icon={FileText}
            bgColor="bg-purple-100"
            textColor="text-purple-700"
            link="/dashboard/dolmetscher/auftraege"
          />
          <DashboardCard
            title="Arbeitszeiten"
            description="Legen Sie Ihre Verfügbarkeiten fest."
            icon={Clock}
            bgColor="bg-indigo-100"
            textColor="text-indigo-700"
            link="/dashboard/dolmetscher/verfuegbarkeit"
          />
          <DashboardCard
            title="Statistiken"
            description="Übersicht über Ihre Leistung und Einnahmen."
            icon={TrendingUp}
            bgColor="bg-teal-100"
            textColor="text-teal-700"
            link="/dashboard/dolmetscher/statistiken"
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
