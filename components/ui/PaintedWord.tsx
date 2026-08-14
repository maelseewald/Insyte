// Marker-Akzent: die betonten Wörter werden mit dem Stift geschrieben,
// nicht mit dem Textmarker übermalt. Styling in globals.css (.painted-word),
// weil der Effekt rein deklarativ ist — Schrift, Kontur, Schräglage.
//
// Sparsam einsetzen: ein bis drei Wörter pro Seite. Der Akzent lebt davon,
// dass er die Ausnahme ist.

export default function PaintedWord({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <span className="painted-tilt">
      <span className="painted-word">{children}</span>
    </span>
  )
}
