import Link from 'next/link'
import { getCategories } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { Category } from '@/types'

export const revalidate = 0

export default async function HomePage() {
  const categories: Category[] = await getCategories()

  return (
    <div className="min-h-screen">
      
      {/* ── HERO SECTION ── */}
      <section className="pt-80 pb-64 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <span 
            className="accent-badge"
          >
            Dijital Portfolyo
          </span>
          <h1
            className="hero-title mt-8"
          >
            Sanat, Mizah ve <br className="hidden md:block"/>
            <span className="text-accent-primary">
              Akademik Düşünce.
            </span>
          </h1>
          <p
            className="hero-subtitle mt-12 mx-auto md:mx-0"
          >
            Bahadır Uçan'ın karikatür, 2D/3D animasyon ve akademik üretimlerinin kesişim noktası. Modern sanat ve dijital tasarım.
          </p>
          <div 
            className="mt-20 flex flex-col md:flex-row gap-6 justify-center md:justify-start"
          >
            <a href="#collections" className="btn-primary">
              Koleksiyonları İncele
            </a>
            <Link href="/about" className="btn-secondary">
              Hakkında Daha Fazla
            </Link>
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS SECTION ── */}
      <section
        id="collections"
        className="px-6 md:px-12 lg:px-24 py-64 bg-background"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="section-title">Seçili İşler</h2>
            <p className="text-muted text-sm tracking-wide">{categories.length} Koleksiyon Bulunuyor</p>
          </div>

          {categories.length === 0 ? (
            <div className="py-24 text-center border border-border rounded-xl bg-surface">
              <h3 className="text-xl font-medium mb-2 text-foreground">Henüz içerik yok.</h3>
              <p className="text-muted mb-8">Sanity Studio üzerinden koleksiyon ekleyebilirsiniz.</p>
              <Link href="/admin" className="btn-primary">
                Sanity Studio'ya Git
              </Link>
            </div>
          ) : (
            <div className="gallery-grid">
              {categories.map((cat: Category, i) => (
                <Link
                  key={cat._id}
                  href={`/category/${cat.slug}`}
                  className="gallery-card"
                >
                  <div className="gallery-image-wrapper">
                    {cat.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={urlFor({ _type: 'image', asset: cat.coverImage }).width(800).quality(85).url()}
                        alt={cat.title}
                        className="gallery-image"
                        loading={i < 4 ? 'eager' : 'lazy'}
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-elevated" />
                    )}
                  </div>
                  <div className="gallery-content">
                    <h3 className="gallery-title">{cat.title}</h3>
                    <p className="gallery-meta">{cat.resimCount ?? 0} Eser</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
