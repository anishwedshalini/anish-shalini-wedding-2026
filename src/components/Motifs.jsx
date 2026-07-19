/**
 * Fine-line Hindu-inspired decorative motifs (inline SVG).
 * Sophisticated line work — not clipart.
 */

export function MandalaMotif({ className = '', size = 160 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      <circle cx="80" cy="80" r="56" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <circle cx="80" cy="80" r="28" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <circle cx="80" cy="80" r="6" stroke="currentColor" strokeWidth="0.7" />
      {[0, 45, 90, 135].map((deg) => (
        <line
          key={deg}
          x1="80"
          y1="12"
          x2="80"
          y2="148"
          stroke="currentColor"
          strokeWidth="0.4"
          opacity="0.35"
          transform={`rotate(${deg} 80 80)`}
        />
      ))}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <circle
          key={`p-${deg}`}
          cx="80"
          cy="24"
          r="1.2"
          fill="currentColor"
          opacity="0.45"
          transform={`rotate(${deg} 80 80)`}
        />
      ))}
      <path
        d="M80 52c8 10 8 26 0 36c-8-10-8-26 0-36Z"
        stroke="currentColor"
        strokeWidth="0.55"
        opacity="0.55"
      />
      <path
        d="M80 52c8 10 8 26 0 36c-8-10-8-26 0-36Z"
        stroke="currentColor"
        strokeWidth="0.55"
        opacity="0.55"
        transform="rotate(90 80 80)"
      />
    </svg>
  )
}

export function LotusMotif({ className = '', size = 72 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.7}
      viewBox="0 0 72 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M36 46C36 46 18 34 18 22C18 14 26 10 36 18C46 10 54 14 54 22C54 34 36 46 36 46Z"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.7"
      />
      <path
        d="M36 44C36 44 26 32 28 20C29.5 12 36 14 36 22C36 14 42.5 12 44 20C46 32 36 44 36 44Z"
        stroke="currentColor"
        strokeWidth="0.65"
        opacity="0.65"
      />
      <path
        d="M10 38C14 28 24 24 36 30C28 34 18 38 10 38Z"
        stroke="currentColor"
        strokeWidth="0.55"
        opacity="0.5"
      />
      <path
        d="M62 38C58 28 48 24 36 30C44 34 54 38 62 38Z"
        stroke="currentColor"
        strokeWidth="0.55"
        opacity="0.5"
      />
      <circle cx="36" cy="28" r="1.5" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

export function DiyaMotif({ className = '', size = 48 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 32c0 6 8 10 14 10s14-4 14-10c0-2-4-4-14-4s-14 2-14 4Z"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.7"
      />
      <path
        d="M24 28c2-6 1-12-0.5-16 4 3 6 9 5.5 14"
        stroke="currentColor"
        strokeWidth="0.65"
        opacity="0.65"
      />
      <path
        d="M22 14c1-2 3-4 2.5-6 2 1.5 3.5 4 3.5 7"
        stroke="currentColor"
        strokeWidth="0.55"
        opacity="0.5"
      />
    </svg>
  )
}

export function KalashMotif({ className = '', size = 56 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.15}
      viewBox="0 0 56 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 14h16l2 6H18l2-6Z"
        stroke="currentColor"
        strokeWidth="0.65"
        opacity="0.65"
      />
      <path
        d="M18 20c-4 6-6 14-4 24c2 8 10 12 14 12s12-4 14-12c2-10 0-18-4-24"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.7"
      />
      <path
        d="M28 8v6M24 6c2 2 6 2 8 0"
        stroke="currentColor"
        strokeWidth="0.55"
        opacity="0.55"
      />
      <path
        d="M22 34h12"
        stroke="currentColor"
        strokeWidth="0.45"
        opacity="0.4"
      />
    </svg>
  )
}

export function BorderMotif({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 6h128M192 6h128"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.45"
      />
      <circle cx="160" cy="6" r="3" stroke="currentColor" strokeWidth="0.6" opacity="0.55" />
      <circle cx="160" cy="6" r="1" fill="currentColor" opacity="0.45" />
      <path
        d="M148 6h8M164 6h8"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
    </svg>
  )
}

export function AgniMotif({ className = '', size = 48 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.2}
      viewBox="0 0 48 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24 4c2 8-4 12-2 20 1 5 5 8 5 14 0 8-6 14-11 14s-11-6-11-14c0-6 4-9 5-14 2-8-4-12-2-20 4 4 10 4 16 0Z"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.65"
        transform="translate(6 0)"
      />
      <path
        d="M24 22c1 4-1 7 0 11 1 3 3 5 3 8 0 5-3 8-6 8s-6-3-6-8c0-3 2-5 3-8 1-4-1-7 0-11 2 2 4 2 6 0Z"
        stroke="currentColor"
        strokeWidth="0.55"
        opacity="0.5"
        transform="translate(6 0)"
      />
    </svg>
  )
}

/**
 * Refined hero sacred geometry — lotus petals within concentric mandala rings.
 * Fine-line only; designed for the opening hero motif.
 */
export function HeroSacredMotif({ className = '', size = 200 }) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315]
  const innerPetals = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5]

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="0.5" opacity="0.28" />
      <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="0.45" opacity="0.32" />
      <circle cx="100" cy="100" r="64" stroke="currentColor" strokeWidth="0.5" opacity="0.38" />
      <circle cx="100" cy="100" r="42" stroke="currentColor" strokeWidth="0.55" opacity="0.45" />
      <circle cx="100" cy="100" r="18" stroke="currentColor" strokeWidth="0.6" opacity="0.55" />
      <circle cx="100" cy="100" r="4.5" stroke="currentColor" strokeWidth="0.7" opacity="0.7" />

      {petals.map((deg) => (
        <g key={`outer-${deg}`} transform={`rotate(${deg} 100 100)`}>
          <path
            d="M100 28c6.5 10 7.5 22 0 34c-7.5-12-6.5-24 0-34Z"
            stroke="currentColor"
            strokeWidth="0.55"
            opacity="0.48"
          />
          <circle cx="100" cy="24" r="1.1" fill="currentColor" opacity="0.4" />
        </g>
      ))}

      {innerPetals.map((deg) => (
        <g key={`inner-${deg}`} transform={`rotate(${deg} 100 100)`}>
          <path
            d="M100 58c4 6.5 4.5 14 0 21c-4.5-7-4-14.5 0-21Z"
            stroke="currentColor"
            strokeWidth="0.45"
            opacity="0.4"
          />
        </g>
      ))}

      {[0, 30, 60, 90, 120, 150].map((deg) => (
        <line
          key={`ray-${deg}`}
          x1="100"
          y1="12"
          x2="100"
          y2="188"
          stroke="currentColor"
          strokeWidth="0.3"
          opacity="0.2"
          transform={`rotate(${deg} 100 100)`}
        />
      ))}

      <circle cx="100" cy="100" r="2" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

