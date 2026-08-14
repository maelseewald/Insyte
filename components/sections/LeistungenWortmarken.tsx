import Link from 'next/link'

// Drei Leistungen als grosse Wortzeile. Beim Hovern fährt hinter dem Wort
// eine dunkle Fläche mit weisser Strichzeichnung von unten hoch und beim
// Verlassen wieder runter; die übrigen Wörter treten zurück.
//
// Bewusst ohne State und ohne JS: :hover am Wort fährt die Fläche, und
// `.wm-reihe:hover .wm-item:not(:hover)` dimmt die anderen. Styling in
// globals.css unter .wm-*.

const LEISTUNGEN = [
  { nummer: '01', wort: 'Websites', href: '/leistungen#websites', zeichnung: <Browserfenster /> },
  { nummer: '02', wort: 'Software', href: '/leistungen#software', zeichnung: <Codefenster /> },
  { nummer: '03', wort: 'Wartung', href: '/leistungen#wartung', zeichnung: <Schild /> },
]

export default function LeistungenWortmarken() {
  return (
    <section className="relative overflow-hidden border-t border-leinen bg-sand py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display font-bold text-[clamp(32px,4vw,46px)] leading-[1.08] tracking-tight text-wald mb-16">
          Leistungen
        </h2>

        <div className="wm-reihe">
          {LEISTUNGEN.map((l) => (
            <Link key={l.wort} href={l.href} className="wm-item">
              {/* Die Fläche liegt hinter dem Wort und wird beim Hovern
                  innerhalb ihrer Maske nach oben geschoben. */}
              <span className="wm-maske" aria-hidden="true">
                <span className="wm-flaeche">{l.zeichnung}</span>
              </span>
              {/* Nummer und Wort als ein Block, damit sie beim Überfahren
                  gemeinsam nach oben rutschen und über dem Symbol landen. */}
              <span className="wm-text">
                <span className="wm-nummer label-mono">{l.nummer}</span>
                <span className="wm-wort">{l.wort}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Strichzeichnungen — weiss auf dunkler Fläche, bewusst karg gehalten,
   damit sie neben der grossen Schrift nicht laut werden. */

function Browserfenster() {
  return (
    <svg viewBox="0 0 120 160" fill="none" stroke="#F6F3EE" strokeWidth="1.4" strokeLinecap="round">
      <rect x="14" y="34" width="92" height="92" rx="3" />
      <path d="M14 50h92" />
      <circle cx="22" cy="42" r="2" />
      <circle cx="30" cy="42" r="2" />
      <circle cx="38" cy="42" r="2" />
      <path d="M26 64h44M26 74h60M26 84h52" />
      <rect x="26" y="98" width="26" height="12" rx="2" />
      <rect x="58" y="98" width="26" height="12" rx="2" />
    </svg>
  )
}

function Codefenster() {
  return (
    <svg viewBox="0 0 120 160" fill="none" stroke="#F6F3EE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="34" width="92" height="92" rx="3" />
      <path d="M14 50h92" />
      <path d="M46 70 34 82l12 12M74 70l12 12-12 12" />
      <path d="M66 64 54 100" />
    </svg>
  )
}

function Schild() {
  return (
    <svg viewBox="0 0 120 160" fill="none" stroke="#F6F3EE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M60 30 24 44v30c0 28 36 46 36 46s36-18 36-46V44L60 30z" />
      <path d="M46 78l10 10 20-22" />
    </svg>
  )
}
