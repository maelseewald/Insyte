'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { projectsByNewest } from '@/lib/projects'
import ProjectTimeline from '@/components/sections/ProjectTimeline'

export default function ProjektZeitstrahl() {
  return (
    <>
      {/* Header */}
      <section className="bg-sand pt-40 pb-16 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-mono text-gruen mb-5"
          >
            Projekte
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-bold text-h1 text-wald mb-7 max-w-3xl"
          >
            Was wir bisher gebaut haben.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-erde text-lg leading-relaxed max-w-xl"
          >
            Eigene Produkte und erste Aufträge – hier siehst du, woran wir
            arbeiten.
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-sand pb-12 px-6">
        <div className="mx-auto max-w-6xl">
          <ProjectTimeline projects={projectsByNewest} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-wald py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display font-bold text-h2 text-white mb-5">
            Dein Projekt als Nächstes?
          </h2>
          <p className="text-sand/70 text-base mb-9">
            Wir sind offen für Aufträge – schreib uns und wir schauen gemeinsam,
            was möglich ist.
          </p>
          <Link href="/kontakt" className="btn-primary">
            Projekt starten
          </Link>
        </div>
      </section>
    </>
  )
}
