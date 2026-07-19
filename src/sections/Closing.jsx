import Reveal from '../components/Reveal'
import Shloka from '../components/Shloka'
import Button from '../components/Button'
import { wedding, shlokas } from '../data'
import './Closing.css'

function SacredOmMotif({ className = '', size = 88 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="44" cy="44" r="41" stroke="currentColor" strokeWidth="0.55" opacity="0.5" />
      <circle cx="44" cy="44" r="34.5" stroke="currentColor" strokeWidth="0.45" opacity="0.42" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <path
          key={deg}
          d="M44 8.5C47.2 14.8 47.2 22.5 44 28.5C40.8 22.5 40.8 14.8 44 8.5Z"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.55"
          transform={`rotate(${deg} 44 44)`}
        />
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
        <path
          key={`inner-${deg}`}
          d="M44 16C46 20.2 46 25.2 44 29.2C42 25.2 42 20.2 44 16Z"
          stroke="currentColor"
          strokeWidth="0.45"
          opacity="0.45"
          transform={`rotate(${deg} 44 44)`}
        />
      ))}
      <circle cx="44" cy="44" r="18" stroke="currentColor" strokeWidth="0.5" opacity="0.52" />
      <text
        className="closing__om-symbol"
        x="44"
        y="49.5"
        textAnchor="middle"
        fontFamily="Noto Sans Devanagari, Noto Serif Devanagari, serif"
        fontSize="18"
        fill="currentColor"
      >
        ॐ
      </text>
    </svg>
  )
}

export default function Closing() {
  const locationUrl = wedding.actions.locationUrl || wedding.venue.mapUrl
  const rsvpUrl = wedding.actions.rsvpUrl
  const hasActions = Boolean(locationUrl || rsvpUrl)

  return (
    <section id="closing" className="section closing" aria-label="Final invitation">
      <div className="closing__atmosphere" aria-hidden="true" />
      <div className="section__inner section__inner--narrow closing__inner">
        <Reveal>
          <div className="closing__motif" data-bloom aria-hidden="true">
            <SacredOmMotif size={88} />
          </div>

          <p className="closing__kicker">With Love & Blessings</p>
          <h2 className="closing__title">Dr. Anish Weds Dr. Shalini</h2>
          <p className="closing__date">{wedding.date.display}</p>
          <p className="closing__venue">{wedding.venue.display}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <Shloka shloka={shlokas.closing} className="closing__shloka" />
        </Reveal>

        {hasActions && (
          <Reveal delay={0.15}>
            <div className="closing__actions">
              {locationUrl && (
                <Button href={locationUrl} variant="primary" external>
                  View Location
                </Button>
              )}
              {rsvpUrl && (
                <Button href={rsvpUrl} variant="ghost" external>
                  RSVP
                </Button>
              )}
            </div>
          </Reveal>
        )}

        {!hasActions && (
          <p className="closing__config-note">
            Location and RSVP links are configurable in{' '}
            <code>src/data/wedding.js</code>
          </p>
        )}

        <p className="closing__footer">
          <span className="closing__footer-line" aria-hidden="true" />
          We look forward to celebrating with you
        </p>
      </div>
    </section>
  )
}
