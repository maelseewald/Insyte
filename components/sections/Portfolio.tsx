'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const PROJECTS = [
  {
    title: 'Restaurant Adria – Website Relaunch',
    tags: ['Next.js', 'Design'],
    thumbClass: 'from-wald to-[#2d4a2a]',
    thumbLabel: 'RESTAURANT ADRIA',
  },
  {
    title: 'Schreinerei Brunner – Auftragsmanagement',
    tags: ['Software', 'React'],
    thumbClass: 'from-[#2e4a3e] to-gruen',
    thumbLabel: 'SCHREINEREI BRUNNER',
  },
  {
    title: 'Blumenatelier Lea – Online-Präsenz',
    tags: ['Website', 'CMS'],
    thumbClass: 'from-[#3a3228] to-erde',
    thumbLabel: 'BLUMENATELIER LEA',
  },
]

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="portfolio"
      className="bg-white py-24 px-6 border-t border-leinen"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="mx-auto max-w-6xl"
      >
        <motion.p
          variants={fadeInUp}
          className="text-gruen text-xs font-semibold uppercase tracking-widest mb-3"
        >
          Referenzen
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="font-jakarta font-bold text-[40px] leading-tight tracking-tight text-wald mb-14"
        >
          Ausgewählte Projekte
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-5">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeInUp}
              className="bg-white border border-leinen rounded-xl overflow-hidden hover:border-gruen/30 transition-colors duration-200"
            >
              {/* Placeholder thumb */}
              <div
                className={`h-44 bg-gradient-to-br ${project.thumbClass} flex items-center justify-center`}
              >
                <span className="text-white/50 text-xs font-semibold tracking-widest font-jakarta">
                  {project.thumbLabel}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-jakarta font-bold text-[15px] text-wald mb-3 leading-snug">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-salbei text-gruen text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={fadeInUp}
          className="mt-8 text-leinen text-sm"
        >
          Alle Projekte →
        </motion.p>
      </motion.div>
    </section>
  )
}
