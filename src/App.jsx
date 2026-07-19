import Navigation from './components/Navigation'
import GlobalEnhancements from './components/GlobalEnhancements'
import Hero from './sections/Hero'
import SacredIntro from './sections/SacredIntro'
import Timeline from './sections/Timeline'
import Blessings from './sections/Blessings'
import Venue from './sections/Venue'
import Gallery from './sections/Gallery'
import Closing from './sections/Closing'
import './styles/global.css'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <Navigation />
      <main>
        <Hero />
        <SacredIntro />
        <Timeline />
        <Blessings />
        <Venue />
        <Gallery />
        <Closing />
      </main>
      <GlobalEnhancements />
    </>
  )
}
