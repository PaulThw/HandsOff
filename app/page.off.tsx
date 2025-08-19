import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Calendar, Clock, QrCode } from "lucide-react"
import Link from "next/link"
import BottomNavigation from "@/components/bottom-navigation"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="relative h-[40vh] bg-gradient-to-b from-black to-petrol-900/40">
          <div className="container pt-12 pb-8 px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">HandsOn</h1>
            <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8">
              Gebärdensprach-Dolmetscher buchen, wann und wo du willst
            </p>

            <div className="bg-secondary rounded-2xl p-4 md:p-6 shadow-lg max-w-md mx-auto md:max-w-none">
              <div className="space-y-4">
                {/* Standort */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <MapPin className="text-petrol-400 h-5 w-5" />
                  </div>
                  <Input
                    placeholder="Dein Standort"
                    className="pl-12 h-12 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
                    defaultValue="Berlin, Deutschland"
                  />
                </div>

                {/* Suche */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <Search className="text-petrol-400 h-5 w-5" />
                  </div>
                  <Input
                    placeholder="Gebärdensprache suchen"
                    className="pl-12 h-12 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
                  />
                </div>

                {/* Datum und Zeit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <Calendar className="text-petrol-400 h-5 w-5" />
                    </div>
                    <Input
                      type="date"
                      className="pl-12 h-12 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <Clock className="text-petrol-400 h-5 w-5" />
                    </div>
                    <Input
                      type="time"
                      className="pl-12 h-12 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <Link href="/dolmetscher">
                    <Button className="w-full h-12 bg-petrol-600 hover:bg-petrol-700 text-white rounded-xl font-medium">
                      Dolmetscher finden
                    </Button>
                  </Link>
                  <Link href="/qr-scan">
                    <Button variant="outline" className="w-full h-12 bg-transparent rounded-xl font-medium">
                      <QrCode className="h-4 w-4 mr-2" />
                      QR scannen
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8 px-4">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Beliebte Sprachen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {[
              "Deutsche Gebärdensprache (DGS)",
              "Russische Gebärdensprache (РЖЯ)",
              "Ukrainische Gebärdensprache (УЖМ)",
              "Internationale Gebärdensprache",
              "Amerikanische Gebärdensprache (ASL)",
              "Britische Gebärdensprache (BSL)",
              "Französische Gebärdensprache (LSF)",
              "Österreichische Gebärdensprache (ÖGS)",
            ].map((language) => (
              <Link
                href={`/dolmetscher?sprache=${language}`}
                key={language}
                className="bg-secondary rounded-xl p-4 text-center hover:bg-secondary/80 transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                <span className="text-sm md:text-base font-medium">{language}</span>
              </Link>
            ))}
          </div>

          <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Warum HandsOn?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-secondary rounded-xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-2 text-apricot-400">Spezialisiert</h3>
              <p className="text-gray-300 text-sm md:text-base">
                Alle Dolmetscher sind zertifizierte Gebärdensprach-Dolmetscher mit Fachkenntnissen.
              </p>
            </div>
            <div className="bg-secondary rounded-xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-2 text-apricot-400">QR-Code System</h3>
              <p className="text-gray-300 text-sm md:text-base">
                Einfache Terminbestätigung und Abrechnung über QR-Codes - schnell und sicher.
              </p>
            </div>
            <div className="bg-secondary rounded-xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-2 text-apricot-400">Flexibel</h3>
              <p className="text-gray-300 text-sm md:text-base">
                Vor-Ort-Termine oder Videodolmetschen - du entscheidest, was du brauchst.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </main>
  )
}
