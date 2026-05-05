'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { Artwork } from '@/types'

interface InstagramCarouselProps {
  artworks: Artwork[]
}

export default function InstagramCarousel({ artworks }: InstagramCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const scrollPosition = scrollRef.current.scrollLeft
    const width = scrollRef.current.clientWidth
    const index = Math.round(scrollPosition / width)
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return
    const width = scrollRef.current.clientWidth
    scrollRef.current.scrollTo({
      left: width * index,
      behavior: 'smooth'
    })
  }

  if (!artworks || artworks.length === 0) return null

  return (
    <div className="max-w-6xl mx-auto my-12 w-full">
      {/* Carousel Container */}
      <div className="relative group rounded-xl overflow-hidden bg-black/20 border border-white/5">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {artworks.map((artwork, idx) => (
            <div 
              key={artwork._key} 
              className="w-full flex-shrink-0 snap-center relative aspect-[3/2] sm:aspect-video bg-neutral-900/50"
            >
              <Image
                src={urlFor(artwork.image).width(1600).quality(95).url()}
                alt={artwork.category?.title || 'Carousel Image'}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1200px"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Desktop Navigation Arrows */}
        {artworks.length > 1 && (
          <>
            <button 
              onClick={() => scrollTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-all duration-300 backdrop-blur-md border border-white/20 hover:bg-black/90 hover:scale-105 z-10"
              aria-label="Önceki"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              onClick={() => scrollTo(activeIndex + 1)}
              disabled={activeIndex === artworks.length - 1}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-all duration-300 backdrop-blur-md border border-white/20 hover:bg-black/90 hover:scale-105 z-10"
              aria-label="Sonraki"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {artworks.length > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {artworks.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx 
                  ? 'w-8 bg-[var(--foreground)]' 
                  : 'w-2 bg-[var(--muted)]/40 hover:bg-[var(--muted)]'
              }`}
              aria-label={`Slayt ${idx + 1}'e git`}
            />
          ))}
        </div>
      )}

      {/* Description Area */}
      <div className="mt-8 px-4 max-w-4xl mx-auto text-center">
        {artworks[activeIndex]?.aciklama ? (
          <p 
            key={`desc-${activeIndex}`} // Force re-render for animation
            className="text-lg md:text-xl font-medium leading-relaxed text-white animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            {artworks[activeIndex].aciklama}
          </p>
        ) : (
          <div className="h-8"></div> /* Placeholder to prevent layout shift */
        )}
        <p className="text-xs text-[var(--muted)]/50 mt-4 font-mono tracking-widest">
          {activeIndex + 1} / {artworks.length}
        </p>
      </div>
    </div>
  )
}
