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
      fontSize: {
        'display': ['56px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'heading':  ['40px', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'subhead':  ['24px', { lineHeight: '1.3',  letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
}

export default config
