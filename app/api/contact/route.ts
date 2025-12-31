import * as nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, phone, message } = body

    // Validate required fields
    if (!name || !email || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Escape HTML in user inputs
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeCompany = escapeHtml(company)
    const safePhone = phone ? escapeHtml(phone) : ''
    const safeMessage = message ? escapeHtml(message).replace(/\n/g, '<br>') : ''

    // Format the email body
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; margin-bottom: 5px; display: block; }
            .value { color: #333; padding: 8px; background-color: #f9f9f9; border-radius: 3px; }
            .message { padding: 12px; background-color: #f9f9f9; border-left: 4px solid #007bff; border-radius: 3px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Demo Request - Fixr Solutions</h2>
              <p style="margin: 0; color: #666;">A new demo request has been submitted through the intake form.</p>
            </div>
            
            <div class="field">
              <span class="label">Name:</span>
              <div class="value">${safeName}</div>
            </div>
            
            <div class="field">
              <span class="label">Email:</span>
              <div class="value">${safeEmail}</div>
            </div>
            
            <div class="field">
              <span class="label">Company:</span>
              <div class="value">${safeCompany}</div>
            </div>
            
            ${safePhone ? `
            <div class="field">
              <span class="label">Phone Number:</span>
              <div class="value">${safePhone}</div>
            </div>
            ` : ''}
            
            ${safeMessage ? `
            <div class="field">
              <span class="label">Message:</span>
              <div class="message">${safeMessage}</div>
            </div>
            ` : ''}
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 12px;">
              This email was sent from the Fixr Solutions intake form.
            </p>
          </div>
        </body>
      </html>
    `

    const emailText = `
New Demo Request - Fixr Solutions

A new demo request has been submitted through the intake form.

Name: ${name}
Email: ${email}
Company: ${company}
${phone ? `Phone Number: ${phone}\n` : ''}${message ? `Message: ${message}\n` : ''}

---
This email was sent from the Fixr Solutions intake form.
    `.trim()

    // Send email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Demo Request from ${name} - ${company}`,
      html: emailHtml,
      text: emailText,
      replyTo: email,
    }

    const info = await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, messageId: info.messageId }, { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
