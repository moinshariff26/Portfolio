type StatusVariant = 'success' | 'warning' | 'error' | 'idle'

interface StatusBadgeProps {
  variant: StatusVariant
  label: string
  pulsing?: boolean
}

const variantStyles: Record<StatusVariant, string> = {
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  error: 'bg-error/10 text-error border-error/20',
  idle: 'bg-text-muted/10 text-text-muted border-text-muted/20',
}

const dotStyles: Record<StatusVariant, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  idle: 'bg-text-muted',
}

export function StatusBadge({ variant, label, pulsing = false }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border ${variantStyles[variant]}`}
    >
      <span className={`relative flex h-2 w-2 ${pulsing ? 'animate-pulse' : ''}`}>
        <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${dotStyles[variant]}`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dotStyles[variant]}`} />
      </span>
      {label}
    </span>
  )
}
