import { getCategories, getArtworks } from '@/sanity/lib/queries'
import type { Category, Artwork } from '@/types'
import { FadeIn } from '@/components/animations'
import { GalleryHorizontalEnd } from 'lucide-react'
import FilteredGallery from '@/components/FilteredGallery'

export const revalidate = 0

export default async function CollectionsPage() {
  const [categories, artworks]: [Category[], Artwork[]] = await Promise.all([
    getCategories(),
    getArtworks()
  ])

  return (
    <div className="min-h-screen pt-40 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn delay={0.2} className="mb-12">

          <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-4">
            Koleksiyonlar
          </h1>
          <p className="text-lg max-w-2xl text-[var(--muted)]">
            Farklı disiplinler ve temalar etrafında şekillenmiş tüm eser arşivi. Kategorilere göre filtreleyebilirsiniz.
          </p>
        </FadeIn>

        {/* Filtered Gallery (Client Component) */}
        <FilteredGallery artworks={artworks || []} categories={categories || []} />
      </div>
    </div>
  )
}
