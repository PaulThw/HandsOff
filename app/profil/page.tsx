"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, CreditCard, Bell, HelpCircle, LogOut, ChevronRight } from "lucide-react"
import Link from "next/link"
import BottomNavigation from "@/components/bottom-navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilPage() {
  return (
    <main className="flex min-h-screen flex-col pb-20">
      <div className="bg-secondary p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Mein Profil</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="container py-4">
        <div className="bg-secondary rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 rounded-full border-2 border-petrol-500">
              <AvatarImage src="/placeholder.svg?height=200&width=200" alt="Profilbild" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-xl font-bold">Jan Decker</h2>
              <p className="text-gray-400">jan.decker@example.com</p>
              <Link href="/profil/bearbeiten">
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  Profil bearbeiten
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-3">Konto</h3>
            <div className="bg-secondary rounded-lg divide-y divide-border">
              <Link href="/profil/zahlungen" className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-3 text-petrol-400" />
                  <span>Zahlungsmethoden</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>

              <Link href="/profil/benachrichtigungen" className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-3 text-petrol-400" />
                  <span>Benachrichtigungen</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>

              <Link href="/profil/sprachen" className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <span className="h-5 w-5 mr-3 text-petrol-400 flex items-center justify-center">🌐</span>
                  <div>
                    <span>Spracheinstellungen</span>
                    <div className="flex gap-1 mt-1">
                      <Badge variant="outline" className="text-xs">
                        Deutsch
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        DGS
                      </Badge>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">Support</h3>
            <div className="bg-secondary rounded-lg divide-y divide-border">
              <Link href="/hilfe" className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-3 text-petrol-400" />
                  <span>Hilfe & Support</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>

              <Link href="/datenschutz" className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <span className="h-5 w-5 mr-3 text-petrol-400 flex items-center justify-center">🔒</span>
                  <span>Datenschutz</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>

              <Link href="/agb" className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <span className="h-5 w-5 mr-3 text-petrol-400 flex items-center justify-center">📄</span>
                  <span>AGB</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 bg-transparent"
            onClick={() => {
              // Logout-Logik
              localStorage.removeItem("auth_token")
              window.location.href = "/login"
            }}
          >
            <LogOut className="h-5 w-5" />
            <span>Abmelden</span>
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </main>
  )
}
