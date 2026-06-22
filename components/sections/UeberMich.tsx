'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const STATS = ['10+ Projekte', 'Schweizweit', '1 Ansprechpartner']

function DecorativeSVG() {
  return (
    <svg
      width="280"
      height="280"
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="140" cy="140" r="130" stroke="#DDD8CF" strokeWidth="1" />
      <circle cx="140" cy="140" r="90" stroke="#DDD8CF" strokeWidth="1" />
      <circle cx="140" cy="140" r="50" fill="#D6EDE0" />
      <circle cx="140" cy="140" r="18" fill="#2E7D4F" />
      <line x1="10" y1="140" x2="270" y2="140" stroke="#DDD8CF" strokeWidth="0.5" />
      <line x1="140" y1="10" x2="140" y2="270" stroke="#DDD8CF" strokeWidth="0.5" />
      <line x1="48" y1="48" x2="232" y2="232" stroke="#DDD8CF" strokeWidth="0.5" />
      <line x1="232" y1="48" x2="48" y2="232" stroke="#DDD8CF" strokeWidth="0.5" />
    </svg>
  )
}

export default function UeberMich() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="ueber-mich"
      className="bg-white py-24 px-6 border-t border-leinen"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Text */}
        <div>
          <motion.p
            variants={fadeInUp}
            className="text-gruen text-xs font-semibold uppercase tracking-widest mb-3"
          >
            Über mich
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-jakarta font-bold text-[40px] leading-tight tracking-tight text-wald mb-6"
          >
            Technologie, die wirklich hilft.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-erde text-base leading-relaxed mb-8"
          >
            Ich bin Entwickler mit Leidenschaft für sauberen Code und
            durchdachtes Design. Mein Fokus liegt auf lokalen KMUs, die einen
            verlässlichen digitalen Partner suchen – keinen anonymen Anbieter,
            sondern jemanden, der zuhört und mitdenkt.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {STATS.map((stat, i) => (
              <span key={stat} className="flex items-center gap-5">
                <span className="font-jakarta font-bold text-sm text-gruen">
                  {stat}
                </span>
                {i < STATS.length - 1 && (
                  <span className="text-leinen select-none">·</span>
                )}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Decorative SVG */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center"
        >
          <DecorativeSVG />
        </motion.div>
      </motion.div>
    </section>
  )
}
