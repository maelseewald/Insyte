import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-jakarta',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Insyte – Digitale Lösungen. Lokale Wirkung.',
  description:
    'Massgeschneiderte Websites und Softwarelösungen für KMUs in der Schweiz – entwickelt mit Sorgfalt, erklärt in einfacher Sprache.',
  metadataBase: new URL('https://insyte.ch'),
  openGraph: {
    title: 'Insyte – Web & Software für KMUs in der Schweiz',
    description:
      'Massgeschneiderte Websites und Softwarelösungen für KMUs – entwickelt mit Sorgfalt, erklärt in einfacher Sprache.',
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
    <html lang="de" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="bg-sand text-erde font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
