'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { profile, skills, projects, experience } from '@/lib/data'
import { StatusBadge } from '@/components/ui/StatusBadge'

const roles = [
  'Technology Consultant Intern',
  'Full-Stack Developer',
  'AI Integration Engineer',
]

function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseDuration = 2000) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    let timer: ReturnType<typeof setTimeout>

    if (!isDeleting && text === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    } else {
      timer = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentWord.slice(0, text.length - 1)
              : currentWord.slice(0, text.length + 1)
          )
        },
        isDeleting ? deletingSpeed : typingSpeed
      )
    }

    return () => clearTimeout(timer)
  }, [text, wordIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseDuration])

  return text
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export function HeroSection() {
  const roleText = useTypewriter(roles)
  const [showScroll, setShowScroll] = useState(true)

  const handleScroll = useCallback(() => {
    if (window.scrollY > 100) setShowScroll(false)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-14 md:pt-16">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={child} className="mb-6">
            <StatusBadge variant="success" label={profile.availability} pulsing />
          </motion.div>

          <motion.h1
            variants={child}
            className="font-heading font-extrabold text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] mb-4"
          >
            <span className="gradient-text bg-[length:200%_200%] animate-[gradientShift_6s_ease_infinite]">
              {profile.name}
            </span>
          </motion.h1>

          <motion.div variants={child} className="h-8 flex items-center justify-center mb-6">
            <span className="font-mono text-base md:text-lg text-accent">
              {roleText}
              <span className="animate-pulse ml-0.5">|</span>
            </span>
          </motion.div>

          <motion.p
            variants={child}
            className="text-text-secondary text-base md:text-lg font-body font-light max-w-[560px] mb-8 leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={child} className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <button
              onClick={() => scrollTo('projects')}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-accent text-white font-mono text-sm font-medium hover:bg-accent-dim transition-colors"
            >
              View Projects
            </button>
            <a
              href={profile.resumeUrl}
              download
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border font-mono text-sm text-text-secondary hover:text-accent hover:border-accent/30 transition-colors"
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>

          <motion.div variants={child} className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: `${skills.length} Technologies` },
              { label: `${projects.length} Projects` },
              { label: `${experience.length} Role` },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card px-4 py-2 font-mono text-xs text-text-secondary whitespace-nowrap"
              >
                {stat.label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {showScroll && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={20} className="text-text-muted" />
        </motion.div>
      )}
    </section>
  )
}
