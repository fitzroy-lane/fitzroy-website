import Link from 'next/link'
import { Utensils, Star, Users } from 'lucide-react'

const ADD_ONS = [
  {
    Icon: Utensils,
    tier: 'The Basics',
    headline: 'Cutlery & Tableware Add-On',
    description:
      'Need cutlery and plates sorted too? We can include a set of quality disposable tableware so your guests are ready to eat the moment food arrives — no extras to source, no stress.',
    pricing: 'Contact us for pricing',
  },
  {
    Icon: Star,
    tier: 'The Full Spread',
    headline: 'Styled Setup & Pack Down',
    description:
      "Let us transform your space before guests arrive. We'll set up trestle tables dressed with linen, lay out premium platters, plates, and cutlery, and style the food presentation so everything looks as good as it tastes. Once the event is done, we'll return to pack it all down and take care of waste removal — so you can focus on enjoying your event.",
    pricing: 'From $200',
  },
  {
    Icon: Users,
    tier: 'Sit Back & Relax',
    headline: 'On-the-Day Staffing',
    description:
      "Want someone there to look after the food throughout your event? Our friendly staff can serve, replenish, and keep things running smoothly — so you're never pulled away from your guests.",
    pricing: 'From $150 · $50/hr additional · Sunday surcharges apply',
  },
]

export default function ElevateSection() {
  return (
    <section className="py-16 lg:py-20 bg-fitzroy-sand/30">
      <div className="container-site">
        <div className="text-center mb-12">
          <p className="section-label mb-2">Optional Add-Ons</p>
          <h2 className="font-playfair text-3xl lg:text-4xl text-fitzroy-charcoal mb-4">
            Want to Elevate Your Event?
          </h2>
          <p className="font-inter text-fitzroy-taupe text-sm max-w-2xl mx-auto leading-relaxed">
            All packages include delivery, with food presented in ready-to-serve disposable containers — perfect for a relaxed, low-fuss event. If you&apos;d like us to take care of a little more, we offer a few optional extras to make the day completely effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-transparent md:bg-fitzroy-sand/40">
          {ADD_ONS.map(({ Icon, tier, headline, description, pricing }, i) => (
            <div
              key={tier}
              className={`relative bg-white p-7 lg:p-8 flex flex-col ${
                i < ADD_ONS.length - 1 ? 'mb-px md:mb-0' : ''
              }`}
            >
              {/* Step indicator */}
              {i < ADD_ONS.length - 1 && (
                <span className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-fitzroy-sand rounded-full items-center justify-center">
                  <span className="text-fitzroy-bronze text-xs">›</span>
                </span>
              )}

              <div className="w-10 h-10 rounded-full bg-fitzroy-sage/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-fitzroy-sage" strokeWidth={1.5} />
              </div>
              <p className="font-inter text-xs uppercase tracking-widest text-fitzroy-bronze mb-1">{tier}</p>
              <h3 className="font-playfair text-xl text-fitzroy-charcoal mb-3">{headline}</h3>
              <p className="font-inter text-sm text-fitzroy-taupe leading-relaxed flex-1">{description}</p>
              <div className="mt-5 pt-5 border-t border-fitzroy-sand">
                <p className="font-inter text-sm text-fitzroy-charcoal font-medium mb-3">{pricing}</p>
                <Link href="/contact" className="btn-outline text-xs py-2 px-4 inline-block">
                  Add to your enquiry
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
