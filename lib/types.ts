export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  alt?: string
}

export interface PortableTextBlock {
  _type: 'block'
  _key: string
  style?: string
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _type: string
    _key: string
    href?: string
  }>
}

export interface PricingTier {
  staffCount: number
  price: number
}

export interface SiteSettings {
  _id: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: SanityImage
  aboutTitle?: string
  aboutText?: PortableTextBlock[]
  phone?: string
  email?: string
  address?: string
  instagram?: string
  facebook?: string
  minimumOrder?: string
  orderNotice?: string
  serviceAreaText?: string
  promotionBanner?: string
}

export interface CorporatePackage {
  _id: string
  title: string
  slug: { current: string }
  packageType: 'morning_tea' | 'staff_meeting' | 'friday_lunch' | 'birthday_monthly' | 'birthday_individual' | 'custom'
  tagline?: string
  description?: string
  inclusions?: string[]
  pricingTiers?: PricingTier[]
  promotion?: string
  image?: SanityImage
  featured?: boolean
  order?: number
}

export interface PartyPackage {
  _id: string
  title: string
  slug: { current: string }
  price: number
  serveNote?: string
  tagline?: string
  description?: string
  inclusions?: string[]
  image?: SanityImage
  order?: number
}

export interface MenuItem {
  _id: string
  name: string
  category: 'hot_platter' | 'sweet_selection' | 'cold_selection' | 'grazing_platter' | 'pizza_pasta'
  description?: string
  quantity?: string
  price: number
  dietary?: string[]
  requiresAdvanceNotice?: boolean
  available?: boolean
  order?: number
}

export interface GalleryImage {
  _id: string
  image: SanityImage
  alt?: string
  caption?: string
  category?: string
  featured?: boolean
  order?: number
}
