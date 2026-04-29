'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useEffect, useRef } from 'react'
import { urlFor } from '@/sanity/lib/image'
import type { Artwork } from '@/types'

interface LightboxProps {
  artworks: Artwork[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export default function Lightbox({
  artworks,
  initialIndex,
  isOpen,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length)
  }, [artworks.length])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length)
  }, [artworks.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, goNext, goPrev])

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext()
      else goPrev()
    }
  }

  if (!artworks.length) return null

  const currentArtwork = artworks[currentIndex]
  const imageUrl = urlFor(currentArtwork.image).width(1600).quality(90).url()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            className="lightbox-close"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Kapat"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M1 1L17 17M17 1L1 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Counter */}
          <span className="lightbox-counter">
            {currentIndex + 1} / {artworks.length}
          </span>

          {/* Navigation buttons */}
          {artworks.length > 1 && (
            <>
              <button
                className="lightbox-nav-btn lightbox-nav-prev"
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                aria-label="Önceki"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M13 4L7 10L13 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className="lightbox-nav-btn lightbox-nav-next"
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                aria-label="Sonraki"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7 4L13 10L7 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentArtwork._id}
              className="lightbox-image-container"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={currentArtwork.title}
                draggable={false}
              />

              {/* Info overlay */}
              <div className="lightbox-info">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-semibold text-white mb-1"
                >
                  {currentArtwork.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm"
                  style={{ fontFamily: 'var(--font-handwriting)', fontSize: '18px', color: 'var(--accent-light)' }}
                >
                  {currentArtwork.category?.title}
                </motion.p>
                {currentArtwork.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm mt-2"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {currentArtwork.description}
                  </motion.p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
