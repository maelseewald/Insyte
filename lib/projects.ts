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
  result: string
  /** Live-Website des Projekts (optional) */
  liveUrl?: string
  /** Öffentliches GitHub-Repo (optional) */
  repoUrl?: string
}

const ALL: Project[] = [
  {
    id: 'restaurant-adria',
    name: 'Restaurant Adria',
    type: 'Website Relaunch',
    category: 'Website',
    year: '2024',
    date: '2024-09',
    tags: ['Next.js', 'Design'],
    description:
      'Neuer Webauftritt mit digitaler Speisekarte und Tischreservation – mobil-optimiert und in zwei Sprachen.',
    result: 'Online-Reservationen verdoppelt, Telefonaufkommen spürbar gesunken.',
    liveUrl: 'https://restaurant-adria.ch',
    repoUrl: 'https://github.com/maelseewald/restaurant-adria',
  },
  {
    id: 'garage-steffen',
    name: 'Garage Steffen',
    type: 'Termin- & Offert-Tool',
    category: 'Software',
    year: '2024',
    date: '2024-05',
    tags: ['Software', 'Web-App'],
    description:
      'Kunden buchen Service-Termine online, das Team erstellt Offerten in wenigen Minuten.',
    result: 'Offerten in Minuten statt Stunden – mehr Zeit für die Werkstatt.',
    liveUrl: 'https://termine.garage-steffen.ch',
  },
  {
    id: 'schreinerei-brunner',
    name: 'Schreinerei Brunner',
    type: 'Auftragsmanagement',
    category: 'Software',
    year: '2024',
    date: '2024-02',
    tags: ['Software', 'React'],
    description:
      'Vom Anfrageformular bis zur Rechnung: alle Aufträge an einem Ort, inklusive Material- und Terminplanung.',
    result: 'Alle Aufträge an einem Ort – kein Zettelchaos mehr.',
  },
  {
    id: 'baeckerei-wyss',
    name: 'Bäckerei Wyss',
    type: 'Website & Onlineshop',
    category: 'Website',
    year: '2023',
    date: '2023-10',
    tags: ['Website', 'E-Commerce'],
    description:
      'Vorbestellung von Brot und Patisserie mit Abholzeiten, angebunden an die bestehende Kasse.',
    result: 'Vorbestellungen ab Tag eins, weniger Wartezeit am Tresen.',
    liveUrl: 'https://baeckerei-wyss.ch',
  },
  {
    id: 'physiopraxis-aare',
    name: 'Physiopraxis Aare',
    type: 'Buchungssystem',
    category: 'Software',
    year: '2023',
    date: '2023-06',
    tags: ['Software', 'Buchung'],
    description:
      'Selbstständige Terminbuchung mit automatischen Erinnerungen direkt für die Patienten.',
    result: 'Deutlich weniger verpasste Termine dank Erinnerungen.',
    liveUrl: 'https://termine.physio-aare.ch',
  },
  {
    id: 'blumenatelier-lea',
    name: 'Blumenatelier Lea',
    type: 'Online-Präsenz',
    category: 'Website',
    year: '2023',
    date: '2023-03',
    tags: ['Website', 'CMS'],
    description:
      'Ein ruhiger, bildstarker Auftritt mit Pflege-Tipps, gepflegt über ein einfaches CMS.',
    result: 'Lea pflegt die Seite selbst – ganz ohne Entwickler.',
    liveUrl: 'https://blumenatelier-lea.ch',
    repoUrl: 'https://github.com/maelseewald/blumenatelier-lea',
  },
  {
    id: 'hofladen-buehler',
    name: 'Hofladen Bühler',
    type: 'Website & Hofshop',
    category: 'Website',
    year: '2022',
    date: '2022-08',
    tags: ['Website', 'CMS'],
    description:
      'Saisonales Sortiment mit Selbstbedienungs-Shop und Wochen-Abo direkt vom Hof.',
    result: 'Wochen-Abo bringt planbaren, wiederkehrenden Umsatz.',
    liveUrl: 'https://hofladen-buehler.ch',
  },
  {
    id: 'treuhand-meier',
    name: 'Treuhand Meier',
    type: 'Kundenportal',
    category: 'Software',
    year: '2022',
    date: '2022-04',
    tags: ['Software', 'Portal'],
    description:
      'Sicherer Dokumenten-Austausch und Fristen-Übersicht für Mandanten – DSG-konform.',
    result: 'Dokumente sicher ausgetauscht, Fristen jederzeit im Blick.',
  },
]

/** All projects, newest first. */
export const projectsByNewest: Project[] = [...ALL].sort((a, b) =>
  b.date.localeCompare(a.date)
)

/** The newest N projects (for the homepage teaser). */
export const latestProjects = (n: number): Project[] =>
  projectsByNewest.slice(0, n)
