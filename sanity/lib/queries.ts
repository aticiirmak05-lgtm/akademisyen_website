import { client } from './client'

// Tüm kategorileri getir
export async function getCategories() {
  return client.fetch(
    `*[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      "artworkCount": count(*[_type == "artwork" && references(^._id)])
    }`
  )
}

// Tek bir kategoriyi slug ile getir
export async function getCategoryBySlug(slug: string) {
  return client.fetch(
    `*[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current
    }`,
    { slug }
  )
}

// Tüm eserleri getir (kategorileriyle birlikte)
export async function getArtworks() {
  return client.fetch(
    `*[_type == "artwork"] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      image,
      description,
      "category": category->{
        _id,
        title,
        "slug": slug.current
      }
    }`
  )
}

// Belirli bir kategoriye ait eserleri getir
export async function getArtworksByCategory(categorySlug: string) {
  return client.fetch(
    `*[_type == "artwork" && category->slug.current == $categorySlug] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      image,
      description,
      "category": category->{
        _id,
        title,
        "slug": slug.current
      }
    }`,
    { categorySlug }
  )
}

// Tüm kategori sluglarını getir (generateStaticParams için)
export async function getAllCategorySlugs() {
  return client.fetch(
    `*[_type == "category"] { "slug": slug.current }`
  )
}
