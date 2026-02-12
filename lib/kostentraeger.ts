export interface Kostentraeger {
  bundesland: string
  bildung: string
  gesundheit: string
  gericht: string
  arbeit: string
  alltag: string
}

export const kostentraegerData: Kostentraeger[] = [
  {
    bundesland: "Baden-Württemberg",
    bildung: "Schulamt / Regierungspräsidium / Integrationsamt (KVJS)",
    gesundheit: "Krankenkasse",
    gericht: "Gericht / Justizkasse",
    arbeit: "Arbeitsagentur / KVJS / Rentenversicherung",
    alltag: "Sozialamt / KVJS",
  },
  {
    bundesland: "Bayern",
    bildung: "Schulamt / ZBFS",
    gesundheit: "Krankenkasse",
    gericht: "Gericht / Justizkasse",
    arbeit: "Arbeitsagentur / ZBFS / Rentenversicherung",
    alltag: "Bezirk (z.B. Oberbayern)",
  },
  {
    bundesland: "Berlin",
    bildung: "Schulaufsicht / Senatsverwaltung für Bildung",
    gesundheit: "Krankenkasse",
    gericht: "Gericht / Justizkasse",
    arbeit: "Arbeitsagentur / Integrationsamt / Rentenversicherung",
    alltag: "Bezirksamt (Sozialamt)",
  },
  {
    bundesland: "Brandenburg",
    bildung: "Staatliches Schulamt / Ministerium für Bildung",
    gesundheit: "Krankenkasse",
    gericht: "Gericht / Justizkasse",
    arbeit: "Arbeitsagentur / Integrationsamt / Rentenversicherung",
    alltag: "Sozialamt des Landkreises",
  },
  {
    bundesland: "Bremen",
    bildung: "Bildungsressort / Amt für Soziale Dienste",
    gesundheit: "Krankenkasse",
    gericht: "Gericht / Justizkasse",
    arbeit: "Arbeitsagentur / Integrationsamt / Rentenversicherung",
    alltag: "Amt für Soziale Dienste",
  },
  {
    bundesland: "Hamburg",
    bildung: "Schulbehörde / Integrationsamt",
    gesundheit: "Krankenkasse",
    gericht: "Gericht / Justizkasse",
    arbeit: "Arbeitsagentur / Integrationsamt / Rentenversicherung",
    alltag: "Bezirk / Fachamt Eingliederungshilfe",
  },
  {
    bundesland: "Hessen",
    bildung: "Staatliches Schulamt / Landeswohlfahrtsverband Hessen",
    gesundheit: "Krankenkasse",
    gericht: "Gericht / Justizkasse",
    arbeit: "Arbeitsagentur / LWV Hessen / Rentenversicherung",
    alltag: "LWV Hessen",
  },
  {
    bundesland: "Mecklenburg-Vorpommern",
    bildung: "Schulamt / Landesamt für Gesundheit und Soziales",
    gesundheit: "Krankenkasse",
    gericht: "Gericht / Justizkasse",
    arbeit: "Arbeitsagentur / Integrationsamt / Rentenversicherung",
    alltag: "Sozialamt / Landesamt für Gesundheit und Soziales",
  },
  {
    bundesland: "Niedersachsen",
    bildung: "Regionales Landesamt für Schule / Integrationsamt",
    gesundheit: "Krankenkasse",
    gericht: "Gericht / Justizkasse",
    arbeit: "Arbeitsagentur / Integrationsamt / Rentenversicherung",
    alltag: "Sozialamt der Landkreise / Städte",
  },
  {
    bundesland: "Nordrhein-Westfalen",
    bildung: "Schulamt / LVR oder LWL",
    gesundheit: "Krankenkasse",
    gericht: "Gericht / Justizkasse",
    arbeit: "Arbeitsagentur / LVR oder LWL / Rentenversicherung",
    alltag: "LVR / LWL / Sozialamt",
  },
  {
    bundesland: "Rheinland-Pfalz",
    bildung: "Schulbehörde / Landesamt für Soziales, Jugend und Versorgung",
    gesundheit: "Krankenkasse",
    gericht: "Gericht / Justizkasse",
    arbeit: "Arbeitsagentur / Landesamt für Soziales / Rentenversicherung",
    alltag: "Landesamt für Soziales, Jugend und Versorgung",
  },
  {
    bundesland: "Saarland",
    bildung: "Bildungsministerium / Landesamt für Soziales",
    gesundheit: "Krankenkasse",
    gericht: "Gericht / Justizkasse",
    arbeit: "Arbeitsagentur / Landesamt für Soziales / Rentenversicherung",
    alltag: "Landesamt für Soziales",
  },
  {
    bundesland: "Sachsen",
    bildung: "Landesamt für Schule und Bildung / Integrationsamt",
    gesundheit: "Krankenkasse",
    gericht: "Gericht / Justizkasse",
    arbeit: "Arbeitsagentur / Integrationsamt / Rentenversicherung",
    alltag: "Integrationsamt / Sozialamt",
  },
  {
    bundesland: "Sachsen-Anhalt",
    bildung: "Landesschulamt / Sozialministerium / Integrationsamt",
    gesundheit: "Krankenkasse",
    gericht: "Gericht / Justizkasse",
    arbeit: "Arbeitsagentur / Integrationsamt / Rentenversicherung",
    alltag: "Sozialministerium / Integrationsamt",
  },
  {
    bundesland: "Schleswig-Holstein",
    bildung: "Schulamt / Förderzentrum Hören / Integrationsamt",
    gesundheit: "Krankenkasse",
    gericht: "Gericht / Justizkasse",
    arbeit: "Arbeitsagentur / Integrationsamt / Rentenversicherung",
    alltag: "Sozialamt / Förderzentrum Hören",
  },
  {
    bundesland: "Thüringen",
    bildung: "Schulamt / Integrationsamt",
    gesundheit: "Krankenkasse",
    gericht: "Gericht / Justizkasse",
    arbeit: "Arbeitsagentur / Integrationsamt / Rentenversicherung",
    alltag: "Sozialamt / Integrationsamt",
  },
]

export type TerminKategorie = "bildung" | "gesundheit" | "gericht" | "arbeit" | "alltag"

export function lookupKostentraeger(bundesland: string, kategorie: TerminKategorie): string {
  const data = kostentraegerData.find((k) => k.bundesland === bundesland)
  if (!data) return "Kostenträger nicht gefunden"

  return data[kategorie]
}

export function getTerminKategorie(anlass: string): TerminKategorie {
  const anlassLower = anlass.toLowerCase()

  if (
    anlassLower.includes("arzt") ||
    anlassLower.includes("krankenhaus") ||
    anlassLower.includes("therapie") ||
    anlassLower.includes("medizin")
  ) {
    return "gesundheit"
  }

  if (
    anlassLower.includes("schule") ||
    anlassLower.includes("universität") ||
    anlassLower.includes("bildung") ||
    anlassLower.includes("elterngespräch")
  ) {
    return "bildung"
  }

  if (
    anlassLower.includes("gericht") ||
    anlassLower.includes("polizei") ||
    anlassLower.includes("anwalt") ||
    anlassLower.includes("verhandlung")
  ) {
    return "gericht"
  }

  if (
    anlassLower.includes("bewerbung") ||
    anlassLower.includes("job") ||
    anlassLower.includes("arbeitsagentur") ||
    anlassLower.includes("beruf")
  ) {
    return "arbeit"
  }

  return "alltag"
}
