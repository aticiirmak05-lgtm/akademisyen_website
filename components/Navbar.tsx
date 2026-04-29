'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'nav-glass' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--accent)', fontSize: '20px' }}
          >
            ✏️
          </motion.div>
          <div>
            <h1 className="text-lg font-bold leading-tight tracking-tight">
              Bahadır Uçan
            </h1>
            <p
              className="text-xs leading-none"
              style={{
                fontFamily: 'var(--font-handwriting)',
                color: 'var(--accent-light)',
                fontSize: '14px',
              }}
            >
              Karikatürist &amp; Akademisyen
            </p>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-accent-light"
          >
            Eserler
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
