import type { Metadata } from 'next'
import { url } from '@/lib/site'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LeistungenDetail from '@/components/sections/LeistungenDetail'

export const metadata: Metadata = {
  title: 'Webdesign, Software & Wartung für KMU in Zürich | Insyte',
  description:
    'Websites, individuelle Softwarelösungen und laufende Wartung für KMUs in der Schweiz – alles aus einer Hand, mit einem festen Ansprechpartner.',
  alternates: { canonical: url('/leistungen') },
  openGraph: {
    title: 'Leistungen – Insyte',
    description:
      'Websites, individuelle Softwarelösungen und laufende Wartung für KMUs in der Schweiz.',
    url: url('/leistungen'),
    siteName: 'Insyte',
    locale: 'de_CH',
    type: 'website',
  },
}

export default function LeistungenPage() {
  return (
    <>
      <Navbar />
      <main>
        <LeistungenDetail />
      </main>
      <Footer />
    </>
  )
}
