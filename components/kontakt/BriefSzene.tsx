'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Couvert, { CouvertRueckseite } from './Couvert'
import Brief from './Brief'

export type Phase = 'couvert' | 'brief' | 'gesendet'

/**
 * Der Ablauf, und zwar in dieser Reihenfolge — ein Couvert hat vorne
 * keine Öffnung, also muss es sich erst umdrehen:
 *
 *   hin (zum Brief)      zurück (beim Senden)
 *   ──────────────       ────────────────────
 *   Drehung  0.00–0.60   Brief rein 0.00–0.50
 *   Lasche   0.45–0.80   Lasche zu  0.42–0.77
 *   Brief    0.68–1.18   Drehung    0.72–1.32
 *                        Stempel         1.38
 *
 * Die Abschnitte überlappen bewusst: die Lasche beginnt zu öffnen,
 * während die Karte noch dreht, und der Brief setzt sich in Bewegung,
 * bevor sie ganz offen ist. Sauber nacheinander dauerte es doppelt so
 * lang und sähe aus wie eine Abfolge von Einzelschritten.
 */
const DREHUNG = 0.6
const LASCHE = 0.35
const BRIEF = 0.5

/** Wann beim Senden was losgeht, in Sekunden ab dem Klick. */
export const SENDE_ABLAUF = { umzug: 0.72, stempel: 1.38 }

type Props = {
  phase: Phase
  onPhase: (phase: Phase) => void
  name: string
  email: string
  betreff: string
  nachricht: string
}

/** Ruhelage von Couvert und Brief. Nicht die Bühnenmitte, sondern
 *  etwas darunter: der Platz darüber ist der, in den der Brief
 *  hineinfährt und in den die Lasche aufklappt. */
const RUHE = '13%'

export default function BriefSzene({
  phase,
  onPhase,
  name,
  email,
  betreff,
  nachricht,
}: Props) {
  const ohneBewegung = useReducedMotion() ?? false
  const [gestempelt, setGestempelt] = useState(false)
  const [datum, setDatum] = useState({ lang: '', kurz: '' })

  // Erst nach dem Mount, sonst rendert der Server ein anderes Datum
  // als der Browser und React verwirft die Hydration.
  useEffect(() => {
    const heute = new Date()
    setDatum({
      lang: heute.toLocaleDateString('de-CH', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      // Zweistellig wie ein Poststempel — „16.8.2026" sähe daneben
      // aus wie ein Tippfehler.
      kurz: heute.toLocaleDateString('de-CH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    })
  }, [])

  // Der Stempel kommt erst, wenn die Karte wieder vorne liegt.
  useEffect(() => {
    if (phase !== 'gesendet') return
    if (ohneBewegung) {
      setGestempelt(true)
      return
    }
    const t = setTimeout(
      () => setGestempelt(true),
      SENDE_ABLAUF.stempel * 1000
    )
    return () => clearTimeout(t)
  }, [phase, ohneBewegung])

  const offen = phase === 'brief'
  const gesendet = phase === 'gesendet'

  // Hin fährt die Karte zuerst und der Brief zuletzt, zurück umgekehrt.
  //
  // `sichtbar` ist kein Feinschliff, sondern nötig: auf halbem Weg steht
  // die Karte hochkant und ist damit praktisch unsichtbar — der Brief
  // dahinter läge frei. Er wird deshalb aus- und eingeblendet, und zwar
  // in den Momenten, in denen er vollständig hinter der Karte steckt:
  // hin nach der Drehung (0.60) und vor dem Ausfahren (0.68), zurück
  // nach dem Einfahren (0.50) und vor der Drehung (0.72).
  const verzug = offen
    ? { drehung: 0, lasche: 0.45, brief: 0.68, ebene: 0.85, sichtbar: 0.64 }
    : { brief: 0, lasche: 0.42, drehung: 0.72, ebene: 0, sichtbar: 0.54 }

  const takt = (dauer: number, delay: number) =>
    ohneBewegung
      ? { duration: 0 }
      : { duration: dauer, delay, ease: [0.4, 0, 0.2, 1] as const }

  return (
    <div className="flex flex-col" aria-hidden="true">
      <div className="bs-buehne">
        {/* Der Brief. Liegt normalerweise hinter dem Couvert und
            kommt erst kurz nach dem Ausfahren nach vorn — sonst
            spränge er davor, statt darunter hervorzukommen. */}
        <motion.div
          className="bs-fach"
          initial={false}
          animate={{
            y: offen ? '-6%' : RUHE,
            // Auf 0.6 skaliert passt das Blatt vollständig hinter das
            // Couvert; es braucht also keine Maske, um verdeckt zu sein.
            scale: offen ? 1 : 0.6,
            opacity: offen ? 1 : 0,
            zIndex: offen ? 20 : 10,
          }}
          transition={{
            ...takt(BRIEF, verzug.brief),
            zIndex: { duration: 0.01, delay: ohneBewegung ? 0 : verzug.ebene },
            opacity: ohneBewegung
              ? { duration: 0 }
              : { duration: 0.12, delay: verzug.sichtbar },
          }}
        >
          <Brief name={name} nachricht={nachricht} datum={datum.lang} />
        </motion.div>

        {/* Das Couvert. Rutscht beim Herausziehen nach unten hinter das
            Blatt und schaut dort hervor — so bleibt sichtbar, wohin der
            Brief nachher zurückgeht. */}
        <motion.div
          className="bs-fach"
          initial={false}
          animate={{
            y: offen ? '26%' : RUHE,
            scale: offen ? 0.86 : 1,
            opacity: offen ? 0.92 : 1,
            zIndex: offen ? 10 : 20,
          }}
          transition={{
            ...takt(BRIEF, verzug.brief),
            zIndex: { duration: 0.01, delay: ohneBewegung ? 0 : verzug.ebene },
          }}
        >
          <motion.div
            className="bs-karte"
            initial={false}
            animate={{ rotateY: offen ? 180 : 0 }}
            transition={takt(DREHUNG, verzug.drehung)}
          >
            <div className="bs-seite">
              <Couvert
                name={name}
                email={email}
                betreff={betreff}
                gesendetAm={gestempelt ? datum.kurz : null}
              />
            </div>

            <div className="bs-seite bs-seite--hinten">
              <CouvertRueckseite
                offen={offen}
                transition={takt(LASCHE, verzug.lasche)}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Nach dem Senden gibt es nichts mehr umzuschalten — und übrig
          bleiben soll allein der Brief. */}
      {!gesendet && (
        <div className="bs-schalter label-mono mt-10">
          {(['couvert', 'brief'] as const).map((p) => (
            <button
              key={p}
              type="button"
              tabIndex={-1}
              aria-selected={phase === p}
              onClick={() => onPhase(p)}
            >
              {p === 'couvert' ? 'Couvert' : 'Brief'}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
