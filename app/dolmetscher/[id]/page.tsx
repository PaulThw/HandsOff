import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, ArrowLeft, MessageCircle, ThumbsUp } from "lucide-react"
import Link from "next/link"
import BottomNavigation from "@/components/bottom-navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInterpreterById } from "@/lib/actions/interpreter"
import { notFound } from "next/navigation"

export default async function DolmetscherDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dolmetscher = await getInterpreterById(id);

  if (!dolmetscher) {
    notFound();
  }

  // Fallback data for fields not yet in DB
  const availability = [
    { day: "Heute", slots: ["14:00", "15:30", "17:00"] },
    { day: "Morgen", slots: ["09:00", "11:30", "14:00", "16:30"] },
  ];

  return (
    <main className="flex min-h-screen flex-col pb-20">
      <div className="bg-black sticky top-0 z-10 p-4">
        <Link href="/dolmetscher">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full absolute top-4 left-4 bg-black/50 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="relative">
        <div className="h-64 bg-gradient-to-b from-petrol-900/30 to-black flex items-center justify-center">
          <Avatar className="h-40 w-40 rounded-full border-4 border-petrol-500">
            <AvatarImage src={dolmetscher.avatar_url || "/placeholder.svg"} alt={dolmetscher.full_name || "Interpreter"} />
            <AvatarFallback>
              {dolmetscher.full_name
                ? dolmetscher.full_name.split(" ").map((n) => n[0]).join("")
                : "??"}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="container">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">{dolmetscher.full_name}</h1>
            <div className="flex justify-center items-center mt-2">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
              <span>5.0</span>
              <span className="text-sm text-gray-400 ml-1">(Neu)</span>
            </div>

            <div className="flex justify-center flex-wrap gap-2 mt-3">
              {dolmetscher.languages?.map((lang) => (
                <Badge key={lang} className="bg-petrol-600 hover:bg-petrol-700">
                  {lang}
                </Badge>
              ))}
            </div>

            <div className="flex justify-center items-center mt-3 text-gray-400">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{dolmetscher.location || "Online"}</span>
            </div>
          </div>

          <div className="bg-secondary rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold mb-2">Über mich</h2>
            <p className="text-gray-300">{dolmetscher.bio || "Keine Beschreibung verfügbar."}</p>

            <h3 className="text-lg font-bold mt-4 mb-2">Spezialisierungen</h3>
            <div className="flex flex-wrap gap-2">
              {dolmetscher.specializations?.map((spec) => (
                <Badge key={spec} variant="outline">
                  {spec}
                </Badge>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <div className="font-bold text-xl text-apricot-500">{dolmetscher.hourly_rate || 0} €/h</div>
                <Link href={`/dolmetscher/${dolmetscher.id}/buchen`}>
                  <Button className="bg-petrol-600 hover:bg-petrol-700">Termin buchen</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3">Verfügbarkeit (Beispiel)</h2>
            <div className="space-y-4">
              {availability.map((day) => (
                <div key={day.day} className="bg-secondary rounded-lg p-4">
                  <h3 className="font-medium mb-2">{day.day}</h3>
                  <div className="flex flex-wrap gap-2">
                    {day.slots.map((time) => (
                      <Link href={`/dolmetscher/${dolmetscher.id}/buchen?day=${day.day}&time=${time}`} key={time}>
                        <Badge variant="outline" className="cursor-pointer hover:bg-apricot-500 hover:text-white">
                          {time}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </main>
  )
}
