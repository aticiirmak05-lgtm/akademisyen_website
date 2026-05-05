export interface Resim {
  _key: string
  _type: 'image'
  asset: {
    _ref: string
    _type: string
  }
  aciklama?: string
}

export interface Category {
  _id: string
  title: string
  description?: string
  slug: string
  resimler: Resim[]
  resimCount?: number
  altKoleksiyonlar?: Category[]
  coverImage?: {
    _ref: string
    _type: string
  }
  isSubCollection?: boolean
  parentCollection?: {
    title: string
    slug: string
  }
}

// Flat representation used by grid/lightbox components
export interface Artwork {
  _key: string
  image: {
    _type: 'image'
    asset: {
      _ref: string
      _type: string
    }
  }
  aciklama?: string
  category: {
    title: string
    slug: string
    isSubCollection?: boolean
  }
}
