import Image from 'next/image'

export function CaseFigure({
  caption,
  label,
  src,
  alt,
}: {
  caption?: string
  label?: string
  src?: string
  alt?: string
}) {
  return (
    <figure className="my-10">
      {src ? (
        <div className="relative overflow-hidden rounded-xl h-56 lg:h-72">
          <Image
            src={src}
            alt={alt ?? label ?? ''}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 768px, 100vw"
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-muted flex items-center justify-center h-56 lg:h-72">
          <span className="text-sm text-text-tertiary">{label ?? 'Visual'}</span>
        </div>
      )}
      {caption && (
        <figcaption className="mt-3 text-xs leading-relaxed text-text-tertiary text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
