import { defineField, defineType } from 'sanity'

const CATEGORY_LABELS: Record<string, string> = {
  hot_platter: 'Hot Platters',
  sweet_selection: 'Sweet Selections',
  cold_selection: 'Cold Selections',
  grazing_platter: 'Grazing Platters',
  pizza_pasta: 'Pizza & Pasta',
}

export const menuCategory = defineType({
  name: 'menuCategory',
  title: 'Menu Category Image',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Hot Platters', value: 'hot_platter' },
          { title: 'Sweet Selections', value: 'sweet_selection' },
          { title: 'Cold Selections', value: 'cold_selection' },
          { title: 'Grazing Platters', value: 'grazing_platter' },
          { title: 'Pizza & Pasta', value: 'pizza_pasta' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Category Header Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Shown as a banner at the top of this category section on the menu page',
    }),
  ],
  preview: {
    select: { title: 'category', media: 'image' },
    prepare(selection: Record<string, string>) {
      return {
        title: CATEGORY_LABELS[selection.title] ?? selection.title,
        media: selection.media,
      }
    },
  },
})
