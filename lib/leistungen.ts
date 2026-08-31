/**
 * Inhalte der vier Leistungsseiten. Als Daten statt als vier fast gleiche
 * Komponenten: Aufbau und Auszeichnung liegen einmal in
 * `app/leistungen/[slug]/page.tsx`, hier steht nur der Text.
 *
 * Jede Seite zielt auf einen Suchbegriff. Sie brauchen deshalb je 400–800
 * Wörter eigenen Text – eine Seite, die dasselbe sagt wie die Nachbarseite,
 * ranken beide nicht.
 */

/**
 * Stundensatz für Arbeit über die im Wartungsvertrag enthaltene Stunde
 * hinaus. Steht hier, damit eine Änderung nicht an mehreren Textstellen
 * nachgezogen werden muss.
 */
export const STUNDENSATZ = 80

export type Schritt = {
  titel: string
  text: string
  /**
   * Kein fester Bestandteil des Auftrags. Die Verbindung, die zu diesem
   * Schritt führt, wird gestrichelt dargestellt.
   */
  optional?: boolean
  /** Weiterführender Link, etwa auf die passende Leistungsseite. */
  link?: { text: string; href: string }
}
export type Frage = { frage: string; antwort: string }

export type Leistung = {
  slug: string
  /** Kurzform für Navigation und Verlinkungen. */
  name: string
  metaTitle: string
  metaDescription: string
  /** Eyebrow über der Überschrift. */
  eyebrow: string
  h1: string
  lead: string
  /** Einstiegspreis in CHF. `null`, wenn er erst im Gespräch entsteht. */
  preisAb: number | null
  preisEinheit: 'einmalig' | 'pro Monat' | null
  preisHinweis: string
  problem: string[]
  vorgehen: Schritt[]
  enthalten: string[]
  /**
   * Verb für den Abschluss-Button. Der Preis davor wird aus `preisAb`
   * zusammengesetzt, damit eine Preisänderung an einer Stelle reicht.
   */
  ctaAktion: string
  faq: Frage[]
}

/**
 * Zwei Schritte sind bei allen drei Bau-Leistungen wortgleich, weil sie
 * tatsächlich dasselbe sind. Der Rest unterscheidet sich: Bei einer Website
 * geht es um Seiten, Texte und Bilder, bei einer Anwendung um Funktionen,
 * Rollen und Daten. Ein gemeinsamer Ablauf für alles wäre für zwei der drei
 * falsch gewesen.
 */
const VERTRAG: Schritt = {
  titel: 'Vertrag aufsetzen',
  text: 'Bevor gebaut wird, steht schriftlich fest, was entsteht, was es kostet und bis wann. So weiss jeder, woran er ist, und niemand muss sich später auf sein Gedächtnis verlassen.',
}

const WARTUNG_OPTIONAL: Schritt = {
  titel: 'Hosting und Wartung',
  optional: true,
  text: 'Ab hier bist du frei. Wer den laufenden Betrieb nicht selbst übernehmen will, schliesst zusätzlich einen Vertrag für Hosting und Wartung ab: Aktualisierungen, Sicherungen und kleine Änderungen laufen dann über uns.',
  link: { text: 'Zu Hosting und Wartung', href: '/leistungen/wartung-support' },
}

const ABLAUF_WEBSITE: Schritt[] = [
  {
    titel: 'Gespräch',
    text: 'Eine Stunde, kostenlos, ohne Verpflichtung. Wir schauen, was du machst, wer bei dir anruft und was diese Leute vorher wissen müssen. Danach weisst du, was es ungefähr kostet und wie lange es dauert.',
  },
  {
    titel: 'Struktur und Text',
    text: 'Wir legen fest, welche Seiten es gibt und was auf jede gehört, und liefern dir dazu eine Grundidee als Gerüst. Die Texte und Bilder kommen von dir: Über deinen Betrieb schreibt niemand treffender als du selbst, und ausgedachte Inhalte müsstest du später ohnehin ersetzen.',
  },
  VERTRAG,
  {
    titel: 'Gestaltung und Umsetzung',
    text: 'Du siehst die Seite als erstes im Browser, nicht als Bild. Auf dem Handy, auf dem Laptop, so wie deine Kunden sie später sehen. Was nicht passt, ändern wir, solange wir bauen.',
  },
  {
    titel: 'Liveschaltung',
    text: 'Domain verbinden, E-Mail einrichten, Weiterleitungen von der alten Seite legen, damit bestehende Google-Treffer nicht ins Leere laufen. Danach zeigen wir dir, wie du Texte und Bilder selbst änderst. Das gehört zum Auftrag dazu.',
  },
  WARTUNG_OPTIONAL,
]

