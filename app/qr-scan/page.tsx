"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import QRCodeScanner from "@/components/qr-code-scanner"
import type { QRCodeData } from "@/lib/qr-code"

export default function QRScanPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isScanning, setIsScanning] = useState(true)

  const handleScanSuccess = (data: QRCodeData) => {
    // Weiterleitung zur Bestätigungsseite mit den gescannten Daten
    const params = new URLSearchParams({
      terminId: data.terminId,
      dolmetscherId: data.dolmetscherId,
      terminArt: data.terminArt,
      datum: data.datum,
      uhrzeit: data.uhrzeit,
      dauer: data.dauer.toString(),
      preis: data.preis.toString(),
      kostentraeger: data.kostentraeger,
      bundesland: data.bundesland,
      anlass: data.anlass,
    })

    router.push(`/termin-bestaetigung?${params.toString()}`)
  }

  const handleClose = () => {
    router.back()
  }

  return <QRCodeScanner onScanSuccess={handleScanSuccess} onClose={handleClose} />
}
