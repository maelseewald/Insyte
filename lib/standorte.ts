/**
 * Landingpages für Suchbegriffe, die eine eigene Adresse verdienen.
 *
 * Warum getrennt von `lib/leistungen.ts`: Die Leistungsseiten beschreiben,
 * *was* gemacht wird. Diese Seiten beantworten die Frage, *wen* jemand sucht,
 * der «Webagentur Zürich» tippt. Das ist eine andere Suchabsicht und gehört
 * darum auf eine andere URL.
 *
 * ⚠️ WICHTIG bei neuen Seiten: Sie dürfen sich nicht nur durch einen
 * ausgetauschten Ortsnamen unterscheiden. Google wertet solche Seiten als
 * Doorway Pages und filtert sie aus dem Index. Jede Seite hier hat deshalb
 * einen eigenen Blickwinkel:
 *
 *   webagentur-zuerich  → Nähe: Treffen vor Ort, Kanton Zürich
 *   webagentur-schweiz  → Distanz: ortsunabhängig arbeiten, Deutschschweiz
 *   webdesign-schweiz   → Schweizer Besonderheiten: Sprachen, Recht, Hosting
 *
 * Die Seiten sind bewusst schlank: kein FAQ, keine wiederholte
 * Leistungsliste. Beides steht auf /faq und /leistungen und würde hier nur
 * denselben Text ein zweites Mal in den Index bringen.
 *
 * Wer eine vierte Seite anlegt, muss zuerst beantworten können, was auf ihr
 * steht, das auf keiner der anderen steht.
 */

export type Abschnitt = { titel: string; text: string[] }
export type Branche = { titel: string; text: string }

export type Standort = {
  slug: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  lead: string
  abschnitte: Abschnitt[]
  /** Überschrift über den Branchen, je Seite anders formuliert. */
  branchenTitel: string
  branchen: Branche[]
  /** Die anderen Seiten dieser Art, für die interne Verlinkung. */
  verwandt: string[]
}

