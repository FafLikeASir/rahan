const principles = [
  {
    title: 'Design where decisions happen.',
    body: 'I want to understand how things work, how they\'re put together, where they break down — before I start designing. The best work happens when design is a partner to product and engineering from the start, not a step they hand off to.',
  },
  {
    title: 'I work in systems.',
    body: 'Whether I\'m shaping a single feature or a full product, I think in reusable components and shared foundations. Design systems aren\'t a deliverable — they\'re the way teams stay aligned as they grow.',
  },
  {
    title: 'Systems are built with people.',
    body: 'A library nobody uses isn\'t a system, it\'s a folder. I work hands-on with developers and product managers — making the system theirs as much as mine is what makes it stick.',
  },
  {
    title: 'I don\'t hand off and walk away.',
    body: 'Whenever the project allows it, I follow my own designs into the code. Staying engaged through the build keeps design honest and ships products that look the way they were meant to.',
  },
  {
    title: 'Useful doesn\'t have to mean ugly.',
    body: 'Product design too often trades craft for utility, as if you had to choose. I don\'t. Function and beauty hold each other up — and a well-crafted interface earns the trust users give a product.',
  },
] as const

export function MethodSection() {
  return (
    <section id="method" className="scroll-mt-20 bg-muted">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary lg:text-4xl">
            Method
          </h2>
          <p className="mb-16 text-base leading-relaxed text-text-secondary">
            I came to product design through code — and I&apos;ve stayed at that intersection
            ever since. Different products, different teams, same convictions underneath.
          </p>

          <ol className="flex flex-col gap-10" role="list">
            {principles.map((p, i) => (
              <li key={i} className="method-reveal flex items-start gap-5">
                {/* Giant decorative numeral */}
                <span
                  className="flex-shrink-0 select-none font-black leading-[0.8] tracking-tighter opacity-[.06]"
                  style={{
                    fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
                    color: 'var(--foreground)',
                  }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className="pt-2">
                  <h3 className="mb-2 text-base font-semibold text-primary">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
