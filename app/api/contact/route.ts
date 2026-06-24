import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: 'Ungültige Anfrage.' },
      { status: 400 }
    )
  }

  const { name, email, message } = body as {
    name?: string
    email?: string
    message?: string
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: 'Alle Felder sind erforderlich.' },
      { status: 400 }
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: 'Ungültige E-Mail-Adresse.' },
      { status: 400 }
    )
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'E-Mail-Versand nicht konfiguriert.' },
      { status: 500 }
    )
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM ?? 'Insyte Website <noreply@insyte.ch>',
      to: process.env.CONTACT_TO ?? 'info@insyte.ch',
      replyTo: email,
      subject: `Neue Anfrage von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'E-Mail konnte nicht gesendet werden. Bitte versuche es später.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json(
      { error: 'E-Mail konnte nicht gesendet werden. Bitte versuche es später.' },
      { status: 500 }
    )
  }
}
