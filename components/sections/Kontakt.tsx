'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

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

const CONTACTS = [
  {
    label: 'E-Mail',
    value: 'info@insyte.ch',
    href: 'mailto:info@insyte.ch',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2E7D4F"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </svg>
    ),
  },
  {
    label: 'Antwortzeit',
    value: 'Innerhalb von 24 Stunden',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2E7D4F"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: 'Ansprechpartner',
    value: 'Persönlich – kein Callcenter',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2E7D4F"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 21a8 8 0 0 0-16 0" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
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

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

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

      setState('success')
      setForm({ name: '', email: '', topic: '', message: '' })
    } catch (err) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Fehler beim Senden.')
    }
  }

  return (
    <section id="kontakt" className="bg-wald py-24 px-6">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:gap-16"
      >
        {/* Left: invitation + contact details */}
        <div>
          <motion.p
            variants={fadeInUp}
            className="label-mono text-salbei/60 mb-6"
          >
            Direkt erreichbar
          </motion.p>

          <ul className="space-y-5">
            {CONTACTS.map((item) => (
              <motion.li
                key={item.label}
                variants={fadeInUp}
                className="flex items-center gap-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-salbei">
                  {item.icon}
                </span>
                <div>
                  <p className="label-mono text-sand/40">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gruen text-[15px] font-medium hover:brightness-110 transition"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sand text-[15px]">{item.value}</p>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right: form */}
        <div>
          {state === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-full flex-col justify-center rounded-xl border border-sand/15 bg-sand/[0.04] p-10 text-center text-salbei"
            >
              <p className="font-display font-bold text-2xl mb-2 text-white">
                Danke!
              </p>
              <p>
                Deine Nachricht ist angekommen! Wir melden uns innerhalb von 24
                Stunden.
              </p>
            </motion.div>
          ) : (
            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="space-y-4"
              noValidate
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-sand/60 mb-1.5"
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
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-sand/60 mb-1.5"
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
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label
                  htmlFor="topic"
                  className="block text-xs font-semibold text-sand/60 mb-1.5"
                >
                  Anliegen
                </label>
                <div className="relative">
                  <select
                    id="topic"
                    required
                    value={form.topic}
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
                  className="block text-xs font-semibold text-sand/60 mb-1.5"
                >
                  Nachricht
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Worum geht es? Kurze Beschreibung reicht."
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  className={`${INPUT_CLASS} resize-none`}
                />
              </div>

              {state === 'error' && (
                <p className="text-red-400 text-sm" role="alert">
                  {errorMsg ||
                    'Etwas hat nicht geklappt – schreib uns direkt an info@insyte.ch'}
                </p>
              )}

              <button
                type="submit"
                disabled={state === 'loading'}
                className="btn-primary w-full text-center py-3.5 disabled:opacity-60"
              >
                {state === 'loading' ? 'Wird gesendet…' : 'Nachricht senden'}
              </button>
            </motion.form>
          )}
        </div>
      </motion.div>
    </section>
  )
}
