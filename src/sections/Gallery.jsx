import { useEffect, useCallback, useRef, useState } from 'react'
import Reveal from '../components/Reveal'
import { LotusMotif } from '../components/Motifs'
import { galleryItems } from '../data'
import './Gallery.css'

function MarigoldStrings({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {[12, 28, 44, 60].map((x, i) => (
        <g key={x}>
          <line
            x1={x}
            y1="0"
            x2={x}
            y2={118 + (i % 2) * 18}
            stroke="currentColor"
            strokeWidth="0.7"
            opacity="0.45"
          />
          {[34, 58, 82, 106].map((y) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y + (i % 2) * 8}
              r="2.4"
              stroke="currentColor"
              strokeWidth="0.65"
              opacity="0.5"
            />
          ))}
          <path
            d={`M${x - 3} ${130 + (i % 2) * 16}c1.5 4 4.5 7 3 10`}
            stroke="currentColor"
            strokeWidth="0.65"
            opacity="0.4"
          />
        </g>
      ))}
    </svg>
  )
}

function TinyBell({ className = '' }) {
  return (
    <svg
      className={className}
      width="18"
      height="22"
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 2v2.5M4.5 8.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5c0 3.2 1.4 5 2.2 6.2H2.3C3.1 13.5 4.5 11.7 4.5 8.5Z"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <path
        d="M6.2 14.7h5.6c0 1.6-1.25 2.9-2.8 2.9s-2.8-1.3-2.8-2.9Z"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.65"
      />
    </svg>
  )
}

function GalleryShot({ item, index, onOpen, onUnavailable }) {
  return (
    <figure
      className={`gallery-shot gallery-shot--${item.role} gallery-shot--${item.frame} gallery-shot--fit-${item.fit || 'cover'}`}
      style={{ '--shot-aspect': item.aspect }}
    >
      <button
        type="button"
        className="gallery-shot__trigger"
        onClick={() => onOpen(index)}
        aria-label={`Open photograph: ${item.alt}`}
      >
        <span className="gallery-shot__frame">
          <img
            className="gallery-shot__image"
            src={item.src}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            fetchPriority={item.role === 'featured' ? 'auto' : 'low'}
            width={item.aspect === '1 / 1' ? 1200 : 1500}
            height={item.aspect === '1 / 1' ? 1200 : 1000}
            style={{ objectPosition: item.objectPosition }}
            onError={() => onUnavailable(item.id)}
          />
          <span className="gallery-shot__corner gallery-shot__corner--tl" aria-hidden="true" />
          <span className="gallery-shot__corner gallery-shot__corner--tr" aria-hidden="true" />
          <span className="gallery-shot__corner gallery-shot__corner--bl" aria-hidden="true" />
          <span className="gallery-shot__corner gallery-shot__corner--br" aria-hidden="true" />
        </span>
        {item.role === 'featured' && item.caption && (
          <figcaption className="gallery-shot__caption">{item.caption}</figcaption>
        )}
      </button>
    </figure>
  )
}

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const touchStartX = useRef(null)
  const item = items[index]

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, onPrev, onNext])

  if (!item) return null

  return (
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Engagement photograph viewer"
      onClick={onClose}
      onTouchStart={(event) => {
        touchStartX.current = event.changedTouches[0].clientX
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current == null) return
        const delta = event.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(delta) > 48) {
          if (delta > 0) onPrev()
          else onNext()
        }
        touchStartX.current = null
      }}
    >
      <button
        type="button"
        className="gallery-lightbox__close"
        onClick={onClose}
        aria-label="Close photograph"
      >
        Close
      </button>

      <button
        type="button"
        className="gallery-lightbox__nav gallery-lightbox__nav--prev"
        onClick={(event) => {
          event.stopPropagation()
          onPrev()
        }}
        aria-label="Previous photograph"
      >
        ‹
      </button>

      <figure
        className="gallery-lightbox__figure"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          className="gallery-lightbox__image"
          src={item.fullSrc || item.src}
          alt={item.alt}
          decoding="async"
        />
        {item.caption && (
          <figcaption className="gallery-lightbox__caption">{item.caption}</figcaption>
        )}
      </figure>

      <button
        type="button"
        className="gallery-lightbox__nav gallery-lightbox__nav--next"
        onClick={(event) => {
          event.stopPropagation()
          onNext()
        }}
        aria-label="Next photograph"
      >
        ›
      </button>
    </div>
  )
}

