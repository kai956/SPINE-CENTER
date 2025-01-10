'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion, useAnimate } from 'framer-motion'

interface GhostTextProps {
  text: string
  className?: string
  duration?: number
  blurAmount?: number
  brightness?: number
  glowIntensity?: number
  delay?: number
  isVisible?: boolean
}

export const GhostText = ({ 
  text, 
  className = '',
  duration = 0.4,
  blurAmount = 4,
  brightness = 1.5,
  delay = 0,
  isVisible = false
}: GhostTextProps) => {
  const [scope, animate] = useAnimate()
  const hasAnimated = useRef(false)

  const runAnimation = useCallback(async () => {
    const words = scope.current.children
    
    await animate(words, { 
      opacity: 0,
      filter: `blur(${blurAmount * 2}px) contrast(150%) url(#noise)`,
    }, { duration: 0 })

    await new Promise(resolve => setTimeout(resolve, delay * 1000))

    for (let i = 0; i < words.length; i++) {
      animate(
        words[i],
        { 
          opacity: [0, 0.4, 1],
          filter: [
            `blur(${blurAmount * 2}px) contrast(150%) brightness(${brightness * 1.8})`,
            `blur(${blurAmount * 1.2}px) contrast(120%) brightness(${brightness * 1.4})`,
            'blur(0px) contrast(100%) brightness(1)'
          ]
        },
        { 
          duration: duration * 1.4,
          ease: [0.2, 0.6, 0.3, 1],
          delay: i * 0.08
        }
      )
    }
  }, [animate, duration, blurAmount, brightness, delay])

  useEffect(() => {
    if (!isVisible) {
      hasAnimated.current = false
      const words = scope.current.children
      animate(words, { 
        opacity: 0,
        filter: `blur(${blurAmount * 2}px) contrast(150%) url(#noise)`,
      }, { duration: 0 })
    }
    if (isVisible) {
      runAnimation()
    }
  }, [isVisible, animate, blurAmount, runAnimation])

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="noise">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="1.5" 
              numOctaves="3" 
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0"/>
          </filter>
        </defs>
      </svg>
      <span ref={scope} className={className}>
        {text.split(' ').map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            style={{ 
              display: 'inline-block',
              opacity: 0,
              willChange: 'transform, opacity, filter',
              marginRight: '0.25em',
              marginBottom: '0.5em',
              lineHeight: '1.6',
              paddingRight: '0.1em'
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </>
  )
} 