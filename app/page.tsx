import { HeroSection } from '@/components/sections/HeroSection'
import { NowPanel } from '@/components/sections/NowPanel'
import { SkillsMatrix } from '@/components/sections/SkillsMatrix'
import { ExperienceLog } from '@/components/sections/ExperienceLog'
import { ProjectsRegistry } from '@/components/sections/ProjectsRegistry'
import { GitHubActivity } from '@/components/sections/GitHubActivity'
import { BadgeWall } from '@/components/sections/BadgeWall'
import { ContactSection } from '@/components/sections/ContactSection'
import { UnderTheHood } from '@/components/sections/UnderTheHood'

export default function Home() {
  return (
    <>
      <HeroSection />
      <NowPanel />
      <SkillsMatrix />
      <ExperienceLog />
      <ProjectsRegistry />
      <GitHubActivity />
      <BadgeWall />
      <ContactSection />
      <UnderTheHood />

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p className="font-mono text-xs text-text-muted text-center">
            &copy; {new Date().getFullYear()} Moin Shariff. Built with Next.js 14.
          </p>
        </div>
      </footer>
    </>
  )
}
