import { Hero } from '@/components/hero/Hero'
import { WorkSection } from '@/components/home/WorkSection'
import { MethodSection } from '@/components/home/MethodSection'
import { AboutSection } from '@/components/home/AboutSection'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <WorkSection />
      <MethodSection />
      <AboutSection />
    </main>
  )
}
