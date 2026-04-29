import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface Category {
  _id: string
  title: string
  slug: string
  artworkCount?: number
}

export interface Artwork {
  _id: string
  title: string
  slug: string
  image: SanityImageSource & {
    asset: {
      _ref: string
      _type: string
    }
  }
  description?: string
  category: Category
}
