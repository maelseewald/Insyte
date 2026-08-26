import type { Metadata } from 'next'
import { url } from '@/lib/site'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProjektZeitstrahl from '@/components/sections/ProjektZeitstrahl'

export const metadata: Metadata = {
  title: 'Referenzen: Websites & Software-Projekte | Insyte',
  description:
    'Ausgewählte Web- und Softwareprojekte für KMUs in der Schweiz – Websites, Onlineshops, Buchungssysteme und individuelle Tools.',
  alternates: { canonical: url('/projekte') },
  openGraph: {
    title: 'Projekte – Insyte',
    description:
      'Ausgewählte Web- und Softwareprojekte für KMUs in der Schweiz.',
    url: url('/projekte'),
    siteName: 'Insyte',
    locale: 'de_CH',
    type: 'website',
  },
}

export default function ProjektePage() {
  return (
    <>
      <Navbar />
      <main>
        <ProjektZeitstrahl />
      </main>
      <Footer />
    </>
  )
}
