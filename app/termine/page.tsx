import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Video, MoreHorizontal, FileText } from "lucide-react"
import BottomNavigation from "@/components/bottom-navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getBookingsForUser } from "@/lib/actions/booking"

export default async function TerminePage() {
  const termine = await getBookingsForUser();

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
          {termine.map((termin: any) => (
            <div key={termin.id} className="bg-secondary rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16 rounded-lg">
                    <AvatarImage src={termin.interpreter?.avatar_url || "/placeholder.svg"} alt={termin.interpreter?.full_name || "Interpreter"} />
                    <AvatarFallback>
                      {termin.interpreter?.full_name
                        ? termin.interpreter.full_name.split(" ").map((n: string) => n[0]).join("")
                        : "??"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">{termin.interpreter?.full_name}</h3>
                      <Badge
                        variant={termin.status === "pending" || termin.status === "confirmed" ? "default" : "outline"}
                        className={termin.status === "pending" || termin.status === "confirmed" ? "bg-petrol-600 hover:bg-petrol-700" : ""}
                      >
                        {termin.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 mt-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-petrol-400" />
                        <span>
                          {termin.date}, {termin.start_time} ({termin.duration_minutes} min)
                        </span>
                      </div>

                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-petrol-400" />
                        <span>{termin.location || "Online"}</span>
                      </div>

                      <div className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-apricot-400" />
                        <span className="text-gray-400">Notizen:</span>
                        <span className="ml-1">{termin.notes || "-"}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      {/* Actions based on status could go here */}
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {termine.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              Keine Termine gefunden.
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </main>
  )
}
