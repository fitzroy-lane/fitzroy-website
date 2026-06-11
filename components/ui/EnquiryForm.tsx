'use client'

import { useState, useRef } from 'react'
import { CheckCircle, Trash2 } from 'lucide-react'
import { submitEnquiry } from '@/app/contact/actions'
import { useQuote } from '@/contexts/QuoteContext'

const INTEREST_OPTIONS = [
  'Corporate Morning Tea',
  'Corporate Staff Meeting',
  'Corporate Friday Lunch',
  'Monthly Staff Birthday Package',
  'Individual Staff Birthday Package',
  'Event Package',
  'Custom Catering',
  'Menu Item / Platter Order',
]

export default function EnquiryForm() {
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const { items, removeItem, clearQuote } = useQuote()

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError('')
    if (items.length > 0) {
      formData.set('selectedItems', items.map((i) => `${i.count}× ${i.name}${i.quantity ? ` (${i.quantity})` : ''} — $${(i.price * i.count).toLocaleString()}`).join('\n'))
    }
    try {
      const result = await submitEnquiry(formData)
      if (result.success) {
        setSuccess(true)
        clearQuote()
        formRef.current?.reset()
      } else {
        setError(result.error || 'Something went wrong. Please try again or email us directly.')
      }
    } catch {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setPending(false)
    }
  }

  if (success) {
    return (
      <div className="bg-fitzroy-sand/30 border border-fitzroy-sand p-8 text-center">
        <CheckCircle className="w-10 h-10 text-fitzroy-sage mx-auto mb-3" strokeWidth={1.5} />
        <h3 className="font-playfair text-xl text-fitzroy-charcoal mb-2">Enquiry Received</h3>
        <p className="font-inter text-fitzroy-taupe text-sm">
          Thank you — we&apos;ll be in touch within 24 hours to discuss your event.
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-inter text-xs uppercase tracking-wider text-fitzroy-taupe mb-1.5">
            Full Name <span className="text-fitzroy-clay">*</span>
          </label>
          <input
            name="fullName"
            type="text"
            required
            className="w-full border border-fitzroy-sand bg-white px-4 py-3 font-inter text-sm text-fitzroy-charcoal focus:outline-none focus:border-fitzroy-bronze transition-colors"
          />
        </div>
        <div>
          <label className="block font-inter text-xs uppercase tracking-wider text-fitzroy-taupe mb-1.5">
            Company / Organisation
          </label>
          <input
            name="company"
            type="text"
            className="w-full border border-fitzroy-sand bg-white px-4 py-3 font-inter text-sm text-fitzroy-charcoal focus:outline-none focus:border-fitzroy-bronze transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-inter text-xs uppercase tracking-wider text-fitzroy-taupe mb-1.5">
            Email Address <span className="text-fitzroy-clay">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-fitzroy-sand bg-white px-4 py-3 font-inter text-sm text-fitzroy-charcoal focus:outline-none focus:border-fitzroy-bronze transition-colors"
          />
        </div>
        <div>
          <label className="block font-inter text-xs uppercase tracking-wider text-fitzroy-taupe mb-1.5">
            Contact Number <span className="text-fitzroy-clay">*</span>
          </label>
          <input
            name="phone"
            type="tel"
            required
            className="w-full border border-fitzroy-sand bg-white px-4 py-3 font-inter text-sm text-fitzroy-charcoal focus:outline-none focus:border-fitzroy-bronze transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-inter text-xs uppercase tracking-wider text-fitzroy-taupe mb-1.5">
            Date of Event <span className="text-fitzroy-clay">*</span>
          </label>
          <input
            name="eventDate"
            type="date"
            required
            className="w-full border border-fitzroy-sand bg-white px-4 py-3 font-inter text-sm text-fitzroy-charcoal focus:outline-none focus:border-fitzroy-bronze transition-colors"
          />
        </div>
        <div>
          <label className="block font-inter text-xs uppercase tracking-wider text-fitzroy-taupe mb-1.5">
            Time of Event
          </label>
          <input
            name="eventTime"
            type="time"
            className="w-full border border-fitzroy-sand bg-white px-4 py-3 font-inter text-sm text-fitzroy-charcoal focus:outline-none focus:border-fitzroy-bronze transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-inter text-xs uppercase tracking-wider text-fitzroy-taupe mb-1.5">
            Number of Guests <span className="text-fitzroy-clay">*</span>
          </label>
          <input
            name="guestCount"
            type="number"
            min="1"
            required
            className="w-full border border-fitzroy-sand bg-white px-4 py-3 font-inter text-sm text-fitzroy-charcoal focus:outline-none focus:border-fitzroy-bronze transition-colors"
          />
        </div>
        <div>
          <label className="block font-inter text-xs uppercase tracking-wider text-fitzroy-taupe mb-1.5">
            Delivery Address <span className="text-fitzroy-clay">*</span>
          </label>
          <input
            name="deliveryAddress"
            type="text"
            required
            className="w-full border border-fitzroy-sand bg-white px-4 py-3 font-inter text-sm text-fitzroy-charcoal focus:outline-none focus:border-fitzroy-bronze transition-colors"
          />
        </div>
      </div>

      {items.length > 0 && (
        <div>
          <label className="block font-inter text-xs uppercase tracking-wider text-fitzroy-taupe mb-2">
            Items from your quote
          </label>
          <div className="border border-fitzroy-sage/40 bg-fitzroy-sage/5 divide-y divide-fitzroy-sand">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 px-4 py-2.5">
                <div className="min-w-0">
                  <p className="font-inter text-sm text-fitzroy-charcoal leading-snug">
                    <span className="text-fitzroy-sage font-medium">{item.count}×</span> {item.name}
                  </p>
                  {item.quantity && (
                    <p className="font-inter text-xs text-fitzroy-stone">{item.quantity}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-playfair text-fitzroy-charcoal">${(item.price * item.count).toLocaleString()}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-fitzroy-stone hover:text-fitzroy-clay transition-colors"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))}
            <div className="px-4 py-2.5 flex justify-between items-center bg-fitzroy-sage/10">
              <span className="font-inter text-xs text-fitzroy-taupe">Estimated total</span>
              <span className="font-playfair text-fitzroy-charcoal">
                ${items.reduce((s, i) => s + i.price * i.count, 0).toLocaleString()}
              </span>
            </div>
          </div>
          <p className="font-inter text-xs text-fitzroy-stone mt-1.5">
            We&apos;ll confirm the final price when we contact you.
          </p>
        </div>
      )}

      <div>
        <label className="block font-inter text-xs uppercase tracking-wider text-fitzroy-taupe mb-2">
          What are you interested in?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {INTEREST_OPTIONS.map((option) => (
            <label key={option} className="flex items-start gap-2 cursor-pointer group">
              <input
                type="checkbox"
                name="interests"
                value={option}
                className="mt-0.5 accent-fitzroy-sage"
              />
              <span className="font-inter text-xs text-fitzroy-taupe group-hover:text-fitzroy-charcoal transition-colors leading-snug">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-inter text-xs uppercase tracking-wider text-fitzroy-taupe mb-1.5">
          Additional Details
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder="Dietary requirements, type of occasion, special requests..."
          className="w-full border border-fitzroy-sand bg-white px-4 py-3 font-inter text-sm text-fitzroy-charcoal focus:outline-none focus:border-fitzroy-bronze transition-colors resize-none"
        />
      </div>

      {error && (
        <p className="font-inter text-sm text-fitzroy-clay bg-fitzroy-clay/10 border border-fitzroy-clay/30 px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? 'Sending...' : 'Send Enquiry'}
      </button>

      <p className="font-inter text-xs text-fitzroy-stone text-center">
        We respond to all enquiries within 24 hours. Minimum order {' '}
        <span className="text-fitzroy-taupe">$350</span>. 48 hours notice required.
      </p>
    </form>
  )
}
