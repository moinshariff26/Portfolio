'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { experience } from '@/lib/data'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { TechTag } from '@/components/ui/TechTag'

export function ExperienceLog() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <SectionWrapper id="experience" label="02 / EXPERIENCE LOG">
      <div className="space-y-0">
        {experience.map((exp, index) => {
          const isOpen = expandedId === exp.id
          const isLast = index === experience.length - 1

          return (
            <div key={exp.id} className="relative pl-10 pb-6 last:pb-0">
              <div className={`absolute left-[15px] top-3 w-[2px] ${isLast ? '' : 'bg-border'}`} style={{ height: isLast ? '0' : 'calc(100% - 24px)' }} />

              <div className="absolute left-[7px] top-3">
                <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${
                  exp.status === 'current'
                    ? 'border-success bg-bg-primary shadow-sm shadow-success/20'
                    : 'border-border bg-bg-primary'
                }`}>
                  {exp.status === 'current' && (
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  )}
                </div>
              </div>

              <div
                className="glass-card p-5 cursor-pointer"
                onClick={() => toggle(exp.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(exp.id) }}
                aria-expanded={isOpen}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-wrap">
                      <h3 className="font-heading font-semibold text-base text-text-primary">
                        {exp.role}
                      </h3>
                      <span className="text-sm text-text-secondary">
                        {exp.company} &rarr; {exp.client}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="font-mono text-xs text-text-muted">{exp.duration}</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                        {exp.status === 'current' ? 'CURRENT' : 'COMPLETED'}
                      </span>
                      <span className="font-mono text-xs text-text-muted">{exp.location}</span>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-text-muted mt-1.5 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-border space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {exp.stack.map((tech) => (
                            <TechTag key={tech} name={tech} />
                          ))}
                        </div>

                        <p className="text-sm text-text-secondary italic leading-relaxed">
                          {exp.scope}
                        </p>

                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                              <span className="text-accent shrink-0 mt-0.5">&rarr;</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
