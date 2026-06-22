import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, basename } from 'path'

const DOCS_DIR = new URL('../docs', import.meta.url).pathname
const PRIVATE_RE = /<!-- PRIVATE -->[\s\S]*?<!-- \/PRIVATE -->/g

const files = readdirSync(DOCS_DIR).filter(
  f => f.endsWith('.md') && !f.endsWith('.public.md')
)

for (const file of files) {
  const src = join(DOCS_DIR, file)
  const content = readFileSync(src, 'utf8')
  if (!content.includes('<!-- PRIVATE -->')) continue

  const stripped = content
    .replace(PRIVATE_RE, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n'

  const dest = join(DOCS_DIR, basename(file, '.md') + '.public.md')
  writeFileSync(dest, stripped)
  console.log(`✓ ${file} → ${basename(dest)}`)
}
