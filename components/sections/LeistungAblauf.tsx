'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { type Schritt } from '@/lib/leistungen'

/**
 * Der Ablauf einer Leistung als Zeitstrahl, der sich Schritt für Schritt
 * aufbaut: Ein Schritt erscheint von unten, danach zeichnet sich die Linie
 * bis zum nächsten, dann erscheint dieser, und so weiter bis unten.
 *
 * Das ist hier kein Effekt um seiner selbst willen. Der Ablauf hat
 * tatsächlich eine Reihenfolge, und die Animation zeigt sie in genau dem
 * Tempo, in dem man sie liest.
 *
 * Aufbau: Jeder Eintrag hat links eine eigene Spalte, die so hoch wird wie
 * sein Text. Darin sitzt der Punkt zwischen zwei mitwachsenden Segmenten,
 * womit er immer auf halber Texthöhe steht, egal wie lang der Text ist.
 * Beim ersten und letzten Eintrag bleibt das äussere Segment als Abstand
 * stehen, nur ohne Farbe. Ohne diesen Platzhalter rutschte der Punkt dort
 * nach oben beziehungsweise unten.
 *
 * Eine Verbindung besteht deshalb aus zwei Hälften: dem unteren Segment des
 * einen Eintrags und dem oberen des nächsten. Sie laufen nacheinander, damit
 * daraus eine durchgehende Bewegung wird.
 *
 * Ein Schritt mit `optional` gehört nicht zum Auftrag. Die Verbindung, die
 * zu ihm führt, ist gestrichelt, und sein Punkt ebenso.
 *
 * Aufgedeckt wird über `clipPath` statt `scaleY`: Beim Skalieren würde das
 * Strichmuster der gestrichelten Linie mitgestaucht und sähe während der
 * Bewegung falsch aus. `clipPath` schiebt nur die Kante nach unten und lässt
 * das Muster in Ruhe.
 *
 * Muster nach docs/design-standards.md §7: useInView mit once und -80px.
 * Statt staggerContainer laufen eigene Verzögerungen, weil sich Linie und
 * Schritt abwechseln müssen statt gleichmässig zu staffeln.
 *
 * Eigener Client-Baustein, damit die Leistungsseite drumherum eine
 * Server-Komponente bleibt.
 */

/** Sekunden, die ein Schritt zum Einblenden braucht. */
const SCHRITT = 0.26
/** Sekunden für eine ganze Verbindung, also beide Hälften zusammen. */
const STRICH = 0.26

const ZU = 'inset(0 0 100% 0)'
const AUF = 'inset(0 0 0% 0)'

export default function LeistungAblauf({ schritte }: { schritte: Schritt[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const wenigerBewegung = useReducedMotion()

  // Ohne Bewegung steht alles sofort da, statt nacheinander zu erscheinen.
  const takt = (n: number) => (wenigerBewegung ? 0 : n)

  /** Wann Eintrag i erscheint. */
  const schrittAb = (i: number) => i * (SCHRITT + STRICH)
  /** Wann die Verbindung von i nach i+1 beginnt. */
  const strichAb = (i: number) => schrittAb(i) + SCHRITT

  /** Eine Hälfte der Verbindung. `gestrichelt` markiert den optionalen Weg. */
  const Segment = ({
    verzoegerung,
    gestrichelt,
  }: {
    verzoegerung: number
    gestrichelt: boolean
  }) => (
    <>
      <span
        className={`absolute inset-0 text-leinen ${
          gestrichelt ? 'ablauf-gestrichelt' : 'bg-leinen'
        }`}
      />
      <motion.span
        className={`absolute inset-0 text-gruen ${
          gestrichelt ? 'ablauf-gestrichelt' : 'bg-gruen'
        }`}
        initial={{ clipPath: ZU }}
        animate={isInView ? { clipPath: AUF } : { clipPath: ZU }}
        transition={{
          duration: takt(STRICH / 2),
          delay: takt(verzoegerung),
          ease: 'linear',
        }}
      />
    </>
  )

  return (
    <ol ref={ref} className="flex flex-col list-none p-0 m-0">
      {schritte.map((schritt, i) => {
        const letzter = i === schritte.length - 1
        // Gestrichelt ist die Verbindung, die in einen optionalen Schritt führt.
        const obenGestrichelt = Boolean(schritt.optional)
        const untenGestrichelt = Boolean(schritte[i + 1]?.optional)

        return (
          <li key={schritt.titel} className="flex gap-5">
            {/* Linienspalte, so hoch wie der Text daneben */}
            <div className="relative flex w-10 shrink-0 flex-col items-center">
              <span className="relative w-px flex-1" aria-hidden="true">
                {i > 0 && (
                  <Segment
                    verzoegerung={strichAb(i - 1) + STRICH / 2}
                    gestrichelt={obenGestrichelt}
                  />
                )}
              </span>

              <motion.span
                /* bg-sand, damit der Punkt die Linie verdeckt statt von ihr
                   durchkreuzt zu werden. */
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand border border-gruen ${
                  schritt.optional ? 'border-dashed' : ''
                }`}
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.7 }
                }
                transition={{
                  duration: takt(SCHRITT),
                  delay: takt(schrittAb(i)),
                  ease: 'easeOut',
                }}
              >
                <span className="label-mono text-gruen tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.span>

              <span className="relative w-px flex-1" aria-hidden="true">
                {!letzter && (
                  <Segment
                    verzoegerung={strichAb(i)}
                    gestrichelt={untenGestrichelt}
                  />
                )}
              </span>
            </div>

            <motion.div
              className={letzter ? '' : 'pb-9'}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: takt(SCHRITT),
                delay: takt(schrittAb(i)),
                ease: 'easeOut',
              }}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                <h3 className="font-display font-bold text-h3 text-wald">
                  {schritt.titel}
                </h3>
                {schritt.optional && (
                  <span className="label-mono rounded-full border border-dashed border-gruen/50 px-2.5 py-0.5 text-gruen">
                    optional
                  </span>
                )}
              </div>

              <p className="text-erde text-base leading-relaxed">
                {schritt.text}
              </p>

              {schritt.link && (
                <Link
                  href={schritt.link.href}
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-gruen"
                >
                  {schritt.link.text}
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              )}
            </motion.div>
          </li>
        )
      })}
    </ol>
  )
}
