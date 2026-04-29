'use client'

import { motion } from 'framer-motion'

// Floating artistic shapes for background depth
export default function FloatingShapes() {
  const shapes = [
    {
      type: 'circle',
      size: 300,
      x: '10%',
      y: '20%',
      color: 'rgba(232, 87, 42, 0.04)',
      duration: 20,
      delay: 0,
    },
    {
      type: 'circle',
      size: 200,
      x: '80%',
      y: '60%',
      color: 'rgba(255, 122, 82, 0.03)',
      duration: 25,
      delay: 2,
    },
    {
      type: 'circle',
      size: 150,
      x: '60%',
      y: '10%',
      color: 'rgba(232, 87, 42, 0.03)',
      duration: 18,
      delay: 4,
    },
    {
      type: 'circle',
      size: 100,
      x: '30%',
      y: '70%',
      color: 'rgba(255, 122, 82, 0.04)',
      duration: 22,
      delay: 1,
    },
    {
      type: 'line',
      x: '45%',
      y: '30%',
      color: 'rgba(232, 87, 42, 0.06)',
      duration: 15,
      delay: 3,
    },
    {
      type: 'dot',
      x: '75%',
      y: '25%',
      color: 'rgba(255, 122, 82, 0.15)',
      duration: 12,
      delay: 5,
    },
    {
      type: 'dot',
      x: '20%',
      y: '85%',
      color: 'rgba(232, 87, 42, 0.12)',
      duration: 14,
      delay: 7,
    },
    {
      type: 'dot',
      x: '90%',
      y: '45%',
      color: 'rgba(255, 122, 82, 0.1)',
      duration: 16,
      delay: 2,
    },
  ]

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {shapes.map((shape, i) => {
        if (shape.type === 'circle') {
          return (
            <motion.div
              key={i}
              animate={{
                y: [-30, 30, -30],
                x: [-15, 15, -15],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: shape.duration,
                delay: shape.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                left: shape.x,
                top: shape.y,
                width: shape.size,
                height: shape.size,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${shape.color}, transparent 70%)`,
                filter: 'blur(40px)',
              }}
            />
          )
        }

        if (shape.type === 'line') {
          return (
            <motion.div
              key={i}
              animate={{
                rotate: [0, 10, -5, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: shape.duration,
                delay: shape.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                left: shape.x,
                top: shape.y,
                width: '120px',
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${shape.color}, transparent)`,
                transformOrigin: 'center',
              }}
            />
          )
        }

        // Dot
        return (
          <motion.div
            key={i}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: shape.x,
              top: shape.y,
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: shape.color,
            }}
          />
        )
      })}

      {/* Pencil sketch SVG decoration */}
      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        style={{
          position: 'absolute',
          right: '5%',
          top: '15%',
          opacity: 0.04,
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="var(--accent)"
          strokeWidth="0.5"
          strokeDasharray="10 8"
        />
        <circle
          cx="100"
          cy="100"
          r="50"
          stroke="var(--accent-light)"
          strokeWidth="0.3"
          strokeDasharray="5 12"
        />
      </motion.svg>
    </div>
  )
}