const ABLAUF_WEBAPP: Schritt[] = [
  {
    titel: 'Gespräch',
    text: 'Eine Stunde, kostenlos, ohne Verpflichtung. Wir gehen durch, wer die Anwendung benutzen soll und welchen Ablauf sie ersetzt. Danach weisst du, was es ungefähr kostet und wie lange es dauert.',
  },
  {
    titel: 'Funktionen festlegen',
    text: 'Was muss die Anwendung können, wer darf was sehen, was passiert in welcher Reihenfolge. Dabei zeigt sich meist, dass die Hälfte der gewünschten Funktionen gar nicht gebraucht wird und dafür zwei fehlen, an die niemand gedacht hat. Am Ende steht eine Liste, was in die erste Fassung gehört.',
  },
  VERTRAG,
  {
    titel: 'Kleinste nützliche Fassung',
    text: 'Zuerst wird gebaut, was den grössten Teil des Problems löst. Diese Fassung siehst du früh im Browser und kannst sie benutzen, bevor der Rest entsteht. So merkst du rechtzeitig, ob die Richtung stimmt, und nicht erst nach drei Monaten.',
  },
  {
    titel: 'In Betrieb nehmen',
    text: 'Konten anlegen, bestehende Daten übernehmen, Schnittstellen zu deinen Systemen anschliessen. Danach eine Einführung für die Leute, die täglich damit arbeiten.',
  },
  WARTUNG_OPTIONAL,
]

const ABLAUF_SOFTWARE: Schritt[] = [
  {
    titel: 'Mitschauen',
    text: 'Wir sehen uns an, wie der Ablauf heute tatsächlich läuft, nicht wie er im Handbuch stehen sollte. Und zwar mit den Leuten, die ihn täglich machen. Der Unterschied zwischen beidem ist meist genau die Stelle, an der es hakt.',
  },
  {
    titel: 'Funktionen und Abgrenzung',
    text: 'Was das Werkzeug können muss, und ebenso wichtig: was bewusst nicht. Hier kommt auch die ehrliche Einschätzung, ob sich der Bau überhaupt lohnt. Manchmal reicht eine Standardlösung, die nur richtig eingerichtet werden muss. Das sagen wir dir dann auch.',
  },
  VERTRAG,
  {
    titel: 'In Etappen bauen',
    text: 'Der Teil mit dem grössten täglichen Ärger zuerst. Der geht in Betrieb, bevor der Rest entsteht. Du siehst den Nutzen früh und musst nicht auf Vertrauen vorfinanzieren. Nach jeder Etappe entscheidest du, ob es weitergeht.',
  },
  {
    titel: 'Daten übernehmen und einführen',
    text: 'Excel-Listen, Exporte aus Altsystemen, teilweise auch Datenbanken direkt. Wie sauber das läuft, hängt vom Zustand der Daten ab, deshalb schauen wir sie uns vorher an. Danach eine Schulung für dein Team.',
  },
  WARTUNG_OPTIONAL,
]

