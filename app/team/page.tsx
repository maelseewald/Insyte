import type { Metadata } from 'next'
import { url, SITE_URL, BUSINESS } from '@/lib/site'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Team from '@/components/sections/Team'

export const metadata: Metadata = {
  title: 'Über Insyte, Web-Entwickler in Zürich | Insyte',
  description:
    'Das Team hinter Insyte: Web und Software aus Zürich. Ein fester Ansprechpartner, kein Callcenter.',
  alternates: { canonical: url('/team') },
  openGraph: {
    title: 'Das Team von Insyte',
    description: 'Das Team hinter Insyte: Web und Software aus Zürich.',
    url: url('/team'),
    siteName: 'Insyte',
    locale: 'de_CH',
    type: 'website',
  },
}

/* Verknüpft die Person mit der Firma (`@id` aus dem Root-Layout). Google
   braucht diese Verbindung, um „Mael Seewald" und „Insyte" als
   zusammengehörige Entitäten zu führen statt als zwei zufällige Namen. */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mael Seewald',
  jobTitle: 'Gründer & Entwickler',
  url: url('/team'),
  worksFor: { '@id': `${SITE_URL}/#organization` },
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.city,
    addressCountry: BUSINESS.country,
  },
  sameAs: [
    'https://www.linkedin.com/in/maelseewald/',
    'https://github.com/maelseewald',
  ],
}

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main>
        <Team />
      </main>
      <Footer />
    </>
  )
}
