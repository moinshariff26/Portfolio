'use client'

import { nowPanel } from '@/lib/data'
import { StatusBadge } from '@/components/ui/StatusBadge'

export function NowPanel() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-label">{'// NOW'}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glass-card p-5 lg:col-span-2">
            <span className="font-mono text-[10px] text-accent uppercase tracking-wider">Current Focus</span>
            <p className="mt-2 text-sm text-text-primary leading-relaxed">{nowPanel.currentFocus}</p>
          </div>

          <div className="glass-card p-5">
            <span className="font-mono text-[10px] text-accent uppercase tracking-wider">Status</span>
            <div className="mt-3">
              <StatusBadge variant="success" label={nowPanel.statusLabel} pulsing />
              <p className="mt-2 text-[11px] font-mono text-text-muted">
                Updated {nowPanel.updatedAt}
              </p>
            </div>
          </div>

          <div className="glass-card p-5">
            <span className="font-mono text-[10px] text-accent uppercase tracking-wider">Learning</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {nowPanel.learning.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-accent/5 text-accent border border-accent/10"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <span className="font-mono text-[10px] text-accent uppercase tracking-wider">Building</span>
            <p className="mt-3 text-sm text-text-primary">{nowPanel.building}</p>
          </div>

          <div className="glass-card p-5">
            <span className="font-mono text-[10px] text-accent uppercase tracking-wider">Reading</span>
            <p className="mt-3 text-sm text-text-primary">{nowPanel.reading}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
