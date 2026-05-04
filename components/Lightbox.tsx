'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useEffect } from 'react'
import { urlFor } from '@/sanity/lib/image'
import type { Artwork } from '@/types'

interface LightboxProps {
  artworks: Artwork[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({
  artworks,
  initialIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => { setCurrentIndex(initialIndex) }, [initialIndex])

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % artworks.length
    setCurrentIndex(nextIndex)
    onNavigate(nextIndex)
  }, [artworks.length, currentIndex, onNavigate])

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length
    setCurrentIndex(prevIndex)
    onNavigate(prevIndex)
  }, [artworks.length, currentIndex, onNavigate])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowRight')  goNext()
      if (e.key === 'ArrowLeft')   goPrev()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, goNext, goPrev])

  if (!artworks.length) return null
  const currentArtwork = artworks[currentIndex]
  const imageUrl = urlFor(currentArtwork.image).width(1800).quality(90).url()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Close */}
          <button
            className="absolute top-8 right-8 text-muted hover:text-foreground transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); onClose() }}
            aria-label="Kapat"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Counter */}
          <span className="absolute top-10 left-10 text-muted font-mono text-xs tracking-widest">
            {String(currentIndex + 1).padStart(2, '0')} / {String(artworks.length).padStart(2, '0')}
          </span>

          {/* Navigation buttons */}
          {artworks.length > 1 && (
            <>
              <button
                className="absolute left-8 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors p-4"
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                aria-label="Önceki"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className="absolute right-8 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors p-4"
                onClick={(e) => { e.stopPropagation(); goNext() }}
                aria-label="Sonraki"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentArtwork._key}-${currentIndex}`}
              className="relative max-w-[85vw] max-h-[85vh] flex flex-col items-center justify-center"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={currentArtwork.category?.title || 'Eser'}
                className="max-w-full max-h-[75vh] object-contain drop-shadow-2xl"
                draggable={false}
              />

              <div className="mt-8 text-center">
                <p className="text-foreground text-sm uppercase tracking-widest font-medium">
                  {currentArtwork.category?.title}
                </p>
                {currentArtwork.aciklama && (
                  <p className="text-muted text-sm mt-2 font-serif italic">
                    {currentArtwork.aciklama}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
