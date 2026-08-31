/**
 * Eine Quelle für die Domain. Vorher stand sie an sieben Stellen im Code –
 * und zeigte auf eine Variante, die der Server weiterleitete. Die Canonicals
 * verwiesen damit auf eine URL, die es so nicht ausliefert.
 *
 * Gewollt ist die Domain ohne www.
 *
 * WICHTIG: Diese Zeile muss zur Primärdomain in Vercel passen. Steht dort www
 * als primär, leitet der Server auf www um – und der Fehler von vorher wäre
 * zurück. Beides gehört zusammen umgestellt.
 */
export const SITE_URL = 'https://insyte.ch'

/** Absolute URL für Canonicals und `og:url`. Pfad mit führendem Slash. */
export function url(path = ''): string {
  return path ? `${SITE_URL}${path}` : SITE_URL
}

/**
 * Stammdaten für JSON-LD und den Footer. Deckungsgleich mit dem Impressum –
 * Google gleicht diese Angaben mit anderen Quellen ab (Business-Profil,
 * Verzeichnisse), Abweichungen schwächen das lokale Signal.
 */
export const BUSINESS = {
  name: 'Insyte',
  legalName: 'Mael Seewald',
  email: 'info@insyte.ch',
  /* Zwei Formen derselben Nummer: `phone` für `tel:`-Links und JSON-LD, wo
     die internationale Schreibweise erwartet wird, `phoneDisplay` für den
     sichtbaren Text. Eine Nummer, die als Text anders aussieht als im Link,
     wäre für den Abgleich mit dem Business-Profil schädlich. */
  phone: '+41782093113',
  phoneDisplay: '078 209 31 13',
  street: 'Segantinistrasse 200',
  postalCode: '8049',
  city: 'Zürich',
  region: 'ZH',
  country: 'CH',
  /* Exakte Koordinaten des Standorts, aus Google Maps abgelesen. Ungefähre
     Werte wären schlechter als keine: Sie streuen das lokale Signal, statt
     es zu bündeln. Sechs Nachkommastellen sind rund zehn Zentimeter genau,
     mehr trägt keine zusätzliche Information. */
  latitude: 47.408861,
  longitude: 8.489773,
  sameAs: [
    'https://www.linkedin.com/company/insyte-ch/',
    'https://www.instagram.com/insyte_ch/',
    'https://github.com/maelseewald',
  ],
} as const
