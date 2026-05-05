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
        {artworks.map((artwork, index) => {
          const isSubCol = artwork.category?.isSubCollection;
          
          return (
            <StaggerItem key={artwork._key} className="masonry-item">
              <SpringCard>
                <div
                  className="artwork-card relative group cursor-pointer"
                  onClick={() => isSubCol ? window.location.href = `/category/${artwork.category.slug}` : openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={isSubCol ? 'Koleksiyonu görüntüle' : 'Resmi görüntüle'}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      if (isSubCol) {
                        window.location.href = `/category/${artwork.category.slug}`
                      } else {
                        openLightbox(index)
                      }
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
                  <div className="artwork-overlay pointer-events-none">
                    {isSubCol && (
                      <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                        {artwork.category?.title}
                      </p>
                    )}
                    {artwork.aciklama && !isSubCol && (
                      <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--muted)', lineHeight: 1.4 }}>
                        {artwork.aciklama}
                      </p>
                    )}
                    {isSubCol && (
                      <p className="text-xs mt-1 text-[var(--accent-light)] font-medium">
                        İncelemek için tıkla &rarr;
                      </p>
                    )}
                  </div>
                </div>
              </SpringCard>
            </StaggerItem>
          )
        })}
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
