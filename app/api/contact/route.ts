import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request body
    const validationResult = contactFormSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, phone, service, description } = validationResult.data

    // In production, you would send an email here using Nodemailer or similar
    // For now, we'll log the submission and return success
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      service,
      description,
      timestamp: new Date().toISOString(),
    })

    // Placeholder for email sending logic
    // When you're ready to implement email, you would:
    // 1. Install nodemailer: pnpm add nodemailer
    // 2. Configure SMTP credentials in .env
    // 3. Send emails to both admin and user
    
    /*
    Example email implementation:
    
    import nodemailer from 'nodemailer'
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Send to admin
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `Nieuwe offerte aanvraag: ${service}`,
      html: `
        <h2>Nieuwe offerte aanvraag</h2>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefoon:</strong> ${phone}</p>
        <p><strong>Dienst:</strong> ${service}</p>
        <p><strong>Omschrijving:</strong> ${description || 'Geen omschrijving'}</p>
      `,
    })

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Bedankt voor uw offerte aanvraag - Lambert Afbouw',
      html: `
        <h2>Bedankt voor uw aanvraag, ${name}!</h2>
        <p>Wij hebben uw aanvraag voor ${service} ontvangen.</p>
        <p>Een van onze medewerkers neemt binnen 24 uur contact met u op.</p>
        <p>Met vriendelijke groet,<br>Team Lambert Afbouw</p>
      `,
    })
    */

    return NextResponse.json(
      { 
        success: true, 
        message: 'Bedankt voor uw aanvraag! Wij nemen zo snel mogelijk contact met u op.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Er is iets misgegaan. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}
