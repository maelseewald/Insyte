'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const SERVICES = [
  {
    title: 'Websites',
    description:
      'Professionelle, schnelle Webauftritte für lokale Unternehmen. Von der Landingpage bis zur Unternehmenswebsite.',
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
    title: 'Software & Apps',
    description:
      'Individuelle Webanwendungen und Tools, die deinen Geschäftsprozess automatisieren.',
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
    title: 'Wartung & Support',
    description:
      'Monatliche Betreuung deiner digitalen Infrastruktur – damit du dich auf dein Kerngeschäft konzentrierst.',
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

export default function Leistungen() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="leistungen" className="bg-sand py-24 px-6 border-t border-leinen">
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
          Was ich anbiete
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="font-jakarta font-bold text-[40px] leading-tight tracking-tight text-wald mb-14"
        >
          Leistungen
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-5">
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              className="bg-white border border-leinen rounded-xl p-7 hover:border-gruen/30 transition-colors duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-salbei flex items-center justify-center mb-5">
                {service.icon}
              </div>
              <h3 className="font-jakarta font-bold text-xl text-wald mb-3">
                {service.title}
              </h3>
              <p className="text-erde text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
