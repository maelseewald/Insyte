'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const STATS = [
  { value: '2', label: 'Projekte' },
  { value: '24h', label: 'Antwortzeit' },
  { value: 'Zürich', label: 'Standort' },
]

const PILL =
  'inline-flex items-center gap-2 rounded-full border border-leinen bg-white px-3.5 py-1.5 text-[13px] font-semibold text-wald transition-colors hover:border-gruen/40 hover:text-gruen'

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#2E7D4F" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#2E7D4F" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
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

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <>
      {/* Header */}
      <section className="bg-sand pt-40 pb-16 px-6">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gruen text-xs font-semibold uppercase tracking-[0.2em] mb-5"
          >
            Unser Team
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-jakarta font-bold text-[clamp(36px,5.5vw,60px)] leading-[1.04] tracking-tight text-wald mb-7 max-w-3xl"
          >
            Die Menschen hinter Insyte.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-erde text-lg leading-relaxed max-w-xl"
          >
            Kein Callcenter, keine Weiterleitungen. Du arbeitest direkt mit den
            Menschen, die dein Projekt bauen.
          </motion.p>
        </div>
      </section>

      {/* Team grid */}
      <section className="bg-sand pb-4 px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mx-auto max-w-4xl grid md:grid-cols-2 gap-5"
        >
          {/* Member card */}
          <motion.article
            variants={fadeInUp}
            className="overflow-hidden rounded-2xl border border-leinen bg-white"
          >
            <div className="relative aspect-[4/5] bg-sand">
              <Image
                src="/portrait.png"
                alt="Mael Seewald, Gründer von Insyte"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[center_20%]"
              />
            </div>
            <div className="p-7">
              <span className="inline-block rounded-full bg-salbei px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gruen mb-4">
                Gründer &amp; Entwickler
              </span>
              <h2 className="font-jakarta font-bold text-[26px] leading-tight tracking-tight text-wald mb-3">
                Mael Seewald
              </h2>
              <p className="text-erde text-[15px] leading-relaxed mb-6 max-w-md">
                Lernender Informatiker bei Adnovum in Zürich. Kümmert sich bei
                Insyte um Entwicklung und Design – von der ersten Idee bis zum
                Launch. Mag sauberen Code, klares Design und einfache
                Erklärungen.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.linkedin.com/in/maelseewald/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={PILL}
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/maelseewald"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={PILL}
                >
                  <GithubIcon />
                  GitHub
                </a>
                <a
                  href="https://mael.5eewald.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={PILL}
                >
                  <GridIcon />
                  Portfolio
                </a>
              </div>
            </div>
          </motion.article>

          {/* Growing slot */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-leinen p-10 text-center min-h-[280px]"
          >
            <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-salbei">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2E7D4F"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
            <h3 className="font-jakarta font-bold text-xl text-wald mb-3">
              Wir wachsen
            </h3>
            <p className="text-erde text-sm leading-relaxed max-w-xs mb-6">
              Insyte ist heute ein eingespieltes Ein-Personen-Team – und offen
              für die richtigen Köpfe.
            </p>
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 font-jakarta font-bold text-gruen hover:brightness-110 transition"
            >
              Mitmachen?
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-sand py-16 px-6">
        <div className="mx-auto max-w-4xl flex flex-wrap gap-x-16 gap-y-8 border-t border-leinen pt-10">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-jakarta font-bold text-[clamp(28px,3vw,36px)] leading-none text-wald">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-erde/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-wald py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-jakarta font-bold text-[clamp(28px,3.4vw,40px)] leading-tight tracking-tight text-white mb-9">
            Schreib uns direkt.
          </h2>
          <Link href="/kontakt" className="btn-primary">
            Projekt starten
          </Link>
        </div>
      </section>
    </>
  )
}