const ALL: Standort[] = [
  {
    slug: 'webagentur-zuerich',
    metaTitle: 'Webagentur Zürich für KMU: Websites ab CHF 1\'500 | Insyte',
    metaDescription:
      'Webagentur aus Zürich für KMU: Websites, Web-Apps, Software, SEO und Wartung. Ein fester Ansprechpartner, Treffen vor Ort möglich. Ab CHF 1\'500.',
    eyebrow: 'Webagentur Zürich',
    h1: 'Die Webagentur für KMU im Kanton Zürich',
    lead: 'Wir sitzen in Zürich Höngg und arbeiten für Betriebe in der Stadt und im Kanton. Websites, Web-Apps, individuelle Software, Suchmaschinenoptimierung und Wartung, alles von derselben Person, die auch ans Telefon geht.',
    abschnitte: [
      {
        titel: 'Warum die Nähe zählt',
        text: [
          'Eine Website entsteht nicht aus einem Anforderungskatalog. Sie entsteht daraus, dass jemand versteht, was dein Betrieb macht und wer bei dir anruft. Das geht am Telefon, es geht per Video, und manchmal geht es einfach besser, wenn man sich hinsetzt.',
          'Für Betriebe im Kanton Zürich ist das kein Aufwand, sondern eine halbe Stunde Weg. Wir kommen zum Erstgespräch vorbei, wenn du das möchtest, und später auch wieder, wenn etwas Grösseres ansteht. Das kostet nichts extra und ist auch keine Bedingung: Wer lieber alles per Video macht, macht alles per Video.',
        ],
      },
      {
        titel: 'Was eine kleine Agentur anders macht',
        text: [
          'Insyte ist ein Ein-Personen-Betrieb. Das heisst: Die Person, mit der du das Erstgespräch führst, ist auch die, die baut, und die später abnimmt, wenn etwas nicht stimmt. Es gibt kein Ticketsystem, keine wechselnden Projektleiter und niemanden, der erst intern nachfragen muss.',
          'Der Nachteil ist ebenso klar und soll hier stehen: Wir sind keine Agentur mit zwanzig Leuten. Wenn du eine Kampagne über sechs Kanäle brauchst oder ein Projekt mit fünf parallelen Teams, sind wir die falsche Adresse. Für einen Webauftritt, ein internes Werkzeug oder eine Anwendung, die einen Ablauf ablöst, sind wir genau richtig.',
        ],
      },
      {
        titel: 'Was das Ganze kostet',
        text: [
          'Websites beginnen bei CHF 1\'500, Web-Apps bei CHF 2\'000, individuelle Software bei CHF 3\'000. Hosting und Wartung gibt es ab CHF 50 im Monat, inklusive einer Stunde Arbeit.',
          'Nach dem Erstgespräch bekommst du eine Offerte mit Festpreis. Keine offene Stundenrechnung, bei der am Ende eine Überraschung steht. Das Erstgespräch selbst kostet nichts und verpflichtet zu nichts.',
        ],
      },
    ],
    branchenTitel: 'Für wen wir im Kanton Zürich arbeiten',
    branchen: [
      {
        titel: 'Handwerk und Bau',
        text: 'Schreiner, Elektriker, Maler, Gartenbau. Meist geht es darum, dass Anfragen hereinkommen und die Seite auf dem Handy funktioniert, weil dort die Hälfte der Besucher landet.',
      },
      {
        titel: 'Gastronomie',
        text: 'Restaurants und Cafés brauchen selten viel: aktuelle Öffnungszeiten, eine lesbare Karte und den Weg zur Reservation. Genau das ist auf vielen Seiten am schlechtesten gelöst.',
      },
      {
        titel: 'Praxen und Beratung',
        text: 'Ärztinnen, Therapeuten, Treuhand, Beratung. Hier entscheidet Vertrauen, und Vertrauen entsteht über Text und Bild, nicht über Effekte.',
      },
      {
        titel: 'Selbstständige',
        text: 'Wer allein arbeitet, braucht eine Seite, die erklärt, warum ausgerechnet er und nicht der Nächste. Das ist Textarbeit, und die machen wir gemeinsam.',
      },
      {
        titel: 'Vereine',
        text: 'Sport, Musik, Quartier. Meist geht es um Termine, Mitgliederinfos und eine Seite, die auch der nächste Vorstand noch pflegen kann, ohne jemanden fragen zu müssen.',
      },
    ],
    verwandt: ['webagentur-schweiz', 'webdesign-schweiz'],
  },

  {
    slug: 'webagentur-schweiz',
    metaTitle: 'Webagentur Schweiz: ortsunabhängig für KMU | Insyte',
    metaDescription:
      'Schweizer Webagentur für KMU in der ganzen Deutschschweiz. Zusammenarbeit per Video, Abrechnung in CHF, Hosting und Recht nach Schweizer Vorgaben.',
    eyebrow: 'Webagentur Schweiz',
    h1: 'Eine Schweizer Webagentur, egal wo dein Betrieb steht',
    lead: 'Der Sitz ist Zürich, die Kunden sind es nicht alle. Der grösste Teil eines Projekts läuft ohnehin per Video und E-Mail, und das funktioniert nach Chur genauso wie nach Höngg.',
    abschnitte: [
      {
        titel: 'Wie Zusammenarbeit über Distanz abläuft',
        text: [
          'Ein Erstgespräch per Video, danach ein geteiltes Dokument mit der Struktur, dann siehst du die Seite im Browser statt als Bild. Rückmeldungen kommen als Notiz oder im nächsten Gespräch. Kein einziger Schritt davon braucht denselben Raum.',
          'Das ist kein Zugeständnis, sondern für die meisten Projekte der schnellere Weg: Ein Video-Termin ist am Dienstag um acht möglich, eine Anfahrt nach Zürich nicht. Wer trotzdem lieber vorbeikommt, ist willkommen, und im Kanton Zürich kommen wir auch zu dir.',
        ],
      },
      {
        titel: 'Warum eine Schweizer Agentur und nicht die günstigste im Ausland',
        text: [
          'Es gibt Angebote aus dem Ausland, die einen Bruchteil kosten. Für manche Vorhaben ist das die richtige Wahl, und dann sagen wir das auch. Drei Dinge sprechen oft dagegen.',
          'Erstens die Rechtstexte. Impressum und Datenschutzerklärung müssen dem Schweizer Datenschutzgesetz genügen, nicht der DSGVO allein. Zweitens die Sprache: Eine Seite, die «ß» schreibt oder «Sie erhalten Ihre Bestellung» statt der Formulierung, die deine Kunden erwarten, verrät sich sofort. Drittens die Erreichbarkeit, wenn etwas kaputt ist. Eine Zeitverschiebung von sechs Stunden merkt man erst, wenn die Seite am Freitagabend nicht mehr läuft.',
          'Abgerechnet wird in Franken, ohne Wechselkurs und ohne Zollfragen. Insyte ist nicht mehrwertsteuerpflichtig, auf der Rechnung steht also kein Zuschlag.',
        ],
      },
      {
        titel: 'Wo die Daten liegen',
        text: [
          'Auf Wunsch in der Schweiz oder in der EU. Das ist bei einer normalen Website selten entscheidend, bei einer Anwendung mit Kundendaten dagegen schon. Wir klären das vor der Offerte, nicht danach, weil es den Aufwand verschieben kann.',
        ],
      },
    ],
    branchenTitel: 'Womit Betriebe ausserhalb der Zentren zu uns kommen',
    branchen: [
      {
        titel: 'Betriebe ohne Agentur in der Nähe',
        text: 'Wer nicht in Zürich, Bern oder Basel sitzt, hat oft die Wahl zwischen der einen lokalen Agentur und dem Baukasten. Über Distanz kommt eine dritte Möglichkeit dazu.',
      },
      {
        titel: 'Nachfolgen und Übernahmen',
        text: 'Die Seite wurde vor Jahren von jemandem gebaut, der nicht mehr erreichbar ist. Wir übernehmen den Bestand, sofern sich das lohnt, und sagen es, wenn nicht.',
      },
      {
        titel: 'Zweit- und Drittstandorte',
        text: 'Ein Betrieb, mehrere Orte. Das lässt sich auf einer Seite sauber abbilden, ohne für jeden Standort dieselbe Seite noch einmal zu bauen.',
      },
      {
        titel: 'Interne Werkzeuge',
        text: 'Software, die einen Ablauf im Betrieb ablöst, hat mit dem Standort ohnehin nichts zu tun. Hier ist die Distanz kein Thema.',
      },
    ],
    verwandt: ['webagentur-zuerich', 'webdesign-schweiz'],
  },

  {
    slug: 'webdesign-schweiz',
    metaTitle: 'Webdesign Schweiz: Websites nach Schweizer Vorgaben | Insyte',
    metaDescription:
      'Webdesign für Schweizer KMU: mehrsprachige Seiten, Rechtstexte nach Schweizer Recht, Hosting in der Schweiz, .ch-Domain. Ab CHF 1\'500.',
    eyebrow: 'Webdesign Schweiz',
    h1: 'Webdesign für Schweizer Betriebe',
    lead: 'Eine Website für die Schweiz unterscheidet sich von einer für Deutschland an mehr Stellen, als die meisten erwarten. Sprache, Recht, Hosting und Domain gehören dazu, und jede dieser Stellen fällt auf, wenn sie falsch ist.',
    abschnitte: [
      {
        titel: 'Sprache, die nicht nach Import klingt',
        text: [
          'Der offensichtliche Teil ist das «ss» statt «ß». Der weniger offensichtliche sind Wörter, die in der Schweiz anders heissen oder anders klingen: Offerte statt Angebot, Unterlagen statt Dokumente, parkieren statt parken. Eine Seite, die durchgehend deutsches Deutsch schreibt, wird gelesen und trotzdem als fremd wahrgenommen.',
          'Dazu kommt die Anrede. Ob geduzt oder gesiezt wird, ist eine Entscheidung, keine Konvention, und sie muss zur Branche passen. Wir legen sie im Erstgespräch fest und ziehen sie dann konsequent durch.',
        ],
      },
      {
        titel: 'Mehrsprachigkeit, wenn sie nötig ist',
        text: [
          'Nicht jeder Betrieb braucht Französisch. Wer aber über die Sprachgrenze verkauft, braucht es richtig: eine eigene Adresse je Sprache, gegenseitig verknüpft, damit Google die passende Fassung ausliefert statt einer zufälligen.',
          'Falsch gemacht schadet Mehrsprachigkeit mehr, als sie nützt: Zwei Sprachen auf derselben Adresse oder automatisch übersetzte Seiten ohne Kennzeichnung führen dazu, dass beide Fassungen schlechter gefunden werden. Wenn das Thema ansteht, klären wir es vor dem Bau.',
        ],
      },
      {
        titel: 'Recht, Domain und Hosting',
        text: [
          'Impressum und Datenschutzerklärung richten sich nach dem Schweizer Datenschutzgesetz. Wer auch in die EU verkauft, braucht zusätzlich die DSGVO abgedeckt. Beides gehört zum Auftrag, nicht in eine Zusatzrechnung.',
          'Die Domain sollte auf `.ch` enden, weil Schweizer Kunden sie erwarten und Google sie regional zuordnet. Hosting auf Wunsch in der Schweiz. Beides richten wir bei der Aufschaltung ein.',
        ],
      },
    ],
    branchenTitel: 'Wo Schweizer Besonderheiten den Unterschied machen',
    branchen: [
      {
        titel: 'Betriebe an der Sprachgrenze',
        text: 'Wer in Biel, Freiburg oder im Wallis arbeitet, kommt an zwei Sprachen nicht vorbei. Das gehört von Anfang an in die Struktur, nicht nachträglich dazu.',
      },
      {
        titel: 'Tourismus',
        text: 'Hier kommt Englisch dazu, und die Seite muss auf Geräten funktionieren, die im Ausland gekauft wurden und in fremden Netzen hängen. Ladezeit ist kein Nebenthema.',
      },
      {
        titel: 'Verkauf in die EU',
        text: 'Sobald Kundendaten aus der EU verarbeitet werden, gilt zusätzlich die DSGVO. Das betrifft die Rechtstexte und die Frage, wo die Daten liegen.',
      },
      {
        titel: 'Regulierte Branchen',
        text: 'Treuhand, Gesundheit, Finanzen. Was auf der Seite stehen darf, ist teilweise vorgeschrieben. Das klären wir vor dem Schreiben, nicht danach.',
      },
    ],
    verwandt: ['webagentur-zuerich', 'webagentur-schweiz'],
  },
]

export const standorte: Standort[] = ALL

export const standortBySlug = (slug: string): Standort | undefined =>
  ALL.find((s) => s.slug === slug)

export const standortSlugs = (): string[] => ALL.map((s) => s.slug)
