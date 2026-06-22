'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const PROJECTS = [
  {
    name: 'Restaurant Adria',
    type: 'Website Relaunch',
    tags: ['Next.js', 'Design'],
    year: '2024',
  },
  {
    name: 'Schreinerei Brunner',
    type: 'Auftragsmanagement',
    tags: ['Software', 'React'],
    year: '2024',
  },
  {
    name: 'Blumenatelier Lea',
    type: 'Online-Präsenz',
    tags: ['Website', 'CMS'],
    year: '2023',
  },
]

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="portfolio" className="scroll-mt-16 bg-white py-28 px-6 border-t border-leinen">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="mx-auto max-w-5xl"
      >
        <motion.div
          variants={fadeInUp}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <p className="text-gruen text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Ausgewählte Projekte
            </p>
            <h2 className="font-jakarta font-bold text-[clamp(32px,4vw,46px)] leading-[1.08] tracking-tight text-wald">
              Werk-Index
            </h2>
          </div>
          <span className="hidden sm:block font-jakarta font-bold text-leinen text-sm tabular-nums">
            03 Projekte
          </span>
        </motion.div>

        <ol>
          {PROJECTS.map((project, i) => (
            <motion.li
              key={project.name}
              variants={fadeInUp}
              className="group relative border-t border-leinen last:border-b"
            >
              {/* hover wash */}
              <span
                className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-salbei/40 transition-transform duration-500 ease-out group-hover:scale-x-100"
                aria-hidden="true"
              />
              <div className="relative grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] items-baseline gap-x-5 md:gap-x-10 gap-y-1 py-8 md:py-9">
                {/* index */}
                <span className="font-jakarta font-bold text-lg tabular-nums text-leinen transition-colors duration-300 group-hover:text-gruen">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* name + type */}
                <div className="md:flex md:items-baseline md:gap-4">
                  <h3 className="font-jakarta font-bold text-[clamp(22px,2.8vw,32px)] leading-tight tracking-tight text-wald">
                    {project.name}
                  </h3>
                  <span className="block md:inline text-erde text-sm mt-0.5 md:mt-0">
                    {project.type}
                  </span>
                </div>

                {/* meta */}
                <div className="col-start-2 md:col-start-3 flex items-center gap-3 mt-2 md:mt-0">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-erde/60">
                    {project.tags.join(' · ')}
                  </span>
                  <span className="text-leinen text-sm tabular-nums">
                    {project.year}
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.p
          variants={fadeInUp}
          className="mt-10 text-sm text-erde/50"
        >
          Weitere Projekte auf Anfrage.
        </motion.p>
      </motion.div>
    </section>
  )
}
