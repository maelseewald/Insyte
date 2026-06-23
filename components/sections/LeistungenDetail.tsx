'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const SERVICES = [
  {
    id: 'websites',
    title: 'Websites & Landingpages',
    description:
      'Professionelle Webauftritte, die auf allen Geräten gut aussehen und bei Google gefunden werden.',
    features: [
      'Individuelles Design passend zu deiner Marke',
      'Optimiert für Mobilgeräte und Suchmaschinen (SEO)',
      'Schnelle Ladezeiten dank moderner Technologie',
      'Einfache Pflege – oder ich übernehme sie',
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
    id: 'software',
    title: 'Web-Apps & Software',
    description:
      'Individuelle Tools und Webanwendungen, die deinen Alltag vereinfachen – statt Standardsoftware, die nur halb passt.',
    features: [
      'Analyse deiner Abläufe und Anforderungen',
      'Massgeschneiderte Lösung statt One-size-fits-all',
      'Automatisierung wiederkehrender Aufgaben',
      'Anbindung an bestehende Systeme wenn nötig',
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
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'wartung',
    title: 'Wartung & Support',
    description:
      'Deine Website oder App läuft – aber wer kümmert sich um Updates, Backups und Sicherheit? Ich übernehme das.',
    features: [
      'Regelmässige Updates und Sicherheitschecks',
      'Automatische Backups und Monitoring',
      'Schnelle Hilfe bei Problemen und Ausfällen',
      'Fester Ansprechpartner – ich kenne dein Projekt',
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
      <section className="bg-sand pt-40 pb-16 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gruen text-xs font-semibold uppercase tracking-[0.2em] mb-5"
          >
            Was ich anbiete
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-jakarta font-bold text-[clamp(36px,5.5vw,60px)] leading-[1.04] tracking-tight text-wald mb-7 max-w-3xl"
          >
            Websites, Software und Betreuung – aus einer Hand.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-erde text-lg leading-relaxed max-w-xl"
          >
            Ich arbeite direkt mit dir – vom ersten Gespräch bis zur fertigen
            Lösung. Kein Ticketsystem, kein Callcenter, eine Ansprechperson.
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
              className="scroll-mt-28 flex flex-col py-12 md:px-10 md:first:pl-0 md:last:pr-0"
            >
              <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-salbei">
                {service.icon}
              </div>

              <h2 className="font-jakarta font-bold text-[26px] leading-tight tracking-tight text-wald mb-4">
                {service.title}
              </h2>
              <p className="text-erde text-[15px] leading-relaxed mb-8">
                {service.description}
              </p>

              <p className="text-gruen text-[11px] font-semibold uppercase tracking-[0.18em] mb-4">
                Das ist dabei
              </p>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-erde text-[15px] leading-relaxed"
                  >
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-wald py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-jakarta font-bold text-[clamp(28px,3.4vw,40px)] leading-tight tracking-tight text-white mb-5">
            Klingt nach dem, was du suchst?
          </h2>
          <p className="text-sand/70 text-base mb-9">
            Erzähl mir von deinem Vorhaben – ich melde mich innerhalb von 24
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
