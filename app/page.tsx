import { Hero } from '@/components/hero/Hero'
import { WorkSection } from '@/components/home/WorkSection'
// import { SystemSection } from '@/components/home/SystemSection'
import { AboutSection } from '@/components/home/AboutSection'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <WorkSection />
      {/* <SystemSection /> */}
      <AboutSection />
    </main>
  )
}
