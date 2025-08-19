"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold">Etwas ist schiefgelaufen!</h2>
        <p className="text-gray-400 max-w-md">
          Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut.
        </p>
        <div className="space-y-2">
          <Button onClick={reset} className="bg-petrol-600 hover:bg-petrol-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Erneut versuchen
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Zur Startseite
          </Button>
        </div>
      </div>
    </div>
  )
}
