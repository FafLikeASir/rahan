import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { caseStudies, caseStudyMap } from '@/data/case-studies'
import { CaseStudyLayout } from '@/components/case-study/CaseStudyLayout'
import { CaseFigure } from '@/components/case-study/CaseFigure'

const components = { CaseFigure }

function getContent(slug: string): string | null {
  const filePath = path.join(process.cwd(), 'content', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf-8')
}

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudyMap[slug as keyof typeof caseStudyMap]
  if (!study) return {}
  return {
    title: study.title,
    description: study.description,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = caseStudyMap[slug as keyof typeof caseStudyMap]
  if (!study) notFound()

  const content = getContent(slug)
  if (!content) notFound()

  return (
    <CaseStudyLayout study={study}>
      <MDXRemote source={content} components={components} />
    </CaseStudyLayout>
  )
}
