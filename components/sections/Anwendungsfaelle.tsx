'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const CASES = [
  {
    problem: 'Deine Website ist veraltet',
    description:
      'Ein Auftritt von gestern schreckt Kunden ab. Ein moderner, schneller Webauftritt gewinnt Vertrauen – und neue Aufträge.',
    leistung: 'Websites',
    href: '/leistungen#websites',
    icon: (
      <svg
        width="24"
        height="24"
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
    problem: 'Zu viel manuelle Arbeit',
    description:
      'Wiederkehrende Aufgaben kosten dich jeden Tag Stunden. Massgeschneiderte Software übernimmt sie – zuverlässig und ohne Fehler.',
    leistung: 'Software & Apps',
    href: '/leistungen#software',
    icon: (
      <svg
        width="24"
        height="24"
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
    problem: 'Niemand kümmert sich um Updates',
    description:
      'Sicherheitslücken, Ausfälle, veraltete Technik? Mit laufender Betreuung bleibt deine digitale Infrastruktur sicher und aktuell.',
    leistung: 'Wartung & Support',
    href: '/leistungen#wartung',
    icon: (
      <svg
        width="24"
        height="24"
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

export default function Anwendungsfaelle() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="anwendungsfaelle"
      className="scroll-mt-16 bg-sand py-24 px-6 border-t border-leinen"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="mx-auto max-w-6xl"
      >
        <motion.p
          variants={fadeInUp}
          className="text-gruen text-xs font-semibold uppercase tracking-widest mb-3"
        >
          Wann du uns brauchst
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="font-jakarta font-bold text-[40px] leading-tight tracking-tight text-wald mb-14"
        >
          Kommt dir das bekannt vor?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-5">
          {CASES.map((item) => (
            <motion.div
              key={item.problem}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group flex flex-col bg-white border border-leinen rounded-xl p-7 hover:border-gruen/30 hover:shadow-[0_12px_32px_-12px_rgba(46,125,79,0.18)] transition-[border-color,box-shadow] duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-salbei flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                {item.icon}
              </div>
              <h3 className="font-jakarta font-bold text-xl text-wald mb-3">
                {item.problem}
              </h3>
              <p className="text-erde text-sm leading-relaxed mb-6">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="group/link mt-auto inline-flex items-center gap-1.5 text-gruen text-sm font-semibold hover:brightness-110"
              >
                {item.leistung}
                <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="mt-12 text-center">
          <Link href="/leistungen" className="btn-primary">
            Alle Leistungen ansehen →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
