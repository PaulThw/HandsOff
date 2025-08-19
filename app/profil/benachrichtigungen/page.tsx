"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Bell, Mail, MessageSquare } from "lucide-react"
import Link from "next/link"
import BottomNavigation from "@/components/bottom-navigation"

export default function BenachrichtigungenPage() {
  const [settings, setSettings] = useState({
    email: {
      bookingConfirmation: true,
      reminderBefore: true,
      cancellation: true,
      newsletter: false,
      promotions: false,
    },
    push: {
      bookingConfirmation: true,
      reminderBefore: true,
      cancellation: true,
      newMessages: true,
    },
    sms: {
      bookingConfirmation: false,
      reminderBefore: true,
      cancellation: true,
    },
  })

  const handleToggle = (category: string, setting: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: !prev[category as keyof typeof prev][setting as keyof typeof prev.email],
      },
    }))
  }

  const handleSave = () => {
    console.log("Benachrichtigungseinstellungen speichern:", settings)
    // Hier würde die API aufgerufen werden
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
          <h1 className="text-xl font-bold">Benachrichtigungen</h1>
          <Button onClick={handleSave} className="ml-auto bg-petrol-600 hover:bg-petrol-700" size="sm">
            Speichern
          </Button>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* E-Mail Benachrichtigungen */}
        <div className="bg-secondary rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <Mail className="h-5 w-5 mr-2 text-petrol-400" />
            E-Mail Benachrichtigungen
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-booking">Buchungsbestätigungen</Label>
                <p className="text-sm text-gray-400">Bestätigung nach erfolgreicher Buchung</p>
              </div>
              <Switch
                id="email-booking"
                checked={settings.email.bookingConfirmation}
                onCheckedChange={() => handleToggle("email", "bookingConfirmation")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-reminder">Terminerinnerungen</Label>
                <p className="text-sm text-gray-400">24h vor dem Termin</p>
              </div>
              <Switch
                id="email-reminder"
                checked={settings.email.reminderBefore}
                onCheckedChange={() => handleToggle("email", "reminderBefore")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-cancellation">Stornierungen</Label>
                <p className="text-sm text-gray-400">Bei Terminabsagen</p>
              </div>
              <Switch
                id="email-cancellation"
                checked={settings.email.cancellation}
                onCheckedChange={() => handleToggle("email", "cancellation")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-newsletter">Newsletter</Label>
                <p className="text-sm text-gray-400">Neuigkeiten und Updates</p>
              </div>
              <Switch
                id="email-newsletter"
                checked={settings.email.newsletter}
                onCheckedChange={() => handleToggle("email", "newsletter")}
              />
            </div>
          </div>
        </div>

        {/* Push Benachrichtigungen */}
        <div className="bg-secondary rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2 text-petrol-400" />
            Push Benachrichtigungen
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-booking">Buchungsbestätigungen</Label>
                <p className="text-sm text-gray-400">Sofortige Bestätigung</p>
              </div>
              <Switch
                id="push-booking"
                checked={settings.push.bookingConfirmation}
                onCheckedChange={() => handleToggle("push", "bookingConfirmation")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-reminder">Terminerinnerungen</Label>
                <p className="text-sm text-gray-400">1h vor dem Termin</p>
              </div>
              <Switch
                id="push-reminder"
                checked={settings.push.reminderBefore}
                onCheckedChange={() => handleToggle("push", "reminderBefore")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-messages">Neue Nachrichten</Label>
                <p className="text-sm text-gray-400">Chat-Nachrichten vom Dolmetscher</p>
              </div>
              <Switch
                id="push-messages"
                checked={settings.push.newMessages}
                onCheckedChange={() => handleToggle("push", "newMessages")}
              />
            </div>
          </div>
        </div>

        {/* SMS Benachrichtigungen */}
        <div className="bg-secondary rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-petrol-400" />
            SMS Benachrichtigungen
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-reminder">Terminerinnerungen</Label>
                <p className="text-sm text-gray-400">2h vor dem Termin</p>
              </div>
              <Switch
                id="sms-reminder"
                checked={settings.sms.reminderBefore}
                onCheckedChange={() => handleToggle("sms", "reminderBefore")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-cancellation">Stornierungen</Label>
                <p className="text-sm text-gray-400">Sofortige SMS bei Absage</p>
              </div>
              <Switch
                id="sms-cancellation"
                checked={settings.sms.cancellation}
                onCheckedChange={() => handleToggle("sms", "cancellation")}
              />
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </main>
  )
}
