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
import { FadeIn } from '@/components/animations'

export const revalidate = 0

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs()
  return slugs.map((item: { slug: string }) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Koleksiyon Bulunamadı' }
  }

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

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <FadeIn delay={0.1}>
            <nav className="flex items-center gap-2 text-sm mb-10" style={{ color: 'var(--muted)' }}>
              <Link
                href="/"
                className="transition-colors hover:text-foreground"
              >
                Eserler
              </Link>
              {category.isSubCollection && category.parentCollection && (
                <>
                  <span>/</span>
                  <Link
                    href={`/category/${category.parentCollection.slug}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {category.parentCollection.title}
                  </Link>
                </>
              )}
              <span>/</span>
              <span style={{ color: 'var(--foreground)' }}>
                {category.title}
              </span>
            </nav>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4" style={{ lineHeight: 1.1 }}>
              {category.title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p
              className="text-sm"
              style={{ color: 'var(--muted)' }}
            >
              {artworks?.length ?? 0} eser
            </p>
          </FadeIn>

          {/* Sub-collections */}
          {category.altKoleksiyonlar && category.altKoleksiyonlar.length > 0 && (
            <FadeIn delay={0.4}>
              <div className="mt-12">
                <p className="text-xs font-medium uppercase tracking-widest mb-5" style={{ color: 'var(--muted)' }}>
                  Alt Koleksiyonlar
                </p>
                <div className="sub-collection-grid">
                  {category.altKoleksiyonlar.map((sub: Category) => (
                    <Link
                      key={sub._id}
                      href={`/category/${sub.slug}`}
                      className="sub-collection-card"
                    >
                      {sub.coverImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={urlFor({ _type: 'image', asset: sub.coverImage }).width(500).quality(60).url()}
                          alt=""
                          className="sub-cover"
                        />
                      )}
                      <div className="sub-overlay" />
                      <span className="sub-badge">Koleksiyon</span>
                      <div className="sub-content">
                        <h3 className="sub-title">{sub.title}</h3>
                        <span className="sub-count">
                          {sub.resimCount ?? 0} eser
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Other categories */}
          {allCategories.length > 1 && (
            <FadeIn delay={0.5}>
              <div className="flex flex-wrap gap-3 mt-12">
                <Link href="/" className="category-chip">
                  Tümü
                </Link>
                {allCategories.map((cat: Category) => (
                  <Link
                    key={cat._id}
                    href={`/category/${cat.slug}`}
                    className={`category-chip ${
                      cat.slug === slug ? 'active' : ''
                    }`}
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Artworks Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <ArtworkGrid artworks={artworks ?? []} />
        </div>
      </section>
    </div>
  )
}
