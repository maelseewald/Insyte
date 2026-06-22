'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const STATS = ['10+ Projekte', 'Schweizweit', '1 Ansprechpartner']

export default function UeberMich() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="ueber-mich"
      className="bg-sand py-24 px-6 border-t border-leinen"
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
            className="font-jakarta font-bold text-[clamp(32px,4vw,40px)] leading-tight tracking-tight text-wald mb-6"
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

        {/* Portrait */}
        <motion.figure
          variants={fadeInUp}
          className="relative mx-auto w-full max-w-sm md:ml-auto"
        >
          <div className="relative">
            {/* offset accent panel */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl bg-salbei"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-leinen bg-sand">
              <Image
                src="/portrait.png"
                alt="Mael Seewald, Gründer von Insyte"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top"
              />
            </div>
          </div>
          <figcaption className="relative mt-5 text-sm">
            <span className="font-jakarta font-bold text-wald">
              Mael Seewald
            </span>
            <span className="text-erde/60"> — Gründer &amp; Entwickler</span>
          </figcaption>

          <div className="relative mt-4 flex items-center gap-5">
            <a
              href="https://www.linkedin.com/company/insyte"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-wald hover:text-gruen transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
            <span className="text-leinen select-none" aria-hidden="true">
              ·
            </span>
            <Link
              href="/projekte"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-wald hover:text-gruen transition-colors"
            >
              Portfolio
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </motion.figure>
      </motion.div>
    </section>
  )
}
