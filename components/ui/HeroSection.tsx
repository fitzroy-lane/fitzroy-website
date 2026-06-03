import Image from 'next/image'
import { SiteSettings } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

interface HeroSectionProps {
  settings: SiteSettings | null
}

export default function HeroSection({ settings }: HeroSectionProps) {
  const heroImageUrl = settings?.heroImage
    ? urlFor(settings.heroImage).width(1920).height(900).url()
    : '/images/9.png'

  return (
    <section className="relative h-[62vh] lg:h-[72vh] overflow-hidden">
      <Image
        src={heroImageUrl}
        alt="Fitzroy Catering — beautifully presented catering spread"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      {/* Subtle bottom fade to blend into next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-fitzroy-charcoal/60 to-transparent" />
    </section>
  )
}
