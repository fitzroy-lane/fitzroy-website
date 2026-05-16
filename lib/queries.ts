export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`

export const CORPORATE_PACKAGES_QUERY = `
  *[_type == "corporatePackage"] | order(order asc) {
    _id, title, slug, packageType, tagline, description,
    inclusions, pricingTiers, promotion, image, featured, order
  }
`

export const FEATURED_CORPORATE_PACKAGES_QUERY = `
  *[_type == "corporatePackage" && featured == true] | order(order asc) {
    _id, title, slug, packageType, tagline, description,
    inclusions, pricingTiers, promotion, image, order
  }
`

export const PARTY_PACKAGES_QUERY = `
  *[_type == "partyPackage"] | order(order asc) {
    _id, title, slug, price, serveNote, tagline, description,
    inclusions, image, order
  }
`

export const MENU_ITEMS_QUERY = `
  *[_type == "menuItem" && available != false] | order(order asc) {
    _id, name, category, description, quantity, price,
    dietary, requiresAdvanceNotice, order
  }
`

export const MENU_ITEMS_BY_CATEGORY_QUERY = `
  *[_type == "menuItem" && available != false && category == $category] | order(order asc) {
    _id, name, category, description, quantity, price,
    dietary, requiresAdvanceNotice, order
  }
`

export const FEATURED_GALLERY_QUERY = `
  *[_type == "gallery" && featured == true] | order(order asc) {
    _id, image, alt, caption, category, order
  }
`

export const GALLERY_QUERY = `
  *[_type == "gallery"] | order(order asc) {
    _id, image, alt, caption, category, order
  }
`
