import type { Metadata } from 'next'
import {
  Inter,
  Bricolage_Grotesque,
  JetBrains_Mono,
  Permanent_Marker,
} from 'next/font/google'
import SmoothScroll from '@/components/SmoothScroll'
import { SITE_URL, BUSINESS } from '@/lib/site'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-mono',
  display: 'swap',
})

const marker = Permanent_Marker({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-marker',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Webagentur Zürich: Websites, Software und SEO | Insyte',
  description:
    'Webagentur aus Zürich für KMU in der ganzen Schweiz: Websites, Web-Apps, individuelle Software, SEO und Wartung. Ein fester Ansprechpartner.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Webagentur Zürich: Websites, Software und SEO | Insyte',
    description:
      'Webagentur aus Zürich für KMU in der ganzen Schweiz: Websites, Software, SEO und Wartung.',
    url: SITE_URL,
    siteName: 'Insyte',
    locale: 'de_CH',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: SITE_URL },
  // Kein `robots` hier: Indexieren ist ohnehin der Standard, das Tag war
  // wirkungslos. Schlimmer noch, es wurde an die 404-Seite vererbt und stand
  // dort im Widerspruch zu dem `noindex`, das Next.js dafür selbst setzt.
  // Seiten, die nicht indexiert werden sollen (Impressum, Datenschutz),
  // setzen ihr `robots` weiterhin selbst.
}

/**
 * Sagt Google explizit, was Insyte ist: ein Dienstleister mit Sitz in Zürich.
 * Ohne das muss die Suchmaschine den lokalen Bezug aus dem Fliesstext raten –
 * mit dem Markup ist er eine Tatsache. Dieselben Daten lesen auch die
 * KI-Suchen (AI Overviews, Perplexity), wenn sie Anbieter zusammenstellen.
 *
 * `@id` verankert die Firma als benannte Entität, auf die andere Schemata
 * (Person auf /team, Projekte) später verweisen können.
 */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  url: SITE_URL,
  email: BUSINESS.email,
  telephone: BUSINESS.phone,
  description:
    'Webagentur in Zürich für KMU in der ganzen Schweiz: Websites, Web-Apps, individuelle Software, Suchmaschinenoptimierung sowie Hosting und Wartung.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.street,
    postalCode: BUSINESS.postalCode,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    addressCountry: BUSINESS.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.latitude,
    longitude: BUSINESS.longitude,
  },
  areaServed: { '@type': 'Country', name: 'Schweiz' },
  founder: { '@type': 'Person', name: 'Mael Seewald' },
  knowsLanguage: ['de-CH', 'en'],
  /* Der Kartenlink verbindet die Adresse mit Google Maps. Ersetzt kein
     Business-Profil, hilft aber beim Abgleich der Angaben. */
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`,
  )}`,
  image: `${SITE_URL}/opengraph-image`,
  logo: `${SITE_URL}/icon.svg`,
  priceRange: 'ab CHF 1500',
  sameAs: [...BUSINESS.sameAs],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    /* `de-CH` statt `de`: präzisiert die Zielregion und stimmt mit dem
       `og:locale` (de_CH) überein, das ohnehin schon gesetzt war. */
    <html
      lang="de-CH"
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable} ${marker.variable}`}
    >
      <body className="bg-sand text-erde font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
