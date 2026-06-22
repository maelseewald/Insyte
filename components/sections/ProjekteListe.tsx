'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

type Project = {
  name: string
  type: string
  description: string
  tags: string[]
  year: string
}

const GROUPS: { title: string; projects: Project[] }[] = [
  {
    title: 'Websites & Online-Präsenz',
    projects: [
      {
        name: 'Restaurant Adria',
        type: 'Website Relaunch',
        description:
          'Neuer Webauftritt mit digitaler Speisekarte und Tischreservation – mobil-optimiert und in zwei Sprachen.',
        tags: ['Next.js', 'Design'],
        year: '2024',
      },
      {
        name: 'Bäckerei Wyss',
        type: 'Website & Onlineshop',
        description:
          'Vorbestellung von Brot und Patisserie mit Abholzeiten, angebunden an die bestehende Kasse.',
        tags: ['Website', 'E-Commerce'],
        year: '2023',
      },
      {
        name: 'Blumenatelier Lea',
        type: 'Online-Präsenz',
        description:
          'Ein ruhiger, bildstarker Auftritt mit Pflege-Tipps, den Lea selbst über ein CMS aktuell hält.',
        tags: ['Website', 'CMS'],
        year: '2023',
      },
      {
        name: 'Hofladen Bühler',
        type: 'Website & Hofshop',
        description:
          'Saisonales Sortiment mit Selbstbedienungs-Shop und Wochen-Abo direkt vom Hof.',
        tags: ['Website', 'CMS'],
        year: '2022',
      },
    ],
  },
  {
    title: 'Software & Tools',
    projects: [
      {
        name: 'Schreinerei Brunner',
        type: 'Auftragsmanagement',
        description:
          'Vom Anfrageformular bis zur Rechnung: alle Aufträge an einem Ort, inklusive Material- und Terminplanung.',
        tags: ['Software', 'React'],
        year: '2024',
      },
      {
        name: 'Garage Steffen',
        type: 'Termin- & Offert-Tool',
        description:
          'Kunden buchen Service-Termine online, das Team erstellt Offerten in Minuten statt Stunden.',
        tags: ['Software', 'Web-App'],
        year: '2024',
      },
      {
        name: 'Physiopraxis Aare',
        type: 'Buchungssystem',
        description:
          'Selbstständige Terminbuchung mit automatischen Erinnerungen – weniger Ausfälle, weniger Telefonate.',
        tags: ['Software', 'Buchung'],
        year: '2023',
      },
      {
        name: 'Treuhand Meier',
        type: 'Kundenportal',
        description:
          'Sicherer Dokumenten-Austausch und Fristen-Übersicht für Mandanten – DSG-konform und übersichtlich.',
        tags: ['Software', 'Portal'],
        year: '2022',
      },
    ],
  },
]

function ProjectCards({ projects }: { projects: Project[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="grid sm:grid-cols-2 gap-5"
    >
      {projects.map((project) => (
        <motion.article
          key={project.name}
          variants={fadeInUp}
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="group relative flex flex-col overflow-hidden bg-white border border-leinen rounded-xl p-7 hover:border-gruen/30 hover:shadow-[0_14px_36px_-14px_rgba(26,38,22,0.2)] transition-[border-color,box-shadow] duration-200"
        >
          {/* top accent on hover */}
          <span
            className="absolute top-0 left-0 h-0.5 w-0 bg-gruen transition-all duration-500 ease-out group-hover:w-full"
            aria-hidden="true"
          />

          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="font-jakarta font-bold text-[22px] leading-tight tracking-tight text-wald mb-1.5">
                {project.name}
              </h3>
              <p className="text-gruen text-[11px] font-semibold uppercase tracking-[0.16em]">
                {project.type}
              </p>
            </div>
            <span className="shrink-0 text-leinen text-sm tabular-nums">
              {project.year}
            </span>
          </div>

          <p className="text-erde/80 text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          <span className="mt-auto text-[11px] uppercase tracking-[0.16em] text-erde/50">
            {project.tags.join(' · ')}
          </span>
        </motion.article>
      ))}
    </motion.div>
  )
}

export default function ProjekteListe() {
  return (
    <>
      {/* Header */}
      <section className="bg-sand pt-40 pb-20 px-6">
        <div className="mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gruen text-xs font-semibold uppercase tracking-[0.2em] mb-5"
          >
            Projekte · Insyte
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-jakarta font-bold text-[clamp(36px,5.5vw,60px)] leading-[1.04] tracking-tight text-wald mb-7 max-w-3xl"
          >
            Arbeiten für lokale Unternehmen.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-erde text-lg leading-relaxed max-w-xl"
          >
            Eine Auswahl aus Web- und Softwareprojekten für KMUs in der Schweiz.
            Jedes davon mit einem festen Ansprechpartner umgesetzt – von der
            ersten Idee bis zum laufenden Betrieb.
          </motion.p>
        </div>
      </section>

      {/* Grouped indexes */}
      <section className="bg-sand pb-8 px-6">
        <div className="mx-auto max-w-5xl flex flex-col gap-20">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <div className="flex items-baseline justify-between mb-8">
                <h2 className="font-jakarta font-bold text-[clamp(20px,2.4vw,26px)] tracking-tight text-wald">
                  {group.title}
                </h2>
                <span className="font-jakarta font-bold text-leinen text-sm tabular-nums">
                  {String(group.projects.length).padStart(2, '0')}
                </span>
              </div>
              <ProjectCards projects={group.projects} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-wald py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-jakarta font-bold text-[clamp(28px,3.4vw,40px)] leading-tight tracking-tight text-white mb-5">
            Dein Projekt als Nächstes?
          </h2>
          <p className="text-sand/70 text-base mb-9">
            Erzähl mir von deinem Vorhaben – ich melde mich innerhalb von 24
            Stunden.
          </p>
          <Link href="/#kontakt" className="btn-primary">
            Projekt starten
          </Link>
        </div>
      </section>
    </>
  )
}
