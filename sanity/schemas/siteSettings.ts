import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main heading on the homepage hero banner',
      initialValue: 'Restaurant-Quality Catering for Western Sydney',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      description: 'Supporting text beneath the hero headline',
      initialValue: 'Professional, reliable catering for corporate, community, and private events. Backed by an established restaurant since 2022.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Large background photo for the homepage hero section',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
      initialValue: 'About Fitzroy Catering',
    }),
    defineField({
      name: 'aboutText',
      title: 'About Section Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Main about text shown on homepage and About page',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      initialValue: 'catering@fitzroylane.com',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      initialValue: 'Seven Hills, NSW',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'minimumOrder',
      title: 'Minimum Order Amount',
      type: 'string',
      description: 'e.g. $350',
      initialValue: '$350',
    }),
    defineField({
      name: 'orderNotice',
      title: 'Minimum Order Notice',
      type: 'string',
      description: 'e.g. 48 hours',
      initialValue: '48 hours',
    }),
    defineField({
      name: 'serviceAreaText',
      title: 'Service Area Description',
      type: 'text',
      rows: 3,
      initialValue: 'We service the Western Sydney region including Seven Hills, Blacktown, Parramatta, Baulkham Hills, Bella Vista, Norwest, Castle Hill, and surrounding suburbs.',
    }),
    defineField({
      name: 'promotionBanner',
      title: 'Promotion Banner Text',
      type: 'string',
      description: 'Optional — shows a promo strip at the top of the site. Leave blank to hide.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
