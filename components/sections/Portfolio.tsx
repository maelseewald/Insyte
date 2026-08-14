'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import { latestProjects } from '@/lib/projects'
import ProjectTimeline from '@/components/sections/ProjectTimeline'

const PROJECTS = latestProjects(3)

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="portfolio"
      className="scroll-mt-16 bg-white py-28 px-6 border-t border-leinen"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <motion.p
              variants={fadeInUp}
              className="label-mono text-gruen mb-4"
            >
              Unsere Projekte
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-display font-bold text-[clamp(32px,4vw,46px)] leading-[1.08] tracking-tight text-wald"
            >
              Was wir gebaut haben
            </motion.h2>
          </div>
          <motion.span
            variants={fadeInUp}
            className="hidden sm:block font-display font-bold text-leinen text-sm tabular-nums"
          >
            Zeitachse
          </motion.span>
        </motion.div>

        <ProjectTimeline projects={PROJECTS} blockClass="min-h-[52vh]" />

        <div className="mt-12">
          <Link
            href="/projekte"
            className="group inline-flex items-center gap-2 font-display font-bold text-wald hover:text-gruen transition-colors"
          >
            Alle Projekte ansehen
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
