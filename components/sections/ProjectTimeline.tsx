'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { type Project } from '@/lib/projects'

function TimelineNav({
  projects,
  activeId,
}: {
  projects: Project[]
  activeId: string
}) {
  return (
    <ol className="relative">
      {/* axis */}
      <span
        className="absolute left-[5px] top-3 bottom-3 w-px bg-leinen"
        aria-hidden="true"
      />
      {projects.map((project) => {
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
                  active ? 'text-wald' : 'text-erde/40 group-hover:text-erde'
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
  blockClass,
}: {
  project: Project
  onActive: (id: string) => void
  isActive: boolean
  blockClass: string
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
      className={`scroll-mt-28 flex flex-col justify-center border-t border-leinen py-12 transition-opacity duration-500 ${blockClass} ${
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

export default function ProjectTimeline({
  projects,
  blockClass = 'min-h-[70vh]',
}: {
  projects: Project[]
  blockClass?: string
}) {
  const [activeId, setActiveId] = useState(projects[0].id)

  return (
    <div className="grid gap-10 md:grid-cols-[260px_1fr] md:gap-16">
      {/* Left: sticky nav */}
      <div className="hidden md:block">
        <div className="sticky top-28">
          <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-erde/40">
            Zeitachse
          </p>
          <TimelineNav projects={projects} activeId={activeId} />
        </div>
      </div>

      {/* Right: scrolling details */}
      <div>
        {projects.map((project) => (
          <DetailBlock
            key={project.id}
            project={project}
            onActive={setActiveId}
            isActive={project.id === activeId}
            blockClass={blockClass}
          />
        ))}
      </div>
    </div>
  )
}
