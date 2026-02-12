"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Plus, MapPin, Euro, FileText } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useActionState } from "react"
import { createNewAppointment, getDolmetscherAppointments, getKostentraegers } from "../actions"
import { toast } from "sonner"
import { lookupKostentraeger } from "@/lib/kostentraeger"

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

interface Kostentraeger {
  id: string
  name: string
}

export default function DolmetscherTerminePage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [appointmentType, setAppointmentType] = useState("persoenlich")
  const [kostentraegerList, setKostentraegerList] = useState<Kostentraeger[]>([])
  const [loadingAppointments, setLoadingAppointments] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const [state, formAction] = useActionState(async (prevState: any, formData: FormData) => {
    const result = await createNewAppointment(formData)
    if (result.success) {
      toast.success(result.message)
      // Reset form fields
      setDate(undefined)
      setAppointmentType("persoenlich")
      // Manually reset other form fields if needed, or use a ref
      const form = document.getElementById("new-appointment-form") as HTMLFormElement
      if (form) {
        form.reset()
      }
      fetchAppointments() // Refresh the list of appointments
    } else {
      toast.error(result.message)
    }
    return result
  }, null)

  useEffect(() => {
    const fetchKostentraeger = async () => {
      const data = await getKostentraegers()
      setKostentraegerList(data)
    }
    fetchKostentraeger()
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    setLoadingAppointments(true)
    const data = await getDolmetscherAppointments()
    setAppointments(data as Appointment[])
    setLoadingAppointments(false)
  }

  const upcomingAppointments = appointments.filter((a) => a.status === "accepted" && new Date(a.date) >= new Date())
  const pastAppointments = appointments.filter(
    (a) => a.status === "completed" || (a.status === "accepted" && new Date(a.date) < new Date()),
  )

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Meine Termine</h1>

      {/* Neuen Termin erstellen */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" /> Neuen Termin erstellen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form id="new-appointment-form" action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Datum</Label>
              <Input type="hidden" name="date" value={date ? format(date, "yyyy-MM-dd") : ""} />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd.MM.yyyy") : <span>Datum auswählen</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Uhrzeit</Label>
              <Input id="time" name="time" type="time" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration_minutes">Dauer (Minuten)</Label>
              <Input id="duration_minutes" name="duration_minutes" type="number" required min="15" step="15" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Art des Termins</Label>
              <Select onValueChange={setAppointmentType} value={appointmentType} name="type" required>
                <SelectTrigger>
                  <SelectValue placeholder="Art auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="persoenlich">Persönlich</SelectItem>
                  <SelectItem value="video">Video-Dolmetschen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {appointmentType === "persoenlich" && (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="location">Ort</Label>
                <Input id="location" name="location" placeholder="Adresse des Termins" />
              </div>
            )}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="anlass">Anlass</Label>
              <Input id="anlass" name="anlass" placeholder="Z.B. Arzttermin, Elterngespräch" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Beschreibung</Label>
              <Textarea id="description" name="description" placeholder="Detaillierte Beschreibung des Termins" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kostentraeger_id">Kostenträger</Label>
              <Select name="kostentraeger_id">
                <SelectTrigger>
                  <SelectValue placeholder="Kostenträger auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {kostentraegerList.map((kt) => (
                    <SelectItem key={kt.id} value={kt.id}>
                      {kt.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Vergütung (€)</Label>
              <Input id="price" name="price" type="number" step="0.01" placeholder="Z.B. 60.00" required />
            </div>
            <Button type="submit" className="md:col-span-2 bg-petrol-600 hover:bg-petrol-700">
              Termin erstellen
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Bevorstehende Termine */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bevorstehende Termine</h2>
        {loadingAppointments ? (
          <p className="text-gray-600">Termine werden geladen...</p>
        ) : upcomingAppointments.length === 0 ? (
          <p className="text-gray-600">Keine bevorstehenden Termine.</p>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map((termin) => (
              <Card key={termin.id} className="bg-secondary">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>
                      {termin.anlass || "Unbekannter Anlass"} - {termin.type === "persoenlich" ? "Persönlich" : "Video"}
                    </span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Bestätigt
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <CalendarIcon className="inline-block h-4 w-4 mr-2 text-petrol-400" />
                    {new Date(termin.date).toLocaleDateString("de-DE")}, {termin.time} Uhr ({termin.duration_minutes}{" "}
                    Min.)
                  </p>
                  {termin.location && (
                    <p className="text-sm text-gray-600">
                      <MapPin className="inline-block h-4 w-4 mr-2 text-petrol-400" />
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
                      <Euro className="inline-block h-4 w-4 mr-2 text-green-600" />
                      Vergütung: {termin.price} €
                    </p>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                    {/* Add more actions like "Termin abschließen" if needed */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Vergangene Termine */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Vergangene Termine</h2>
        {loadingAppointments ? (
          <p className="text-gray-600">Termine werden geladen...</p>
        ) : pastAppointments.length === 0 ? (
          <p className="text-gray-600">Keine vergangenen Termine.</p>
        ) : (
          <div className="space-y-4">
            {pastAppointments.map((termin) => (
              <Card key={termin.id} className="bg-secondary">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>
                      {termin.anlass || "Unbekannter Anlass"} - {termin.type === "persoenlich" ? "Persönlich" : "Video"}
                    </span>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800">
                      Abgeschlossen
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <CalendarIcon className="inline-block h-4 w-4 mr-2 text-petrol-400" />
                    {new Date(termin.date).toLocaleDateString("de-DE")}, {termin.time} Uhr ({termin.duration_minutes}{" "}
                    Min.)
                  </p>
                  {termin.location && (
                    <p className="text-sm text-gray-600">
                      <MapPin className="inline-block h-4 w-4 mr-2 text-petrol-400" />
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
                      <Euro className="inline-block h-4 w-4 mr-2 text-green-600" />
                      Vergütung: {termin.price} €
                    </p>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
