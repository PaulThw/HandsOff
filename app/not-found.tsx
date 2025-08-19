import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="text-6xl font-bold text-petrol-500">404</div>
        <h2 className="text-2xl font-bold">Seite nicht gefunden</h2>
        <p className="text-gray-400 max-w-md">Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button className="bg-petrol-600 hover:bg-petrol-700">
              <Home className="h-4 w-4 mr-2" />
              Zur Startseite
            </Button>
          </Link>
          <Link href="/dolmetscher">
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Dolmetscher suchen
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
