import Link from 'next/link'
import { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import MenuSection from '@/components/ui/MenuSection'
import { sanityFetch } from '@/lib/sanity'
import { MENU_ITEMS_QUERY, MENU_CATEGORY_IMAGES_QUERY } from '@/lib/queries'
import { MenuItem, MenuCategoryImage } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Catering Menu',
  description: 'Browse the full Fitzroy Catering menu — hot platters, cold selections, grazing boards, pizza & pasta, and sweet selections.',
}

const CATEGORIES: { key: string; label: string; note?: string }[] = [
  { key: 'hot_platter', label: 'Hot Platters' },
  { key: 'sweet_selection', label: 'Sweet Selections' },
  { key: 'cold_selection', label: 'Cold Selections', note: '48 hrs notice required' },
  { key: 'grazing_platter', label: 'Grazing Platters' },
  { key: 'pizza_pasta', label: 'Pizza & Pasta' },
]

// Fallback static menu data
const STATIC_MENU: MenuItem[] = [
  // Hot Platters
  { _id: 'h1', name: 'Gourmet Beef Bourguignon Pies', category: 'hot_platter', quantity: '24 pcs', price: 125, order: 1 },
  { _id: 'h2', name: 'Lemon Pepper Calamari with Aioli', category: 'hot_platter', quantity: 'platter', price: 125, dietary: ['GF'], order: 2 },
  { _id: 'h3', name: 'Thai Spring Rolls with Sweet Chilli Sauce', category: 'hot_platter', quantity: '90 pcs', price: 100, dietary: ['V'], order: 3 },
  { _id: 'h4', name: 'Duck Spring Rolls with Sweet Chilli Sauce', category: 'hot_platter', quantity: '30 pcs', price: 120, order: 4 },
  { _id: 'h5', name: 'Vegetable Samosa', category: 'hot_platter', quantity: '30 pcs', price: 110, dietary: ['V'], order: 5 },
  { _id: 'h6', name: 'American Cheeseburger Sliders', category: 'hot_platter', quantity: '15 pcs', price: 120, order: 6 },
  { _id: 'h7', name: 'Katsu Fried Chicken Sliders', category: 'hot_platter', quantity: '15 pcs', price: 120, order: 7 },
  { _id: 'h8', name: 'Teriyaki Chicken Skewers with Sesame Seeds', category: 'hot_platter', quantity: '30 pcs', price: 150, order: 8 },
  { _id: 'h9', name: 'Lamb Kofta Skewers with Tzatziki', category: 'hot_platter', quantity: '30 pcs', price: 150, order: 9 },
  { _id: 'h10', name: 'Black Forest Chorizo Skewers', category: 'hot_platter', quantity: '30 pcs', price: 160, order: 10 },
  { _id: 'h11', name: 'Savoury Pastry Platter', category: 'hot_platter', description: 'Herb wrapped haloumi fingers, ricotta & spinach kisses, caramelised onion & feta tart', quantity: '30 pcs', price: 140, dietary: ['V'], order: 11 },
  { _id: 'h12', name: 'Truffle & Mushroom Arancini with Truffle Aioli', category: 'hot_platter', quantity: '25 pcs', price: 120, order: 12 },
  { _id: 'h13', name: 'Tempura Fish Cocktails with Chips, Tartare Sauce & Lemon', category: 'hot_platter', quantity: '30 pcs', price: 120, order: 13 },
  // Sweet Selections
  { _id: 's1', name: 'Mixed Danishes & Fresh Strawberries', category: 'sweet_selection', quantity: '20 pcs', price: 110, order: 1 },
  { _id: 's2', name: 'Scones with Jam & Cream', category: 'sweet_selection', quantity: '30 pcs', price: 110, order: 2 },
  { _id: 's3', name: 'Seasonal Fresh Fruit Platter', category: 'sweet_selection', quantity: 'platter', price: 120, order: 3 },
  { _id: 's4', name: "Chef's Selection Cakes & Slices", category: 'sweet_selection', quantity: 'platter', price: 130, order: 4 },
  { _id: 's5', name: 'Premium Petit Fours & Macarons', category: 'sweet_selection', quantity: '30 pcs', price: 250, order: 5 },
  // Cold Selections
  { _id: 'c1', name: 'Vegetable Rice Paper Rolls with Dipping Sauce', category: 'cold_selection', quantity: '30 pcs', price: 180, dietary: ['V', 'GF'], requiresAdvanceNotice: true, order: 1 },
  { _id: 'c2', name: 'Roasted Duck Rice Paper Rolls with Dipping Sauce', category: 'cold_selection', quantity: '30 pcs', price: 180, requiresAdvanceNotice: true, order: 2 },
  { _id: 'c3', name: 'Smoked Salmon Fennel Horseradish Tartlets', category: 'cold_selection', quantity: '30 pcs', price: 195, requiresAdvanceNotice: true, order: 3 },
  { _id: 'c4', name: 'Assorted Sushi', category: 'cold_selection', quantity: '45 pcs', price: 210, dietary: ['V', 'GF'], requiresAdvanceNotice: true, order: 4 },
  { _id: 'c5', name: 'Tomato, Basil & Bocconcini Skewers with Balsamic Glaze', category: 'cold_selection', quantity: '30 pcs', price: 210, dietary: ['V', 'GF'], requiresAdvanceNotice: true, order: 5 },
  { _id: 'c6', name: 'Roast Pumpkin & Goat Cheese Pinwheels', category: 'cold_selection', quantity: '30 pcs', price: 210, dietary: ['V'], requiresAdvanceNotice: true, order: 6 },
  { _id: 'c7', name: 'Peking Duck Pancakes with Hoisin Sauce', category: 'cold_selection', quantity: '30 pcs', price: 260, requiresAdvanceNotice: true, order: 7 },
  { _id: 'c8', name: 'Chef\'s Selection of Sandwiches', category: 'cold_selection', description: 'Ham, cheese & tomato · Egg, lettuce & mayo · Chicken, lettuce & mayo · Salad & avocado', quantity: '32 quarters', price: 95, requiresAdvanceNotice: true, order: 8 },
  // Grazing Platters
  { _id: 'g1', name: 'Cheese Platter', category: 'grazing_platter', description: 'Local & imported cheese with fresh grapes, nuts, dried fruits, lavosh, crackers & grissini', price: 200, order: 1 },
  { _id: 'g2', name: 'Antipasto Platter', category: 'grazing_platter', description: 'Italian cured salami, prosciutto, champagne ham, provolone, chargrilled peppers, fetta & olives with toasted pane de casa & grissini', price: 200, order: 2 },
  // Pizza & Pasta
  { _id: 'pp1', name: 'Pizza Pack', category: 'pizza_pasta', description: 'Four long slab pizzas — choose from: Margherita (V), Vegetarian (V), BBQ Meatlovers, BBQ Chicken, Pepperoni', quantity: 'Serves 15 guests', price: 360, order: 1 },
  { _id: 'pp2', name: 'Pasta Pack', category: 'pizza_pasta', description: '3 types of pasta to share — Pesto Penne, Chilli Prawn Linguine, Beef Ragu Rigatoni', quantity: 'Serves 15 guests', price: 285, order: 2 },
]

