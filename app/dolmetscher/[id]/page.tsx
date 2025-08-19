import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, ArrowLeft, MessageCircle, ThumbsUp } from "lucide-react"
import Link from "next/link"
import BottomNavigation from "@/components/bottom-navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Simulierte Daten für einen Dolmetscher
const dolmetscher = {
  id: 1,
  name: "Maria Schmidt",
  languages: ["Deutsche Gebärdensprache (DGS)", "Internationale Gebärdensprache"],
  specializations: ["Medizinische Termine", "Behördengänge", "Bildungseinrichtungen"],
  rating: 4.9,
  reviews: 127,
  price: 60,
  distance: 2.3,
  image: "/placeholder.svg?height=400&width=400",
  bio: "Zertifizierte Gebärdensprach-Dolmetscherin mit über 10 Jahren Erfahrung. Spezialisiert auf medizinische Termine und Behördengänge. Ich helfe Ihnen, Kommunikationsbarrieren zu überwinden und eine reibungslose Verständigung zu gewährleisten.",
  availability: [
    { day: "Heute", slots: ["14:00", "15:30", "17:00"] },
    { day: "Morgen", slots: ["09:00", "11:30", "14:00", "16:30"] },
    { day: "Übermorgen", slots: ["10:00", "13:00", "15:30"] },
  ],
  reviews_list: [
    {
      id: 1,
      name: "Thomas Müller",
      rating: 5,
      date: "vor 2 Wochen",
      comment:
        "Maria war ausgezeichnet! Sie hat bei einem wichtigen Arzttermin gedolmetscht und alles lief reibungslos.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Laura König",
      rating: 5,
      date: "vor 1 Monat",
      comment:
        "Sehr professionell und einfühlsam. Hat bei einem Elterngespräch in der Schule gedolmetscht und alle Nuancen perfekt übertragen.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ],
}

export default function DolmetscherDetailPage() {
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
            <AvatarImage src={dolmetscher.image || "/placeholder.svg"} alt={dolmetscher.name} />
            <AvatarFallback>
              {dolmetscher.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="container">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">{dolmetscher.name}</h1>
            <div className="flex justify-center items-center mt-2">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
              <span>{dolmetscher.rating}</span>
              <span className="text-sm text-gray-400 ml-1">({dolmetscher.reviews} Bewertungen)</span>
            </div>

            <div className="flex justify-center flex-wrap gap-2 mt-3">
              {dolmetscher.languages.map((lang) => (
                <Badge key={lang} className="bg-petrol-600 hover:bg-petrol-700">
                  {lang}
                </Badge>
              ))}
            </div>

            <div className="flex justify-center items-center mt-3 text-gray-400">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{dolmetscher.distance} km entfernt</span>
            </div>
          </div>

          <div className="bg-secondary rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold mb-2">Über mich</h2>
            <p className="text-gray-300">{dolmetscher.bio}</p>

            <h3 className="text-lg font-bold mt-4 mb-2">Spezialisierungen</h3>
            <div className="flex flex-wrap gap-2">
              {dolmetscher.specializations.map((spec) => (
                <Badge key={spec} variant="outline">
                  {spec}
                </Badge>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <div className="font-bold text-xl text-apricot-500">{dolmetscher.price} €/h</div>
                <Link href={`/dolmetscher/${dolmetscher.id}/buchen`}>
                  <Button className="bg-petrol-600 hover:bg-petrol-700">Termin buchen</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3">Verfügbarkeit</h2>
            <div className="space-y-4">
              {dolmetscher.availability.map((day) => (
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

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">Bewertungen</h2>
              <span className="text-sm text-gray-400">Alle anzeigen</span>
            </div>

            <div className="space-y-4">
              {dolmetscher.reviews_list.map((review) => (
                <div key={review.id} className="bg-secondary rounded-lg p-4">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.image || "/placeholder.svg"} alt={review.name} />
                      <AvatarFallback>
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{review.name}</h4>
                        <span className="text-sm text-gray-400">{review.date}</span>
                      </div>

                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
                          />
                        ))}
                      </div>

                      <p className="mt-2 text-gray-300">{review.comment}</p>

                      <div className="flex gap-4 mt-2">
                        <button className="flex items-center text-sm text-gray-400 hover:text-gray-300">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>Hilfreich</span>
                        </button>
                        <button className="flex items-center text-sm text-gray-400 hover:text-gray-300">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          <span>Kommentieren</span>
                        </button>
                      </div>
                    </div>
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
