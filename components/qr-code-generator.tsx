"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, Download, Share2, Copy } from "lucide-react"
import { generateQRCodeData, getQRCodeColor, type QRCodeData } from "@/lib/qr-code"

interface QRCodeGeneratorProps {
  terminData: Partial<QRCodeData>
}

export default function QRCodeGenerator({ terminData }: QRCodeGeneratorProps) {
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false)
  const qrString = generateQRCodeData(terminData)
  const qrColor = getQRCodeColor(terminData.terminArt || "gesundheit")

  // Web Share nur, wenn verfügbar UND nicht im iFrame
  const canShare = typeof window !== "undefined" && typeof navigator.share === "function" && window.top === window

  const handleCopyQRCode = async () => {
    try {
      await navigator.clipboard.writeText(qrString)
      // Toast notification would go here
    } catch (error) {
      console.error("Fehler beim Kopieren:", error)
    }
  }

  const handleShareQRCode = async () => {
    if (!canShare) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: "GebärdenNow Termin QR-Code",
          text: `QR-Code für Termin am ${terminData.datum} um ${terminData.uhrzeit}`,
          url: `${window.location.origin}/qr-scan?data=${qrString}`,
        })
      } catch (error) {
        console.error("Fehler beim Teilen:", error)
      }
    }
  }

  return (
    <div className="bg-secondary rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <QrCode className="h-5 w-5 text-petrol-400" />
        <h3 className="text-lg font-bold">Termin QR-Code</h3>
        <Badge className="ml-auto" style={{ backgroundColor: qrColor, color: "white" }}>
          {terminData.terminArt}
        </Badge>
      </div>

      <div className="text-center mb-6">
        {/* QR Code würde hier mit einer QR-Code Library generiert werden */}
        <div
          className="w-48 h-48 mx-auto rounded-lg flex items-center justify-center text-6xl"
          style={{ backgroundColor: qrColor + "20", border: `2px solid ${qrColor}` }}
        >
          <QrCode className="h-24 w-24" style={{ color: qrColor }} />
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-400">Termin-ID: {terminData.terminId}</p>
          <p className="text-sm font-medium">
            {terminData.datum} um {terminData.uhrzeit}
          </p>
          <p className="text-sm text-gray-300">{terminData.anlass}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={handleCopyQRCode} className="flex items-center gap-2 bg-transparent">
            <Copy className="h-4 w-4" />
            Kopieren
          </Button>

          {canShare && (
            <Button variant="outline" onClick={handleShareQRCode} className="flex items-center gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              Teilen
            </Button>
          )}
        </div>

        <Button className="w-full bg-petrol-600 hover:bg-petrol-700">
          <Download className="h-4 w-4 mr-2" />
          QR-Code herunterladen
        </Button>
      </div>

      <div className="mt-4 p-3 bg-petrol-900/20 rounded-lg">
        <p className="text-xs text-petrol-300">
          <strong>Hinweis:</strong> Lassen Sie diesen QR-Code von der Praxis/dem Kunden scannen, um den Termin zu
          bestätigen und die Abrechnung zu starten.
        </p>
      </div>
    </div>
  )
}
