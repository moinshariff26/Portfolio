'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, Table2, ArrowUpRight } from 'lucide-react'
import { projects } from '@/lib/data'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { TechTag } from '@/components/ui/TechTag'
import { Modal } from '@/components/ui/Modal'
import { MermaidDiagram } from '@/components/ui/MermaidDiagram'

export function ProjectsRegistry() {
  const [view, setView] = useState<'grid' | 'table'>('grid')
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null)

  return (
    <SectionWrapper id="projects" label="03 / PROJECTS REGISTRY">
      <div className="flex items-center justify-end mb-6">
        <div className="flex items-center gap-1 bg-bg-secondary rounded-lg p-1 border border-border">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-md transition-colors ${
              view === 'grid' ? 'bg-bg-card text-accent shadow-sm' : 'text-text-muted hover:text-text-secondary'
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid size={14} />
          </button>
          <button
            onClick={() => setView('table')}
            className={`p-2 rounded-md transition-colors ${
              view === 'table' ? 'bg-bg-card text-accent shadow-sm' : 'text-text-muted hover:text-text-secondary'
            }`}
            aria-label="Table view"
          >
            <Table2 size={14} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'grid' ? (
          <motion.div
            key="grid"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className={`glass-card p-5 group cursor-pointer ${
                  project.featured ? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-5' : ''
                }`}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl shrink-0 mt-1">{project.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-base text-text-primary group-hover:text-accent transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-text-secondary mt-0.5">{project.subtitle}</p>
                    <p className={`text-sm text-text-muted mt-2 leading-relaxed ${project.featured ? '' : 'line-clamp-2'}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.stack.slice(0, project.featured ? 6 : 4).map((tech) => (
                        <TechTag key={tech} name={tech} />
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-mono text-accent">
                      View Details <ArrowUpRight size={12} />
                    </div>
                  </div>
                </div>
                {project.featured && (
                  <div className="mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-border md:pl-5">
                    <ul className="space-y-2">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-text-muted flex items-start gap-1.5">
                          <span className="text-accent shrink-0 mt-0.5">&rarr;</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border font-mono text-xs text-text-muted">
                    <th className="text-left py-3 px-4 font-normal">Project</th>
                    <th className="text-left py-3 px-4 hidden sm:table-cell font-normal">Stack</th>
                    <th className="text-left py-3 px-4 font-normal">Status</th>
                    <th className="text-right py-3 px-4 font-normal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-border/50 hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span>{project.emoji}</span>
                          <span className="font-medium text-text-primary">{project.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {project.stack.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-[10px] font-mono text-text-muted">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                          project.featured
                            ? 'text-accent border-accent/20 bg-accent/5'
                            : 'text-text-muted border-border'
                        }`}>
                          {project.featured ? 'Featured' : 'Standard'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          Open &rarr;
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.name}
      >
        {selectedProject && (
          <div className="space-y-6">
            <div>
              <p className="text-text-secondary font-mono text-sm">{selectedProject.subtitle}</p>
              <p className="text-sm text-text-muted mt-3 leading-relaxed">{selectedProject.description}</p>
            </div>

            <div>
              <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-3">Highlights</h4>
              <ul className="space-y-2">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                    <span className="text-accent shrink-0 mt-0.5">&rarr;</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-3">Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.stack.map((tech) => (
                  <TechTag key={tech} name={tech} />
                ))}
              </div>
            </div>

            {selectedProject.hasDiagram && selectedProject.mermaidDiagram && (
              <div>
                <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-3">Architecture</h4>
                <MermaidDiagram diagram={selectedProject.mermaidDiagram} />
              </div>
            )}
          </div>
        )}
      </Modal>
    </SectionWrapper>
  )
}
