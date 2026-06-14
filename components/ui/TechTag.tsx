interface TechTagProps {
  name: string
}

export function TechTag({ name }: TechTagProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border border-border bg-bg-secondary text-text-secondary whitespace-nowrap">
      {name}
    </span>
  )
}
