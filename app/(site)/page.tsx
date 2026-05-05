import Link from 'next/link'
import { getCategories } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { Category } from '@/types'
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations'
import { ArrowRight, ImageIcon, Sparkles } from 'lucide-react'

export const revalidate = 0

export default async function HomePage() {
  const allCategories: Category[] = await getCategories()
  // Anasayfada sadece alt koleksiyonlar (veya alt koleksiyonu olmayan doğrudan kategoriler) görünsün
  const leafCategories = allCategories.filter(cat => !cat.altKoleksiyonlar || cat.altKoleksiyonlar.length === 0)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[var(--accent)] opacity-5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn delay={0.3}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-8" style={{ lineHeight: 1.05 }}>
                Çizgilerle
                <br />
                <span className="italic" style={{ color: 'var(--accent)' }}>Anlatılan</span>
                <br />
                Hikâyeler
              </h2>
              <p className="text-lg max-w-md leading-relaxed mb-10" style={{ color: 'var(--muted)' }}>
                Akademisyen ve karikatürist Bahadır Uçan&#39;ın illüstrasyon, karikatür ve animasyon disiplinlerindeki seçkin eserler arşivi.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/collections" className="btn-primary">
                  Koleksiyonları İncele
                  <ArrowRight size={16} />
                </Link>
                <Link href="/about" className="btn-outline">
                  Hakkında
                </Link>
              </div>
            </FadeIn>

            {/* Decorative Hero Visual */}
            <FadeIn delay={0.5} className="hidden lg:block">
              <div className="glass-panel aspect-square flex items-center justify-center relative overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/bahadir.png" 
                  alt="Bahadır Uçan" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Collections Bento Grid */}
      <section id="collections" className="px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0.2} className="flex items-center justify-between mb-12 border-b pb-6" style={{ borderColor: 'var(--border)' }}>
            <div>
              <h3 className="text-3xl font-light tracking-tight text-[var(--foreground)]">Eserler</h3>
              <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>Farklı konseptlerdeki koleksiyonlar</p>
            </div>
          </FadeIn>

          {leafCategories.length === 0 ? (
            <FadeIn delay={0.3}>
              <div className="glass-panel py-24 text-center">
                <ImageIcon size={48} className="mx-auto mb-4 opacity-20" style={{ color: 'var(--accent)' }} />
                <p className="text-sm" style={{ color: 'var(--muted)' }}>Henüz koleksiyon eklenmemiş.</p>
              </div>
            </FadeIn>
          ) : (
            <FadeIn delay={0.3}>
              <div className="slider-container py-4">
                <div className="slider-track">
                  {/* Duplicate categories array for infinite scrolling effect */}
                  {[...leafCategories, ...leafCategories, ...leafCategories].map((cat: Category, index) => (
                    <div key={`${cat._id}-${index}`} className="slider-item">
                      <Link href={`/category/${cat.slug}`} className="collection-card group">
                        <div className="collection-cover-wrapper">
                          {cat.coverImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={urlFor({ _type: 'image', asset: cat.coverImage }).width(600).quality(85).url()}
                              alt={cat.title}
                              className="collection-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-[var(--surface-elevated)]" />
                          )}
                          <div className="collection-overlay" />
                        </div>
                        
                        <div className="collection-content text-left">
                          <h3 className="collection-title">{cat.title}</h3>
                          <div className="flex items-center justify-end mt-auto">
                            <ArrowRight size={20} className="icon-arrow" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </div>
  )
}
