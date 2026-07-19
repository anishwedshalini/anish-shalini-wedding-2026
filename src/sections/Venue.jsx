import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/Reveal'
import { wedding } from '../data'
import hotelVishuwaPhoto from '../assets/venue/hotel-vishuwa.jpg'
import './Venue.css'

function LocationPin({ className = '' }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 21s7-5.4 7-11.2A7 7 0 1 0 5 9.8C5 15.6 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function VenueCta({ href, children, variant = 'primary', className = '', icon }) {
  const classes = `venue-cta venue-cta--${variant} ${className}`.trim()
  const isHttp = typeof href === 'string' && /^https?:/i.test(href)

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        {...(isHttp
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {icon}
        <span>{children}</span>
      </a>
    )
  }

  return (
    <span className={`${classes} venue-cta--pending`} aria-disabled="true">
      {icon}
      <span>{children}</span>
    </span>
  )
}

function ArchPhoto({ alt }) {
  return (
    <div className="venue-arch">
      <span className="venue-arch__corner venue-arch__corner--tl" aria-hidden="true" />
      <span className="venue-arch__corner venue-arch__corner--tr" aria-hidden="true" />
      <span className="venue-arch__corner venue-arch__corner--bl" aria-hidden="true" />
      <span className="venue-arch__corner venue-arch__corner--br" aria-hidden="true" />
      <img
        className="venue-arch__image"
        src={hotelVishuwaPhoto}
        alt={alt}
        loading="eager"
        decoding="async"
      />
    </div>
  )
}

function VenuePanelReveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Venue() {
  const locationUrl =
    wedding.actions.locationUrl || wedding.venue.mapUrl || ''
  const attendanceSubject = 'Wedding Attendance Confirmation — Anish & Shalini'
  const attendanceBody = [
    'Dear Anish & Shalini,',
    '',
    'Yes, I’ll be there to celebrate your wedding with you.',
    '',
    'Guest Name:',
    'Number of Guests:',
    '',
    'Warm wishes,',
  ].join('\n')
  const attendanceUrl = `mailto:kumaranish9@gmail.com?subject=${encodeURIComponent(attendanceSubject)}&body=${encodeURIComponent(attendanceBody)}`

  return (
    <section id="venue" className="section venue">
      <div className="section__inner venue__inner">
        <Reveal>
          <header className="venue__header">
            <p className="venue__eyebrow">The Wedding Venue</p>
            <h2 className="venue__section-heading">
              Where Our Families Come Together
            </h2>
            <div className="venue__heading-divider" aria-hidden="true">
              <span />
              <span className="venue__heading-jewel" />
              <span />
            </div>
          </header>
        </Reveal>

        <div className="venue__layout">
          <VenuePanelReveal className="venue__card-wrap">
            <article className="venue-card">
              <span className="venue-card__corner venue-card__corner--tl" aria-hidden="true" />
              <span className="venue-card__corner venue-card__corner--tr" aria-hidden="true" />
              <span className="venue-card__corner venue-card__corner--bl" aria-hidden="true" />
              <span className="venue-card__corner venue-card__corner--br" aria-hidden="true" />
              <span className="venue-card__cord venue-card__cord--left" aria-hidden="true" />
              <span className="venue-card__cord venue-card__cord--right" aria-hidden="true" />
              <span className="venue-card__arch" aria-hidden="true">
                <span />
              </span>

              <p className="venue-card__eyebrow">Celebrate With Us</p>
              <h2 className="venue__title">{wedding.venue.name}</h2>
              <p className="venue__location">
                {wedding.venue.city}, {wedding.venue.country}
              </p>
              <p className="venue__note">
                Where our families come together to celebrate a new beginning.
              </p>
              <VenueCta
                href={locationUrl}
                variant="primary"
                icon={<LocationPin className="venue-cta__icon" />}
              >
                View Location
              </VenueCta>

              <div className="venue-card__divider" aria-hidden="true">
                <span />
                <span className="venue-card__jewel" />
                <span />
              </div>

              <p className="venue-card__attendance-eyebrow">Join the Celebration</p>
              <h3 className="venue-card__attendance-title">Will You Join Us?</h3>
              <p className="venue-card__attendance-text">
                Please let us know if you'll be celebrating with us.
              </p>
              <VenueCta href={attendanceUrl} variant="primary">
                Yes, I’ll Be There
              </VenueCta>
            </article>
          </VenuePanelReveal>

          <VenuePanelReveal className="venue__visual" delay={0.1}>
            <div className="venue__stage">
              <ArchPhoto
                alt={`${wedding.venue.name}, ${wedding.venue.city}`}
              />
            </div>
          </VenuePanelReveal>
        </div>
      </div>
    </section>
  )
}
