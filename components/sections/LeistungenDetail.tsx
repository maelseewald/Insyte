'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const SERVICES = [
  {
    id: 'websites',
    title: 'Websites',
    description:
      'Professionelle, schnelle Webauftritte für lokale Unternehmen. Von der einfachen Landingpage bis zur umfassenden Unternehmenswebsite – immer massgeschneidert und auf deine Ziele ausgerichtet.',
    features: [
      'Individuelles Design, passend zu deiner Marke',
      'Optimiert für Google (SEO) und Mobilgeräte',
      'Schnelle Ladezeiten dank moderner Technik',
      'Einfache Pflege – oder ich übernehme sie für dich',
    ],
  },
  {
    id: 'software',
    title: 'Software & Apps',
    description:
      'Individuelle Webanwendungen und Tools, die deinen Geschäftsprozess automatisieren. Keine Standardlösung von der Stange, sondern genau das, was dein Betrieb wirklich braucht.',
    features: [
      'Analyse deiner Abläufe und Anforderungen',
      'Massgeschneiderte Web-Tools statt Standardsoftware',
      'Automatisierung wiederkehrender Aufgaben',
      'Anbindung an deine bestehenden Systeme',
    ],
  },
  {
    id: 'wartung',
    title: 'Wartung & Support',
    description:
      'Monatliche Betreuung deiner digitalen Infrastruktur – damit du dich auf dein Kerngeschäft konzentrieren kannst. Ich kümmere mich darum, dass alles läuft.',
    features: [
      'Regelmässige Updates und Sicherheitschecks',
      'Backups und laufendes Monitoring',
      'Schnelle Hilfe bei Problemen',
      'Fester Ansprechpartner – kein anonymes Ticketsystem',
    ],
  },
]

function FeatureMarker() {
  return (
    <span
      className="mt-[7px] flex h-3 w-3 shrink-0 items-center justify-center rounded-full border border-gruen"
      aria-hidden="true"
    >
      <span className="h-1 w-1 rounded-full bg-gruen" />
    </span>
  )
}

export default function LeistungenDetail() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <>
      {/* Page header */}
      <section className="bg-sand pt-40 pb-20 px-6">
        <div className="mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gruen text-xs font-semibold uppercase tracking-[0.2em] mb-5"
          >
            Leistungen · Insyte
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-jakarta font-bold text-[clamp(36px,5.5vw,60px)] leading-[1.04] tracking-tight text-wald mb-7 max-w-3xl"
          >
            Drei Wege, dein Geschäft digital weiterzubringen.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-erde text-lg leading-relaxed max-w-xl"
          >
            Ein Ansprechpartner, vom ersten Konzept bis zur laufenden Betreuung.
            Alles aus einer Hand, erklärt in einfacher Sprache.
          </motion.p>
        </div>
      </section>

      {/* Service rows */}
      <motion.section
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="bg-sand pb-8 px-6"
      >
        <div className="mx-auto max-w-5xl">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.id}
              id={service.id}
              variants={fadeInUp}
              className="scroll-mt-28 grid md:grid-cols-12 gap-x-12 gap-y-8 border-t border-leinen py-16 md:py-20"
            >
              {/* Left: title block */}
              <div className="md:col-span-5">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-jakarta font-bold text-leinen text-sm tabular-nums tracking-tight">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-leinen" aria-hidden="true" />
                </div>
                <h2 className="font-jakarta font-bold text-[clamp(28px,3.4vw,40px)] leading-tight tracking-tight text-wald mb-5">
                  {service.title}
                </h2>
                <p className="text-erde text-base leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Right: feature list */}
              <div className="md:col-span-6 md:col-start-7">
                <p className="text-gruen text-xs font-semibold uppercase tracking-[0.2em] mb-6">
                  Das ist dabei
                </p>
                <ul>
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-4 border-b border-leinen py-4 text-erde text-[15px] leading-relaxed first:border-t"
                    >
                      <FeatureMarker />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

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
          <Link href="/#kontakt" className="btn-primary">
            Projekt starten
          </Link>
        </div>
      </section>
    </>
  )
}
