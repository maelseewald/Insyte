'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// Karussell auf Basis von CSS Scroll-Snap: auf Touch wischbar, am Desktop
// über die beiden Schaltflächen, mit der Tastatur über die Pfeiltasten
// (die Spur ist fokussierbar). Keine Library, kein Timer — das Tempo
// bestimmt der Leser.
//
// Styling in globals.css unter .snap-row / .car-*.

export default function Carousel({
  children,
  label,
}: {
  children: React.ReactNode
  /** Beschreibt die Spur für Screenreader, z. B. "Anwendungsfälle". */
  label: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0)

  // Welche Karte steht der Spurmitte am nächsten? Gemessen statt aus der
  // Scrollposition hochgerechnet — beim zentrierten Snapping stimmt eine
  // simple Division durch die Schrittweite an den Rändern nicht.
  const currentIndex = (el: HTMLDivElement) => {
    const mitte = el.getBoundingClientRect().left + el.clientWidth / 2
    let beste = 0
    let kleinsterAbstand = Infinity
    Array.from(el.children).forEach((kind, i) => {
      const r = (kind as HTMLElement).getBoundingClientRect()
      const abstand = Math.abs(r.left + r.width / 2 - mitte)
      if (abstand < kleinsterAbstand) {
        kleinsterAbstand = abstand
        beste = i
      }
    })
    return beste
  }

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const aktiv = currentIndex(el)
    setIndex(aktiv)
    setCount(el.children.length)
    // Direkt am DOM statt über React: das läuft bei jedem Scroll-Event und
    // soll kein Rendern der Karten auslösen.
    Array.from(el.children).forEach((kind, i) =>
      kind.classList.toggle('is-current', i === aktiv)
    )
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  // Zielposition exakt ausrechnen statt blind zu verschieben: bei
  // `scroll-snap-type: mandatory` zieht die Snap-Mechanik eine Bewegung, die
  // zwischen zwei Snap-Punkten endet, wieder zurück — ein pauschales
  // scrollBy landet dann sichtbar nirgendwo.
  //
  // Bewusst kein scrollIntoView: das scrollt auch die Vorfahren und würde
  // die Seite vertikal verspringen lassen.
  const go = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    // Läuft rundherum: hinter der letzten Karte kommt wieder die erste.
    const anzahl = el.children.length
    const ziel = (currentIndex(el) + direction + anzahl) % anzahl
    const karte = el.children[ziel] as HTMLElement
    const versatz =
      karte.getBoundingClientRect().left - el.getBoundingClientRect().left
    const zentriert = versatz - (el.clientWidth - karte.offsetWidth) / 2
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({
      left: el.scrollLeft + zentriert,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  return (
    <div>
      <div className="mb-7 flex items-center justify-between gap-6">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Vorherige Karte"
            className="car-btn"
          >
            <Arrow direction="left" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Nächste Karte"
            className="car-btn"
          >
            <Arrow direction="right" />
          </button>
        </div>

        {/* Fortschritt: eine Strecke je Karte, die aktuelle ausgefüllt.
            Rein dekorativ — die Position ergibt sich für Screenreader aus
            der Spur selbst. */}
        <div className="car-progress" aria-hidden="true">
          {Array.from({ length: count }).map((_, i) => (
            <span key={i} className={i === index ? 'is-active' : undefined} />
          ))}
        </div>
      </div>

      <div
        ref={trackRef}
        className="snap-row"
        tabIndex={0}
        role="group"
        aria-label={label}
      >
        {children}
      </div>
    </div>
  )
}

function Arrow({ direction }: { direction: 'left' | 'right' }) {
  return (
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
      style={direction === 'left' ? { transform: 'rotate(180deg)' } : undefined}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
