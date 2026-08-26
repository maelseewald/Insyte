import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { projectById, projectIds, projectsByNewest } from '@/lib/projects'
import { url, SITE_URL } from '@/lib/site'

type Props = { params: { id: string } }

/* Alle Detailseiten zur Buildzeit erzeugen – sie sind damit statisch und
   sofort crawlbar, ohne Server-Rendering pro Aufruf. */
export function generateStaticParams() {
  return projectIds().map((id) => ({ id }))
}

export function generateMetadata({ params }: Props): Metadata {
  const projekt = projectById(params.id)
  if (!projekt) return {}

  const titel = `${projekt.name} – ${projekt.type} | Insyte`
  const pfad = `/projekte/${projekt.id}`

  return {
    title: titel,
    description: projekt.description.slice(0, 155),
    alternates: { canonical: url(pfad) },
    openGraph: {
      title: titel,
      description: projekt.description.slice(0, 155),
      url: url(pfad),
      siteName: 'Insyte',
      locale: 'de_CH',
      type: 'article',
    },
  }
}

export default function ProjektDetail({ params }: Props) {
  const projekt = projectById(params.id)
  if (!projekt) notFound()

  const pfad = `/projekte/${projekt.id}`

  /* Breadcrumb macht den Pfad Start → Projekte → Projekt explizit. Google
     zeigt ihn statt der nackten URL im Suchergebnis an. */
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Projekte', item: url('/projekte') },
      { '@type': 'ListItem', position: 3, name: projekt.name, item: url(pfad) },
    ],
  }

  const projektSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: projekt.name,
    description: projekt.description,
    url: url(pfad),
    dateCreated: projekt.date,
    keywords: projekt.tags.join(', '),
    creator: { '@id': `${SITE_URL}/#organization` },
    ...(projekt.liveUrl ? { sameAs: [projekt.liveUrl] } : {}),
  }

  // Für die Weiterleitung am Seitenende: die zwei anderen Projekte.
  const weitere = projectsByNewest.filter((p) => p.id !== projekt.id).slice(0, 2)

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projektSchema) }}
      />

      <main>
        <section className="bg-sand pt-28 pb-16 md:pt-40 md:pb-20 px-6">
          <div className="mx-auto max-w-3xl">
            {/* Sichtbarer Breadcrumb, passend zum Schema oben */}
            <nav aria-label="Brotkrumen" className="label-mono text-erde/50 mb-6">
              <Link href="/projekte" className="hover:text-gruen transition-colors">
                Projekte
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gruen">{projekt.name}</span>
            </nav>

            <p className="label-mono text-gruen mb-5">
              {projekt.type} · {projekt.year}
            </p>

            <h1 className="font-display font-bold text-h1 text-wald text-balance mb-7">
              {projekt.name}
            </h1>

            <p className="text-erde text-lg leading-relaxed mb-9">
              {projekt.description}
            </p>

            {projekt.result && (
              <p className="text-erde text-lg leading-relaxed mb-9">
                {projekt.result}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-10">
              {projekt.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-salbei px-3 py-1 text-sm text-wald"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {projekt.liveUrl && (
                <a
                  href={projekt.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Projekt ansehen
                </a>
              )}
              {projekt.repoUrl && (
                <a
                  href={projekt.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Code auf GitHub
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Interne Verlinkung: hält Besucher und Crawler in Bewegung */}
        {weitere.length > 0 && (
          <section className="bg-sand border-t border-leinen py-14 px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display font-bold text-h3 text-wald mb-6">
                Weitere Projekte
              </h2>
              <ul className="flex flex-col gap-3">
                {weitere.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/projekte/${p.id}`}
                      className="group flex items-baseline gap-3 text-erde hover:text-gruen transition-colors"
                    >
                      <span className="font-medium">{p.name}</span>
                      <span className="label-mono text-erde/50 group-hover:text-gruen/70">
                        {p.type}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="bg-wald py-16 md:py-24 px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display font-bold text-h2 text-white mb-5">
              Etwas Ähnliches im Kopf?
            </h2>
            <p className="text-sand/70 text-base mb-9">
              Schreib uns – wir schauen es uns an und melden uns innerhalb von
              24 Stunden.
            </p>
            <Link href="/kontakt" className="btn-primary">
              Projekt starten
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
