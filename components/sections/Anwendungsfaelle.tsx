'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer, dropIn } from '@/lib/motion'

const CASES = [
  {
    problem: 'Dein Webauftritt ist veraltet.',
    description:
      'Ein alter Auftritt wirkt unprofessionell und kostet dich potenzielle Kunden.',
    leistung: 'Website',
    href: '/leistungen#websites',
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
    problem: 'Du erledigst zu viel von Hand.',
    description:
      'Wiederkehrende Aufgaben lassen sich mit den richtigen Tools automatisieren.',
    leistung: 'Web-App / Software',
    href: '/leistungen#software',
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
    problem: 'Niemand kümmert sich um Updates und Sicherheit.',
    description:
      'Veraltete Software und fehlende Backups sind ein unnötiges Risiko.',
    leistung: 'Wartung & Support',
    href: '/leistungen#wartung',
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
        className="mx-auto max-w-6xl"
      >
        <motion.h2
          variants={fadeInUp}
          className="font-jakarta font-bold text-[clamp(32px,4vw,46px)] leading-[1.08] tracking-tight text-wald mb-16 max-w-2xl"
        >
          Wann wir helfen können
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-3 border-y border-leinen divide-y md:divide-y-0 md:divide-x divide-leinen"
        >
          {CASES.map((item) => (
            <motion.div
              key={item.leistung}
              variants={dropIn}
              className="group flex flex-col origin-top py-10 md:py-12 md:px-10 md:first:pl-0 md:last:pr-0"
            >
              <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-salbei">
                {item.icon}
              </div>

              <h3 className="font-jakarta font-bold text-[22px] leading-snug tracking-tight text-wald mb-3">
                {item.problem}
              </h3>
              <p className="text-erde text-[15px] leading-relaxed mb-8">
                {item.description}
              </p>

              <Link
                href={item.href}
                className="mt-auto inline-flex items-center gap-2 font-jakarta font-bold text-gruen hover:brightness-110 transition"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
                {item.leistung}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12">
          <Link
            href="/leistungen"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-erde hover:text-gruen transition-colors"
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
