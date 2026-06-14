'use client'

import { underTheHood } from '@/lib/data'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { ArrowUpRight } from 'lucide-react'

const items = [
  { label: 'Framework', value: underTheHood.framework },
  { label: 'Language', value: underTheHood.language },
  { label: 'Styling', value: underTheHood.styling },
  { label: 'Hosting', value: underTheHood.hosting },
  { label: 'CI/CD', value: underTheHood.cicd },
  { label: 'Analytics', value: underTheHood.analytics },
]

export function UnderTheHood() {
  return (
    <SectionWrapper id="under-the-hood" label="// HOW THIS WAS BUILT">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map((item) => (
          <div key={item.label} className="glass-card p-4 text-center">
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-2">{item.label}</p>
            <p className="text-sm font-mono text-accent leading-tight">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href={`https://${underTheHood.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border font-mono text-sm text-text-secondary hover:text-accent hover:border-accent/30 transition-colors"
        >
          View source <ArrowUpRight size={14} />
        </a>
      </div>
    </SectionWrapper>
  )
}
