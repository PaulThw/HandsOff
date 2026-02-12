"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getDolmetscherAppointments() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data, error } = await supabase
    .from("termine")
    .select(
      `
      *,
      kostentraeger (id, name)
    `,
    )
    .eq("dolmetscher_id", user.id)
    .order("date", { ascending: true })
    .order("time", { ascending: true })

  if (error) {
    console.error("Error fetching dolmetscher appointments:", error)
    return []
  }
  return data
}

export async function updateAppointmentStatus(appointmentId: string, status: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Nicht authentifiziert." }
  }

  const { error } = await supabase
    .from("termine")
    .update({ status: status })
    .eq("id", appointmentId)
    .eq("dolmetscher_id", user.id)

  if (error) {
    console.error("Error updating appointment status:", error)
    return { success: false, message: "Fehler beim Aktualisieren des Status." }
  }

  revalidatePath("/dashboard/dolmetscher")
  revalidatePath("/dashboard/dolmetscher/termine")
  return { success: true, message: "Status erfolgreich aktualisiert." }
}

export async function createNewAppointment(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const date = formData.get("date") as string
  const time = formData.get("time") as string
  const duration_minutes = Number.parseInt(formData.get("duration_minutes") as string)
  const type = formData.get("type") as string
  const location = formData.get("location") as string | null
  const description = formData.get("description") as string | null
  const anlass = formData.get("anlass") as string | null
  const kostentraeger_id = formData.get("kostentraeger_id") as string | null
  const price = Number.parseFloat(formData.get("price") as string)

  const { error } = await supabase.from("termine").insert({
    dolmetscher_id: user.id,
    date,
    time,
    duration_minutes,
    type,
    location: type === "persoenlich" ? location : null,
    description,
    anlass,
    kostentraeger_id: kostentraeger_id || null,
    price,
    status: "accepted", // Eigene Termine sind direkt 'accepted'
  })

  if (error) {
    console.error("Error creating new appointment:", error)
    return { success: false, message: "Fehler beim Erstellen des Termins." }
  }

  revalidatePath("/dashboard/dolmetscher/termine")
  revalidatePath("/dashboard/dolmetscher")
  return { success: true, message: "Termin erfolgreich erstellt." }
}

export async function getCompletedAppointmentsForInvoicing() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data, error } = await supabase
    .from("termine")
    .select(
      `
      *,
      kostentraeger (id, name)
    `,
    )
    .eq("dolmetscher_id", user.id)
    .eq("status", "completed")
    .is("abrechnungen.id", null) // Nur Termine ohne zugehörige Rechnung
    .order("date", { ascending: false })

  if (error) {
    console.error("Error fetching completed appointments for invoicing:", error)
    return []
  }
  return data
}

export async function createInvoice(terminId: string, amount: number, kostentraegerId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Nicht authentifiziert." }
  }

  const { error } = await supabase.from("abrechnungen").insert({
    termin_id: terminId,
    dolmetscher_id: user.id,
    kostentraeger_id: kostentraegerId,
    amount: amount,
    invoice_date: new Date().toISOString().split("T")[0], // Heutiges Datum
    status: "draft",
  })

  if (error) {
    console.error("Error creating invoice:", error)
    return { success: false, message: "Fehler beim Erstellen der Rechnung." }
  }

  revalidatePath("/dashboard/dolmetscher/abrechnungen")
  return { success: true, message: "Rechnung erfolgreich erstellt." }
}

export async function getInvoices() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data, error } = await supabase
    .from("abrechnungen")
    .select(
      `
      *,
      termine (date, time, anlass, description),
      kostentraeger (name)
    `,
    )
    .eq("dolmetscher_id", user.id)
    .order("invoice_date", { ascending: false })

  if (error) {
    console.error("Error fetching invoices:", error)
    return []
  }
  return data
}

export async function sendInvoice(invoiceId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Nicht authentifiziert." }
  }

  const { error } = await supabase
    .from("abrechnungen")
    .update({ status: "sent" })
    .eq("id", invoiceId)
    .eq("dolmetscher_id", user.id)

  if (error) {
    console.error("Error sending invoice:", error)
    return { success: false, message: "Fehler beim Senden der Rechnung." }
  }

  revalidatePath("/dashboard/dolmetscher/abrechnungen")
  return { success: true, message: "Rechnung erfolgreich gesendet." }
}

export async function getKostentraegers() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("id, name:full_name")
    .in("role", ["amt", "krankenkasse"])
    .order("full_name", { ascending: true })

  if (error) {
    console.error("Error fetching kostentraegers:", error)
    return []
  }
  return data
}
