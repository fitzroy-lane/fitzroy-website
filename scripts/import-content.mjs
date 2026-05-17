/**
 * Imports all menu items, corporate packages, and party packages into Sanity.
 *
 * Prerequisites:
 *   1. .env.local must have NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN
 *   2. SANITY_API_TOKEN must be a token with Editor or higher permissions
 *      (sanity.io/manage → your project → API → Tokens → Add API Token)
 *
 * Run with:
 *   node scripts/import-content.mjs
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID is missing from .env.local')
  process.exit(1)
}
if (!token) {
  console.error('❌ SANITY_API_TOKEN is missing from .env.local')
  console.error('   Get one from: sanity.io/manage → your project → API → Tokens')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ─── Menu Items ──────────────────────────────────────────────────────────────

const menuItems = [
  // HOT PLATTERS
  { name: 'Gourmet Beef Bourguignon Pies', category: 'hot_platter', quantity: '24 pcs', price: 125, dietary: [], order: 1 },
  { name: 'Lemon Pepper Calamari with Aioli', category: 'hot_platter', quantity: 'platter', price: 125, dietary: ['GF'], order: 2 },
  { name: 'Thai Spring Rolls with Sweet Chilli Sauce', category: 'hot_platter', quantity: '90 pcs', price: 100, dietary: ['V'], order: 3 },
  { name: 'Duck Spring Rolls with Sweet Chilli Sauce', category: 'hot_platter', quantity: '30 pcs', price: 120, dietary: [], order: 4 },
  { name: 'Vegetable Samosa', category: 'hot_platter', quantity: '30 pcs', price: 110, dietary: ['V'], order: 5 },
  { name: 'American Cheeseburger Sliders', category: 'hot_platter', quantity: '15 pcs', price: 120, dietary: [], order: 6 },
  { name: 'Katsu Fried Chicken Sliders', category: 'hot_platter', quantity: '15 pcs', price: 120, dietary: [], order: 7 },
  { name: 'Teriyaki Chicken Skewers with Sesame Seeds', category: 'hot_platter', quantity: '30 pcs', price: 150, dietary: [], order: 8 },
  { name: 'Lamb Kofta Skewers with Tzatziki', category: 'hot_platter', quantity: '30 pcs', price: 150, dietary: [], order: 9 },
  { name: 'Black Forest Chorizo Skewers', category: 'hot_platter', quantity: '30 pcs', price: 160, dietary: [], order: 10 },
  {
    name: 'Savoury Pastry Platter',
    category: 'hot_platter',
    description: 'Herb wrapped haloumi fingers, ricotta & spinach kisses, caramelised onion & feta tart',
    quantity: '30 pcs',
    price: 140,
    dietary: ['V'],
    order: 11,
  },
  { name: 'Truffle & Mushroom Arancini with Truffle Aioli', category: 'hot_platter', quantity: '25 pcs', price: 120, dietary: [], order: 12 },
  { name: 'Tempura Fish Cocktails with Chips, Tartare Sauce & Lemon', category: 'hot_platter', quantity: '30 pcs', price: 120, dietary: [], order: 13 },

  // SWEET SELECTIONS
  { name: 'Mixed Danishes & Fresh Strawberries', category: 'sweet_selection', quantity: '20 pcs', price: 110, dietary: [], order: 1 },
  { name: 'Scones with Jam & Cream', category: 'sweet_selection', quantity: '30 pcs', price: 110, dietary: [], order: 2 },
  { name: 'Seasonal Fresh Fruit Platter', category: 'sweet_selection', quantity: 'platter', price: 120, dietary: [], order: 3 },
  { name: "Chef's Selection Cakes & Slices", category: 'sweet_selection', quantity: 'platter', price: 130, dietary: [], order: 4 },
  { name: 'Premium Petit Fours & Macarons', category: 'sweet_selection', quantity: '30 pcs', price: 250, dietary: [], order: 5 },

  // COLD SELECTIONS (48hr notice)
  { name: 'Vegetable Rice Paper Rolls with Dipping Sauce', category: 'cold_selection', quantity: '30 pcs', price: 180, dietary: ['V', 'GF'], requiresAdvanceNotice: true, order: 1 },
  { name: 'Roasted Duck Rice Paper Rolls with Dipping Sauce', category: 'cold_selection', quantity: '30 pcs', price: 180, dietary: [], requiresAdvanceNotice: true, order: 2 },
  { name: 'Smoked Salmon Fennel Horseradish Tartlets', category: 'cold_selection', quantity: '30 pcs', price: 195, dietary: [], requiresAdvanceNotice: true, order: 3 },
  { name: 'Assorted Sushi', category: 'cold_selection', quantity: '45 pcs', price: 210, dietary: ['V', 'GF'], requiresAdvanceNotice: true, order: 4 },
  { name: 'Tomato, Basil & Bocconcini Skewers with Balsamic Glaze', category: 'cold_selection', quantity: '30 pcs', price: 210, dietary: ['V', 'GF'], requiresAdvanceNotice: true, order: 5 },
  { name: 'Roast Pumpkin & Goat Cheese Pinwheels', category: 'cold_selection', quantity: '30 pcs', price: 210, dietary: ['V'], requiresAdvanceNotice: true, order: 6 },
  { name: 'Peking Duck Pancakes with Hoisin Sauce', category: 'cold_selection', quantity: '30 pcs', price: 260, dietary: [], requiresAdvanceNotice: true, order: 7 },
  {
    name: "Chef's Selection of Sandwiches",
    category: 'cold_selection',
    description: 'Ham, cheese & tomato · Egg, lettuce & mayo · Chicken, lettuce & mayo · Salad & avocado',
    quantity: '32 quarters',
    price: 95,
    dietary: [],
    requiresAdvanceNotice: true,
    order: 8,
  },

  // GRAZING PLATTERS
  {
    name: 'Cheese Platter',
    category: 'grazing_platter',
    description: 'Local & imported cheese with fresh grapes, nuts, dried fruits, lavosh, crackers & grissini',
    price: 200,
    dietary: [],
    order: 1,
  },
  {
    name: 'Antipasto Platter',
    category: 'grazing_platter',
    description: 'Italian cured salami, prosciutto, champagne ham, provolone, chargrilled peppers, fetta & olives with toasted pane de casa & grissini',
    price: 200,
    dietary: [],
    order: 2,
  },

  // PIZZA & PASTA
  {
    name: 'Pizza Pack',
    category: 'pizza_pasta',
    description: 'Four long slab pizzas — choose from: Margherita (V), Vegetarian (V), BBQ Meatlovers, BBQ Chicken, Pepperoni',
    quantity: 'Serves 15 guests',
    price: 360,
    dietary: [],
    order: 1,
  },
  {
    name: 'Pasta Pack',
    category: 'pizza_pasta',
    description: '3 types of pasta to share — Pesto Penne, Chilli Prawn Linguine, Beef Ragu Rigatoni',
    quantity: 'Serves 15 guests',
    price: 285,
    dietary: [],
    order: 2,
  },
]

// ─── Corporate Packages ───────────────────────────────────────────────────────

const corporatePackages = [
  {
    _id: 'corporate-morning-tea',
    title: 'Morning Tea Package',
    slug: 'morning-tea',
    packageType: 'morning_tea',
    tagline: 'Perfect for team catch-ups',
    inclusions: ['Mixed Danishes & Fresh Strawberries', 'Savoury Pastry Platter', 'Sandwich Platter'],
    pricingTiers: [
      { staffCount: 30, price: 420 },
      { staffCount: 60, price: 790 },
      { staffCount: 90, price: 1150 },
    ],
    featured: true,
    order: 1,
  },
  {
    _id: 'corporate-staff-meeting',
    title: 'Staff Meeting Package',
    slug: 'staff-meeting',
    packageType: 'staff_meeting',
    tagline: 'Keep the team fuelled',
    inclusions: ['Seasonal Fresh Fruit Platter', 'Bocconcini Skewer Platter', 'Savoury Pastry Platter'],
    pricingTiers: [
      { staffCount: 30, price: 450 },
      { staffCount: 60, price: 850 },
      { staffCount: 90, price: 1250 },
    ],
    featured: true,
    order: 2,
  },
  {
    _id: 'corporate-friday-lunch',
    title: 'Friday Lunch Package',
    slug: 'friday-lunch',
    packageType: 'friday_lunch',
    tagline: 'End the week right',
    inclusions: [
      'Selection of 4 × Hot Platters',
      'Sandwich Platter',
      'Vegetable Rice Paper Rolls',
      "Chef's Selection of Cakes & Slices",
    ],
    pricingTiers: [
      { staffCount: 30, price: 790 },
      { staffCount: 60, price: 1450 },
      { staffCount: 90, price: 2100 },
    ],
    featured: true,
    order: 3,
  },
  {
    _id: 'corporate-birthday-monthly',
    title: 'Combined Monthly Birthday Lunch',
    slug: 'monthly-birthday-lunch',
    packageType: 'birthday_monthly',
    tagline: 'Celebrate the whole team',
    inclusions: [
      '6 Hot Mixed Platters',
      "Chef's Selection of Cakes & Slices with Birthday Candle",
      '2 × Balloon Columns with Happy Birthday Balloon',
      'Happy Birthday Banner',
      'Delivery Included',
    ],
    pricingTiers: [
      { staffCount: 30, price: 950 },
      { staffCount: 60, price: 1650 },
      { staffCount: 90, price: 2350 },
    ],
    promotion: '10% off when booked for the full year',
    featured: false,
    order: 4,
  },
  {
    _id: 'corporate-birthday-individual',
    title: 'Individual Birthday Afternoon Tea',
    slug: 'individual-birthday-afternoon-tea',
    packageType: 'birthday_individual',
    tagline: 'Make every birthday special',
    inclusions: [
      '2 × Table Balloon Bunches with Happy Birthday Balloon',
      'Happy Birthday Banner',
      'Savoury Pastry Platter',
      'Sandwich Platter',
      'Scones with Jam & Cream',
      "Chef's Selection of Cakes & Slices with Birthday Candle",
      'Delivery Included',
    ],
    pricingTiers: [
      { staffCount: 30, price: 650 },
      { staffCount: 60, price: 1150 },
      { staffCount: 90, price: 1650 },
    ],
    promotion: '15% off annual birthday programs (minimum 10 birthdays booked)',
    featured: false,
    order: 5,
  },
]

// ─── Party Packages ───────────────────────────────────────────────────────────

const partyPackages = [
  {
    _id: 'party-package-1',
    title: 'Package 1',
    slug: 'party-package-1',
    price: 900,
    serveNote: 'Serves approx. 30–40 guests',
    tagline: 'The essentials',
    inclusions: [
      '1 × Antipasto Platter',
      '4 × Hot Food Platters',
      "Chef's Selection of Cakes & Slices",
      'Delivery Included',
    ],
    order: 1,
  },
  {
    _id: 'party-package-2',
    title: 'Package 2',
    slug: 'party-package-2',
    price: 1800,
    serveNote: 'Serves approx. 50–60 guests',
    tagline: 'The celebration',
    inclusions: [
      '1 × Antipasto Platter',
      '4 × Hot Food Platters',
      '1 × Pizza Pack',
      '1 × Pasta Pack',
      '1 × Petit Fours & Macarons',
      'Delivery Included',
    ],
    order: 2,
  },
  {
    _id: 'party-package-3',
    title: 'Package 3',
    slug: 'party-package-3',
    price: 2500,
    serveNote: 'Serves approx. 80–100 guests',
    tagline: 'The full spread',
    inclusions: [
      '1 × Antipasto Platter',
      '6 × Hot Food Platters',
      '2 × Cold Food Platters',
      '2 × Pizza Packs',
      '2 × Pasta Packs',
      '1 × Seasonal Fruit Platter',
      '1 × Premium Petit Fours & Macarons',
      'Delivery Included',
    ],
    order: 3,
  },
]

// ─── Import functions ─────────────────────────────────────────────────────────

async function importMenuItems() {
  console.log(`\nImporting ${menuItems.length} menu items...`)
  const transaction = client.transaction()
  menuItems.forEach((item, i) => {
    transaction.createOrReplace({
      _type: 'menuItem',
      _id: `menu-item-${i + 1}`,
      available: true,
      requiresAdvanceNotice: false,
      ...item,
    })
  })
  await transaction.commit()
  console.log(`✓ ${menuItems.length} menu items imported`)
}

async function importCorporatePackages() {
  console.log(`\nImporting ${corporatePackages.length} corporate packages...`)
  const transaction = client.transaction()
  corporatePackages.forEach((pkg) => {
    const { _id, slug, ...rest } = pkg
    transaction.createOrReplace({
      _type: 'corporatePackage',
      _id,
      slug: { _type: 'slug', current: slug },
      ...rest,
    })
  })
  await transaction.commit()
  console.log(`✓ ${corporatePackages.length} corporate packages imported`)
}

async function importPartyPackages() {
  console.log(`\nImporting ${partyPackages.length} party packages...`)
  const transaction = client.transaction()
  partyPackages.forEach((pkg) => {
    const { _id, slug, ...rest } = pkg
    transaction.createOrReplace({
      _type: 'partyPackage',
      _id,
      slug: { _type: 'slug', current: slug },
      ...rest,
    })
  })
  await transaction.commit()
  console.log(`✓ ${partyPackages.length} party packages imported`)
}

// ─── Run ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\nFitzroy Catering — Content Import`)
  console.log(`Project: ${projectId}`)
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)

  try {
    await importMenuItems()
    await importCorporatePackages()
    await importPartyPackages()
    console.log('\n✅ All content imported successfully.')
    console.log('   Open your Sanity Studio to review and adjust anything.')
  } catch (err) {
    console.error('\n❌ Import failed:', err.message)
    process.exit(1)
  }
}

main()
