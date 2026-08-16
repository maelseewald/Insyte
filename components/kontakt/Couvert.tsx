'use client'

import { motion, type Transition } from 'framer-motion'

type Props = {
  name: string
  email: string
  betreff: string
  /** Stempeldatum; `null`, solange nichts gesendet wurde. */
  gesendetAm: string | null
}

/**
 * Eine Zeile Handschrift. Ist sie leer, bleibt eine gestrichelte Linie
 * derselben Höhe stehen — so wächst das Couvert beim Tippen nicht.
 */
function Zeile({ wert }: { wert: string }) {
  return wert ? (
    <span className="cv-hand">{wert}</span>
  ) : (
    <span className="cv-leer" aria-hidden="true" />
  )
}

/**
 * Die Adressseite — die Seite ohne Lasche. Nur hier steht etwas
 * geschrieben, deshalb bleibt sie frei von Faltungen.
 */
export default function Couvert({ name, email, betreff, gesendetAm }: Props) {
  return (
    <div className="cv">
      <div className="cv-absender">
        <span className="cv-label">Absender</span>
        <Zeile wert={name} />
        <Zeile wert={email} />
      </div>

      <div className="cv-marke">insyte</div>

      <div className="cv-empfaenger">
        <span>Insyte</span>
        <span>Web &amp; Software</span>
        <span>Zürich</span>
      </div>

      <div className="cv-vermerk">
        <span className="cv-label">Betreff</span>
        <Zeile wert={betreff} />
      </div>

      {gesendetAm && (
        <div className="cv-stempel">
          <span className="cv-stempel-wort">GESENDET</span>
          <span className="cv-stempel-datum">{gesendetAm}</span>
        </div>
      )}
    </div>
  )
}

/**
 * Die Rückseite: Faltung ohne Text — und die Lasche, unter der der
 * Brief hervorkommt.
 *
 * Die Lasche ist bewusst Geschwister der Papierfläche und nicht ihr
 * Kind: aufgeklappt ragt sie über die Oberkante hinaus, und `.cvh`
 * hat `overflow: hidden` für seine runden Ecken.
 *
 * Gekippt wird über ein negatives `scaleY` um die Oberkante statt
 * über `rotateX`. Die Rückseite muss ihren Teilbaum flach halten,
 * damit `backface-visibility` sie als Ganzes verbirgt, solange die
 * Vorderseite oben liegt — eine echte 3D-Drehung im Innern hebelte
 * das aus. Bei einer flachen Form ist das Bild dasselbe.
 */
export function CouvertRueckseite({
  offen,
  transition,
}: {
  offen: boolean
  transition: Transition
}) {
  return (
    <>
      <div className="cvh">
        <div className="cvh-boden" />
      </div>

      <motion.div
        className="cvh-lasche"
        initial={false}
        animate={{ scaleY: offen ? -0.92 : 1 }}
        transition={transition}
      />
    </>
  )
}
