'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Monitor, Menu, X, Download, ArrowRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import { profile } from '@/lib/data'

const navLinks = [
  { href: '#hero', label: 'Hero' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#github', label: 'GitHub' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    for (const link of navLinks) {
      const el = document.getElementById(link.href.slice(1))
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light')
    else if (theme === 'light') setTheme('system')
    else setTheme('dark')
  }

  const ThemeIcon = theme === 'dark' ? Sun : theme === 'light' ? Moon : Monitor

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    // NEW — iOS 26 Dynamic Island-style floating capsule
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
    <div
    className={`pointer-events-auto mt-3 md:mt-4 transition-all duration-300 rounded-2xl ${
      scrolled
        ? 'border border-border bg-bg-primary/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
        : 'border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl'
    }`}
  >
    <div className="max-w-6xl mx-auto px-6 h-12 md:h-14 flex items-center justify-between gap-6">

    /* <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-border bg-bg-primary/80 backdrop-blur-xl' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 md:h-16 flex items-center justify-between"> */
       /* <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 shrink-0">
          <span className="font-heading font-bold text-base md:text-lg text-text-primary">
            {profile.name}
          </span>
          <span className="font-mono text-[10px] text-accent px-2 py-0.5 rounded-full border border-accent/20 hidden sm:inline">
            @ {profile.company.split(' ')[0]}
          </span>
        </button> */

        <nav className="hidden md:flex items-center justify-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href.slice(1))}
              className={`relative px-3 py-1.5 text-sm font-mono transition-colors rounded-md ${
                activeSection === link.href.slice(1)
                  ? 'text-accent bg-accent/5'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'
              }`}
              aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          {mounted && (
            <button
              onClick={cycleTheme}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors text-text-secondary hover:text-accent"
              aria-label={`Current theme: ${theme}. Click to cycle.`}
            >
              <ThemeIcon size={16} />
            </button>
          )}

          <a
            href={profile.resumeUrl}
            download
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono border border-border hover:border-accent/30 transition-colors text-text-secondary hover:text-accent"
          >
            <Download size={14} />
            Resume
          </a>

          <button
            onClick={() => scrollTo('contact')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-mono bg-accent text-white hover:bg-accent-dim transition-colors"
          >
            Contact
            <ArrowRight size={14} />
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors text-text-secondary"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-b border-border bg-bg-primary/95 backdrop-blur-xl"
          >
            <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href.slice(1))}
                  className={`text-left py-2.5 px-3 rounded-lg font-mono text-sm transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-accent bg-accent/5'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="border-t border-border my-2" />
              <a
                href={profile.resumeUrl}
                download
                className="flex items-center gap-2 py-2.5 px-3 rounded-lg font-mono text-sm text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"
              >
                <Download size={14} /> Resume
              </a>
              <button
                onClick={() => scrollTo('contact')}
                className="flex items-center gap-2 py-2.5 px-3 rounded-lg font-mono text-sm bg-accent/10 text-accent"
              >
                Contact <ArrowRight size={14} />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
