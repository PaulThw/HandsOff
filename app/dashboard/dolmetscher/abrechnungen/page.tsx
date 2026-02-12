"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Euro, Send } from "lucide-react"
import { useActionState } from "react"
import { createInvoice, getCompletedAppointmentsForInvoicing, getInvoices, sendInvoice, getKostentraegers } from "../actions"
import { toast } from "sonner"
import { getTerminKategorie, lookupKostentraeger } from "@/lib/kostentraeger"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface AppointmentForInvoice {
  id: string
  date: string
  time: string
  anlass: string | null
  description: string | null
  price: number | null
  kostentraeger: { id: string; name: string } | null
}

interface Invoice {
  id: string
  amount: number
  invoice_date: string
  status: string
  kostentraeger: { name: string } | null
  termine: { date: string; time: string; anlass: string | null; description: string | null } | null
}

interface Kostentraeger {
  id: string
  name: string
}

export default function DolmetscherAbrechnungenPage() {
  const [appointmentsToInvoice, setAppointmentsToInvoice] = useState<AppointmentForInvoice[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loadingAppointments, setLoadingAppointments] = useState(true)
  const [loadingInvoices, setLoadingInvoices] = useState(true)
  const [kostentraegerList, setKostentraegerList] = useState<Kostentraeger[]>([])
  const [selectedKostentraegerId, setSelectedKostentraegerId] = useState<string | null>(null)

  const [createInvoiceState, createInvoiceAction] = useActionState(async (prevState: any, formData: FormData) => {
    const terminId = formData.get("terminId") as string
    const amount = Number.parseFloat(formData.get("amount") as string)
    const kostentraegerId = formData.get("kostentraegerId") as string

    const result = await createInvoice(terminId, amount, kostentraegerId)
    if (result.success) {
      toast.success(result.message)
      fetchData() // Refresh both lists
    } else {
      toast.error(result.message)
    }
    return result
  }, null)

  const [sendInvoiceState, sendInvoiceAction] = useActionState(async (prevState: any, formData: FormData) => {
    const invoiceId = formData.get("invoiceId") as string
    const result = await sendInvoice(invoiceId)
    if (result.success) {
      toast.success(result.message)
      fetchData() // Refresh invoices
    } else {
      toast.error(result.message)
    }
    return result
  }, null)

  const fetchData = async () => {
    setLoadingAppointments(true)
    setLoadingInvoices(true)
    const [appts, invs, kts] = await Promise.all([
      getCompletedAppointmentsForInvoicing(),
      getInvoices(),
      getKostentraegers(),
    ])
    setAppointmentsToInvoice(appts as AppointmentForInvoice[])
    setInvoices(invs as Invoice[])
    setKostentraegerList(kts)
    setLoadingAppointments(false)
    setLoadingInvoices(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "paid":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Abrechnungen</h1>

      {/* Termine zur Abrechnung */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> Termine zur Abrechnung
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingAppointments ? (
            <p className="text-gray-600">Termine werden geladen...</p>
          ) : appointmentsToInvoice.length === 0 ? (
            <p className="text-gray-600">Keine Termine zur Abrechnung verfügbar.</p>
          ) : (
            <div className="space-y-4">
              {appointmentsToInvoice.map((termin) => (
                <div key={termin.id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">{termin.anlass || "Unbekannter Anlass"}</h3>
                  <p className="text-sm text-gray-600">
                    Datum: {new Date(termin.date).toLocaleDateString("de-DE")}, {termin.time} Uhr
                  </p>
                  <p className="text-sm text-gray-600">
                    Kostenträger: {termin.kostentraeger?.name || "Nicht angegeben"}
                  </p>
                  <p className="text-sm font-bold text-green-600 mt-2">Vergütung: {termin.price || 0} €</p>
                  <form action={createInvoiceAction} className="mt-4 flex flex-col gap-2">
                    <input type="hidden" name="terminId" value={termin.id} />
                    <input type="hidden" name="amount" value={termin.price || 0} />
                    <div className="space-y-2">
                      <Label htmlFor={`kostentraeger-${termin.id}`}>Kostenträger für Rechnung</Label>
                      <Select name="kostentraegerId" defaultValue={termin.kostentraeger?.id || ""} required>
                        <SelectTrigger id={`kostentraeger-${termin.id}`}>
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
                    <Button type="submit" size="sm" className="bg-petrol-600 hover:bg-petrol-700">
                      Rechnung erstellen
                    </Button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Meine Rechnungen */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Euro className="h-5 w-5" /> Meine Rechnungen
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingInvoices ? (
            <p className="text-gray-600">Rechnungen werden geladen...</p>
          ) : invoices.length === 0 ? (
            <p className="text-gray-600">Noch keine Rechnungen erstellt.</p>
          ) : (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">
                      Rechnung vom {new Date(invoice.invoice_date).toLocaleDateString("de-DE")}
                    </h3>
                    <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Betrag: <span className="font-bold text-green-600">{invoice.amount} €</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Kostenträger: {invoice.kostentraeger?.name || "Nicht angegeben"}
                  </p>
                  {invoice.termine && (
                    <p className="text-sm text-gray-600">
                      Termin: {new Date(invoice.termine.date).toLocaleDateString("de-DE")}, {invoice.termine.time} Uhr (
                      {invoice.termine.anlass})
                    </p>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                    {invoice.status === "draft" && (
                      <form action={sendInvoiceAction}>
                        <input type="hidden" name="invoiceId" value={invoice.id} />
                        <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Send className="h-4 w-4 mr-2" />
                          Rechnung senden
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
