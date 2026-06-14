'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Si from 'react-icons/si'
import { skills, type SkillCategory } from '@/lib/data'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const categories: { label: string; value: SkillCategory | 'All' }[] = [
  { label: 'All', value: 'All' },
  { label: 'Languages', value: 'Languages' },
  { label: 'Frontend', value: 'Frontend' },
  { label: 'Backend', value: 'Backend' },
  { label: 'Databases', value: 'Databases' },
  { label: 'AI/ML', value: 'AI/ML' },
  { label: 'Tools', value: 'Tools' },
]

const levelStyles = {
  Advanced: 'text-accent border-accent/20 bg-accent/5',
  Intermediate: 'text-text-secondary border-border bg-white/[0.03]',
  Beginner: 'text-text-muted border-border/50 bg-white/[0.02]',
}

export function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All')

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  return (
    <SectionWrapper id="skills" label="01 / SKILLS MATRIX">
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeCategory === cat.value
                ? 'bg-accent text-white shadow-sm shadow-accent/20'
                : 'border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {filtered.map((skill) => {
            const Icon = (Si as Record<string, React.ComponentType<{ size?: number; color?: string }>>)[skill.siIcon]
            return (
              <motion.div
                key={skill.name}
                className="glass-card p-4 flex flex-col items-center gap-3 text-center group cursor-default"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {Icon && (
                  <div className="flex items-center justify-center h-8" style={{ filter: `drop-shadow(0 0 4px ${skill.brandColor}33)` }}>
                    <Icon size={26} color={skill.brandColor} />
                  </div>
                )}
                <span className="text-sm font-medium text-text-primary leading-tight">{skill.name}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${levelStyles[skill.level]}`}
                >
                  {skill.level}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  )
}
