'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const CASES = [
  {
    problem: 'Deine Website ist veraltet.',
    description:
      'Ein Auftritt von gestern schreckt Kunden ab. Ein moderner, schneller Webauftritt gewinnt Vertrauen – und neue Aufträge.',
    leistung: 'Websites',
    href: '/leistungen#websites',
  },
  {
    problem: 'Zu viel läuft noch von Hand.',
    description:
      'Wiederkehrende Aufgaben kosten dich jeden Tag Stunden. Massgeschneiderte Software übernimmt sie – zuverlässig und ohne Fehler.',
    leistung: 'Software & Apps',
    href: '/leistungen#software',
  },
  {
    problem: 'Niemand kümmert sich um Updates.',
    description:
      'Sicherheitslücken, Ausfälle, veraltete Technik? Mit laufender Betreuung bleibt deine digitale Infrastruktur sicher und aktuell.',
    leistung: 'Wartung & Support',
    href: '/leistungen#wartung',
  },
]

function FocusMarker() {
  return (
    <span
      className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center"
      aria-hidden="true"
    >
      {/* focus pulse ring */}
      <span className="absolute inset-0 rounded-full border border-gruen opacity-0 transition-all duration-500 group-hover:scale-[2.2] group-hover:opacity-100" />
      {/* lens */}
      <span className="flex h-4 w-4 items-center justify-center rounded-full border border-leinen bg-sand transition-colors duration-300 group-hover:border-gruen">
        <span className="h-[6px] w-[6px] rounded-full bg-gruen transition-transform duration-300 group-hover:scale-[1.4]" />
      </span>
    </span>
  )
}

export default function Anwendungsfaelle() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="anwendungsfaelle"
      className="scroll-mt-16 bg-sand py-28 px-6 border-t border-leinen"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="mx-auto max-w-5xl"
      >
        <motion.p
          variants={fadeInUp}
          className="text-gruen text-xs font-semibold uppercase tracking-[0.2em] mb-4"
        >
          Wann du uns brauchst
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="font-jakarta font-bold text-[clamp(32px,4vw,46px)] leading-[1.08] tracking-tight text-wald mb-16 max-w-2xl"
        >
          Kommt dir eines davon bekannt vor?
        </motion.h2>

        {/* Focus axis */}
        <div className="relative">
          <span
            className="absolute left-2 top-3 bottom-3 w-px bg-leinen"
            aria-hidden="true"
          />
          <ul>
            {CASES.map((item) => (
              <motion.li
                key={item.leistung}
                variants={fadeInUp}
                className="group relative pl-10 md:pl-16 py-9 border-b border-leinen first:border-t"
              >
                <FocusMarker />
                <div className="md:flex md:items-baseline md:justify-between md:gap-10">
                  <div className="md:max-w-xl">
                    <h3 className="font-jakarta font-bold text-[clamp(22px,2.6vw,30px)] leading-snug tracking-tight text-wald transition-colors duration-300 group-hover:text-gruen">
                      {item.problem}
                    </h3>
                    <p className="text-erde text-base leading-relaxed mt-3">
                      {item.description}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="mt-5 md:mt-0 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-wald transition-colors hover:text-gruen"
                  >
                    <span className="text-[11px] uppercase tracking-[0.18em] text-erde/50 transition-colors group-hover:text-gruen">
                      Lösung
                    </span>
                    {item.leistung}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div variants={fadeInUp} className="mt-14">
          <Link
            href="/leistungen"
            className="group inline-flex items-center gap-2 font-jakarta font-bold text-wald hover:text-gruen transition-colors"
          >
            Alle Leistungen im Detail
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
