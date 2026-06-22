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
        salbei: '#D6EDE0',
        sand:   '#F6F3EE',
        erde:   '#4A4438',
        leinen: '#DDD8CF',
        white:  '#FFFFFF',
      },
      fontFamily: {
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
        inter:   ['var(--font-inter)', 'sans-serif'],
        sans:    ['var(--font-inter)', 'sans-serif'],
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
