import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import Shloka from '../components/Shloka'
import { BorderMotif } from '../components/Motifs'
import { shlokas } from '../data'
import './SacredIntro.css'

export default function SacredIntro() {
  return (
    <section id="introduction" className="section sacred-intro">
      <div className="section__inner section__inner--narrow">
        <Reveal>
          <SectionHeader
            eyebrow="The Celebration"
            title="A sacred union begins"
            lede="With reverence and joy, two families gather to bless the marriage of Anish and Shalini — a celebration rooted in Hindu tradition, held with quiet elegance."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="sacred-intro__border" aria-hidden="true">
            <BorderMotif className="sacred-intro__border-svg" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <Shloka shloka={shlokas.introduction} />
        </Reveal>
      </div>
    </section>
  )
}