const ALL: Leistung[] = [
  {
    slug: 'webdesign-zuerich',
    name: 'Webdesign',
    metaTitle: 'Webdesign Zürich: Websites für KMU ab CHF 1\'500 | Insyte',
    metaDescription:
      'Individuell gestaltete Websites für KMU in Zürich. Kein Baukasten, kein Template, sondern auf deinen Betrieb zugeschnitten. Schnell und auf allen Geräten. Ab CHF 1\'500.',
    eyebrow: 'Leistung',
    h1: 'Webdesign in Zürich: Websites, die zu dir passen',
    lead: 'Ein Webauftritt, der aussieht wie dein Betrieb und nicht wie eine Vorlage, die tausend andere auch benutzen. Persönlich zugeschnitten, auf allen Geräten lesbar, in zwei bis vier Wochen online.',
    preisAb: 1500,
    preisEinheit: 'einmalig',
    preisHinweis:
      'Für einen Auftritt mit drei bis fünf Seiten, individuell gestaltet. Was es bei dir kostet, hängt am Umfang. Das klären wir im Erstgespräch, bevor irgendwer etwas unterschreibt.',
    problem: [
      'Viele KMU-Websites in der Schweiz haben eines von zwei Problemen. Entweder sie sind zehn Jahre alt, auf dem Handy unbenutzbar und niemand traut sich mehr, etwas daran zu ändern. Oder sie kommen aus einem Baukasten und sehen genauso aus wie die der Konkurrenz zwei Strassen weiter.',
      'Beides kostet dich Aufträge, nur unterschiedlich. Die alte Seite verlierst du auf dem Handy, und dort kommen inzwischen mehr als die Hälfte deiner Besucher an. Die Baukastenseite verlierst du im Vergleich: Wenn nichts auf der Seite erkennen lässt, warum man ausgerechnet dich anrufen soll, entscheidet der Preis. Das ist selten ein Wettbewerb, den du gewinnen willst.',
      'Dazu kommt, was man nicht sieht. Baukästen laden viel mit, was deine Seite nicht braucht. Das macht sie langsam, und Ladezeit ist einer der Punkte, an denen Google Seiten auseinandersortiert.',
    ],
    vorgehen: ABLAUF_WEBSITE,
    enthalten: [
      'Individuelles Design, kein gekauftes Template',
      'Lesbar und bedienbar auf Handy, Tablet und Desktop',
      'Technische Suchmaschinen-Grundlagen: Titel, Beschreibungen, Sitemap, strukturierte Daten',
      'Aufschaltung inklusive Domain- und Hosting-Einrichtung',
    ],
    ctaAktion: 'Website bauen',
    faq: [
      {
        frage: 'Kann ich die Inhalte später selbst ändern?',
        antwort:
          'Ja. Wir richten die Seite so ein, dass du Texte und Bilder ohne Programmierkenntnisse anpassen kannst, und wir zeigen dir, wie.',
      },
      {
        frage: 'Was passiert mit meiner alten Website?',
        antwort:
          'Die bleibt online, bis die neue fertig ist. Beim Umschalten legen wir Weiterleitungen von den alten auf die neuen Adressen. Sonst laufen bestehende Google-Treffer und verlinkte Seiten ins Leere, und du verlierst auf einen Schlag die Sichtbarkeit, die du dir aufgebaut hast.',
      },
      {
        frage: 'Brauche ich einen eigenen Fotografen?',
        antwort:
          'Nicht zwingend, aber es hilft mehr, als die meisten denken. Eigene Bilder von deinem Betrieb und deinen Leuten wirken anders als gekaufte Stockfotos, die man auf zwanzig anderen Seiten schon gesehen hat. Wenn du keine hast, arbeiten wir erst einmal mit dem, was da ist.',
      },
    ],
  },
  {
    slug: 'webentwicklung',
    name: 'Webentwicklung',
    metaTitle: 'Webentwicklung Zürich: Web-Apps und Portale | Insyte',
    metaDescription:
      'Web-Apps, Kundenportale und Buchungssysteme im Browser, ohne Installation. Entwickelt in Zürich mit Next.js und TypeScript. Ab CHF 2\'000.',
    eyebrow: 'Leistung',
    h1: 'Webentwicklung: wenn eine Website nicht mehr reicht',
    lead: 'Kundenportale, Buchungssysteme, interne Werkzeuge. Alles, was mehr können muss als Text anzeigen. Im Browser, ohne dass jemand etwas installieren muss.',
    preisAb: 2000,
    preisEinheit: 'einmalig',
    preisHinweis:
      'Für eine überschaubare Anwendung mit einem klar umrissenen Zweck. Web-Apps unterscheiden sich stärker im Aufwand als Websites. Nach dem Erstgespräch bekommst du eine Offerte mit Festpreis, keine offene Stundenrechnung.',
    problem: [
      'Irgendwann stösst eine normale Website an ihre Grenze. Kunden sollen sich einloggen und ihre Unterlagen sehen. Termine sollen sich selbst buchen lassen, statt dass dreimal hin und her telefoniert wird. Ein Ablauf, den heute drei Leute per E-Mail koordinieren, soll einfach laufen.',
      'Der übliche Reflex ist eine App im Store. Für die meisten Betriebe ist das der teure Umweg: zwei Systeme statt einem, Freigabeprozesse bei Apple und Google, Store-Gebühren, und die Hürde, dass jemand erst etwas installieren muss, bevor er etwas tun kann. Für ein Buchungssystem, das jemand zweimal im Jahr benutzt, installiert niemand eine App.',
      'Im Browser fällt das alles weg. Ein Link genügt, es läuft auf jedem Gerät, und Aktualisierungen sind sofort bei allen da, ohne dass jemand etwas aktualisieren muss.',
    ],
    vorgehen: ABLAUF_WEBAPP,
    enthalten: [
      'Anforderungsaufnahme mit den Leuten, die damit arbeiten',
      'Benutzerkonten und Rechte, sofern nötig',
      'Anbindung an bestehende Systeme über Schnittstellen',
      'Bedienbar auf Handy und Desktop',
      'Datenhaltung in der Schweiz oder EU, auf Wunsch',
      'Nutzungsrecht am Code, der für dein Projekt entsteht',
      'Einführung für dein Team',
    ],
    ctaAktion: 'Web-App bauen',
    faq: [
      {
        frage: 'Wem gehört der Code am Ende?',
        antwort:
          'Das Urheberrecht bleibt bei uns. Mit der vollständigen Bezahlung bekommst du ein Nutzungsrecht an dem Code, der eigens für dein Projekt entstanden ist, und an den projektspezifischen Inhalten: Du darfst beides für deinen Betrieb nutzen und anpassen lassen. Nicht erlaubt ist, den Code weiterzugeben, weiterzuverkaufen oder als eigenes Produkt anzubieten. Ebenfalls nicht erfasst sind die wiederverwendbaren Grundlagen, Funktionen und Bausteine, die in jedem unserer Projekte stecken; die bleiben bei uns. Für Open-Source-Komponenten, Schriften und externe Dienste gelten weiterhin deren eigene Lizenzen. Was im Einzelnen gilt, steht im Vertrag.',
      },
      {
        frage: 'Kann die Anwendung mit meiner bestehenden Software reden?',
        antwort:
          'Meistens ja. Wenn dein Buchhaltungs- oder Warensystem eine Schnittstelle anbietet, lässt sich das anbinden. Ob das bei deinem der Fall ist, schauen wir vor der Offerte nach. Das ist einer der Punkte, die den Aufwand deutlich verschieben können.',
      },
      {
        frage: 'Was ist mit den Daten meiner Kunden?',
        antwort:
          'Auf Wunsch liegen sie auf Servern in der Schweiz oder der EU. Wir erfassen nur, was die Anwendung wirklich braucht. Das ist nicht nur datenschutzrechtlich einfacher, sondern erspart dir auch die Frage, was bei einem Zwischenfall alles betroffen wäre.',
      },
    ],
  },
  {
    slug: 'individuelle-software',
    name: 'Individuelle Software',
    metaTitle: 'Individuelle Software für KMU, massgeschneidert | Insyte',
    metaDescription:
      'Software, die zu deinen Abläufen passt statt umgekehrt. Für KMU in Zürich und der Schweiz, wenn Standardlösungen nur halb passen. Ab CHF 3\'000.',
    eyebrow: 'Leistung',
    h1: 'Individuelle Software statt Standard, der nur halb passt',
    lead: 'Wenn dein Betrieb sich an die Software anpassen muss statt umgekehrt, läuft etwas verkehrt. Massgeschneiderte Werkzeuge für die Abläufe, die dein Geschäft ausmachen.',
    preisAb: 3000,
    preisEinheit: 'einmalig',
    preisHinweis:
      'Für ein abgegrenztes Werkzeug, das einen konkreten Ablauf abdeckt. Grössere Vorhaben teilen wir in Etappen mit je eigenem Festpreis. So bleibt nach jeder Etappe die Entscheidung bei dir.',
    problem: [
      'Standardsoftware ist für den Durchschnitt gebaut. Das funktioniert erstaunlich weit, bis zu der Stelle, an der dein Betrieb sich vom Durchschnitt unterscheidet. Und genau diese Stelle ist meist der Grund, warum deine Kunden bei dir kaufen und nicht anderswo.',
      'Was dann passiert, kennt fast jeder: Eine Excel-Tabelle daneben, in die jemand von Hand überträgt. Ein Ablauf, der nur funktioniert, weil eine bestimmte Person weiss, wie es geht. Drei Programme, die dasselbe dreimal speichern, und niemand weiss sicher, welches gerade stimmt.',
      'Diese Umwege kosten selten auffällig viel auf einmal. Sie kosten jeden Tag ein bisschen: an Zeit, an Fehlern, die niemand bemerkt, und an Leuten, die etwas anderes tun könnten. Zusammengerechnet über ein Jahr ist das oft ein Vielfaches dessen, was ein Werkzeug gekostet hätte, das einfach passt.',
      'Nicht jedes Problem ist allerdings eines für individuelle Software. Manchmal ist die ehrliche Antwort, dass eine Standardlösung reicht und du sie nur richtig einrichten musst. Das sagen wir dir dann auch. Ein Auftrag, den du nicht gebraucht hast, nützt uns beiden nichts.',
    ],
    vorgehen: ABLAUF_SOFTWARE,
    enthalten: [
      'Analyse des tatsächlichen Ablaufs vor Ort oder per Video',
      'Ehrliche Einschätzung, auch wenn sie gegen den Auftrag spricht',
      'Umsetzung in Etappen mit je eigenem Festpreis',
      'Automatisierung wiederkehrender Handgriffe',
      'Übernahme bestehender Daten aus Excel oder Altsystemen',
      'Anbindung an Systeme, die bleiben sollen',
      'Schulung der Leute, die damit arbeiten',
    ],
    ctaAktion: 'Software bauen',
    faq: [
      {
        frage: 'Lohnt sich das für einen kleinen Betrieb überhaupt?',
        antwort:
          'Das hängt daran, wie viel Zeit der Umweg heute kostet. Faustregel: Wenn jemand jede Woche mehrere Stunden mit Übertragen, Suchen oder Nachfragen verbringt, rechnet sich ein Werkzeug meist innerhalb eines Jahres. Wenn nicht, sagen wir das, denn dann ist es die falsche Investition.',
      },
      {
        frage: 'Was, wenn ich mit dir nicht mehr zusammenarbeiten will?',
        antwort:
          'Das Urheberrecht bleibt bei uns, aber du bleibst arbeitsfähig: Du darfst das Gebaute für deinen Betrieb weiter nutzen und anpassen lassen, auch von jemand anderem. Nicht erlaubt ist, es weiterzugeben oder weiterzuverkaufen. Dass ein anderer damit weiterarbeiten kann, liegt nicht an einer besonderen Handschrift, sondern an der Wahl der Werkzeuge: Next.js und TypeScript, verbreitete Bausteine statt eines hauseigenen Systems, das nur wir pflegen können. Eine Übergabe unterstützen wir, statt sie zu erschweren. Was dabei genau gilt, halten wir vorher im Vertrag fest.',
      },
      {
        frage: 'Können meine bestehenden Daten übernommen werden?',
        antwort:
          'In der Regel ja. Excel-Listen, Exporte aus Altsystemen, teilweise auch Datenbanken direkt. Wie sauber das läuft, hängt vom Zustand der Daten ab. Das schauen wir uns vorher an, damit im Angebot steht, was tatsächlich auf uns zukommt.',
      },
    ],
  },
  {
    slug: 'seo-zuerich',
    name: 'SEO',
    metaTitle: 'SEO Zürich: bei Google gefunden werden | Insyte',
    metaDescription:
      'Suchmaschinenoptimierung für KMU in Zürich: Technik, strukturierte Daten, Inhalte und lokale Sichtbarkeit. Preis nach dem Erstgespräch.',
    eyebrow: 'Leistung',
    h1: 'SEO, damit dich findet, wer dich sucht',
    lead: 'Eine Website nützt wenig, wenn sie niemand sieht. Wir bringen die technischen Grundlagen in Ordnung und arbeiten an dem, was danach über die Position entscheidet: Inhalt und lokale Signale.',
    preisAb: null,
    preisEinheit: null,
    preisHinweis:
      'Hier gibt es bewusst keinen Ab-Preis. Der Aufwand hängt daran, was schon da ist: Manche Seiten brauchen zwei Tage Technik, andere über Monate neue Inhalte. Nach einer Analyse bekommst du eine Liste mit Aufwand pro Punkt und entscheidest, was davon gemacht wird.',
    problem: [
      'Bei Suchmaschinen wird selten eine einzige Sache falsch gemacht. Es sind viele kleine, die zusammen dafür sorgen, dass eine Seite nicht auftaucht. Die Sitemap fehlt, also findet Google neue Seiten nur über Umwege. Die Titel beginnen mit dem Firmennamen, den niemand sucht, statt mit dem, was jemand tippt. Es gibt kein strukturiertes Datenmarkup, also muss die Suchmaschine raten, ob hier ein Anbieter in Zürich sitzt.',
      'Der häufigste Fehler ist aber ein anderer: zu wenig Text. Eine Seite, die schön aussieht und drei Sätze enthält, kann für nichts ranken. Google braucht Inhalt, um zu verstehen, wofür du relevant bist.',
      'Und selbst wenn alles stimmt, dauert es. Indexierung braucht Tage bis Wochen, Positionsverschiebungen Monate. Wer dir eine Verbesserung in vierzehn Tagen verspricht, verkauft dir etwas anderes.',
    ],
    vorgehen: [
      {
        titel: 'Analyse',
        text: 'Wir prüfen die Seite technisch und inhaltlich: Sind Sitemap und robots.txt da, zeigen die Canonicals auf die richtige Adresse, gibt es strukturierte Daten, wie lang sind die Texte, wofür erscheinst du heute schon. Am Ende steht eine Liste mit Aufwand pro Punkt.',
      },
      {
        titel: 'Technik in Ordnung bringen',
        text: 'Das ist der Teil mit klarem Ende: Sitemap, robots.txt, Canonicals, Titel und Beschreibungen, strukturierte Daten für den lokalen Bezug, Vorschaubilder beim Teilen. Meist ein bis zwei Tage Arbeit, und danach steht dir technisch nichts mehr im Weg.',
      },
      {
        titel: 'Messung einrichten',
        text: 'Search Console verifizieren und Sitemap einreichen, Google-Business-Profil anlegen. Ohne das arbeitest du blind und siehst weder, für welche Begriffe du erscheinst, noch ob sich etwas bewegt.',
      },
      {
        titel: 'Inhalte aufbauen',
        text: 'Der Teil, der tatsächlich Positionen bringt, und der längste. Eine Seite pro Suchbegriff statt einer Sammelseite, Referenzen mit echtem Text, Antworten auf die Fragen, die deine Kunden stellen. Wir schreiben das Gerüst, die Fachaussagen kommen von dir.',
      },
      {
        titel: 'Nachschauen',
        text: 'Monatlich in die Search Console: Für welche Begriffe erscheinst du, wo stehst du auf Position acht bis zwanzig, wo lohnt sich Nachbessern. Das lässt sich auch selbst machen, wir zeigen dir wie.',
      },
    ],
    enthalten: [
      'Technische Analyse mit Aufwand pro Punkt',
      'Sitemap, robots.txt und Canonicals',
      'Titel und Beschreibungen auf Suchbegriffe ausgerichtet',
      'Strukturierte Daten für den lokalen Bezug',
      'Search Console einrichten und Sitemap einreichen',
      'Unterstützung beim Google-Business-Profil',
      'Vorschaubilder für geteilte Links',
    ],
    ctaAktion: 'Analyse anfragen',
    faq: [
      {
        frage: 'Wie lange dauert es, bis ich weiter oben stehe?',
        antwort:
          'Die technischen Punkte sind in ein bis zwei Tagen erledigt und wirken, sobald Google die Seite neu liest. Bis sich Positionen verschieben, vergehen Monate. Das ist keine Ausrede, sondern wie Suchmaschinen funktionieren: Sie beobachten über Zeit, ob eine Seite hält, was der Titel verspricht.',
      },
      {
        frage: 'Warum gibt es keinen Festpreis?',
        antwort:
          'Weil der Aufwand fast vollständig davon abhängt, was schon da ist. Bei einer Seite fehlen nur Sitemap und strukturierte Daten, das ist an einem Tag erledigt. Bei einer anderen ist die Technik in Ordnung, aber es gibt zu wenig Text, und das ist Arbeit über Monate. Nach der Analyse bekommst du eine Liste mit Aufwand pro Punkt und entscheidest selbst, was davon gemacht wird.',
      },
      {
        frage: 'Könnt ihr eine bestimmte Position garantieren?',
        antwort:
          'Nein, und niemand kann das seriös. Wer Platz eins garantiert, weiss entweder nicht, wovon er redet, oder meint einen Begriff, den ohnehin niemand sucht. Was sich zusagen lässt: dass die technischen Hürden weg sind, dass gemessen wird und dass die Inhalte auf Begriffe zielen, nach denen tatsächlich gesucht wird.',
      },
    ],
  },
  {
    slug: 'wartung-support',
    name: 'Wartung & Support',
    metaTitle: 'Website-Wartung und Support mit festem Ansprechpartner | Insyte',
    metaDescription:
      'Laufende Wartung für Website und Web-Apps: Hosting, Aktualisierungen, Sicherung und eine Stunde Arbeit im Monat. Ab CHF 50 pro Monat.',
    eyebrow: 'Leistung',
    h1: 'Wartung und Support, damit es auch in zwei Jahren läuft',
    lead: 'Meistens schliesst die Wartung direkt an ein Projekt bei uns an. Sie geht aber auch allein: Wir übernehmen Websites, die anderswo entstanden sind, sofern sich das noch lohnt.',
    preisAb: 50,
    preisEinheit: 'pro Monat',
    preisHinweis:
      `Enthalten sind das Hosting, die laufende Pflege und eine Stunde Arbeit pro Monat. Reicht die nicht, kostet jede weitere Stunde ${formatPreis(STUNDENSATZ)}. Monatlich kündbar, ohne Mindestlaufzeit.`,
    problem: [
      'Die meisten Websites verfallen nicht mit einem Knall, sondern langsam. Ein Zertifikat läuft ab und der Browser warnt Besucher vor deiner eigenen Seite. Eine Komponente ist zwei Jahre nicht aktualisiert und wird zur offenen Tür. Die Öffnungszeiten stimmen seit dem letzten Umbau nicht mehr, weil niemand weiss, wo man sie ändert.',
      'Keines dieser Dinge ist für sich dramatisch. Zusammen führen sie dazu, dass eine Seite, die einmal Geld gekostet hat, irgendwann eher schadet als nützt, und dass der nächste Auftritt wieder bei null anfängt, statt auf dem aufzubauen, was da ist.',
      'Der häufigste Grund dafür ist banal: Es gibt niemanden, den man fragen könnte. Die Agentur von damals antwortet nicht mehr, der Neffe, der es gebaut hat, studiert inzwischen etwas anderes.',
    ],
    vorgehen: [
      {
        titel: 'Bestandsaufnahme',
        text: 'Einmal durch die bestehende Seite: Was läuft, was ist veraltet, wo liegen Domain, Hosting und Zugänge. Am Ende steht eine Liste, auch wenn du die Wartung nicht bei uns nimmst.',
      },
      {
        titel: 'Sehen, was möglich ist',
        text: 'Aus der Liste wird eine Empfehlung. Manche Seiten lassen sich mit wenigen Handgriffen wieder in einen Zustand bringen, in dem sich Pflege lohnt. Bei anderen fällt die Antwort anders aus.',
      },
      {
        titel: 'Oder ein neuer Auftritt',
        optional: true,
        text: 'Oft ist die bestehende Seite technisch schon zu weit weg. Dann ist ein Neubau ehrlicher und am Ende günstiger, als jahrelang etwas zu pflegen, das nicht mehr trägt. Wir sagen das, bevor du einen Wartungsvertrag unterschreibst, der dir nichts bringt.',
        link: { text: 'Zu Webdesign', href: '/leistungen/webdesign-zuerich' },
      },
      {
        titel: 'Vertrag',
        text: 'Was übernommen wird, was es kostet und wie schnell wir reagieren, steht schriftlich fest. Monatlich kündbar: Wenn du den Nutzen nicht siehst, sollst du gehen können.',
      },
      {
        titel: 'Laufender Betrieb',
        text: 'Hosting, Aktualisierungen, Sicherungen, Überwachung der Erreichbarkeit. Das läuft im Hintergrund, du merkst im Normalfall nichts davon.',
      },
      {
        titel: 'Änderungen',
        text: 'Neue Öffnungszeiten, ein zusätzliches Teammitglied, ein Text, der nicht mehr stimmt. Du schreibst, was weg soll und was hin. Im Regelfall am selben oder nächsten Arbeitstag erledigt.',
      },
      {
        titel: 'Einmal im Monat draufschauen',
        text: 'Was hat sich im Betrieb verändert, was gehört auf die Seite, was kann weg. Das ist die enthaltene Stunde pro Monat, und sie verhindert, dass die Seite langsam an der Realität vorbeiläuft.',
      },
    ],
    enthalten: [
      'Hosting der Website',
      `Eine Stunde Arbeit pro Monat, jede weitere zu ${formatPreis(STUNDENSATZ)}`,
      'Sicherheits- und Systemaktualisierungen',
      'Regelmässige Sicherung, auf Wunsch mit Wiederherstellungstest',
      'Überwachung der Erreichbarkeit',
      'SSL-Zertifikat und Domainverlängerung im Blick behalten',
      'Ein fester Ansprechpartner, kein Ticketsystem',
      'Monatlicher Durchgang durch die Seite',
    ],
    ctaAktion: 'Wartung starten',
    faq: [
      {
        frage: 'Übernehmt ihr auch Websites, die ihr nicht gebaut habt?',
        antwort:
          'Ja, das ist sogar der häufigere Fall. Voraussetzung ist ein Blick auf den Bestand: Bei manchen Seiten ist die Wartung sinnvoll, bei anderen ist die ehrliche Antwort, dass ein Neubau günstiger kommt als das Pflegen von etwas, das technisch am Ende ist. Das sagen wir dir nach der Bestandsaufnahme.',
      },
      {
        frage: 'Was passiert, wenn die enthaltene Stunde nicht reicht?',
        antwort:
          `Dann rechnen wir jede weitere Stunde zu ${formatPreis(STUNDENSATZ)} ab, und zwar erst nach Absprache. Du bekommst vorher gesagt, wie lange etwas dauert, damit am Monatsende keine Rechnung auftaucht, mit der du nicht gerechnet hast. Nicht gebrauchte Stunden verfallen allerdings, sie lassen sich nicht ansparen.`,
      },
      {
        frage: 'Wie schnell bekomme ich eine Antwort?',
        antwort:
          'Auf Anfragen melden wir uns innerhalb von 24 Stunden an Werktagen. Kleine Änderungen sind meist am selben oder nächsten Arbeitstag drauf. Wenn die Seite komplett ausfällt, hat das Vorrang vor allem anderen.',
      },
      {
        frage: 'Bin ich an eine Laufzeit gebunden?',
        antwort:
          'Nein, monatlich kündbar. Eine Wartung, die nur durch einen Vertrag zusammenhält, ist ihr Geld ohnehin nicht wert. Wenn du den Nutzen nicht siehst, sollst du gehen können.',
      },
    ]
  },
]

