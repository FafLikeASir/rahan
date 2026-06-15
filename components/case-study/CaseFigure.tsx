export function CaseFigure({
  caption,
  label,
}: {
  caption?: string
  label?: string
}) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-xl border border-border bg-muted flex items-center justify-center h-56 lg:h-72">
        <span className="text-sm text-text-tertiary">{label ?? 'Visual'}</span>
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs leading-relaxed text-text-tertiary text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
