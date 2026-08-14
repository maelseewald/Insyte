'use client'

import { useRef, useState } from 'react'
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
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-leinen bg-white transition-colors hover:border-gruen/40 hover:bg-salbei/40'

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

function GlobeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E7D4F"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [flipped, setFlipped] = useState(false)

  return (
    <>
      {/* Header */}
      <section className="bg-sand pt-40 pb-16 px-6">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-mono text-gruen mb-5"
          >
            Unser Team
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-bold text-h1 text-wald mb-7 max-w-3xl"
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
          {/* Member card (flip) */}
          <motion.article
            variants={fadeInUp}
            className="[perspective:1400px]"
          >
            <motion.div
              className="relative min-h-[300px]"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              {/* FRONT */}
              <div
                className="absolute inset-0 flex flex-col rounded-2xl border border-leinen bg-white p-7 [backface-visibility:hidden]"
                aria-hidden={flipped}
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <span className="label-mono inline-block rounded-full bg-salbei px-3 py-1 text-gruen mb-4">
                      Gründer &amp; Entwickler
                    </span>
                    <h3 className="font-display font-bold text-h3 text-wald mb-5">
                      Mael Seewald
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      <a
                        href="https://www.linkedin.com/in/maelseewald/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className={PILL}
                      >
                        <LinkedInIcon />
                      </a>
                      <a
                        href="https://github.com/maelseewald"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className={PILL}
                      >
                        <GithubIcon />
                      </a>
                      <a
                        href="https://mael.5eewald.ch"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Portfolio"
                        className={PILL}
                      >
                        <GlobeIcon />
                      </a>
                    </div>
                  </div>
                  <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-xl bg-sand">
                    <Image
                      src="/portrait.png"
                      alt="Mael Seewald, Gründer von Insyte"
                      fill
                      sizes="112px"
                      className="object-cover object-[center_18%]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFlipped(true)}
                  className="group/flip mt-auto inline-flex items-center gap-2 self-start text-sm font-medium text-gruen hover:brightness-110"
                >
                  Mehr über mich
                  <span className="transition-transform duration-300 group-hover/flip:translate-x-1">
                    →
                  </span>
                </button>
              </div>

              {/* BACK */}
              <div
                className="absolute inset-0 flex flex-col rounded-2xl border border-leinen bg-white p-7 [transform:rotateY(180deg)] [backface-visibility:hidden]"
                aria-hidden={!flipped}
              >
                <p className="label-mono text-gruen mb-4">
                  Über Mael
                </p>
                <p className="text-erde text-sm leading-relaxed">
                  Lernender Informatiker bei Adnovum in Zürich. Kümmert sich bei
                  Insyte um Entwicklung und Design – von der ersten Idee bis zum
                  Launch. Mag sauberen Code, klares Design und einfache
                  Erklärungen.
                </p>
                <button
                  type="button"
                  onClick={() => setFlipped(false)}
                  className="group/back mt-auto inline-flex items-center gap-2 self-start text-sm font-medium text-erde hover:text-gruen transition-colors"
                >
                  <span className="transition-transform duration-300 group-hover/back:-translate-x-1">
                    ←
                  </span>
                  Zurück
                </button>
              </div>
            </motion.div>
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
            <h3 className="font-display font-bold text-h3 text-wald mb-3">
              Wir wachsen
            </h3>
            <p className="text-erde text-sm leading-relaxed max-w-xs mb-6">
              Insyte ist heute ein eingespieltes Ein-Personen-Team – und offen
              für die richtigen Köpfe.
            </p>
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 font-display font-bold text-gruen hover:brightness-110 transition"
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
              <p className="font-display font-bold text-h3 text-wald">
                {stat.value}
              </p>
              <p className="label-mono mt-2 text-erde/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-wald py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display font-bold text-h2 text-white mb-9">
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
