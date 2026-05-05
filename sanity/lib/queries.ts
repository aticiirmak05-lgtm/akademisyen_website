import { client } from './client'

// Tüm koleksiyonları getir (filtreler vs. için)
export async function getCategories() {
  return client.fetch(
    `*[_type == "category"] | order(title asc) {
      _id,
      title,
      description,
      "slug": slug.current,
      "isSubCollection": _id in *[_type == "category"].altKoleksiyonlar[]._ref,
      "resimCount": count(resimler) + count(altKoleksiyonlar[]->resimler[]),
      "coverImage": coalesce(resimler[0].asset, altKoleksiyonlar[0]->resimler[0].asset),
      "altKoleksiyonlar": altKoleksiyonlar[]->{
        _id,
        title,
        description,
        "slug": slug.current,
        "resimCount": count(resimler)
      }
    }`
  )
}

// Tek bir koleksiyonu slug ile getir (alt koleksiyonlarıyla birlikte)
export async function getCategoryBySlug(slug: string) {
  return client.fetch(
    `*[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      description,
      "slug": slug.current,
      resimler,
      "isSubCollection": _id in *[_type == "category"].altKoleksiyonlar[]._ref,
      "parentCollection": *[_type == "category" && $slug in altKoleksiyonlar[]->slug.current][0] {
        title,
        "slug": slug.current
      },
      "altKoleksiyonlar": altKoleksiyonlar[]->{
        _id,
        title,
        description,
        "slug": slug.current,
        "resimCount": count(resimler),
        "coverImage": resimler[0].asset
      }
    }`,
    { slug }
  )
}

// Tüm resimleri tüm koleksiyonlardan getir (düz liste olarak)
export async function getArtworks() {
  return client.fetch(
    `*[_type == "category" && defined(resimler)] | order(title asc) {
      "items": resimler[] {
        _key,
        "image": {
          "_type": _type,
          "asset": asset
        },
        aciklama,
        "category": {
          "title": ^.title,
          "slug": ^.slug.current,
          "isSubCollection": ^._id in *[_type == "category"].altKoleksiyonlar[]._ref,
          "parentCollection": *[_type == "category" && ^._id in altKoleksiyonlar[]._ref][0] {
            "slug": slug.current
          }
        }
      }
    }.items[]`
  )
}

// Belirli bir koleksiyona ait resimleri getir
export async function getArtworksByCategory(categorySlug: string) {
  return client.fetch(
    `*[_type == "category" && slug.current == $categorySlug][0].resimler[] {
      _key,
      "image": {
        "_type": _type,
        "asset": asset
      },
      aciklama,
      "category": {
        "title": *[_type == "category" && slug.current == $categorySlug][0].title,
        "slug": $categorySlug
      }
    }`,
    { categorySlug }
  )
}

// Tüm koleksiyon sluglarını getir (generateStaticParams için)
export async function getAllCategorySlugs() {
  return client.fetch(
    `*[_type == "category"] { "slug": slug.current }`
  )
}
