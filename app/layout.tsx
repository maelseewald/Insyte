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
  title: 'Webentwicklung Zürich – Websites & Software für KMU | Insyte',
  description:
    'Wir bauen Websites, Web-Apps und digitale Lösungen – eigene Produkte und massgeschneiderte Projekte für dein Unternehmen. Aus Zürich.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Webentwicklung Zürich – Websites & Software für KMU | Insyte',
    description:
      'Websites, Web-Apps und Software – eigene Produkte und Projekte für dein Unternehmen. Zürich.',
    url: SITE_URL,
    siteName: 'Insyte',
    locale: 'de_CH',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
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
  description:
    'Websites, Web-Apps und individuelle Softwarelösungen für KMU in Zürich und der Schweiz.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.street,
    postalCode: BUSINESS.postalCode,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    addressCountry: BUSINESS.country,
  },
  areaServed: { '@type': 'Country', name: 'Schweiz' },
  founder: { '@type': 'Person', name: 'Mael Seewald' },
  knowsLanguage: ['de-CH', 'en'],
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
