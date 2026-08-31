'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import BriefSzene, {
  SENDE_ABLAUF,
  type Phase,
} from '@/components/kontakt/BriefSzene'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const INPUT_CLASS =
  'w-full bg-sand/10 border border-sand/20 rounded-lg px-4 py-3 text-sand placeholder:text-sand/40 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gruen transition-colors'

const TOPICS = [
  'Website',
  'Web-App / Software',
  'Wartung & Support',
  'Bewerbung / Job',
  'Allgemeine Anfrage',
]

export default function Kontakt() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  })
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  // Was die Szene links gerade zeigt. Der Fokus im Formular steuert
  // sie: Absenderfelder zeigen das Couvert, die Nachricht den Brief.
  const [phase, setPhase] = useState<Phase>('couvert')
  // Zweite Stufe des Sendens: das Formular ist weg, der Brief steht
  // allein in der Mitte. Getrennt von `phase`, weil es später
  // einsetzt — mitten in der Drehung.
  const [alleinstehend, setAlleinstehend] = useState(false)
  // Höhe des Rasters im Moment des Absendens. Ohne sie schrumpft der
  // Abschnitt, sobald das Formular verschwindet, und die Seite ruckt
  // unter dem Finger nach oben.
  const [hoehe, setHoehe] = useState<number>()

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const ohneBewegung = useReducedMotion() ?? false

  const gesendet = state === 'success'

  useEffect(() => {
    if (!gesendet) return
    if (ohneBewegung) {
      setAlleinstehend(true)
      return
    }
    // Der Umzug in die Mitte läuft mit der Schlussdrehung mit.
    const t = setTimeout(() => setAlleinstehend(true), SENDE_ABLAUF.umzug * 1000)
    return () => clearTimeout(t)
  }, [gesendet, ohneBewegung])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = (await res.json()) as { success?: boolean; error?: string }

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? 'Unbekannter Fehler.')
      }

      // Erst jetzt versiegeln — bei einem Fehler bliebe das Couvert
      // sonst zu, obwohl nichts angekommen ist.
      setHoehe(ref.current?.offsetHeight)
      setState('success')
      setPhase('gesendet')
    } catch (err) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Fehler beim Senden.')
    }
  }

  return (
    <section id="kontakt" className="bg-wald py-16 md:py-24 px-6">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        style={{ minHeight: hoehe }}
        className={`mx-auto grid max-w-5xl gap-14 md:gap-16 ${
          alleinstehend ? 'place-items-center' : 'items-start md:grid-cols-2'
        }`}
      >
        {/* Links — nach dem Senden allein in der Mitte: das Couvert,
            das mitschreibt */}
        <motion.div
          variants={fadeInUp}
          className={
            alleinstehend
              ? 'flex w-full flex-col items-center'
              : 'md:sticky md:top-28'
          }
        >
          {/* `layout="position"` schiebt die Szene von der linken Spalte
              in die Mitte, ohne sie dabei zu verzerren — die Breite darf
              springen, die Position nicht.

              `w-full max-w-[30rem]` ist nicht Kosmetik: die Bühne ist
              `width: 100%`, und sobald die Spalte oben auf zentriertes
              Flex umschaltet, zöge sich dieser Wrapper sonst auf seinen
              Inhalt zusammen — 100% von „so breit wie der Inhalt" löst
              sich zu 0 auf und das Couvert verschwindet. */}
          <motion.div
            layout="position"
            className="w-full max-w-[30rem]"
            transition={
              ohneBewegung
                ? { duration: 0 }
                : { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
            }
          >
            <BriefSzene
              phase={phase}
              onPhase={setPhase}
              name={form.name}
              email={form.email}
              betreff={form.topic}
              nachricht={form.message}
            />
          </motion.div>

          {gesendet && (
            <p role="status" className="mt-10 max-w-sm text-center text-salbei">
              Unterwegs. Wir antworten innerhalb von 24 Stunden.
            </p>
          )}
        </motion.div>

        {/* Rechts: das Formular. Blendet beim Senden weg und fällt eine
            Sekunde später per `hidden` aus dem Raster — dann rückt der
            Brief nach.

            Bewusst `hidden` statt Ausbauen: nähme man die Spalte aus dem
            DOM, änderte sich die Kinderzahl des Stagger-Containers und
            framer liesse die Einblendung der linken Spalte neu laufen —
            ein Flackern genau in dem Moment, in dem der Brief ruhig in
            die Mitte ziehen soll. */}
        <div
          className={`transition-opacity duration-500 ${
            alleinstehend
              ? 'hidden'
              : gesendet
                ? 'pointer-events-none opacity-0'
                : 'opacity-100'
          }`}
        >
          <motion.form
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
          >
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-sand/60 mb-1.5"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Dein Name"
                value={form.name}
                onFocus={() => setPhase('couvert')}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-sand/60 mb-1.5"
              >
                E-Mail
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="deine@email.ch"
                value={form.email}
                onFocus={() => setPhase('couvert')}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label
                htmlFor="topic"
                className="block text-xs font-medium text-sand/60 mb-1.5"
              >
                Anliegen
              </label>
              <div className="relative">
                <select
                  id="topic"
                  required
                  value={form.topic}
                  onFocus={() => setPhase('couvert')}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, topic: e.target.value }))
                  }
                  className={`${INPUT_CLASS} appearance-none pr-10 ${
                    form.topic ? 'text-sand' : 'text-sand/40'
                  }`}
                >
                  <option value="" disabled className="text-erde">
                    Bitte auswählen…
                  </option>
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic} className="text-erde">
                      {topic}
                    </option>
                  ))}
                </select>
                {/* chevron */}
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sand/50">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium text-sand/60 mb-1.5"
              >
                Nachricht
              </label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="Worum geht es? Kurze Beschreibung reicht."
                value={form.message}
                onFocus={() => setPhase('brief')}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className={`${INPUT_CLASS} resize-none`}
              />
            </div>

            {state === 'error' && (
              <p className="text-red-400 text-sm" role="alert">
                {errorMsg ||
                  'Etwas hat nicht geklappt. Schreib uns direkt an info@insyte.ch'}
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'loading'}
              className="btn-primary w-full text-center py-3.5 disabled:opacity-60"
            >
              {state === 'loading' ? 'Wird gesendet…' : 'Brief abschicken'}
            </button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  )
}
