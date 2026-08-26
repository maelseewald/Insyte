import Link from 'next/link'
import { BUSINESS } from '@/lib/site'

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
            <span className="font-display font-bold text-lg text-white leading-none">
              insyte<span className="text-gruen">.</span>
            </span>
          </div>
          <p className="text-sand/50 text-xs">
            Code. Projekte. Lösungen.
          </p>
          {/* Adresse sichtbar auf jeder Seite, nicht nur im Impressum: Google
              gleicht Name/Adresse mit dem Business-Profil und Verzeichnissen
              ab. Das `address`-Element macht den Bezug auch semantisch klar. */}
          <address className="text-sand/40 text-xs not-italic mt-2 leading-relaxed">
            {BUSINESS.street}, {BUSINESS.postalCode} {BUSINESS.city}
            <br />
            <a
              href={`mailto:${BUSINESS.email}`}
              className="hover:text-sand/70 transition-colors"
            >
              {BUSINESS.email}
            </a>
          </address>
        </div>

        {/* Links */}
        <nav
          className="flex items-center gap-5"
          aria-label="Footer Navigation"
        >
          <Link
            href="/impressum"
            className="text-sand/50 text-xs hover:text-sand/80 transition-colors"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="text-sand/50 text-xs hover:text-sand/80 transition-colors"
          >
            Datenschutz
          </Link>
          <a
            href="https://www.linkedin.com/company/insyte-ch/"
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
          <a
            href="https://www.instagram.com/insyte_ch/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Insyte auf Instagram"
            className="text-sand/50 hover:text-sand/80 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 01-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.81-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.81.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.9 5.9 0 00.63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.9 5.9 0 002.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 002.13-1.38 5.9 5.9 0 001.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 00-1.38-2.13A5.9 5.9 0 0019.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm7.85-10.41a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
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
          © 2026 Insyte – Mael Seewald. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  )
}
