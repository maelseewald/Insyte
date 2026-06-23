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
            href="https://www.linkedin.com/in/maelseewald/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mael Seewald auf LinkedIn"
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
          <a
            href="https://github.com/maelseewald"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mael Seewald auf GitHub"
            className="text-sand/50 hover:text-sand/80 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
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
