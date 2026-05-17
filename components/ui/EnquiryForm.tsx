'use client'

import { useState, useRef } from 'react'
import { CheckCircle } from 'lucide-react'
import { submitEnquiry } from '@/app/contact/actions'

const INTEREST_OPTIONS = [
  'Corporate Morning Tea',
  'Corporate Staff Meeting',
  'Corporate Friday Lunch',
  'Monthly Staff Birthday Package',
  'Individual Staff Birthday Package',
  'Party Package',
  'Custom Catering',
  'Menu Item / Platter Order',
]

export default function EnquiryForm() {
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError('')
    try {
      const result = await submitEnquiry(formData)
      if (result.success) {
        setSuccess(true)
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
