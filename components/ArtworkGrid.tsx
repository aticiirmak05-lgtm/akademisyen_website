'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { Artwork } from '@/types'
import { StaggerChildren, StaggerItem, SpringCard } from './animations'
import Lightbox from './Lightbox'

interface ArtworkGridProps {
  artworks: Artwork[]
}

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  if (artworks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Henüz eser eklenmemiş.
        </p>
      </div>
    )
  }

  return (
    <>
      <StaggerChildren staggerDelay={0.06} className="masonry-grid">
        {artworks.map((artwork, index) => (
          <StaggerItem key={artwork._key} className="masonry-item">
            <SpringCard>
              <div
                className="artwork-card border border-orange-500"
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                aria-label="Resmi görüntüle"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openLightbox(index)
                  }
                }}
              >
                <Image
                  src={urlFor(artwork.image).width(600).quality(80).url()}
                  alt={artwork.category?.title || 'Resim'}
                  width={600}
                  height={800}
                  className="w-full h-auto block"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ display: 'block' }}
                />
                <div className="artwork-overlay">
                  <p className="text-sm text-white font-light">
                    {artwork.category?.title}
                  </p>
                </div>
              </div>
            </SpringCard>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <Lightbox
        artworks={artworks}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}
