import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShieldCheck } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 mt-10">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex-grow text-center -ml-10">Datenschutzerklärung</h1>
          <div className="w-10" />
        </div>

        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShieldCheck className="h-12 w-12 text-gray-600" />
          </div>
          <p className="text-gray-600">
            Ihr Vertrauen ist uns wichtig. Hier erfahren Sie, wie wir Ihre Daten schützen.
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700">
          <h2>1. Einleitung</h2>
          <p>
            Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und den Zweck der Verarbeitung von
            personenbezogenen Daten (im Folgenden „Daten“) innerhalb unseres Onlineangebotes und der mit ihm verbundenen
            Webseiten, Funktionen und Inhalte sowie externen Onlinepräsenzen, wie z.B. unser Social Media Profile (im
            Folgenden gemeinsam bezeichnet als „Onlineangebot“).
          </p>
          <p>
            Im Hinblick auf die verwendeten Begrifflichkeiten, wie z.B. „Verarbeitung“ oder „Verantwortlicher“,
            verweisen wir auf die Definitionen im Art. 4 der Datenschutzgrundverordnung (DSGVO).
          </p>

          <h2>2. Verantwortlicher</h2>
          <p>
            GebärdenNow GmbH
            <br />
            Musterstraße 1<br />
            10115 Berlin
            <br />
            E-Mail: datenschutz@gebaerdennow.de
          </p>

          <h2>3. Arten der verarbeiteten Daten</h2>
          <ul>
            <li>Bestandsdaten (z.B., Namen, Adressen).</li>
            <li>Kontaktdaten (z.B., E-Mail, Telefonnummern).</li>
            <li>Inhaltsdaten (z.B., Texteingaben, Fotografien, Videos).</li>
            <li>Nutzungsdaten (z.B., besuchte Webseiten, Zugriffszeiten).</li>
            <li>Meta-/Kommunikationsdaten (z.B., Geräte-Informationen, IP-Adressen).</li>
          </ul>

          <h2>4. Kategorien betroffener Personen</h2>
          <p>
            Besucher und Nutzer des Onlineangebotes (Nachfolgend bezeichnen wir die betroffenen Personen zusammenfassend
            auch als „Nutzer“).
          </p>

          <h2>5. Zweck der Verarbeitung</h2>
          <ul>
            <li>Zurverfügungstellung des Onlineangebotes, seiner Funktionen und Inhalte.</li>
            <li>Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern.</li>
            <li>Sicherheitsmaßnahmen.</li>
            <li>Reichweitenmessung/Marketing.</li>
          </ul>

          <h2>6. Rechtsgrundlagen der Verarbeitung</h2>
          <p>
            Sofern wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung der betroffenen Person
            einholen, dient Art. 6 Abs. 1 lit. a DSGVO als Rechtsgrundlage.
          </p>
          <p>
            Bei der Verarbeitung von personenbezogenen Daten, die zur Erfüllung eines Vertrages, dessen Vertragspartei
            die betroffene Person ist, erforderlich ist, dient Art. 6 Abs. 1 lit. b DSGVO als Rechtsgrundlage. Dies gilt
            auch für Verarbeitungsvorgänge, die zur Durchführung vorvertraglicher Maßnahmen erforderlich sind.
          </p>
          <p>
            Soweit eine Verarbeitung personenbezogener Daten zur Erfüllung einer rechtlichen Verpflichtung erforderlich
            ist, der unser Unternehmen unterliegt, dient Art. 6 Abs. 1 lit. c DSGVO als Rechtsgrundlage.
          </p>
          <p>
            Für den Fall, dass lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person
            eine Verarbeitung personenbezogener Daten erforderlich machen, dient Art. 6 Abs. 1 lit. d DSGVO als
            Rechtsgrundlage.
          </p>
          <p>
            Ist die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines Dritten
            erforderlich und überwiegen die Interessen, Grundrechte und Grundfreiheiten des Betroffenen das erstgenannte
            Interesse nicht, so dient Art. 6 Abs. 1 lit. f DSGVO als Rechtsgrundlage für die Verarbeitung.
          </p>

          <h2>7. Zusammenarbeit mit Auftragsverarbeitern und Dritten</h2>
          <p>
            Sofern wir im Rahmen unserer Verarbeitung Daten gegenüber anderen Personen und Unternehmen
            (Auftragsverarbeitern oder Dritten) offenbaren, sie an diese übermitteln oder ihnen sonst Zugriff auf die
            Daten gewähren, erfolgt dies nur auf Grundlage einer gesetzlichen Erlaubnis (z.B. wenn eine Übermittlung der
            Daten an Dritte, wie an Zahlungsdienstleister, gem. Art. 6 Abs. 1 lit. b DSGVO zur Vertragserfüllung
            erforderlich ist), Sie eingewilligt haben, eine rechtliche Verpflichtung dies vorsieht oder auf Grundlage
            unserer berechtigten Interessen (z.B. beim Einsatz von Beauftragten, Webhostern, etc.).
          </p>
          <p>
            Sofern wir Dritte mit der Verarbeitung von Daten auf Grundlage eines „Auftragsverarbeitungsvertrages“
            beauftragen, geschieht dies auf Grundlage des Art. 28 DSGVO.
          </p>

          <h2>8. Rechte der betroffenen Personen</h2>
          <p>
            Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet werden und auf
            Auskunft über diese Daten sowie auf weitere Informationen und Kopie der Daten entsprechend Art. 15 DSGVO.
          </p>
          <p>
            Sie haben entsprechend Art. 16 DSGVO das Recht, die Vervollständigung der Sie betreffenden Daten oder die
            Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.
          </p>
          <p>
            Sie haben nach Maßgabe des Art. 17 DSGVO das Recht zu verlangen, dass betreffende Daten unverzüglich
            gelöscht werden, bzw. alternativ nach Maßgabe des Art. 18 DSGVO eine Einschränkung der Verarbeitung der
            Daten zu verlangen.
          </p>
          <p>
            Sie haben das Recht zu verlangen, dass die Sie betreffenden Daten, die Sie uns bereitgestellt haben, nach
            Maßgabe des Art. 20 DSGVO zu erhalten und deren Übermittlung an andere Verantwortliche zu fordern.
          </p>
          <p>
            Sie haben ferner gem. Art. 77 DSGVO das Recht, eine Beschwerde bei der zuständigen Aufsichtsbehörde
            einzureichen.
          </p>

          <h2>9. Widerrufsrecht</h2>
          <p>
            Sie haben das Recht, erteilte Einwilligungen gem. Art. 7 Abs. 3 DSGVO mit Wirkung für die Zukunft zu
            widerrufen.
          </p>

          <h2>10. Widerspruchsrecht</h2>
          <p>
            Sie können der künftigen Verarbeitung der Sie betreffenden Daten nach Maßgabe des Art. 21 DSGVO jederzeit
            widersprechen. Der Widerspruch kann insbesondere gegen die Verarbeitung für Zwecke der Direktwerbung
            erfolgen.
          </p>

          <h2>11. Löschung von Daten</h2>
          <p>
            Die von uns verarbeiteten Daten werden nach Maßgabe der Art. 17 und 18 DSGVO gelöscht oder in ihrer
            Verarbeitung eingeschränkt. Sofern nicht im Rahmen dieser Datenschutzerklärung ausdrücklich angegeben,
            werden die bei uns gespeicherten Daten gelöscht, sobald sie für ihre Zweckbestimmung nicht mehr erforderlich
            sind und der Löschung keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>
          <p>
            Sofern die Daten nicht gelöscht werden, weil sie für andere und gesetzlich zulässige Zwecke erforderlich
            sind, wird deren Verarbeitung eingeschränkt. D.h. die Daten werden gesperrt und nicht für andere Zwecke
            verarbeitet. Das gilt z.B. für Daten, die aus handels- oder steuerrechtlichen Gründen aufbewahrt werden
            müssen.
          </p>

          <h2>12. Änderungen der Datenschutzerklärung</h2>
          <p>
            Wir bitten Sie, sich regelmäßig über den Inhalt unserer Datenschutzerklärung zu informieren. Wir passen die
            Datenschutzerklärung an, sobald die Änderungen der von uns durchgeführten Datenverarbeitung dies
            erforderlich machen. Wir informieren Sie, sobald die Änderungen eine Mitwirkungshandlung Ihrerseits (z.B.
            Einwilligung) oder eine sonstige individuelle Benachrichtigung erforderlich machen.
          </p>
        </div>
      </div>
    </main>
  )
}
