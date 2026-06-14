'use client'

import { useEffect, useRef, useState } from 'react'

interface MermaidDiagramProps {
  diagram: string
  theme?: 'dark' | 'neutral'
}

export function MermaidDiagram({ diagram, theme = 'dark' }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          theme,
          startOnLoad: false,
          fontFamily: 'JetBrains Mono, monospace',
        })

        const { svg: result } = await mermaid.render('mermaid-svg', diagram)
        if (!cancelled) {
          setSvg(result)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram')
          setLoading(false)
        }
      }
    }

    if (diagram) {
      render()
    }

    return () => { cancelled = true }
  }, [diagram, theme])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-card p-4 text-error font-mono text-sm">
        Diagram Error: {error}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto py-4"
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  )
}