export const leistungen: Leistung[] = ALL

export const leistungBySlug = (slug: string): Leistung | undefined =>
  ALL.find((l) => l.slug === slug)

export const leistungSlugs = (): string[] => ALL.map((l) => l.slug)

/**
 * Preisangabe für Fliesstext und Buttons. Fängt den Fall ab, dass eine
 * Leistung keinen Einstiegspreis hat, weil der Umfang zu unterschiedlich ist.
 */
export function preisText(leistung: Leistung): string {
  if (leistung.preisAb === null) return 'Preis nach Gespräch'
  const einheit = leistung.preisEinheit === 'pro Monat' ? ' pro Monat' : ''
  return `ab ${formatPreis(leistung.preisAb)}${einheit}`
}

/** Beschriftung des Abschluss-Buttons. */
export function ctaText(leistung: Leistung): string {
  if (leistung.preisAb === null) return leistung.ctaAktion
  const einheit = leistung.preisEinheit === 'pro Monat' ? ' im Monat' : ''
  return `Jetzt ab ${formatPreis(leistung.preisAb)}${einheit} ${leistung.ctaAktion}`
}

/** Preis wie auf der Seite: CHF 1'500 – Schweizer Tausendertrennung. */
export function formatPreis(betrag: number): string {
  return `CHF ${betrag.toLocaleString('de-CH').replace(/[’,.]/g, "'")}`
}
