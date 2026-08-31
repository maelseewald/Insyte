/**
 * Allgemeine Fragen für /faq.
 *
 * WICHTIG: Diese Fragen sind bewusst andere als die je drei auf den
 * Leistungsseiten (`lib/leistungen.ts`). Dieselbe Frage-Antwort auf zwei
 * Seiten mit `FAQPage` auszuzeichnen ist Duplikat – Google sucht sich dann
 * eine der beiden aus, und die Seiten ranken gegeneinander statt miteinander.
 *
 * Hier stehen die übergreifenden Fragen (Preis, Dauer, Zusammenarbeit), dort
 * die zur jeweiligen Leistung.
 */

export type Frage = { frage: string; antwort: string }
export type FaqGruppe = { titel: string; fragen: Frage[] }

export const faqGruppen: FaqGruppe[] = [
  {
    titel: 'Preis und Dauer',
    fragen: [
      {
        frage: 'Was kostet eine Website?',
        antwort:
          'Eine Website mit drei bis fünf Seiten beginnt bei CHF 1\'500. Was es bei dir kostet, hängt am Umfang: Wie viele Seiten, wie viel Funktion, ob Texte und Bilder vorhanden sind oder erst entstehen müssen. Nach dem Erstgespräch bekommst du eine Offerte mit Festpreis. Keine offene Stundenrechnung, bei der am Ende eine Überraschung steht.',
      },
      {
        frage: 'Wie lange dauert es, bis meine Website online ist?',
        antwort:
          'Zwei bis vier Wochen, gerechnet ab dem Moment, in dem die Inhalte vollständig vorliegen. Der häufigste Grund für Verzögerung sind nicht technische Probleme, sondern fehlende Texte und Bilder. Das ist der Punkt, an dem Projekte typischerweise liegenbleiben. Wenn du keine Texte hast, planen wir das von Anfang an mit ein, statt später darauf zu warten.',
      },
      {
        frage: 'Was kostet es, wenn ich später etwas ändern will?',
        antwort:
          'Kleine Änderungen an Text und Bildern kannst du selbst machen. Die Seite wird so eingerichtet, dass das ohne Programmierkenntnisse geht. Wer das lieber abgibt, nimmt die Wartung ab CHF 50 im Monat; darin sind Hosting und eine Stunde Arbeit pro Monat enthalten. Grössere Erweiterungen sind ein eigener Auftrag mit eigenem Preis, den du vorher kennst.',
      },
    ],
  },
  {
    titel: 'Zusammenarbeit',
    fragen: [
      {
        frage: 'Wie fangen wir an?',
        antwort:
          'Mit einem Gespräch von etwa einer Stunde, kostenlos und ohne Verpflichtung. Wir schauen, was du machst, wer bei dir anruft und was diese Leute vorher wissen müssen. Danach weisst du, was es ungefähr kostet und wie lange es dauert, und kannst immer noch absagen. Schreib einfach kurz, worum es geht.',
      },
      {
        frage: 'Was brauchst du von mir, damit es losgehen kann?',
        antwort:
          'Zu Beginn vor allem Zeit für das Gespräch und eine ehrliche Antwort darauf, was die Seite leisten soll. Später Texte und Bilder, oder die Bereitschaft, sie mit uns zusammen zu erarbeiten. Ausserdem Zugang zu Domain und Hosting, falls beides schon existiert. Alles andere übernehmen wir.',
      },
      {
        frage: 'Arbeitest du auch mit Kunden ausserhalb von Zürich?',
        antwort:
          'Ja. Der Sitz ist Zürich, gearbeitet wird in der ganzen Schweiz. Das meiste läuft ohnehin per Video und E-Mail. Für ein Treffen vor Ort im Raum Zürich sind wir da, und bei Projekten, für die es sich lohnt, kommen wir auch weiter.',
      },
    ],
  },
  {
    titel: 'Grundsätzliches',
    fragen: [
      {
        frage: 'Wer steckt hinter Insyte?',
        antwort:
          'Insyte ist die Bezeichnung, unter der Mael Seewald Web- und Softwareprojekte umsetzt. Ein Ein-Personen-Betrieb, keine Agentur. Das heisst konkret: Die Person, mit der du das erste Gespräch führst, ist auch die, die baut und die später ans Telefon geht. Kein Ticketsystem, keine wechselnden Ansprechpartner, kein Callcenter.',
      },
      {
        frage: 'Warum kein Baukasten wie Wix oder Squarespace?',
        antwort:
          'Für manche Vorhaben ist ein Baukasten die richtige Wahl, und dann sagen wir das auch. Zwei Punkte sprechen oft dagegen. Baukästen laden viel mit, was deine Seite nicht braucht. Das kostet Ladezeit, und Ladezeit ist einer der Punkte, an denen Google Seiten auseinandersortiert. Ausserdem bleibt die Gestaltung an das gebunden, was die Vorlage vorsieht. Wenn nichts auf der Seite erkennen lässt, warum man ausgerechnet dich anrufen soll, entscheidet der Preis.',
      },
    ],
  },
]

/** Flache Liste für das FAQPage-Schema. */
export const alleFragen = (): Frage[] =>
  faqGruppen.flatMap((gruppe) => gruppe.fragen)
