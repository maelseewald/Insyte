import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import ScrollProgress from '@/components/layout/ScrollProgress'
import Footer from '@/components/layout/Footer'
import LeistungenDetail from '@/components/sections/LeistungenDetail'

export const metadata: Metadata = {
  title: 'Leistungen – Insyte',
  description:
    'Websites, individuelle Softwarelösungen und laufende Wartung für KMUs in der Schweiz – alles aus einer Hand, mit einem festen Ansprechpartner.',
  alternates: { canonical: 'https://insyte.ch/leistungen' },
  openGraph: {
    title: 'Leistungen – Insyte',
    description:
      'Websites, individuelle Softwarelösungen und laufende Wartung für KMUs in der Schweiz.',
    url: 'https://insyte.ch/leistungen',
    siteName: 'Insyte',
    locale: 'de_CH',
    type: 'website',
  },
}

export default function LeistungenPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <LeistungenDetail />
      </main>
      <Footer />
    </>
  )
}
