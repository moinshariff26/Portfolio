'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface SectionWrapperProps {
  id: string
  label: string
  children: ReactNode
  className?: string
}

export function SectionWrapper({ id, label, children, className = '' }: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReduced = useReducedMotion()

  return (
    <section id={id} ref={ref} className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-label">{label}</div>
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}
