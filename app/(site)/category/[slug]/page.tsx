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
    return { title: 'Kategori Bulunamadı' }
  }

  return {
    title: `${category.title} — Bahadır Uçan`,
    description: `Bahadır Uçan'ın ${category.title} kategorisindeki eserleri.`,
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
      <section className="hero-gradient pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn delay={0.1}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium mb-6 transition-colors hover:text-accent-light"
              style={{ color: 'var(--muted)' }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Tüm Eserler
            </Link>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              className="hero-subtitle text-xl mb-3"
              style={{ fontFamily: 'var(--font-handwriting)' }}
            >
              Kategori
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h2 className="hero-title text-4xl md:text-6xl lg:text-7xl mb-4">
              {category.title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p
              className="text-base"
              style={{ color: 'var(--muted)' }}
            >
              {artworks.length} eser
            </p>
          </FadeIn>

          {/* Other categories */}
          {allCategories.length > 1 && (
            <FadeIn delay={0.5}>
              <div className="flex flex-wrap gap-3 mt-8">
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
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <ArtworkGrid artworks={artworks} />
        </div>
      </section>
    </div>
  )
}
