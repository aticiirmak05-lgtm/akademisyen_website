'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Artwork, Category } from '@/types'
import ArtworkGrid from './ArtworkGrid'
import { FadeIn } from './animations'

interface FilteredGalleryProps {
  artworks: Artwork[]
  categories: Category[]
}

export default function FilteredGallery({ artworks, categories }: FilteredGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Filter artworks based on active category
  const filteredArtworks = useMemo(() => {
    let baseArtworks = artworks;
    
    if (activeCategory) {
      const selectedCategoryData = categories.find(c => c.slug === activeCategory)
      const validSlugs = new Set<string>([activeCategory])
      if (selectedCategoryData?.altKoleksiyonlar) {
         selectedCategoryData.altKoleksiyonlar.forEach(sub => validSlugs.add(sub.slug))
      }
      baseArtworks = artworks.filter(artwork => artwork.category && validSlugs.has(artwork.category.slug))
    }

    // Now, for any sub-collection, only keep the FIRST artwork as its "cover"
    const seenSubCollections = new Set<string>()
    return baseArtworks.filter((artwork) => {
      if (artwork.category?.isSubCollection) {
        if (seenSubCollections.has(artwork.category.slug)) {
          return false
        }
        seenSubCollections.add(artwork.category.slug)
        return true
      }
      return true
    })
  }, [artworks, activeCategory, categories])

  const activeCategoryData = useMemo(() => {
    return categories.find((cat) => cat.slug === activeCategory) || null
  }, [categories, activeCategory])

  return (
    <div className="w-full">
      {/* Filters */}
      <FadeIn delay={0.3}>
        <div className="flex flex-wrap items-center justify-start gap-3 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`category-chip ${activeCategory === null ? 'active' : ''}`}
          >
            Tümü
          </button>
          {categories
            .filter((cat) => !cat.isSubCollection)
            .map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`category-chip ${activeCategory === cat.slug ? 'active' : ''}`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Category Description */}
      <AnimatePresence mode="wait">
        {activeCategoryData?.description && (
          <motion.div
            key={activeCategoryData._id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-12 max-w-3xl"
          >
            <p className="text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
              {activeCategoryData.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <FadeIn delay={0.4}>
        <div className="min-h-[50vh]">
          {filteredArtworks.length > 0 ? (
            <ArtworkGrid artworks={filteredArtworks} />
          ) : (
            <div className="glass-panel py-24 text-center flex flex-col items-center justify-center">
              <p className="text-[var(--muted)]">Bu kategoride henüz eser bulunmuyor.</p>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  )
}
