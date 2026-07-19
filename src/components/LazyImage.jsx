import { useState } from 'react'
import './LazyImage.css'

/**
 * Lazy-loaded image with graceful fallback placeholder.
 */
export default function LazyImage({
  src,
  alt,
  className = '',
  aspectRatio = '4 / 5',
  placeholderLabel = 'Photograph coming soon',
}) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={`lazy-image ${failed ? 'lazy-image--fallback' : ''} ${className}`.trim()}
      style={{ aspectRatio }}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`lazy-image__img ${loaded ? 'is-loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="lazy-image__fallback" role="img" aria-label={alt}>
          <span className="lazy-image__motif" aria-hidden="true" />
          <span className="lazy-image__label">{placeholderLabel}</span>
        </div>
      )}
    </div>
  )
}
