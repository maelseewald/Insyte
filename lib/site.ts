/**
 * Eine Quelle für die Domain. Vorher stand `https://insyte.ch` an sieben
 * Stellen im Code – während der Server auf `https://www.insyte.ch` umleitete.
 * Die Canonicals zeigten damit auf eine URL, die weiterleitet.
 *
 * Massgebend ist die Variante, die Vercel tatsächlich ausliefert: www.
 * Wird das Redirect je umgedreht, ändert sich nur diese Zeile.
 */
export const SITE_URL = 'https://www.insyte.ch'

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
  street: 'Segantinistrasse 200',
  postalCode: '8049',
  city: 'Zürich',
  region: 'ZH',
  country: 'CH',
  sameAs: [
    'https://www.linkedin.com/company/insyte-ch/',
    'https://www.instagram.com/insyte_ch/',
    'https://github.com/maelseewald',
  ],
} as const
