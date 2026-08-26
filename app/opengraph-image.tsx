import { ImageResponse } from 'next/og'

/**
 * Vorschaubild für Links auf LinkedIn, WhatsApp, Slack. Ohne das erscheint
 * jeder geteilte Link als grauer Kasten – das kostet Klicks, und Klicks sind
 * ein Ranking-Signal.
 *
 * Liegt in `app/`, gilt darum für alle Seiten. Einzelne Routen können später
 * ein eigenes `opengraph-image.tsx` daneben legen.
 *
 * Gerendert wird über Satori: nur Flexbox, keine beliebigen CSS-Features.
 * Jedes `div` mit mehr als einem Kind braucht ein explizites `display: flex`.
 */
export const alt = 'Insyte – Webentwicklung und Software aus Zürich'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Brand-Tokens aus tailwind.config.ts – Satori kennt die Tailwind-Klassen nicht.
const WALD = '#1A2616'
const GRUEN = '#2E7D4F'
const SAND = '#F6F3EE'

/**
 * Satori kennt `next/font` nicht und hat ohne geladene Datei nur eine
 * Standardschrift in einem Schnitt – `fontWeight: 700` bliebe wirkungslos.
 * Darum Bricolage Grotesque (die Display-Schrift der Seite) direkt holen.
 *
 * Schlägt der Abruf fehl, rendert das Bild mit der Standardschrift weiter,
 * statt den ganzen Build zu kippen.
 */
async function ladeDisplaySchrift(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700',
      // Ohne Browser-User-Agent liefert Google woff2 – das kann Satori nicht.
      { headers: { 'User-Agent': 'Mozilla/5.0' } },
    ).then((r) => r.text())

    const treffer = css.match(/src: url\((https:[^)]+\.(?:ttf|otf|woff))\)/)
    if (!treffer) return null

    return await fetch(treffer[1]).then((r) => r.arrayBuffer())
  } catch {
    return null
  }
}

export default async function Image() {
  const schrift = await ladeDisplaySchrift()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: WALD,
          padding: '72px 80px',
          fontFamily: 'Bricolage, sans-serif',
        }}
      >
        {/* Wortmarke */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 999,
              border: `5px solid ${SAND}`,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 999,
                backgroundColor: GRUEN,
              }}
            />
          </div>
          <div style={{ display: 'flex', fontSize: 40, color: SAND, fontWeight: 700 }}>
            insyte
            <span style={{ color: GRUEN }}>.</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 68,
              lineHeight: 1.15,
              color: SAND,
              fontWeight: 700,
              maxWidth: 900,
            }}
          >
            Websites & Software für KMU
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 30,
              color: GRUEN,
              letterSpacing: 1,
            }}
          >
            Web &amp; Software · Zürich
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: schrift
        ? [{ name: 'Bricolage', data: schrift, weight: 700 as const, style: 'normal' as const }]
        : [],
    },
  )
}
