import { useCallback, useEffect, useRef, useState } from 'react'
import { assetUrl } from '../utils/assetUrl'
import './GlobalEnhancements.css'

const MUSIC_SRC = assetUrl('assets/audio/wedding-music.mp3')
const PETALS = [
  { left: '8%', delay: '-4s', duration: '21s', mid: '24px', end: '-12px', size: '16px', tone: 'rose', shape: 'rose', turn: '210deg' },
  { left: '21%', delay: '-16s', duration: '27s', mid: '-18px', end: '16px', size: '13px', tone: 'marigold', shape: 'marigold', turn: '-170deg' },
  { left: '37%', delay: '-9s', duration: '24s', mid: '28px', end: '-16px', size: '15px', tone: 'marigold', shape: 'marigold', turn: '250deg' },
  { left: '53%', delay: '-21s', duration: '29s', mid: '-24px', end: '12px', size: '17px', tone: 'rose', shape: 'rose', turn: '-230deg' },
  { left: '68%', delay: '-6s', duration: '23s', mid: '20px', end: '-20px', size: '12px', tone: 'rose', shape: 'rose', turn: '190deg' },
  { left: '82%', delay: '-14s', duration: '26s', mid: '-28px', end: '14px', size: '16px', tone: 'marigold', shape: 'marigold', turn: '-260deg' },
  { left: '94%', delay: '-2s', duration: '25s', mid: '18px', end: '-10px', size: '14px', tone: 'rose', shape: 'rose', turn: '220deg' },
]

function MusicIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 17.2V7.5l8-1.7v9.4" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <circle cx="14.5" cy="15.5" r="2.5" />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m7 14 5-5 5 5M12 9v9" />
    </svg>
  )
}

function PetalField() {
  return (
    <div className="petal-field" aria-hidden="true">
      {PETALS.map((petal) => (
        <svg
          className={`petal petal--${petal.tone}`}
          key={`${petal.left}-${petal.delay}`}
          viewBox="0 0 16 22"
          focusable="false"
          style={{
            '--petal-left': petal.left,
            '--petal-delay': petal.delay,
            '--petal-duration': petal.duration,
            '--petal-mid': petal.mid,
            '--petal-end': petal.end,
            '--petal-size': petal.size,
            '--petal-rotation': petal.turn,
          }}
        >
          {petal.shape === 'rose' && (
            <path d="M8 1.6C13 4.7 15 10.1 11.7 15.4C9.7 18.6 5.5 20.3 2.1 20.4C4.2 16.8 2.3 13.4 3.4 9.7C4.3 6.5 6 3.8 8 1.6Z" />
          )}
          {petal.shape === 'marigold' && (
            <>
              <path d="M8 2.2C10.2 5 12.9 6.4 14.3 9.4C12.8 10 11.9 11 11.5 12.4C9.6 11.2 7.9 8.6 8 2.2Z" />
              <path d="M7.9 2.2C5.7 5 3 6.4 1.6 9.4C3.1 10 4 11 4.4 12.4C6.3 11.2 8 8.6 7.9 2.2ZM4.4 12.4C5 16 6.4 18.6 8 20.1C9.6 18.6 11 16 11.5 12.4C9.1 13.5 6.8 13.5 4.4 12.4Z" />
            </>
          )}
        </svg>
      ))}
    </div>
  )
}

export default function GlobalEnhancements() {
  const audioRef = useRef(null)
  const fadeFrameRef = useRef(null)
  const userPausedRef = useRef(false)
  const interactionHandledRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [audioAvailable, setAudioAvailable] = useState(true)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const cancelFade = useCallback(() => {
    if (fadeFrameRef.current) {
      cancelAnimationFrame(fadeFrameRef.current)
      fadeFrameRef.current = null
    }
  }, [])

  const fadeTo = useCallback(
    (target, duration = 1600, pauseAfter = false) => {
      const audio = audioRef.current
      if (!audio) return

      cancelFade()
      const startVolume = audio.volume
      const startedAt = performance.now()

      const step = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        const eased = 1 - (1 - progress) ** 3
        audio.volume = startVolume + (target - startVolume) * eased

        if (progress < 1) {
          fadeFrameRef.current = requestAnimationFrame(step)
        } else {
          fadeFrameRef.current = null
          if (pauseAfter) {
            audio.pause()
            setPlaying(false)
          }
        }
      }

      fadeFrameRef.current = requestAnimationFrame(step)
    },
    [cancelFade],
  )

  const startMusic = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !audioAvailable) return false

    try {
      cancelFade()
      audio.volume = 0
      await audio.play()
      setPlaying(true)
      fadeTo(0.22)
      return true
    } catch {
      setPlaying(false)
      return false
    }
  }, [audioAvailable, cancelFade, fadeTo])

  const toggleMusic = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !audioAvailable) return

    if (audio.paused) {
      userPausedRef.current = false
      await startMusic()
    } else {
      userPausedRef.current = true
      fadeTo(0, 500, true)
    }
  }, [audioAvailable, fadeTo, startMusic])

  useEffect(() => {
    const beginOnFirstInteraction = (event) => {
      if (event.target instanceof Element && event.target.closest('.floating-control--music')) {
        return
      }
      if (!interactionHandledRef.current && !userPausedRef.current) {
        interactionHandledRef.current = true
        startMusic()
      }
      removeListeners()
    }

    const removeListeners = () => {
      window.removeEventListener('pointerdown', beginOnFirstInteraction)
      window.removeEventListener('keydown', beginOnFirstInteraction)
    }

    window.addEventListener('pointerdown', beginOnFirstInteraction, { passive: true })
    window.addEventListener('keydown', beginOnFirstInteraction)
    return removeListeners
  }, [startMusic])

  useEffect(() => {
    const home = document.getElementById('home')
    if (!home) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setShowBackToTop(!entry.isIntersecting),
      { rootMargin: '-20% 0px 0px', threshold: 0 },
    )
    observer.observe(home)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ornaments = [...document.querySelectorAll('[data-bloom]')]

    if (reduceMotion || !('IntersectionObserver' in window)) {
      ornaments.forEach((ornament) => ornament.classList.add('is-bloomed'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-bloomed')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.25 },
    )

    ornaments.forEach((ornament) => observer.observe(ornament))
    return () => observer.disconnect()
  }, [])

  useEffect(
    () => () => {
      cancelFade()
      audioRef.current?.pause()
    },
    [cancelFade],
  )

  const scrollHome = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        preload="none"
        playsInline
        onError={() => {
          setAudioAvailable(false)
          setPlaying(false)
        }}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      <PetalField />

      <div className="floating-controls">
        <button
          className={`floating-control floating-control--music ${playing ? 'is-playing' : ''}`}
          type="button"
          onClick={() => {
            interactionHandledRef.current = true
            toggleMusic()
          }}
          disabled={!audioAvailable}
          aria-label={
            audioAvailable
              ? `${playing ? 'Pause' : 'Play'} music`
              : 'Wedding music unavailable'
          }
          aria-pressed={playing}
          title={audioAvailable ? `${playing ? 'Pause' : 'Play'} music` : 'Wedding music unavailable'}
        >
          <span className="floating-control__icon">
            <MusicIcon />
          </span>
        </button>

        <button
          className={`floating-control floating-control--top ${showBackToTop ? 'is-visible' : ''}`}
          type="button"
          onClick={scrollHome}
          aria-label="Back to top"
          tabIndex={showBackToTop ? 0 : -1}
        >
          <span className="floating-control__icon">
            <ArrowUpIcon />
          </span>
        </button>
      </div>
    </>
  )
}
