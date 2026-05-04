'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import type { Artwork } from '@/types'
import Lightbox from './Lightbox'

interface ArtworkGridProps {
  artworks: Artwork[]
}

function ArtworkCard({
  artwork,
  index,
  onOpen,
}: {
  artwork: Artwork
  index: number
  onOpen: () => void
}) {
  const imageUrl = urlFor(artwork.image).width(700).quality(82).url()

  return (
    <motion.div
      className="masonry-item"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className="artwork-card group"
        role="button"
        tabIndex={0}
        id={`artwork-${artwork._key}`}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen() }
        }}
        aria-label={`Eseri görüntüle — ${artwork.category?.title || 'Resim'}`}
      >
        <Image
          src={imageUrl}
          alt={artwork.category?.title || 'Eser'}
          width={700}
          height={900}
          className="w-full h-auto block"
          sizes="(max-width: 580px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={index < 4 ? 'eager' : 'lazy'}
        />
        {/* Sleek Dark Theme Overlay - No Gradients */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <p className="text-accent-primary font-medium text-lg tracking-wide">{artwork.category?.title}</p>
          {artwork.aciklama && (
            <p className="text-foreground text-sm mt-1">{artwork.aciklama}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
  const [lightboxOpen,  setLightboxOpen]  = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (!artworks || artworks.length === 0) {
    return (
      <div className="py-24 text-center border border-border rounded-lg text-muted">
        Henüz bu koleksiyona eser eklenmemiş.
      </div>
    )
  }

  return (
    <>
      <div className="masonry-grid">
        {artworks.map((artwork, i) => (
          <ArtworkCard
            key={artwork._key}
            artwork={artwork}
            index={i}
            onOpen={() => {
              setLightboxIndex(i)
              setLightboxOpen(true)
            }}
          />
        ))}
      </div>

      <Lightbox
        artworks={artworks}
        isOpen={lightboxOpen}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </>
  )
}
