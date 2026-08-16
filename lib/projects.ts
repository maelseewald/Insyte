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
      'Ein Multiplayer-Spiel im Browser, gedacht fürs Handy im Querformat: rollende Maschinen auf grünem Feld, zwei bis zehn auf einer Karte. Gewonnen wird über Können, nicht über Geld – Skins verändern nur das Aussehen.',
    liveUrl: 'https://smallbrawl.insyte.ch',
    repoUrl: 'https://github.com/maelseewald/SmallBrawl',
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
      'Web-App rund um Panini-Sammelbilder – damit behältst du den Überblick über deine Sammlung und siehst, welche Bilder dir noch fehlen.',
    repoUrl: 'https://github.com/maelseewald/paninicheck',
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
      'Meine persönliche Portfolio-Website – ein Überblick über mich, meine Projekte und meinen Weg als Entwickler.',
    liveUrl: 'https://mael.5eewald.ch',
  },
]

/** All projects, newest first. */
export const projectsByNewest: Project[] = [...ALL].sort((a, b) =>
  b.date.localeCompare(a.date)
)

/** The newest N projects (for the homepage teaser). */
export const latestProjects = (n: number): Project[] =>
  projectsByNewest.slice(0, n)
