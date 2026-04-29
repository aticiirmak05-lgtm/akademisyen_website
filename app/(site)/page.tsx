import Link from 'next/link'
import { getCategories, getArtworks } from '@/sanity/lib/queries'
import type { Category, Artwork } from '@/types'
import ArtworkGrid from '@/components/ArtworkGrid'
import { FadeIn } from '@/components/animations'

export const revalidate = 0

export default async function HomePage() {
  const [categories, artworks]: [Category[], Artwork[]] = await Promise.all([
    getCategories(),
    getArtworks(),
  ])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn delay={0.1}>
            <p className="hero-subtitle text-2xl mb-4" style={{ fontFamily: 'var(--font-handwriting)' }}>
              Karikatür, İllüstrasyon & Animasyon
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="hero-title text-5xl md:text-7xl lg:text-8xl max-w-4xl mb-6">
              <span className="gradient-text">Çizgilerle</span>
              <br />
              Anlatılan Hikâyeler
            </h2>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'var(--muted)' }}>
              Bahadır Uçan&#39;ın karikatür ve animasyon dünyasından seçme eserler.
              Her çizgi, bir düşüncenin, bir duygunun ve bir hikâyenin izini taşır.
            </p>
          </FadeIn>

          {/* Category chips */}
          {categories.length > 0 && (
            <FadeIn delay={0.6}>
              <div className="flex flex-wrap gap-3 mt-10">
                <span className="category-chip active">
                  Tümü ({artworks.length})
                </span>
                {categories.map((cat: Category) => (
                  <Link
                    key={cat._id}
                    href={`/category/${cat.slug}`}
                    className="category-chip"
                  >
                    {cat.title}
                    {cat.artworkCount !== undefined && (
                      <span className="text-xs" style={{ opacity: 0.6 }}>
                        {cat.artworkCount}
                      </span>
                    )}
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
