'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className={`nav-container ${scrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Ana Navigasyon"
    >
      {/* Logo */}
      <Link href="/" className="nav-logo" id="nav-logo">
        Bahadır Uçan <span className="nav-logo-dot"></span>
      </Link>

      {/* Nav Links */}
      <div className="nav-links">
        <Link href="/" className="nav-link" id="nav-link-eserler">
          Eserler
        </Link>
        <Link href="/about" className="nav-link" id="nav-link-hakkinda">
          Hakkında
        </Link>
      </div>
    </motion.nav>
  )
}
