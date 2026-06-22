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
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2E7D4F"
        strokeWidth="1.8"
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
    title: 'Software & Apps',
    description:
      'Individuelle Webanwendungen und Tools, die deinen Geschäftsprozess automatisieren. Keine Standardlösung von der Stange, sondern genau das, was dein Betrieb wirklich braucht.',
    features: [
      'Analyse deiner Abläufe und Anforderungen',
      'Massgeschneiderte Web-Tools statt Standardsoftware',
      'Automatisierung wiederkehrender Aufgaben',
      'Anbindung an deine bestehenden Systeme',
    ],
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2E7D4F"
        strokeWidth="1.8"
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
      'Monatliche Betreuung deiner digitalen Infrastruktur – damit du dich auf dein Kerngeschäft konzentrieren kannst. Ich kümmere mich darum, dass alles läuft.',
    features: [
      'Regelmässige Updates und Sicherheitschecks',
      'Backups und laufendes Monitoring',
      'Schnelle Hilfe bei Problemen',
      'Fester Ansprechpartner – kein anonymes Ticketsystem',
    ],
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2E7D4F"
        strokeWidth="1.8"
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
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E7D4F"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0"
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
      <section className="bg-sand pt-36 pb-16 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gruen text-xs font-semibold uppercase tracking-widest mb-4"
          >
            Web & Software · Schweiz
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-jakarta font-bold text-[clamp(36px,5vw,56px)] leading-[1.05] tracking-tight text-wald mb-6 max-w-3xl"
          >
            Was ich für dein Unternehmen tun kann.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-erde text-lg leading-relaxed max-w-2xl"
          >
            Drei Leistungen, ein Ansprechpartner. Vom ersten Konzept bis zur
            laufenden Betreuung – alles aus einer Hand, erklärt in einfacher
            Sprache.
          </motion.p>
        </div>
      </section>

      {/* Service blocks */}
      <motion.section
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="bg-sand pb-24 px-6"
      >
        <div className="mx-auto max-w-6xl flex flex-col gap-5">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.id}
              id={service.id}
              variants={fadeInUp}
              className="scroll-mt-24 bg-white border border-leinen rounded-xl p-8 md:p-10 grid md:grid-cols-2 gap-10"
            >
              {/* Left: intro */}
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-salbei flex items-center justify-center shrink-0">
                    {service.icon}
                  </div>
                  <span className="font-jakarta font-bold text-leinen text-3xl">
                    0{i + 1}
                  </span>
                </div>
                <h2 className="font-jakarta font-bold text-[28px] leading-tight tracking-tight text-wald mb-4">
                  {service.title}
                </h2>
                <p className="text-erde text-base leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Right: features */}
              <div className="md:border-l md:border-leinen md:pl-10">
                <p className="text-gruen text-xs font-semibold uppercase tracking-widest mb-5">
                  Das ist dabei
                </p>
                <ul className="space-y-3.5">
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
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <section className="bg-wald py-20 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-jakarta font-bold text-[32px] leading-tight tracking-tight text-white mb-4">
            Klingt nach dem, was du suchst?
          </h2>
          <p className="text-sand/70 text-base mb-8">
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
