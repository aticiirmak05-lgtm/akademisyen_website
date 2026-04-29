import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Koleksiyon',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Koleksiyon Adı',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resimler',
      title: 'Resimler',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'aciklama',
              title: 'Açıklama',
              type: 'text',
              rows: 3,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'altKoleksiyonlar',
      title: 'Alt Koleksiyonlar',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      resimler: 'resimler',
    },
    prepare({ title, resimler }) {
      return {
        title,
        subtitle: `${resimler?.length ?? 0} resim`,
        media: resimler?.[0],
      }
    },
  },
})
