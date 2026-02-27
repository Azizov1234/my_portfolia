import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Architecture from './components/Architecture'
import Projects from './components/Projects'
import GithubSection from './components/GithubSection'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [loaded, setLoaded] = useState(false)
  const [lang, setLang] = useState('en')

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--c-bg)', color: 'var(--c-text)' }}>
      {/* Loading screen — hides when done */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Always-on overlays */}
      <CustomCursor />
      <ScrollProgress />
      <Background />

      {/* Site content */}
      <div className="w-full flex flex-col items-center overflow-x-hidden" style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Navbar lang={lang} setLang={setLang} />
        <main className="w-full flex flex-col items-center">
          <Hero lang={lang} />
          <About lang={lang} />
          <TechStack lang={lang} />
          <Architecture lang={lang} />
          <Projects lang={lang} />
          <GithubSection lang={lang} />
          <Contact lang={lang} />
        </main>
        <Footer lang={lang} />
      </div>
    </div>
  )
}

export default App
