import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getCategoryBySlug,
  getArtworksByCategory,
  getAllCategorySlugs,
  getCategories,
} from '@/sanity/lib/queries'
import type { Category, Artwork } from '@/types'
import ArtworkGrid from '@/components/ArtworkGrid'
import { urlFor } from '@/sanity/lib/image'

export const revalidate = 0

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs()
  return slugs.map((item: { slug: string }) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: 'Koleksiyon Bulunamadı' }
  return {
    title: `${category.title} — Bahadır Uçan`,
    description: `Bahadır Uçan'ın ${category.title} koleksiyonundaki eserleri.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const [category, artworks, allCategories]: [
    Category | null,
    Artwork[],
    Category[]
  ] = await Promise.all([
    getCategoryBySlug(slug),
    getArtworksByCategory(slug),
    getCategories(),
  ])

  if (!category) notFound()

  const artworkCount = artworks?.length ?? 0

  return (
    <div className="min-h-screen bg-background">

      {/* ── HEADER ── */}
      <section className="pt-80 pb-48 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">

          {/* Breadcrumb */}
          <nav
            className="flex items-center justify-center gap-3 mb-8 text-xs font-medium uppercase tracking-widest text-muted"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-accent-primary transition-colors">
              Eserler
            </Link>
            {category.isSubCollection && category.parentCollection && (
              <>
                <span className="text-border-hover">/</span>
                <Link
                  href={`/category/${category.parentCollection.slug}`}
                  className="hover:text-accent-primary transition-colors"
                >
                  {category.parentCollection.title}
                </Link>
              </>
            )}
            <span className="text-border-hover">/</span>
            <span className="text-accent-primary">{category.title}</span>
          </nav>

          {/* Title */}
          <div>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              {category.title}
            </h1>
            <p className="mt-12 text-sm text-muted uppercase tracking-widest flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-border-hover"></span>
              {artworkCount} {artworkCount === 1 ? 'Eser' : 'Eser'}
              <span className="w-8 h-[1px] bg-border-hover"></span>
            </p>
          </div>

          {/* Sub-collections */}
          {category.altKoleksiyonlar && category.altKoleksiyonlar.length > 0 && (
            <div
              className="mt-32 w-full flex flex-col items-center"
            >
              <h2 className="text-xl font-medium mb-12 text-foreground">Alt Koleksiyonlar</h2>
              <div className="gallery-grid w-full text-left">
                {category.altKoleksiyonlar.map((sub: Category) => (
                  <Link
                    key={sub._id}
                    href={`/category/${sub.slug}`}
                    className="gallery-card group"
                    id={`sub-cat-${sub.slug}`}
                  >
                    <div className="gallery-image-wrapper">
                      {sub.coverImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={urlFor({ _type: 'image', asset: sub.coverImage }).width(600).quality(85).url()}
                          alt=""
                          className="gallery-image"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="gallery-content">
                      <h3 className="gallery-title">{sub.title}</h3>
                      <p className="gallery-meta">{sub.resimCount ?? 0} Eser</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Category filter chips */}
          {allCategories.length > 1 && (
            <div
              className="flex flex-wrap justify-center gap-3 mt-24"
            >
              <Link href="/" className="btn-secondary text-xs" style={{ padding: '10px 20px', borderRadius: '0px' }}>
                Tümü
              </Link>
              {allCategories.map((cat: Category) => (
                <Link
                  key={cat._id}
                  href={`/category/${cat.slug}`}
                  className={`btn-secondary text-xs ${cat.slug === slug ? 'border-accent-primary text-white bg-accent-primary' : ''}`}
                  style={{ padding: '10px 20px', borderRadius: '0px' }}
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── MASONRY GRID ── */}
      <section className="px-6 md:px-12 lg:px-24 py-16 pb-32" aria-label="Eser galerisi">
        <div className="max-w-7xl mx-auto">
          <ArtworkGrid artworks={artworks ?? []} />
        </div>
      </section>

    </div>
  )
}
