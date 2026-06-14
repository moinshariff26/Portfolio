interface ErrorPanelProps {
  status?: string
  source?: string
  reason?: string
  fallback?: string
}

export function ErrorPanel({ status, source, reason, fallback }: ErrorPanelProps) {
  return (
    <div className="glass-card p-6 border-error/20">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 w-2 h-2 rounded-full bg-error shrink-0" />
        <div className="space-y-2 font-mono text-sm">
          {status && (
            <div className="text-error font-semibold">
              Status: {status}
            </div>
          )}
          {source && (
            <div className="text-text-secondary">
              Source: {source}
            </div>
          )}
          {reason && (
            <div className="text-text-secondary">
              Reason: {reason}
            </div>
          )}
          {fallback && (
            <div className="text-warning mt-2 italic">
              {fallback}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
