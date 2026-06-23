'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

export default function UeberMich() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="ueber-mich"
      className="bg-sand py-20 px-6 border-t border-leinen"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center md:flex-row md:gap-12 md:text-left"
      >
        {/* Small portrait */}
        <motion.div
          variants={fadeInUp}
          className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-leinen"
        >
          <Image
            src="/portrait.png"
            alt="Mael Seewald, Gründer von Insyte"
            fill
            sizes="112px"
            className="object-cover object-top"
          />
        </motion.div>

        {/* Text + link */}
        <div>
          <motion.p
            variants={fadeInUp}
            className="text-gruen text-xs font-semibold uppercase tracking-[0.2em] mb-3"
          >
            Hinter Insyte
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="font-jakarta font-bold text-[clamp(22px,2.8vw,30px)] leading-snug tracking-tight text-wald mb-5 max-w-xl"
          >
            Kein anonymer Anbieter – bei Insyte arbeitest du direkt mit den
            Menschen, die dein Projekt bauen. Wir hören zu, denken mit und
            erklären Technik in einfacher Sprache.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              href="/team"
              className="group inline-flex items-center gap-2 font-jakarta font-bold text-wald hover:text-gruen transition-colors"
            >
              Unser Team
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