export default async function MenuPage() {
  const [cmsItems, categoryImages] = await Promise.all([
    sanityFetch<MenuItem[]>({ query: MENU_ITEMS_QUERY, revalidate: 300 }).catch(() => []),
    sanityFetch<MenuCategoryImage[]>({ query: MENU_CATEGORY_IMAGES_QUERY, revalidate: 300 }).catch(() => []),
  ])
  const menuItems = cmsItems.length > 0 ? cmsItems : STATIC_MENU

  return (
    <>
      <PageHeader
        label="2026 Menu"
        title="Catering Menu"
        subtitle="Restaurant-quality platters, grazing boards, and more — prepared fresh from our commercial kitchen in Seven Hills."
        light
      />

      <section className="py-16 lg:py-20 bg-fitzroy-cream">
        <div className="container-site">

          {/* Dietary key */}
          <div className="flex flex-wrap gap-4 mb-12 pb-6 border-b border-fitzroy-sand font-inter text-xs text-fitzroy-stone">
            <span className="font-medium text-fitzroy-taupe">Dietary:</span>
            {[['V', 'Vegetarian'], ['GF', 'Gluten Free'], ['DF', 'Dairy Free'], ['VG', 'Vegan']].map(([code, label]) => (
              <span key={code}><span className="dietary-badge mr-1">{code}</span>{label}</span>
            ))}
            <span className="ml-auto">All prices per platter/serve as listed</span>
          </div>

          {CATEGORIES.map(({ key, label, note }) => {
            const items = menuItems.filter((item) => item.category === key)
            const catImage = categoryImages.find((c) => c.category === key)?.image
            return (
              <MenuSection
                key={key}
                title={label}
                items={items}
                note={note}
                categoryImage={catImage}
              />
            )
          })}

          {/* Ordering info */}
          <div className="mt-12 bg-fitzroy-sand/30 border border-fitzroy-sand p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { label: 'Minimum Order', value: '$350' },
                { label: 'Notice Required', value: '48 hours' },
                { label: 'Cold Selections', value: '48 hrs advance' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-playfair text-fitzroy-charcoal text-xl">{item.value}</p>
                  <p className="font-inter text-fitzroy-stone text-xs mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/contact" className="btn-primary">
              Place an Enquiry
            </Link>
            <p className="font-inter text-xs text-fitzroy-stone mt-4">
              Want a custom combination? We can build a package around any menu items above.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
