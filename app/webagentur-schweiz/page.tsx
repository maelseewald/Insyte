import type { Metadata } from 'next'
import StandortSeite from '@/components/sections/StandortSeite'
import { standortBySlug } from '@/lib/standorte'
import { url } from '@/lib/site'

const standort = standortBySlug('webagentur-schweiz')!

export const metadata: Metadata = {
  title: standort.metaTitle,
  description: standort.metaDescription,
  alternates: { canonical: url('/webagentur-schweiz') },
  openGraph: {
    title: standort.metaTitle,
    description: standort.metaDescription,
    url: url('/webagentur-schweiz'),
    siteName: 'Insyte',
    locale: 'de_CH',
    type: 'website',
  },
}

export default function Page() {
  return <StandortSeite standort={standort} />
}
