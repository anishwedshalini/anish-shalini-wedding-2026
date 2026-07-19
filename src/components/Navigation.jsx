import { useEffect, useState } from 'react'
import { navigation } from '../data'
import './Navigation.css'

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    let frame = null
    const updateScrolled = () => {
      frame = null
      setScrolled(window.scrollY > 24)
    }
    const onScroll = () => {
      if (frame == null) frame = requestAnimationFrame(updateScrolled)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame != null) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)

    if (!sections.length || !('IntersectionObserver' in window)) return undefined

    const updateActiveSection = () => {
      const focusLine = Math.max(
        document.documentElement.clientHeight * 0.35,
        96,
      )
      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect()
        return rect.top <= focusLine && rect.bottom >= focusLine
      })
      if (current) setActiveSection(current.id)
    }

    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: '-15% 0px -50% 0px',
      threshold: [0, 0.01],
    })

    sections.forEach((section) => observer.observe(section))
    updateActiveSection()
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNav = (sectionId) => {
    setActiveSection(sectionId)
    setOpen(false)
  }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__bar">
        <a className="nav__brand" href="#home" onClick={() => handleNav('home')}>
          <span className="nav__brand-mark" aria-hidden="true">
            ॐ
          </span>
          <span className="sr-only">Home</span>
        </a>

        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__toggle-line" aria-hidden="true" />
          <span className="nav__toggle-line" aria-hidden="true" />
        </button>

        <nav id="primary-navigation" className="nav__menu" aria-label="Primary">
          <ul className="nav__list">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  className={`nav__link ${activeSection === item.id ? 'nav__link--active' : ''}`}
                  href={item.href}
                  onClick={() => handleNav(item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {open && (
        <button
          className="nav__backdrop"
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  )
}
