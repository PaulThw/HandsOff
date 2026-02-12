import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Star, Filter, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import BottomNavigation from "@/components/bottom-navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInterpreters } from "@/lib/actions/interpreter"

export default async function DolmetscherPage() {
  const dolmetscher = await getInterpreters();

  return (
    <main className="flex min-h-screen flex-col pb-20">
      <div className="bg-secondary p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Dolmetscher</h1>
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Gebärdensprache, Name, Spezialisierung..."
            className="bg-muted border-0 focus-visible:ring-petrol-500"
          />
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="container py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {[
            "Alle",
            "Deutsche Gebärdensprache",
            "Russische Gebärdensprache",
            "Ukrainische Gebärdensprache",
            "Internationale Gebärdensprache",
            "ASL",
          ].map((filter, index) => (
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
          {dolmetscher.map((item) => (
            <Link href={`/dolmetscher/${item.id}`} key={item.id}>
              <div className="bg-secondary rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex gap-4">
                    <Avatar className="h-16 w-16 rounded-lg">
                      <AvatarImage src={item.avatar_url || "/placeholder.svg"} alt={item.full_name || "Interpreter"} />
                      <AvatarFallback>
                        {item.full_name
                          ? item.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                          : "??"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold">{item.full_name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="text-sm">5.0</span>
                          <span className="text-xs text-gray-400 ml-1">(Neu)</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.languages?.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-sm text-gray-400">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{item.location || "Online"}</span>
                        </div>
                        <div className="font-bold text-petrol-400">{item.hourly_rate || 0} €/h</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {dolmetscher.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              Keine Dolmetscher gefunden.
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </main>
  )
}
