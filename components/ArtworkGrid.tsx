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

  if (!artworks.length) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="text-6xl mb-6" style={{ fontFamily: 'var(--font-handwriting)' }}>
          🎨
        </div>
        <h3 className="text-2xl font-semibold mb-3">
          Henüz Eser Yok
        </h3>
        <p className="text-muted max-w-md">
          Sanity Studio üzerinden yeni eserler ekleyerek portfolyoyu
          doldurmaya başlayabilirsiniz.
        </p>
      </div>
    )
  }

  return (
    <>
      <StaggerChildren staggerDelay={0.06} className="masonry-grid">
        {artworks.map((artwork, index) => (
          <StaggerItem key={artwork._id} className="masonry-item">
            <SpringCard>
              <div
                className="artwork-card"
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                aria-label={`${artwork.title} eserini görüntüle`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openLightbox(index)
                  }
                }}
              >
                <Image
                  src={urlFor(artwork.image).width(600).quality(80).url()}
                  alt={artwork.title}
                  width={600}
                  height={800}
                  className="w-full h-auto block"
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  style={{ display: 'block' }}
                />
                <div className="artwork-overlay">
                  <h3 className="text-base font-semibold text-white mb-1">
                    {artwork.title}
                  </h3>
                  <p className="text-accent-light text-lg" style={{ fontFamily: 'var(--font-handwriting)' }}>
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
