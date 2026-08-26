import type { MetadataRoute } from 'next'
import { url } from '@/lib/site'
import { projectsByNewest } from '@/lib/projects'

/**
 * Ohne Sitemap findet Google neue Seiten nur über interne Links – die
 * Projekt-Detailseiten hängen dafür zu tief. Die Liste wird aus
 * `lib/projects.ts` erzeugt, damit ein neues Projekt nicht an zwei Stellen
 * nachgetragen werden muss.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const seiten: Array<{
    pfad: string
    prioritaet: number
    frequenz: MetadataRoute.Sitemap[number]['changeFrequency']
  }> = [
    { pfad: '', prioritaet: 1, frequenz: 'monthly' },
    { pfad: '/leistungen', prioritaet: 0.9, frequenz: 'monthly' },
    { pfad: '/projekte', prioritaet: 0.9, frequenz: 'weekly' },
    { pfad: '/team', prioritaet: 0.7, frequenz: 'yearly' },
    { pfad: '/kontakt', prioritaet: 0.8, frequenz: 'yearly' },
    // /impressum und /datenschutz fehlen hier bewusst: beide stehen auf
    // noindex. Eine Sitemap ist eine Aufforderung zum Indexieren – zusammen
    // mit noindex wäre das ein Widerspruch.
  ]

  const statisch = seiten.map((seite) => ({
    url: url(seite.pfad),
    lastModified: new Date(),
    changeFrequency: seite.frequenz,
    priority: seite.prioritaet,
  }))

  // `date` ist YYYY-MM; ohne Tag ist das kein gültiges Datum.
  const projekte = projectsByNewest.map((projekt) => ({
    url: url(`/projekte/${projekt.id}`),
    lastModified: new Date(`${projekt.date}-01`),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [...statisch, ...projekte]
}
