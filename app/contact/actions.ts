'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'catering@fitzroylane.com'

export async function submitEnquiry(formData: FormData) {
  const fullName = formData.get('fullName') as string
  const company = formData.get('company') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const eventDate = formData.get('eventDate') as string
  const eventTime = formData.get('eventTime') as string
  const guestCount = formData.get('guestCount') as string
  const deliveryAddress = formData.get('deliveryAddress') as string
  const interests = formData.getAll('interests') as string[]
  const selectedItems = formData.get('selectedItems') as string | null
  const message = formData.get('message') as string

  if (!fullName || !email || !phone || !eventDate || !guestCount || !deliveryAddress) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : 'Not specified'

  const emailBody = `
NEW CATERING ENQUIRY — FITZROY CATERING

---

CONTACT DETAILS
Name: ${fullName}
${company ? `Company: ${company}` : ''}
Email: ${email}
Phone: ${phone}

EVENT DETAILS
Date: ${formattedDate}
Time: ${eventTime || 'Not specified'}
Delivery Address: ${deliveryAddress}
Guest Count: ${guestCount}

INTERESTED IN
${interests.length > 0 ? interests.map((i) => `• ${i}`).join('\n') : 'Not specified'}
${selectedItems ? `\nSELECTED ITEMS & PACKAGES\n${selectedItems.split('\n').map((i) => `• ${i}`).join('\n')}` : ''}
ADDITIONAL DETAILS
${message || 'None provided'}

---
Submitted via fitzroycatering.com.au
  `.trim()

  try {
    if (!process.env.RESEND_API_KEY) {
      console.log('Resend API key not set. Enquiry received:\n', emailBody)
      return { success: true }
    }

    await resend.emails.send({
      from: 'Fitzroy Catering Website <noreply@fitzroycatering.com.au>',
      to: TO_EMAIL,
      reply_to: email,
      subject: `Catering Enquiry — ${fullName}${company ? ` (${company})` : ''} — ${formattedDate}`,
      text: emailBody,
    })

    return { success: true }
  } catch (err) {
    console.error('Failed to send enquiry email:', err)
    return { success: false, error: 'Failed to send your enquiry. Please email us directly at catering@fitzroylane.com' }
  }
}
