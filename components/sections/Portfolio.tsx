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
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group bg-white border border-leinen rounded-xl overflow-hidden hover:border-gruen/30 hover:shadow-[0_12px_32px_-12px_rgba(26,38,22,0.22)] transition-[border-color,box-shadow] duration-200"
            >
              {/* Placeholder thumb */}
              <div className="h-44 overflow-hidden">
                <div
                  className={`h-full w-full bg-gradient-to-br ${project.thumbClass} flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105`}
                >
                  <span className="text-white/50 text-xs font-semibold tracking-widest font-jakarta">
                    {project.thumbLabel}
                  </span>
                </div>
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

        <motion.p variants={fadeInUp} className="mt-8">
          <span className="group inline-flex items-center gap-1.5 text-leinen text-sm cursor-default">
            Alle Projekte
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </motion.p>
      </motion.div>
    </section>
  )
}
