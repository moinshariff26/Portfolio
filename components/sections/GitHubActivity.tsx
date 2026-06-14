'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, GitFork, Users, BookOpen } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { ErrorPanel } from '@/components/ui/ErrorPanel'
import { mockGitHubData, type GitHubData } from '@/lib/github'

const languageColors: Record<string, string> = {
  Python: '#3776AB',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Java: '#007396',
  Go: '#00ADD8',
  Rust: '#DEA584',
  HTML: '#E34F26',
  CSS: '#1572B6',
}

export function GitHubActivity() {
  const [data, setData] = useState<GitHubData | null>(null)
  const [error, setError] = useState<{ status?: string; reason?: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/github')
        const json = await res.json()

        if (json.error) {
          setError({ status: '403', reason: json.message || 'Rate Limited' })
          setData(mockGitHubData)
        } else {
          setData(json)
        }
      } catch {
        setError({ status: '500', reason: 'Network Error' })
        setData(mockGitHubData)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <SectionWrapper id="github" label="04 / GITHUB METRICS">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card p-5 animate-pulse">
              <div className="h-4 w-20 bg-bg-secondary rounded mb-3" />
              <div className="h-8 w-16 bg-bg-secondary rounded" />
            </div>
          ))}
        </div>
      </SectionWrapper>
    )
  }

  const maxLangCount = data ? Math.max(...data.topLanguages.map((l) => l.count), 1) : 1

  return (
    <SectionWrapper id="github" label="04 / GITHUB METRICS">
      {error && (
        <div className="mb-6">
          <ErrorPanel
            status={error.status}
            source="GitHub GraphQL API"
            reason={error.reason}
            fallback="Showing cached profile data"
          />
        </div>
      )}

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">Contributions</span>
              <p className="mt-2 text-3xl font-heading font-bold text-accent">{data.contributions}</p>
            </div>
            <div className="glass-card p-5">
              <div className="flex items-center gap-2">
                <Star size={14} className="text-warning" />
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">Stars</span>
              </div>
              <p className="mt-2 text-3xl font-heading font-bold text-text-primary">{data.totalStars}</p>
            </div>
            <div className="glass-card p-5">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-accent" />
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">Followers</span>
              </div>
              <p className="mt-2 text-3xl font-heading font-bold text-text-primary">{data.followers}</p>
            </div>
            <div className="glass-card p-5">
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-text-secondary" />
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">Repos</span>
              </div>
              <p className="mt-2 text-3xl font-heading font-bold text-text-primary">{data.publicRepos}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card p-5">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">Top Languages</span>
              <div className="mt-4 space-y-3">
                {data.topLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-3">
                    <span className="font-mono text-xs text-text-secondary w-20 shrink-0">{lang.name}</span>
                    <div className="flex-1 h-2 rounded-full bg-bg-secondary overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: lang.color || languageColors[lang.name] || '#666' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(lang.count / maxLangCount) * 100}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="font-mono text-xs text-text-muted w-6 text-right">{lang.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {data.recentRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-4 block group hover:-translate-y-0.5 transition-transform duration-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-heading font-semibold text-sm text-text-primary group-hover:text-accent transition-colors truncate">
                        {repo.name}
                      </h4>
                      {repo.description && (
                        <p className="text-xs text-text-muted mt-1 line-clamp-1">{repo.description}</p>
                      )}
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        {repo.language && (
                          <span className="flex items-center gap-1.5 text-[10px] font-mono text-text-muted">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: languageColors[repo.language] || '#666' }}
                            />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-[10px] font-mono text-text-muted">
                          <Star size={10} /> {repo.stars}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-mono text-text-muted">
                          <GitFork size={10} /> {repo.forkCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}
