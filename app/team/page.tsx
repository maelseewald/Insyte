import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import ScrollProgress from '@/components/layout/ScrollProgress'
import Footer from '@/components/layout/Footer'
import Team from '@/components/sections/Team'

export const metadata: Metadata = {
  title: 'Team – Insyte',
  description:
    'Das Team hinter Insyte: ein fester Ansprechpartner für Web- und Softwareprojekte – kein Callcenter, keine Weiterleitungen.',
  alternates: { canonical: 'https://insyte.ch/team' },
  openGraph: {
    title: 'Team – Insyte',
    description:
      'Ein fester Ansprechpartner für Web- und Softwareprojekte in der Schweiz.',
    url: 'https://insyte.ch/team',
    siteName: 'Insyte',
    locale: 'de_CH',
    type: 'website',
  },
}

export default function TeamPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Team />
      </main>
      <Footer />
    </>
  )
}
