'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { type Project } from '@/lib/projects'

const LINK_PILL =
  'inline-flex items-center gap-2 rounded-full border border-leinen bg-white px-4 py-2 text-sm font-medium text-wald transition-colors hover:border-gruen/40 hover:text-gruen'

function ExternalIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E7D4F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="#2E7D4F"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

function TimelineNav({
  projects,
  activeId,
}: {
  projects: Project[]
  activeId: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  // The line "runs" down; each event pops in as the line reaches it.
  const seg = 0.32
  const lineDuration = Math.max(0.6, projects.length * seg)

  return (
    <ol ref={ref} className="relative">
      {/* axis line draws from top to bottom */}
      <motion.span
        className="absolute left-[5px] top-3 bottom-3 w-px origin-top bg-leinen"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: lineDuration, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      {projects.map((project, i) => {
        const active = project.id === activeId
        return (
          <motion.li
            key={project.id}
            className="relative pl-9"
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: i * seg }}
          >
            <a href={`#${project.id}`} className="group block py-4">
              {/* dot pops in with the line */}
              <motion.span
                className={`absolute left-0 top-[1.6rem] h-[11px] w-[11px] -translate-y-1/2 rounded-full border transition-colors duration-300 ${
                  active
                    ? 'border-gruen bg-gruen'
                    : 'border-leinen bg-sand group-hover:border-gruen'
                }`}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  duration: 0.3,
                  ease: 'backOut',
                  delay: i * seg + 0.08,
                }}
                aria-hidden="true"
              />
              <span className="label-mono block text-erde/40 tabular-nums">
                {project.year}
              </span>
              <span
                className={`block font-display font-bold leading-tight tracking-tight transition-colors duration-300 ${
                  active ? 'text-wald' : 'text-erde/40 group-hover:text-erde'
                }`}
              >
                {project.name}
              </span>
            </a>
          </motion.li>
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
        <span className="font-display font-bold text-stat tabular-nums text-leinen">
          {project.year}
        </span>
        <span className="label-mono text-gruen">
          {project.category}
        </span>
      </div>

      <h3 className="font-display font-bold text-h3 text-wald mb-2">
        {project.name}
      </h3>
      <p className="text-erde text-base mb-5">{project.type}</p>

      <p className="text-erde text-base leading-relaxed max-w-xl">
        {project.description}
      </p>

      {project.result && (
        <p className="mt-5 max-w-xl font-display font-bold text-wald leading-snug">
          {project.result}
        </p>
      )}

      <div className="mt-7">
        <span className="label-mono text-erde/50">
          {project.tags.join(' · ')}
        </span>
      </div>

      {(project.liveUrl || project.repoUrl) && (
        <div className="mt-7 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_PILL}
            >
              <ExternalIcon />
              Website ansehen
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_PILL}
            >
              <GithubIcon />
              GitHub
            </a>
          )}
        </div>
      )}
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
          <p className="label-mono mb-6 text-erde/40">
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
