/**
 * Ausklappbare Frage-Antwort-Liste. Wird von /faq und von jeder
 * Leistungsseite benutzt.
 *
 * Natives <details>/<summary>, kein 'use client': Die Aufklapp-Logik kommt
 * vom Browser, damit bleiben die Seiten Server-Komponenten und der
 * Antworttext steht auch zugeklappt im ausgelieferten HTML. Genau daran
 * hängt die FAQPage-Auszeichnung – Antworten, die erst JavaScript erzeugt,
 * erkennt Google nicht an.
 *
 * Immer nur eine Frage offen: Das macht das `name`-Attribut auf <details>.
 * Alle Blöcke mit demselben Namen verhalten sich wie ein Radio-Button –
 * öffnet man einen, schliesst der Browser den vorigen. Ebenfalls ohne
 * JavaScript. Ältere Browser ignorieren `name` und lassen mehrere offen;
 * das ist die harmlose Variante des Fehlschlags.
 *
 * Der Name ist bewusst für alle Instanzen gleich, damit auch über
 * Gruppengrenzen hinweg nur eine Frage offen steht.
 *
 * Die Überschriftenebene ist einstellbar, weil die Fragen auf /faq unter
 * einer Gruppenüberschrift stehen (h3) und auf den Leistungsseiten direkt
 * unter «Häufige Fragen» (ebenfalls h3) – aber eine Seite, die sie weiter
 * oben einhängt, soll das können, ohne die Ebene zu überspringen.
 */

export type Frage = { frage: string; antwort: string }

export default function FaqListe({
  fragen,
  ueberschriftEbene: H = 'h3',
  /** Die erste Frage offen zeigen – sonst wirkt die Liste wie eine Wand. */
  ersteOffen = false,
}: {
  fragen: Frage[]
  ueberschriftEbene?: 'h2' | 'h3' | 'h4'
  ersteOffen?: boolean
}) {
  return (
    <div className="border-t border-leinen">
      {fragen.map((f, i) => (
        <details
          key={f.frage}
          name="faq"
          className="faq-item group"
          open={ersteOffen && i === 0}
        >
          <summary>
            {/* Die Überschrift steht im <summary>, damit sie im
                Überschriften-Baum auftaucht und nicht nur als Klickfläche. */}
            <H className="font-display font-bold text-h4 leading-snug m-0">
              {f.frage}
            </H>
            <span className="faq-zeichen" aria-hidden="true" />
          </summary>
          <p className="faq-antwort">{f.antwort}</p>
        </details>
      ))}
    </div>
  )
}
