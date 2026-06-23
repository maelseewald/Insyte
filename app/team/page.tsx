import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import ScrollProgress from '@/components/layout/ScrollProgress'
import Footer from '@/components/layout/Footer'
import Team from '@/components/sections/Team'

export const metadata: Metadata = {
  title: 'Über mich – Insyte',
  description:
    'Mael Seewald – Lernender Informatiker aus Zürich. Ein fester Ansprechpartner für Web- und Softwareprojekte, kein Callcenter.',
  alternates: { canonical: 'https://insyte.ch/team' },
  openGraph: {
    title: 'Über mich – Insyte',
    description:
      'Mael Seewald – Lernender Informatiker aus Zürich, Web & Software.',
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
