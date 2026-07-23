import Image from 'next/image'

export function ScreensGrid({
  images,
  caption,
}: {
  images: { src: string; alt: string }[]
  caption?: string
}) {
  return (
    <figure className="my-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {images.map((image) => (
          <div
            key={image.src}
            className="relative overflow-hidden rounded-xl h-40 sm:h-48"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="(min-width: 640px) 33vw, 100vw"
            />
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs leading-relaxed text-text-tertiary text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
