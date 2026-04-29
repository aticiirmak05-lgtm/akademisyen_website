import Link from 'next/link'
import { getCategories } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { Category } from '@/types'
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations'

export const revalidate = 0

export default async function HomePage() {
  const categories: Category[] = await getCategories()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0.2}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight max-w-3xl mb-8" style={{ lineHeight: 1.1 }}>
              Çizgilerle
              <br />
              Anlatılan Hikâyeler
            </h2>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-base max-w-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
              Bahadır Uçan&#39;ın karikatür ve animasyon dünyasından seçme eserler.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0.5}>
            <p className="text-xs font-medium uppercase tracking-widest mb-8" style={{ color: 'var(--muted)' }}>
              Koleksiyonlar
            </p>
          </FadeIn>

          {categories.length === 0 ? (
            <FadeIn delay={0.6}>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                Henüz koleksiyon eklenmemiş.
              </p>
            </FadeIn>
          ) : (
            <StaggerChildren staggerDelay={0.08} className="collection-grid">
              {categories.map((cat: Category) => (
                <StaggerItem key={cat._id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="collection-card"
                  >
                    {cat.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={urlFor({ _type: 'image', asset: cat.coverImage }).width(700).quality(70).url()}
                        alt=""
                        className="collection-cover"
                      />
                    ) : (
                      <div className="collection-cover-empty" />
                    )}
                    <div className="collection-overlay" />
                    <div className="collection-content">
                      <h3 className="collection-title">{cat.title}</h3>
                      <span className="collection-count">
                        {cat.resimCount ?? 0} eser
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
          )}
        </div>
      </section>
    </div>
  )
}
