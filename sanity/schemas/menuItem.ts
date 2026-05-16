import { defineField, defineType } from 'sanity'

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Item Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Hot Platters', value: 'hot_platter' },
          { title: 'Sweet Selections', value: 'sweet_selection' },
          { title: 'Cold Selections (48hr notice)', value: 'cold_selection' },
          { title: 'Grazing Platters', value: 'grazing_platter' },
          { title: 'Pizza & Pasta', value: 'pizza_pasta' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Optional — shown below the item name (e.g. sauce/accompaniment details)',
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity / Serves',
      type: 'string',
      description: 'e.g. "30 pcs", "Serves 15 guests", "—"',
    }),
    defineField({
      name: 'price',
      title: 'Price ($)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dietary',
      title: 'Dietary Flags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Vegetarian (V)', value: 'V' },
          { title: 'Gluten Free (GF)', value: 'GF' },
          { title: 'Dairy Free (DF)', value: 'DF' },
          { title: 'Vegan (VG)', value: 'VG' },
        ],
      },
    }),
    defineField({
      name: 'requiresAdvanceNotice',
      title: 'Requires 48hr Advance Notice',
      type: 'boolean',
      initialValue: false,
      description: 'Cold selections require 48 hours notice',
    }),
    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to temporarily hide this item from the menu',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within their category',
    }),
  ],
  orderings: [
    { title: 'Category + Order', name: 'categoryOrder', by: [{ field: 'category', direction: 'asc' }, { field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category' },
    prepare(selection: Record<string, string>) {
      const categoryLabels: Record<string, string> = {
        hot_platter: 'Hot Platter',
        sweet_selection: 'Sweet',
        cold_selection: 'Cold',
        grazing_platter: 'Grazing',
        pizza_pasta: 'Pizza & Pasta',
      }
      return {
        title: selection.title,
        subtitle: categoryLabels[selection.subtitle] ?? selection.subtitle,
      }
    },
  },
})
