import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText } from "lucide-react"

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 mt-10">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex-grow text-center -ml-10">
            Allgemeine Geschäftsbedingungen (AGB)
          </h1>
          <div className="w-10" />
        </div>

        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FileText className="h-12 w-12 text-gray-600" />
          </div>
          <p className="text-gray-600">Bitte lesen Sie unsere Allgemeinen Geschäftsbedingungen sorgfältig durch.</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700">
          <h2>1. Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die Nutzung der Plattform GebärdenNow (im Folgenden
            „Plattform“) und die Vermittlung von Gebärdensprachdolmetschern durch die GebärdenNow GmbH (im Folgenden
            „Anbieter“). Sie gelten für alle Nutzer der Plattform, insbesondere für Kunden, Dolmetscher, Ämter und
            Krankenkassen.
          </p>

          <h2>2. Leistungen des Anbieters</h2>
          <p>
            Der Anbieter betreibt eine Online-Plattform zur Vermittlung von Gebärdensprachdolmetschern. Die Plattform
            ermöglicht es Kunden, Dolmetscher zu suchen, zu buchen und Termine zu verwalten. Dolmetscher können über die
            Plattform Aufträge annehmen, ihre Verfügbarkeiten verwalten und Abrechnungen erstellen. Ämter und
            Krankenkassen können Anträge bearbeiten, Klienten verwalten und Kostenübernahmen prüfen.
          </p>
          <p>
            Der Anbieter selbst erbringt keine Dolmetscherleistungen, sondern vermittelt diese lediglich. Die
            Dolmetscherleistungen werden von den jeweiligen Dolmetschern in eigener Verantwortung erbracht.
          </p>

          <h2>3. Registrierung und Vertragsschluss</h2>
          <p>
            Die Nutzung der Plattform erfordert eine Registrierung. Mit der Registrierung und der Zustimmung zu diesen
            AGB kommt ein Nutzungsvertrag zwischen dem Nutzer und dem Anbieter zustande.
          </p>
          <p>
            Nutzer müssen wahrheitsgemäße und vollständige Angaben machen. Änderungen der Daten sind unverzüglich zu
            aktualisieren.
          </p>

          <h2>4. Pflichten der Nutzer</h2>
          <ul>
            <li>Nutzer sind für die Vertraulichkeit ihrer Zugangsdaten verantwortlich.</li>
            <li>Nutzer dürfen die Plattform nur im Rahmen der gesetzlichen Bestimmungen und dieser AGB nutzen.</li>
            <li>
              Es ist untersagt, die Plattform für rechtswidrige Zwecke zu nutzen oder Inhalte einzustellen, die gegen
              geltendes Recht oder die guten Sitten verstoßen.
            </li>
          </ul>

          <h2>5. Buchung und Durchführung von Dolmetscherleistungen</h2>
          <p>
            Kunden können über die Plattform Dolmetscherleistungen anfragen und buchen. Die Buchung kommt zustande, wenn
            ein Dolmetscher die Anfrage annimmt.
          </p>
          <p>
            Die Details der Dolmetscherleistung (Ort, Zeit, Dauer, Inhalt) werden zwischen Kunde und Dolmetscher über
            die Plattform vereinbart.
          </p>

          <h2>6. Vergütung und Abrechnung</h2>
          <p>
            Die Vergütung für die Dolmetscherleistungen wird direkt zwischen dem Kunden und dem Dolmetscher vereinbart
            und abgerechnet, sofern keine abweichende Regelung mit Ämtern oder Krankenkassen besteht.
          </p>
          <p>
            Der Anbieter kann eine Servicegebühr für die Nutzung der Plattform erheben, die in den jeweiligen
            Preismodellen transparent ausgewiesen wird.
          </p>

          <h2>7. Haftung</h2>
          <p>
            Der Anbieter haftet nicht für die Durchführung der Dolmetscherleistungen durch die Dolmetscher. Für Schäden,
            die aus der Dolmetscherleistung entstehen, haftet der jeweilige Dolmetscher.
          </p>
          <p>
            Der Anbieter haftet für Schäden, die durch die Nutzung der Plattform entstehen, nur bei Vorsatz oder grober
            Fahrlässigkeit. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, sofern es sich nicht um die
            Verletzung wesentlicher Vertragspflichten handelt.
          </p>

          <h2>8. Datenschutz</h2>
          <p>Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer Datenschutzerklärung.</p>

          <h2>9. Änderungen der AGB</h2>
          <p>
            Der Anbieter behält sich vor, diese AGB jederzeit mit Wirkung für die Zukunft zu ändern. Über Änderungen
            wird der Nutzer rechtzeitig informiert. Widerspricht der Nutzer den Änderungen nicht innerhalb einer
            angemessenen Frist, gelten die geänderten AGB als angenommen.
          </p>

          <h2>10. Schlussbestimmungen</h2>
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Berlin, sofern der Nutzer Kaufmann,
            juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.
          </p>
          <p>
            Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so bleibt die Wirksamkeit der übrigen
            Bestimmungen unberührt.
          </p>
        </div>
      </div>
    </main>
  )
}
