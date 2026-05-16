import { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import EnquiryForm from '@/components/ui/EnquiryForm'
import { sanityFetch } from '@/lib/sanity'
import { SITE_SETTINGS_QUERY } from '@/lib/queries'
import { SiteSettings } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Get a Quote',
  description: 'Submit a catering enquiry for your corporate, private, or community event. We respond within 24 hours.',
}

export default async function ContactPage() {
  const settings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY, revalidate: 300 }).catch(() => null)
  const email = settings?.email || 'catering@fitzroylane.com'
  const phone = settings?.phone
  const address = settings?.address || 'Seven Hills, NSW'

  return (
    <>
      <PageHeader
        label="Enquiries"
        title="Get a Quote"
        subtitle="Tell us about your event and we'll come back to you with a personalised quote within 24 hours."
      />

      <section className="py-16 lg:py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="font-playfair text-2xl text-fitzroy-charcoal mb-6">Event Enquiry</h2>
              <EnquiryForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div>
                <h3 className="font-playfair text-xl text-fitzroy-charcoal mb-4">Contact Details</h3>
                <ul className="space-y-3 font-inter text-sm text-fitzroy-taupe">
                  <li className="flex gap-3">
                    <span className="text-fitzroy-bronze shrink-0 mt-0.5">✉</span>
                    <a href={`mailto:${email}`} className="hover:text-fitzroy-charcoal transition-colors">{email}</a>
                  </li>
                  {phone && (
                    <li className="flex gap-3">
                      <span className="text-fitzroy-bronze shrink-0 mt-0.5">✆</span>
                      <a href={`tel:${phone}`} className="hover:text-fitzroy-charcoal transition-colors">{phone}</a>
                    </li>
                  )}
                  <li className="flex gap-3">
                    <span className="text-fitzroy-bronze shrink-0 mt-0.5">⊙</span>
                    <span>{address}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-fitzroy-sand/30 border border-fitzroy-sand p-5">
                <h4 className="font-playfair text-fitzroy-charcoal mb-3">Good to know</h4>
                <ul className="space-y-2.5 font-inter text-sm text-fitzroy-taupe">
                  <li className="flex gap-2"><span className="text-fitzroy-bronze shrink-0">—</span>Minimum order $350</li>
                  <li className="flex gap-2"><span className="text-fitzroy-bronze shrink-0">—</span>48 hours minimum notice required</li>
                  <li className="flex gap-2"><span className="text-fitzroy-bronze shrink-0">—</span>Delivery within ~20km of Seven Hills</li>
                  <li className="flex gap-2"><span className="text-fitzroy-bronze shrink-0">—</span>We respond within 24 hours</li>
                  <li className="flex gap-2"><span className="text-fitzroy-bronze shrink-0">—</span>Payment via EFT or Stripe</li>
                </ul>
              </div>

              <div>
                <h4 className="font-playfair text-fitzroy-charcoal mb-3">Service Areas</h4>
                <p className="font-inter text-sm text-fitzroy-taupe leading-relaxed">
                  Seven Hills, Blacktown, Parramatta, Bella Vista, Norwest, Castle Hill, Baulkham Hills, Pendle Hill, Winston Hills, Kellyville, Rouse Hill, and surrounding Western Sydney suburbs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
