import { defineField, defineType } from 'sanity'

export const corporatePackage = defineType({
  name: 'corporatePackage',
  title: 'Corporate Package',
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
      name: 'packageType',
      title: 'Package Type',
      type: 'string',
      options: {
        list: [
          { title: 'Morning Tea', value: 'morning_tea' },
          { title: 'Staff Meeting', value: 'staff_meeting' },
          { title: 'Friday Lunch', value: 'friday_lunch' },
          { title: 'Birthday — Monthly', value: 'birthday_monthly' },
          { title: 'Birthday — Individual', value: 'birthday_individual' },
          { title: 'Custom / Build Your Own', value: 'custom' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Short Tagline',
      type: 'string',
      description: 'One-line description shown on package cards',
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
      description: 'List each included item on a separate line',
    }),
    defineField({
      name: 'pricingTiers',
      title: 'Pricing Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'staffCount', title: 'Staff / Guest Count', type: 'number' }),
            defineField({ name: 'price', title: 'Price ($)', type: 'number' }),
          ],
          preview: {
            select: { staffCount: 'staffCount', price: 'price' },
            prepare(selection: Record<string, string>) {
              return { title: `${selection.staffCount} staff — $${selection.price}` }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'promotion',
      title: 'Current Promotion',
      type: 'string',
      description: 'e.g. "10% off when booked for the full year" — leave blank if no active promotion',
    }),
    defineField({
      name: 'image',
      title: 'Package Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Show on Homepage',
      type: 'boolean',
      initialValue: false,
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
    select: { title: 'title', subtitle: 'tagline', media: 'image' },
  },
})
