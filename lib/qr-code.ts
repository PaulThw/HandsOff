export interface QRCodeData {
  terminId: string
  dolmetscherId: string
  terminArt: "gesundheit" | "bildung" | "arbeit" | "gericht" | "alltag"
  datum: string
  uhrzeit: string
  dauer: number
  preis: number
  kostentraeger: string
  bundesland: string
  anlass: string
}

export function generateQRCodeData(terminData: Partial<QRCodeData>): string {
  const qrData: QRCodeData = {
    terminId: terminData.terminId || `T${Date.now()}`,
    dolmetscherId: terminData.dolmetscherId || "D001",
    terminArt: terminData.terminArt || "gesundheit",
    datum: terminData.datum || new Date().toISOString().split("T")[0],
    uhrzeit: terminData.uhrzeit || "14:00",
    dauer: terminData.dauer || 60,
    preis: terminData.preis || 60,
    kostentraeger: terminData.kostentraeger || "Krankenkasse",
    bundesland: terminData.bundesland || "Berlin",
    anlass: terminData.anlass || "Arzttermin",
  }

  return btoa(JSON.stringify(qrData))
}

export function parseQRCodeData(qrString: string): QRCodeData | null {
  try {
    const decoded = atob(qrString)
    return JSON.parse(decoded) as QRCodeData
  } catch (error) {
    console.error("Fehler beim Parsen der QR-Code Daten:", error)
    return null
  }
}

export function getQRCodeColor(terminArt: string): string {
  const colors = {
    gesundheit: "#ef4444", // Rot
    bildung: "#3b82f6", // Blau
    arbeit: "#f59e0b", // Orange
    gericht: "#8b5cf6", // Lila
    alltag: "#10b981", // Grün
  }
  return colors[terminArt as keyof typeof colors] || "#6b7280"
}
