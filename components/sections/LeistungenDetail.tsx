'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import { leistungBySlug, preisText, type Leistung } from '@/lib/leistungen'

/** Die Leistung mit dem tiefsten Einstiegspreis. Ohne Preis zählt zuletzt. */
function guenstigste(slugs: string[]): Leistung {
  const alle = slugs.map((slug) => leistungBySlug(slug)!)
  return alle.reduce((a, b) => {
    if (a.preisAb === null) return b
    if (b.preisAb === null) return a
    return b.preisAb < a.preisAb ? b : a
  })
}

const SERVICES = [
  {
    id: 'bauen',
    detailSlugs: ['webdesign-zuerich', 'webentwicklung', 'individuelle-software'],
    title: 'Websites, Web-Apps & Software',
    description:
      'Vom Webauftritt über das Kundenportal bis zum internen Werkzeug. Individuell gebaut statt aus dem Baukasten, im Browser statt im App Store. Websites bilden den Einstieg, Anwendungen und Software liegen darüber.',
    features: [
      'Individuelles Design passend zu deiner Marke',
      'Optimiert für Mobilgeräte und Suchmaschinen',
      'Web-Apps und Portale ohne Installation',
      'Massgeschneiderte Lösung statt One-size-fits-all',
    ],
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2E7D4F"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: 'seo',
    detailSlugs: ['seo-zuerich'],
    title: 'SEO',
    description:
      'Eine Website nützt wenig, wenn sie niemand sieht. Wir bringen die Technik in Ordnung und arbeiten an dem, was danach zählt.',
    features: [
      'Technische Analyse mit Aufwand pro Punkt',
      'Sitemap, Canonicals und strukturierte Daten',
      'Search Console und Google-Business-Profil',
      'Inhalte, die auf echte Suchbegriffe zielen',
    ],
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2E7D4F"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: 'wartung',
    detailSlugs: ['wartung-support'],
    title: 'Hosting & Wartung',
    description:
      'Deine Website läuft. Aber wer kümmert sich um Hosting, Updates und Sicherheit? Wir übernehmen das, inklusive einer Stunde Arbeit im Monat.',
    features: [
      'Hosting und regelmässige Sicherheitsupdates',
      'Eine Stunde Arbeit pro Monat inklusive',
      'Automatische Backups und Monitoring',
      'Fester Ansprechpartner, wir kennen dein Projekt',
    ],
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2E7D4F"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
]

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E7D4F"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-[3px] shrink-0"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function LeistungenDetail() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <>
      {/* Page header */}
      <section className="bg-sand pt-28 pb-12 md:pt-40 md:pb-16 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-mono text-gruen mb-5"
          >
            Was wir anbieten
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-bold text-h1 text-wald mb-7 max-w-3xl"
          >
            Websites, Software und Betreuung, alles aus einer Hand.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-erde text-lg leading-relaxed max-w-xl"
          >
            Wir arbeiten direkt mit dir, vom ersten Gespräch bis zur fertigen
            Lösung. Kein Ticketsystem, kein Callcenter, eine feste
            Ansprechperson.
          </motion.p>
        </div>
      </section>

      {/* Three columns */}
      <section className="bg-sand pb-8 px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mx-auto max-w-6xl grid md:grid-cols-3 border-y border-leinen divide-y md:divide-y-0 md:divide-x divide-leinen"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              id={service.id}
              variants={fadeInUp}
              className="scroll-mt-28 flex flex-col origin-top py-12 md:px-10 md:first:pl-0 md:last:pr-0"
            >
              <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-salbei">
                {service.icon}
              </div>

              <h2 className="font-display font-bold text-h2 text-wald mb-4">
                {service.title}
              </h2>
              <p className="text-erde text-sm leading-relaxed mb-8">
                {service.description}
              </p>

              <p className="label-mono text-gruen mb-4">
                Das ist dabei
              </p>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-erde text-sm leading-relaxed"
                  >
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Führt auf die Detailseite. Sitzt am Kartenende, damit die
                  drei Spalten trotz unterschiedlich langer Listen auf einer
                  Linie abschliessen. */}
              {/* Preis pro Paket. Die drei Bau-Leistungen teilen sich
                  einen Einstiegspreis, darum steht er einmal über den
                  Links statt an jedem einzeln. */}
              {/* Deckt die Karte mehrere Leistungen ab, gilt der günstigste
                  Einstieg. Bewusst berechnet statt der erste im Array: Sonst
                  hinge die Angabe an der Reihenfolge und wäre irgendwann
                  still falsch. */}
              <p className="label-mono text-gruen mt-auto pt-8">
                {preisText(guenstigste(service.detailSlugs))}
              </p>

              <div className="pt-4 flex flex-col gap-2.5">
                {service.detailSlugs.map((slug) => {
                  const leistung = leistungBySlug(slug)
                  if (!leistung) return null
                  const einzeln = service.detailSlugs.length === 1
                  return (
                    <Link
                      key={slug}
                      href={`/leistungen/${slug}`}
                      className="group inline-flex items-center gap-2 text-sm font-medium text-gruen"
                    >
                      {einzeln ? 'Mehr dazu' : leistung.name}
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-wald py-16 md:py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display font-bold text-h2 text-white mb-5">
            Klingt nach dem, was du suchst?
          </h2>
          <p className="text-sand/70 text-base mb-9">
            Erzähl uns von deinem Vorhaben, wir melden uns innerhalb von 24
            Stunden.
          </p>
          <Link href="/kontakt" className="btn-primary">
            Projekt starten
          </Link>
        </div>
      </section>
    </>
  )
}
