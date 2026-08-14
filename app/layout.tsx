import type { Metadata } from 'next'
import {
  Inter,
  Bricolage_Grotesque,
  JetBrains_Mono,
  Permanent_Marker,
} from 'next/font/google'
import SmoothScroll from '@/components/SmoothScroll'
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
  title: 'Insyte – Web & Software aus Zürich',
  description:
    'Wir bauen Websites, Web-Apps und digitale Lösungen – eigene Produkte und massgeschneiderte Projekte für dein Unternehmen. Aus Zürich.',
  metadataBase: new URL('https://insyte.ch'),
  openGraph: {
    title: 'Insyte – Web & Software aus Zürich',
    description:
      'Websites, Web-Apps und Software – eigene Produkte und Projekte für dein Unternehmen. Zürich.',
    url: 'https://insyte.ch',
    siteName: 'Insyte',
    locale: 'de_CH',
    type: 'website',
  },
  alternates: { canonical: 'https://insyte.ch' },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="de"
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable} ${marker.variable}`}
    >
      <body className="bg-sand text-erde font-sans antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
