import { defineField, defineType } from 'sanity'

export const partyPackage = defineType({
  name: 'partyPackage',
  title: 'Event Package',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Package Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price ($)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'serveNote',
      title: 'Serving Note',
      type: 'string',
      description: 'e.g. "Serves approx. 30–40 guests"',
    }),
    defineField({
      name: 'tagline',
      title: 'Short Tagline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'inclusions',
      title: 'Package Inclusions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'image',
      title: 'Package Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'price', media: 'image' },
    prepare(selection: Record<string, string>) {
      return {
        title: selection.title,
        subtitle: selection.subtitle ? `$${selection.subtitle}` : '',
        media: selection.media,
      }
    },
  },
})
