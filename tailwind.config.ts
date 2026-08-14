import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        wald:   '#1A2616',
        gruen:  '#2E7D4F',
        // Hover-Stufe für Flächen in Grün. Kontrast zu Weiss steigt dabei
        // von 5,05:1 auf 6,6:1 — der Hover wird also auch lesbarer.
        'gruen-dunkel': '#276942',
        salbei: '#D6EDE0',
        sand:   '#F6F3EE',
        erde:   '#4A4438',
        leinen: '#DDD8CF',
        white:  '#FFFFFF',
      },
      fontFamily: {
        // Display: Bricolage Grotesque (Variable Font, 200–800)
        display: ['var(--font-display)', 'sans-serif'],
        inter:   ['var(--font-inter)', 'sans-serif'],
        sans:    ['var(--font-inter)', 'sans-serif'],
        // Labels/Eyebrows
        mono:    ['var(--font-mono)', 'ui-monospace', 'monospace'],
        // Marker-Akzent — fällt auf die Display-Schrift zurück, nicht auf System-Sans
        marker:  ['var(--font-marker)', 'var(--font-display)', 'sans-serif'],
      },
      // Eine Skala für die ganze Seite. Zeilenhöhe und Laufweite stecken im
      // Token, damit sie nicht an jeder Fundstelle einzeln gesetzt werden —
      // genau daraus waren vorher neun leicht verschiedene clamp()-Varianten
      // für vier Überschriftenebenen entstanden.
      fontSize: {
        xs:   ['0.75rem',  { lineHeight: '1.5' }],
        sm:   ['0.875rem', { lineHeight: '1.6' }],
        base: ['1rem',     { lineHeight: '1.65' }],
        lg:   ['1.125rem', { lineHeight: '1.65' }],

        h4: ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.015em' }],
        h3: ['clamp(22px, 2.4vw, 30px)', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        h2: ['clamp(28px, 3.6vw, 44px)', { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
        h1: ['clamp(34px, 5vw, 60px)',   { lineHeight: '1.05', letterSpacing: '-0.03em' }],

        // Sonderfall: die grosse Jahreszahl im Zeitstrahl.
        stat: ['clamp(44px, 7vw, 76px)', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
    },
  },
  plugins: [],
}

export default config
