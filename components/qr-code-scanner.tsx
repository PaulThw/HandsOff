"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, X, CheckCircle } from "lucide-react"
import { getQRCodeColor, type QRCodeData } from "@/lib/qr-code"

interface QRCodeScannerProps {
  onScanSuccess: (data: QRCodeData) => void
  onClose: () => void
}

export default function QRCodeScanner({ onScanSuccess, onClose }: QRCodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedData, setScannedData] = useState<QRCodeData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const startScanning = async () => {
    try {
      setIsScanning(true)
      setError(null)

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      setError("Kamera-Zugriff nicht möglich")
      setIsScanning(false)
    }
  }

  const stopScanning = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
    setIsScanning(false)
  }

  const handleManualInput = () => {
    // Für Demo-Zwecke simulieren wir einen erfolgreichen Scan
    const demoData: QRCodeData = {
      terminId: "T1234567890",
      dolmetscherId: "D001",
      terminArt: "gesundheit",
      datum: "2025-01-10",
      uhrzeit: "14:00",
      dauer: 60,
      preis: 60,
      kostentraeger: "Krankenkasse",
      bundesland: "Berlin",
      anlass: "Arzttermin",
    }
    setScannedData(demoData)
  }

  const confirmScan = () => {
    if (scannedData) {
      onScanSuccess(scannedData)
    }
  }

  if (scannedData) {
    const qrColor = getQRCodeColor(scannedData.terminArt)

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
        <div className="bg-secondary rounded-lg p-6 w-full max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <h3 className="text-lg font-bold">QR-Code erkannt</h3>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Termin-ID:</span>
              <span className="font-mono text-sm">{scannedData.terminId}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Datum & Zeit:</span>
              <span>
                {scannedData.datum} um {scannedData.uhrzeit}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Anlass:</span>
              <span>{scannedData.anlass}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Kategorie:</span>
              <Badge style={{ backgroundColor: qrColor, color: "white" }}>{scannedData.terminArt}</Badge>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Preis:</span>
              <span className="font-bold text-apricot-500">{scannedData.preis} €</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Kostenträger:</span>
              <span className="text-sm">{scannedData.kostentraeger}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setScannedData(null)} className="flex-1">
              Erneut scannen
            </Button>
            <Button onClick={confirmScan} className="flex-1 bg-petrol-600 hover:bg-petrol-700">
              Bestätigen
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      <div className="flex justify-between items-center p-4 bg-secondary">
        <h3 className="text-lg font-bold">QR-Code scannen</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 relative">
        {isScanning ? (
          <div className="relative w-full h-full">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-petrol-400 rounded-lg relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-petrol-400 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-petrol-400 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-petrol-400 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-petrol-400 rounded-br-lg"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <Camera className="h-16 w-16 text-gray-400 mx-auto" />
              <h4 className="text-xl font-bold">QR-Code scannen</h4>
              <p className="text-gray-400">Richten Sie die Kamera auf den QR-Code des Dolmetschers</p>
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-secondary space-y-3">
        {!isScanning ? (
          <Button onClick={startScanning} className="w-full bg-petrol-600 hover:bg-petrol-700">
            <Camera className="h-4 w-4 mr-2" />
            Kamera starten
          </Button>
        ) : (
          <Button onClick={stopScanning} variant="outline" className="w-full bg-transparent">
            Scannen beenden
          </Button>
        )}

        <Button onClick={handleManualInput} variant="outline" className="w-full bg-transparent">
          Demo: QR-Code simulieren
        </Button>
      </div>
    </div>
  )
}
