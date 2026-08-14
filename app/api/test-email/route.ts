import { Resend } from 'resend'
import { NextResponse } from 'next/server'

// Für Cloudflare Pages (@cloudflare/next-on-pages) erforderlich.
export const runtime = 'edge'

// Dev-only Hilfsroute, um den Resend-Versand zu testen.
// Aufruf: `npm run dev`, dann http://localhost:3000/api/test-email öffnen.
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'RESEND_API_KEY fehlt in .env.local' },
      { status: 500 }
    )
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { data, error } = await resend.emails.send({
    from: process.env.CONTACT_FROM ?? 'Insyte Website <noreply@insyte.ch>',
    to: 'info@insyte.ch',
    subject: 'Resend Test – Insyte',
    html: '<p>Testmail erfolgreich versendet. <strong>Resend funktioniert.</strong></p>',
  })

  if (error) {
    console.error('Resend test error:', error)
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ success: true, id: data?.id })
}
