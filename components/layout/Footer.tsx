export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-6">
            <a
              href="mailto:maxime.luet@gmail.com"
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
            >
              maxime.luet@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/maximeluet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="/cv-maxime-luet.pdf"
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
            >
              CV (PDF)
            </a>
          </div>
          <p className="text-xs text-text-tertiary">
            {`© ${new Date().getFullYear()} Maxime Luet · Built with Next.js & Tailwind`}
          </p>
        </div>
      </div>
    </footer>
  )
}
