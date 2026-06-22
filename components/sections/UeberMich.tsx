'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const STATS = [
  { value: '10+', label: 'Projekte' },
  { value: '24h', label: 'Antwortzeit' },
  { value: '1', label: 'Ansprechpartner' },
]

function LinkedInIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="#2E7D4F"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E7D4F"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

const PILL =
  'group inline-flex items-center gap-1.5 rounded-full border border-leinen bg-white px-3 py-1.5 text-[13px] font-semibold text-wald transition-colors hover:border-gruen/40 hover:text-gruen'

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
        className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16 md:gap-20 items-center"
      >
        {/* Text */}
        <div>
          <motion.p
            variants={fadeInUp}
            className="text-gruen text-xs font-semibold uppercase tracking-[0.2em] mb-4"
          >
            Über mich
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-jakarta font-bold text-[clamp(32px,4vw,42px)] leading-tight tracking-tight text-wald mb-6"
          >
            Technologie, die wirklich hilft.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-erde text-base leading-relaxed mb-10 max-w-md"
          >
            Ich bin Entwickler mit Leidenschaft für sauberen Code und
            durchdachtes Design. Mein Fokus liegt auf lokalen KMUs, die einen
            verlässlichen digitalen Partner suchen – keinen anonymen Anbieter,
            sondern jemanden, der zuhört und mitdenkt.
          </motion.p>

          {/* Big stats */}
          <motion.dl
            variants={fadeInUp}
            className="flex flex-wrap gap-x-12 gap-y-6 border-t border-leinen pt-8"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dd className="font-jakarta font-bold text-[clamp(30px,3.4vw,38px)] leading-none text-wald">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-[11px] uppercase tracking-[0.16em] text-erde/50">
                  {stat.label}
                </dt>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Portrait with overlapping profile card */}
        <motion.figure
          variants={fadeInUp}
          className="relative mx-auto w-full max-w-sm md:ml-auto"
        >
          <div className="relative mb-16">
            {/* offset accent panel */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl bg-salbei"
            />
            {/* photo */}
            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-leinen bg-sand">
              <Image
                src="/portrait.png"
                alt="Mael Seewald, Gründer von Insyte"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* floating profile card */}
            <figcaption className="absolute -bottom-10 left-1/2 w-[88%] -translate-x-1/2 rounded-xl border border-leinen bg-white p-5 shadow-[0_20px_44px_-20px_rgba(26,38,22,0.3)]">
              <p className="font-jakarta font-bold text-wald leading-tight">
                Mael Seewald
              </p>
              <p className="text-erde/60 text-xs mb-4">Gründer &amp; Entwickler</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.linkedin.com/company/insyte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={PILL}
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <Link href="/projekte" className={PILL}>
                  <GridIcon />
                  Projekte
                </Link>
              </div>
            </figcaption>
          </div>
        </motion.figure>
      </motion.div>
    </section>
  )
}
