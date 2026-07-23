import { ArrowRight } from 'lucide-react'

export function PipelineDiagram({
  steps,
  caption,
}: {
  steps: { tool: string; role: string }[]
  caption?: string
}) {
  return (
    <figure className="my-10">
      <div className="rounded-xl border border-border bg-muted px-4 py-8 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {steps.map((step, i) => (
            <div key={step.tool} className="flex flex-col items-center gap-6 sm:contents">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <span className="text-base font-semibold text-text-primary">{step.tool}</span>
                <span className="text-xs text-text-tertiary">{step.role}</span>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight
                  className="size-4 text-text-tertiary shrink-0 rotate-90 sm:rotate-0"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs leading-relaxed text-text-tertiary text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
