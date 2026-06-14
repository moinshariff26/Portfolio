'use client'

import { useEffect, useState, useCallback } from 'react'
import { Command } from 'cmdk'
import {
  ArrowUp,
  ArrowDown,
  Sun,
  Moon,
  Monitor,
  Download,
  Copy,
  Phone,
  Search,
  GitFork,
  Globe,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { profile, projects } from '@/lib/data'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggle = useCallback(() => setOpen((p) => !p), [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggle()
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [toggle])

  const close = () => setOpen(false)

  const scrollTo = (id: string) => {
    close()
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text)
    close()
  }

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light')
    else if (theme === 'light') setTheme('system')
    else setTheme('dark')
    close()
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
          onClick={close}
        />
      )}
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command Palette"
        className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[201] w-full max-w-lg glass-card p-0 overflow-hidden shadow-2xl"
        shouldFilter={true}
      >
        <div className="flex items-center border-b border-border px-4">
          <Search size={16} className="text-text-muted shrink-0" />
          <Command.Input
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent border-none outline-none px-3 py-4 text-sm font-mono text-text-primary placeholder:text-text-muted"
          />
        </div>

        <Command.List className="max-h-72 overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-text-muted font-mono">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation">
            <Command.Item onSelect={() => scrollTo('hero')} className="command-item">
              <ArrowUp size={14} /> Go to Hero
            </Command.Item>
            <Command.Item onSelect={() => scrollTo('skills')} className="command-item">
              <ArrowDown size={14} /> Go to Skills Matrix
            </Command.Item>
            <Command.Item onSelect={() => scrollTo('experience')} className="command-item">
              <ArrowDown size={14} /> Go to Experience
            </Command.Item>
            <Command.Item onSelect={() => scrollTo('projects')} className="command-item">
              <ArrowDown size={14} /> Go to Projects
            </Command.Item>
            <Command.Item onSelect={() => scrollTo('github')} className="command-item">
              <ArrowDown size={14} /> Go to GitHub Activity
            </Command.Item>
            <Command.Item onSelect={() => scrollTo('contact')} className="command-item">
              <ArrowDown size={14} /> Go to Contact
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Actions">
            <Command.Item onSelect={cycleTheme} className="command-item">
              {theme === 'dark' ? <Sun size={14} /> : theme === 'light' ? <Moon size={14} /> : <Monitor size={14} />} Toggle Theme
            </Command.Item>
            <Command.Item onSelect={() => { close(); window.open(profile.resumeUrl, '_blank') }} className="command-item">
              <Download size={14} /> Download Resume
            </Command.Item>
            <Command.Item onSelect={() => copyText(profile.email)} className="command-item">
              <Copy size={14} /> Copy Email Address
            </Command.Item>
            <Command.Item onSelect={() => copyText(profile.phone)} className="command-item">
              <Phone size={14} /> Copy Phone Number
            </Command.Item>
            <Command.Item onSelect={() => { close(); window.open(profile.github, '_blank') }} className="command-item">
              <GitFork size={14} /> Open GitHub Profile
            </Command.Item>
            <Command.Item onSelect={() => { close(); window.open(profile.linkedin, '_blank') }} className="command-item">
              <Globe size={14} /> Open LinkedIn Profile
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Projects">
            {projects.map((project) => (
              <Command.Item
                key={project.id}
                onSelect={() => {
                  close()
                  setTimeout(() => {
                    const el = document.getElementById('projects')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }, 100)
                }}
                className="command-item"
              >
                <span className="mr-2">{project.emoji}</span>
                {project.name}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>

        <div className="border-t border-border px-4 py-2 text-[10px] font-mono text-text-muted flex items-center gap-4">
          <span>↑↓ Navigate</span>
          <span>↵ Open</span>
          <span>Esc Close</span>
        </div>
      </Command.Dialog>

      <style jsx global>{`
        .command-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: var(--text-primary);
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .command-item[aria-selected="true"] {
          background: var(--accent-glow);
        }
        .command-item svg {
          color: var(--accent);
          width: 14px;
          height: 14px;
        }
        [cmdk-group-heading] {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          padding: 8px 12px 4px;
        }
        [cmdk-input] {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
    </>
  )
}
