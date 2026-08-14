import PaintedWord from './PaintedWord'

export type TypewriterSegment = {
  text: string
  /** Wird als Marker-Akzent gesetzt (Permanent Marker, leicht schräg). */
  painted?: boolean
  /** Zeichenweise schreiben. Ohne das steht das Segment sofort da. */
  typed?: boolean
}

// Schreibt einzelne Segmente zeichenweise — aber ohne Zeichen nachwachsen zu
// lassen: der vollständige Text steht immer im DOM, die Zeichen werden nur
// einzeln von opacity 0 auf 1 geschaltet. Das hält das Layout stabil (die
// Überschrift hat von Anfang an ihre Endhöhe, nichts springt) und lässt den
// Text für Crawler und Screenreader unangetastet.
//
// Die Animation läuft über CSS-Keyframes statt framer-motion: das wären sonst
// ebenso viele motion-Nodes wie Zeichen, und ohne JS bliebe der Text unsichtbar.
export default function Typewriter({
  segments,
  startDelay = 0,
  step = 0.055,
}: {
  segments: TypewriterSegment[]
  /** Sekunden, bis das erste Zeichen erscheint. */
  startDelay?: number
  /** Sekunden pro Zeichen. Kurze Akzente brauchen mehr, sonst sieht man nichts. */
  step?: number
}) {
  // Nur getippte Zeichen zählen mit — sonst entstünde eine Pause in der
  // Länge des Textes, der gar nicht animiert wird.
  let index = 0

  return (
    <span style={{ '--ty-step': `${step}s` } as React.CSSProperties}>
      {segments.map((segment, segmentIndex) => {
        const content = segment.typed
          ? Array.from(segment.text).map((char, i) => (
              <span
                key={i}
                className="ty-char"
                style={{ animationDelay: `${startDelay + index++ * step}s` }}
              >
                {char}
              </span>
            ))
          : segment.text

        return segment.painted ? (
          <PaintedWord key={segmentIndex}>{content}</PaintedWord>
        ) : (
          <span key={segmentIndex}>{content}</span>
        )
      })}
    </span>
  )
}