export default function Gallery() {
  const [available, setAvailable] = useState(galleryItems)
  const [activeIndex, setActiveIndex] = useState(null)

  const openAt = useCallback((index) => setActiveIndex(index), [])
  const close = useCallback(() => setActiveIndex(null), [])
  const removeUnavailable = useCallback((itemId) => {
    setAvailable((items) => items.filter((item) => item.id !== itemId))
    setActiveIndex(null)
  }, [])
  const showPrev = useCallback(() => {
    setActiveIndex((current) =>
      current == null
        ? current
        : (current - 1 + available.length) % available.length,
    )
  }, [available.length])
  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current == null ? current : (current + 1) % available.length,
    )
  }, [available.length])

  const featured = available.find((item) => item.role === 'featured')
  const heroSide = available.filter((item) =>
    ['detail-primary', 'ceremony'].includes(item.role),
  )
  const sequence = available.filter(
    (item) =>
      item.role !== 'featured' &&
      !['detail-primary', 'ceremony'].includes(item.role),
  )

  return (
    <section id="gallery" className="section gallery">
      <div className="gallery__garland gallery__garland--left" data-bloom aria-hidden="true">
        <MarigoldStrings />
        <TinyBell className="gallery__bell" />
      </div>
      <div className="gallery__garland gallery__garland--right" data-bloom aria-hidden="true">
        <MarigoldStrings />
        <TinyBell className="gallery__bell" />
      </div>

      <div className="section__inner gallery__inner">
        <Reveal>
          <header className="gallery__header">
            <p className="gallery__eyebrow">Our Memories</p>
            <h2 className="gallery__title">Moments We Hold Close</h2>
            <p className="gallery__lede">
              A glimpse of the beautiful moments that brought us closer to forever.
            </p>
            <div className="gallery__divider" data-bloom aria-hidden="true">
              <span />
              <LotusMotif size={34} />
              <span />
            </div>
          </header>
        </Reveal>

        {available.length > 0 && (
          <div className="gallery__album" data-count={available.length}>
            <div className="gallery__hero-row">
              {featured && (
                <Reveal className="gallery__featured-wrap" delay={0.05}>
                  <GalleryShot
                    item={featured}
                    index={available.findIndex((item) => item.id === featured.id)}
                    onOpen={openAt}
                    onUnavailable={removeUnavailable}
                  />
                </Reveal>
              )}

              <div className="gallery__hero-side">
                {heroSide.map((item, index) => {
                  const absoluteIndex = available.findIndex(
                    (entry) => entry.id === item.id,
                  )
                  return (
                    <Reveal
                      key={item.id}
                      className={`gallery__album-item gallery__album-item--${item.role}`}
                      delay={0.08 + index * 0.05}
                    >
                      <GalleryShot
                        item={item}
                        index={absoluteIndex}
                        onOpen={openAt}
                        onUnavailable={removeUnavailable}
                      />
                    </Reveal>
                  )
                })}
              </div>
            </div>

            <div className="gallery__sequence">
              {sequence.map((item, index) => {
                const absoluteIndex = available.findIndex(
                  (entry) => entry.id === item.id,
                )
                return (
                  <Reveal
                    key={item.id}
                    className={`gallery__album-item gallery__album-item--${item.role}`}
                    delay={Math.min(0.06 + index * 0.04, 0.28)}
                  >
                    <GalleryShot
                      item={item}
                      index={absoluteIndex}
                      onOpen={openAt}
                      onUnavailable={removeUnavailable}
                    />
                  </Reveal>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {activeIndex != null && (
        <Lightbox
          items={available}
          index={activeIndex}
          onClose={close}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </section>
  )
}
