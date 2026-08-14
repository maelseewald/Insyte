import PaintedWord from './PaintedWord'

export type TypewriterSegment = {
  text: string
  /** Wird als Marker-Akzent gesetzt (Permanent Marker, leicht schräg). */
  painted?: boolean
}

const STEP = 0.012 // Sekunden pro Zeichen

// Tippt Text zeichenweise — aber ohne Zeichen nachwachsen zu lassen: der
// vollständige Satz steht immer im DOM, die Zeichen werden nur einzeln von
// opacity 0 auf 1 geschaltet. Das hält das Layout stabil (die Überschrift hat
// von Anfang an ihre Endhöhe, nichts springt) und lässt den Text für
// Crawler und Screenreader unangetastet.
//
// Die Animation läuft über CSS-Keyframes statt framer-motion: bei ~70 Zeichen
// wären das ebenso viele motion-Nodes, und ohne JS bliebe der Text unsichtbar.
export default function Typewriter({
  segments,
  startDelay = 0,
}: {
  segments: TypewriterSegment[]
  /** Sekunden, bis das erste Zeichen erscheint. */
  startDelay?: number
}) {
  let index = 0

  return (
    <>
      {segments.map((segment, segmentIndex) => {
        const chars = Array.from(segment.text)
        const start = index
        index += chars.length

        const typed = chars.map((char, i) => (
          <span
            key={i}
            className="ty-char"
            style={{ animationDelay: `${startDelay + (start + i) * STEP}s` }}
          >
            {char}
          </span>
        ))

        if (!segment.painted) {
          return <span key={segmentIndex}>{typed}</span>
        }

        // Die Zeichen darin tippen sich normal mit — der Akzent ist eine
        // Frage der Schrift, nicht der Animation.
        return <PaintedWord key={segmentIndex}>{typed}</PaintedWord>
      })}
    </>
  )
}
