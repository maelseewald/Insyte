/** Ein Abschnitt der Projektgeschichte – `titel` wird zur h2 der Detailseite. */
export type StoryAbschnitt = { titel: string; text: string[] }

export type Project = {
  id: string
  name: string
  type: string
  category: 'Website' | 'Software'
  year: string
  /** YYYY-MM, used for chronological sorting */
  date: string
  tags: string[]
  description: string
  /** Optionales Ergebnis / Outcome */
  result?: string
  /**
   * Lange Fassung, nur für die Detailseite. Bewusst getrennt von
   * `description`: die kurze Fassung steht in den Karten des Zeitstrahls und
   * in der Meta-Description und darf dort nicht 500 Wörter lang werden.
   */
  story?: StoryAbschnitt[]
  /** Live-Website des Projekts (optional) */
  liveUrl?: string
  /** Öffentliches GitHub-Repo (optional) */
  repoUrl?: string
}

const ALL: Project[] = [
  {
    id: 'smallbrawl',
    name: 'SmallBrawl',
    type: 'Browser-Game',
    category: 'Software',
    year: '2026',
    date: '2026-08',
    tags: ['TypeScript', 'Vite', 'Multiplayer'],
    description:
      'Ein Multiplayer-Spiel im Browser, gebaut fürs Notebook: rollende Maschinen auf grünem Feld, zwei bis zehn auf einer Karte. Gewonnen wird über Können, nicht über Geld. Skins verändern nur das Aussehen.',
    liveUrl: 'https://smallbrawl.insyte.ch',
    repoUrl: 'https://github.com/maelseewald/SmallBrawl',
    story: [
      {
titel: 'Warum im Browser und nicht im App Store',
        text: [
          'Die ehrliche Antwort ist unspektakulär: Es war deutlich einfacher. Ein Browser-Spiel gibt es einmal, nicht zweimal für iOS und Android. Es braucht kein Entwicklerkonto, keine Freigabe, bei der jede Fehlerkorrektur Tage wartet, und keine Store-Gebühren. Für ein Projekt dieser Grösse ist das der Unterschied zwischen fertig geworden und irgendwann liegengeblieben.',
          'Der Nebeneffekt ist trotzdem der beste Teil: Teilen heisst einen Link schicken. Jemand wirft ihn in einen Gruppenchat, drei Leute tippen darauf und spielen kurz darauf zusammen. Niemand muss vorher etwas installieren. Und ein behobener Fehler ist beim nächsten Laden bei allen weg.',
        ],
      },
      {
        titel: 'Gebaut fürs Notebook',
        text: [
          'Zielgerät ist der Laptop: grosser Bildschirm, Tastatur, kein Zielen mit dem Daumen. Bei zwei bis zehn Maschinen auf einer Karte muss man sehen, wo die anderen sind, und darauf reagieren können. Beides braucht Platz und Präzision.',
          'Auf dem Handy läuft es trotzdem, aber nur im Querformat. Wer es hochkant öffnet, bekommt keine gestauchte Notlösung, sondern die Aufforderung, das Gerät zu drehen. Im Hochformat schrumpft der sichtbare Ausschnitt so weit, dass Reagieren zum Raten wird.',
        ],
      },
      {
        titel: 'Anmelden ohne Passwort',
        text: [
          'Spielen geht ohne Konto: Name eintippen, los. Wer seinen Fortschritt behalten will, also Siege, Niederlagen und Ausrüstung, meldet sich an. Und zwar mit einem Code, der per E-Mail kommt, nicht mit einem Passwort.',
          'Das ist bewusst so. Ein Passwort für ein Browser-Spiel wird entweder vergessen oder ist dasselbe wie überall sonst. Beides ist schlecht: Das eine kostet den Spieler seinen Fortschritt, das andere macht aus einem Spielkonto ein Sicherheitsrisiko, das mit dem Spiel nichts mehr zu tun hat. Ohne gespeicherte Passwörter gibt es auch nichts, was bei einem Zwischenfall gestohlen werden könnte.',
        ],
      },
      {
        titel: 'Können statt zahlen',
        text: [
          'Es gibt Ausrüstung: Waffen, Räder und Aussehen. Dazu ein Profil, das Siege, Niederlagen, Runden und die daraus errechnete Quote mitzählt. Was es nicht gibt, ist ein Vorteil, den man kaufen kann. Skins verändern ausschliesslich, wie eine Maschine aussieht.',
          'Diese Grenze ist leichter gezogen als gehalten, weil genau dort bei vergleichbaren Spielen das Geld liegt. Sie ist trotzdem der Kern: Ein Spiel, in dem der zahlende Gegner härter schiesst, ist für alle anderen nach der dritten Runde uninteressant. Die Statistik im Profil hat nur dann eine Bedeutung, wenn sie etwas über das Können aussagt und nicht über die Ausgaben.',
        ],
      },
      {
        titel: 'Technisch',
        text: [
          'Gebaut mit TypeScript und Vite, gerendert auf einem Canvas, ohne grosse Spiel-Engine. Was SmallBrawl an Darstellung braucht, ist überschaubar genug dafür, und was nicht mitgeladen wird, muss auch niemand herunterladen, bevor er die erste Runde spielt.',
        ],
      },
    ],
  },
  {
    id: 'paninicheck',
    name: 'PaniniCheck',
    type: 'Web-App',
    category: 'Software',
    year: '2025',
    date: '2025-06',
    tags: ['Next.js', 'Web-App', 'TypeScript'],
    description:
      'Web-App rund um Panini-Sammelbilder. Damit behältst du den Überblick über deine Sammlung und siehst, welche Bilder dir noch fehlen.',
    repoUrl: 'https://github.com/maelseewald/paninicheck',
    story: [
      {
        titel: 'Das Problem mit der Zettelwirtschaft',
        text: [
          'Wer Sammelbilder sammelt, führt irgendwann Buch. Meist auf Papier, manchmal in einer Tabelle: welche Nummern sind da, welche fehlen, welche sind doppelt und taugen zum Tauschen. Das funktioniert, solange die Liste kurz ist.',
          'Bei einem vollständigen Album mit mehreren hundert Nummern kippt es. Die Liste ist zu Hause, der Tausch findet auf dem Pausenplatz statt. Wer beim Tauschen nicht sicher weiss, ob er eine Nummer schon hat, tauscht am Ende ein Doppeltes gegen ein Doppeltes.',
        ],
      },
      {
        titel: 'Was gebaut wurde',
        text: [
          'PaniniCheck bringt die Sammlung dorthin, wo getauscht wird: aufs Handy. Man hält fest, welche Nummern man besitzt, und sieht auf einen Blick, was noch fehlt und was doppelt vorhanden ist.',
          'Die Anwendung ist bewusst auf diese eine Frage zugeschnitten: habe ich die Nummer oder nicht. Alles, was darüber hinausginge, also Preisvergleiche, Marktplatz oder Bewertungen, hätte die Bedienung in genau dem Moment verlangsamt, in dem es schnell gehen muss.',
        ],
      },
      {
        titel: 'Technisch',
        text: [
          'Umgesetzt mit Next.js und TypeScript, als Web-App im Browser statt als Store-App. Dieselbe Überlegung wie bei SmallBrawl: Für etwas, das man während einer Tauschaktion kurz aufmacht, ist eine Installation die grössere Hürde als der Nutzen rechtfertigt.',
        ],
      },
    ],
  },
  {
    id: 'portfolio',
    name: 'Persönliches Portfolio',
    type: 'Portfolio-Website',
    category: 'Website',
    year: '2025',
    date: '2025-03',
    tags: ['Website', 'Design'],
    description:
      'Die persönliche Portfolio-Website von Mael Seewald, entstanden vor Insyte: ein Überblick über den Weg als Entwickler und die Projekte davor.',
    liveUrl: 'https://mael.5eewald.ch',
    story: [
      {
        titel: 'Wozu ein eigenes Portfolio',
        text: [
          'Vor Insyte stand die Frage, wie man zeigt, was man kann, ohne dass jemand ein Repository durchliest. Ein Lebenslauf beantwortet sie nicht: Er sagt, wo jemand war, nicht was dabei entstanden ist.',
          'Die Portfolio-Seite ist der Versuch, beides zusammenzubringen: Weg und Ergebnisse an einem Ort, für Leute gedacht, die keine Entwickler sind und trotzdem einschätzen wollen, ob es passt.',
        ],
      },
      {
        titel: 'Was dabei herauskam',
        text: [
          'Das Projekt war gleichzeitig die Übung, an der sich das Handwerk geklärt hat: Wie viel Gestaltung trägt, bevor sie im Weg steht. Wie eine Seite auf dem Handy aussieht, wenn sie nicht nachträglich zusammengeschoben wird. Wie man über eigene Arbeit schreibt, ohne dass es nach Werbung klingt.',
          'Vieles davon steckt heute in der Insyte-Website: die Zurückhaltung bei Effekten, die klare Trennung zwischen Überschrift und Fliesstext, das Grundprinzip, dass eine Seite zuerst lesbar sein muss und danach schön.',
        ],
      },
    ],
  },
]

/** All projects, newest first. */
export const projectsByNewest: Project[] = [...ALL].sort((a, b) =>
  b.date.localeCompare(a.date)
)

/** The newest N projects (for the homepage teaser). */
export const latestProjects = (n: number): Project[] =>
  projectsByNewest.slice(0, n)

/** Ein Projekt über seine ID – für die Detailseiten unter /projekte/[id]. */
export const projectById = (id: string): Project | undefined =>
  ALL.find((project) => project.id === id)

/** Alle IDs – Grundlage für generateStaticParams und die Sitemap. */
export const projectIds = (): string[] => ALL.map((project) => project.id)
