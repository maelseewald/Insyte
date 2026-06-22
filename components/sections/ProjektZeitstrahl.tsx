'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { projectsByNewest, type Project } from '@/lib/projects'

function TimelineNav({ activeId }: { activeId: string }) {
  return (
    <ol className="relative">
      {/* axis */}
      <span
        className="absolute left-[5px] top-3 bottom-3 w-px bg-leinen"
        aria-hidden="true"
      />
      {projectsByNewest.map((project) => {
        const active = project.id === activeId
        return (
          <li key={project.id} className="relative pl-9">
            <a href={`#${project.id}`} className="group block py-4">
              {/* dot */}
              <span
                className={`absolute left-0 top-[1.6rem] h-[11px] w-[11px] -translate-y-1/2 rounded-full border transition-all duration-300 ${
                  active
                    ? 'border-gruen bg-gruen scale-110'
                    : 'border-leinen bg-sand group-hover:border-gruen'
                }`}
                aria-hidden="true"
              />
              <span className="block text-[11px] uppercase tracking-[0.16em] text-erde/40 tabular-nums">
                {project.year}
              </span>
              <span
                className={`block font-jakarta font-bold leading-tight tracking-tight transition-colors duration-300 ${
                  active
                    ? 'text-wald'
                    : 'text-erde/40 group-hover:text-erde'
                }`}
              >
                {project.name}
              </span>
            </a>
          </li>
        )
      })}
    </ol>
  )
}

function DetailBlock({
  project,
  onActive,
  isActive,
}: {
  project: Project
  onActive: (id: string) => void
  isActive: boolean
}) {
  const ref = useRef(null)
  // Only the block crossing the vertical centre of the viewport counts.
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })

  useEffect(() => {
    if (inView) onActive(project.id)
  }, [inView, project.id, onActive])

  return (
    <article
      ref={ref}
      id={project.id}
      className={`scroll-mt-28 flex min-h-[70vh] flex-col justify-center border-t border-leinen py-12 transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-30'
      }`}
    >
      <div className="flex items-baseline gap-4 mb-3">
        <span className="font-jakarta font-bold text-[clamp(44px,7vw,76px)] leading-none tabular-nums text-leinen">
          {project.year}
        </span>
        <span className="text-gruen text-[11px] font-semibold uppercase tracking-[0.18em]">
          {project.category}
        </span>
      </div>

      <h3 className="font-jakarta font-bold text-[clamp(28px,3.6vw,42px)] leading-tight tracking-tight text-wald mb-2">
        {project.name}
      </h3>
      <p className="text-erde text-base mb-5">{project.type}</p>

      <p className="text-erde text-base leading-relaxed max-w-xl">
        {project.description}
      </p>

      <p className="mt-5 max-w-xl font-jakarta font-bold text-wald leading-snug">
        {project.result}
      </p>

      <div className="mt-7">
        <span className="text-[11px] uppercase tracking-[0.16em] text-erde/50">
          {project.tags.join(' · ')}
        </span>
      </div>
    </article>
  )
}

export default function ProjektZeitstrahl() {
  const [activeId, setActiveId] = useState(projectsByNewest[0].id)

  return (
    <>
      {/* Header */}
      <section className="bg-sand pt-40 pb-16 px-6">
        <div className="mx-auto max-w-6xl">
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
            Arbeiten für lokale Unternehmen – Jahr für Jahr.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-erde text-lg leading-relaxed max-w-xl"
          >
            Scroll dich durch die Zeitachse – links die Projekte, rechts die
            Details zu jedem einzelnen.
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-sand pb-12 px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[260px_1fr] md:gap-16">
          {/* Left: sticky nav */}
          <div className="hidden md:block">
            <div className="sticky top-28">
              <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-erde/40">
                Zeitachse
              </p>
              <TimelineNav activeId={activeId} />
            </div>
          </div>

          {/* Right: scrolling details */}
          <div>
            {projectsByNewest.map((project) => (
              <DetailBlock
                key={project.id}
                project={project}
                onActive={setActiveId}
                isActive={project.id === activeId}
              />
            ))}
          </div>
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
