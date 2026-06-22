import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-wald border-t border-white/5 px-6 py-10">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + tagline */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 22 22"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="9.5" stroke="white" strokeWidth="2.2" />
              <circle cx="11" cy="11" r="3.5" fill="#2E7D4F" />
            </svg>
            <span className="font-jakarta font-bold text-lg text-white leading-none">
              insyte<span className="text-gruen">.</span>
            </span>
          </div>
          <p className="text-sand/50 text-xs">
            Digitale Lösungen. Lokale Wirkung.
          </p>
        </div>

        {/* Links */}
        <nav
          className="flex items-center gap-5"
          aria-label="Footer Navigation"
        >
          <Link
            href="/projekte"
            className="text-sand/50 text-xs hover:text-sand/80 transition-colors"
          >
            Projekte
          </Link>
          <a
            href="/impressum"
            className="text-sand/50 text-xs hover:text-sand/80 transition-colors"
          >
            Impressum
          </a>
          <a
            href="/datenschutz"
            className="text-sand/50 text-xs hover:text-sand/80 transition-colors"
          >
            Datenschutz
          </a>
          <a
            href="https://www.linkedin.com/company/insyte"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Insyte auf LinkedIn"
            className="text-sand/50 hover:text-sand/80 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </nav>

        {/* Copyright */}
        <p className="text-sand/40 text-xs">
          © 2025 Insyte – Alle Rechte vorbehalten
        </p>
      </div>
    </footer>
  )
}
