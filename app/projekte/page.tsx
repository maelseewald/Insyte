import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import ScrollProgress from '@/components/layout/ScrollProgress'
import Footer from '@/components/layout/Footer'
import ProjektZeitstrahl from '@/components/sections/ProjektZeitstrahl'

export const metadata: Metadata = {
  title: 'Projekte – Insyte',
  description:
    'Ausgewählte Web- und Softwareprojekte für KMUs in der Schweiz – Websites, Onlineshops, Buchungssysteme und individuelle Tools.',
  alternates: { canonical: 'https://insyte.ch/projekte' },
  openGraph: {
    title: 'Projekte – Insyte',
    description:
      'Ausgewählte Web- und Softwareprojekte für KMUs in der Schweiz.',
    url: 'https://insyte.ch/projekte',
    siteName: 'Insyte',
    locale: 'de_CH',
    type: 'website',
  },
}

export default function ProjektePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <ProjektZeitstrahl />
      </main>
      <Footer />
    </>
  )
}
