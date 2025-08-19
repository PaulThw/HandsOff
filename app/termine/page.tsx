import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Video, MoreHorizontal, FileText } from "lucide-react"
import BottomNavigation from "@/components/bottom-navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const termine = [
  {
    id: 1,
    dolmetscher: {
      name: "Maria Schmidt",
      image: "/placeholder.svg?height=200&width=200",
    },
    date: "Heute",
    time: "14:00",
    duration: "1 Stunde",
    type: "persönlich",
    location: "Berliner Str. 45, 10713 Berlin",
    status: "upcoming",
    anlass: "Arzttermin",
    kostentraeger: "Krankenkasse",
    bundesland: "Berlin",
  },
  {
    id: 2,
    dolmetscher: {
      name: "Alexander Weber",
      image: "/placeholder.svg?height=200&width=200",
    },
    date: "15. Mai 2025",
    time: "10:30",
    duration: "2 Stunden",
    type: "video",
    status: "upcoming",
    anlass: "Elterngespräch",
    kostentraeger: "Schulaufsicht / Senatsverwaltung für Bildung",
    bundesland: "Berlin",
  },
  {
    id: 3,
    dolmetscher: {
      name: "Sophia Chen",
      image: "/placeholder.svg?height=200&width=200",
    },
    date: "10. April 2025",
    time: "13:00",
    duration: "1 Stunde",
    type: "persönlich",
    location: "Hauptstr. 22, 10827 Berlin",
    status: "completed",
    anlass: "Bewerbungsgespräch",
    kostentraeger: "Arbeitsagentur / Integrationsamt / Rentenversicherung",
    bundesland: "Berlin",
  },
]

export default function TerminePage() {
  return (
    <main className="flex min-h-screen flex-col pb-20">
      <div className="bg-secondary p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold">Meine Termine</h1>
      </div>

      <div className="container py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {["Alle", "Bevorstehend", "Abgeschlossen", "Storniert"].map((filter, index) => (
            <Badge
              key={filter}
              variant={index === 0 ? "default" : "outline"}
              className={index === 0 ? "bg-petrol-600 hover:bg-petrol-700" : ""}
            >
              {filter}
            </Badge>
          ))}
        </div>

        <div className="space-y-4">
          {termine.map((termin) => (
            <div key={termin.id} className="bg-secondary rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16 rounded-lg">
                    <AvatarImage src={termin.dolmetscher.image || "/placeholder.svg"} alt={termin.dolmetscher.name} />
                    <AvatarFallback>
                      {termin.dolmetscher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">{termin.dolmetscher.name}</h3>
                      <Badge
                        variant={termin.status === "upcoming" ? "default" : "outline"}
                        className={termin.status === "upcoming" ? "bg-petrol-600 hover:bg-petrol-700" : ""}
                      >
                        {termin.status === "upcoming" ? "Bevorstehend" : "Abgeschlossen"}
                      </Badge>
                    </div>

                    <div className="space-y-2 mt-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-petrol-400" />
                        <span>
                          {termin.date}, {termin.time} Uhr ({termin.duration})
                        </span>
                      </div>

                      <div className="flex items-center text-sm">
                        {termin.type === "persönlich" ? (
                          <>
                            <MapPin className="h-4 w-4 mr-2 text-petrol-400" />
                            <span>{termin.location}</span>
                          </>
                        ) : (
                          <>
                            <Video className="h-4 w-4 mr-2 text-petrol-400" />
                            <span>Video-Dolmetschen</span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-apricot-400" />
                        <span className="text-gray-400">Anlass:</span>
                        <span className="ml-1">{termin.anlass}</span>
                      </div>

                      <div className="bg-petrol-900/20 rounded p-2 mt-2">
                        <div className="flex items-center text-xs">
                          <FileText className="h-3 w-3 mr-1 text-petrol-400" />
                          <span className="text-gray-400">Kostenträger:</span>
                        </div>
                        <span className="text-xs text-petrol-300">{termin.kostentraeger}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      {termin.status === "upcoming" && termin.type === "video" && (
                        <Button size="sm" className="bg-petrol-600 hover:bg-petrol-700">
                          Videocall starten
                        </Button>
                      )}

                      {termin.status === "upcoming" && (
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                      )}

                      {termin.status === "completed" && (
                        <Button size="sm" variant="outline">
                          Bewerten
                        </Button>
                      )}

                      <Button size="sm" variant="ghost" className="ml-auto">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </main>
  )
}
