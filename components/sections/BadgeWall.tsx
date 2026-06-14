'use client'

import { certifications, education } from '@/lib/data'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const statusStyles: Record<string, string> = {
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
}

export function BadgeWall() {
  return (
    <SectionWrapper id="credentials" label="05 / CREDENTIALS">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {certifications.map((cert) => (
          <div key={cert.id} className="glass-card p-6 group hover:-translate-y-0.5 transition-transform duration-200">
            <div className="text-3xl mb-4">{cert.badge}</div>
            <h3 className="font-heading font-semibold text-base text-text-primary">{cert.name}</h3>
            <p className="font-mono text-xs text-text-muted mt-1">{cert.issuer}</p>
            <p className="text-sm text-text-secondary mt-3 leading-relaxed">{cert.description}</p>
            <div className="mt-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono border ${statusStyles[cert.statusType] || 'border-border text-text-muted'}`}
              >
                {cert.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-6">Education</h3>
        <div className="space-y-3">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <h4 className="font-heading font-medium text-sm text-text-primary">{edu.degree}</h4>
                <p className="font-mono text-xs text-text-muted mt-1">{edu.institution}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="font-mono text-xs text-text-secondary whitespace-nowrap">{edu.duration}</span>
                <span className="font-mono text-xs text-accent whitespace-nowrap">{edu.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
