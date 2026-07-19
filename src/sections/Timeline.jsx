import { useState } from 'react'
import Reveal from '../components/Reveal'
import { LotusMotif } from '../components/Motifs'
import { events } from '../data'
import { assetUrl } from '../utils/assetUrl'
import './Timeline.css'

const eventPresentation = {
  'katha-matkor': {
    number: '01',
    description:
      'A sacred beginning with prayer, tradition and the blessings of family.',
    artwork: assetUrl('assets/events/katha-matkor.png'),
    artworkName: 'Kalash',
  },
  sangeet: {
    number: '02',
    description: 'An evening of music, laughter and celebration.',
    artwork: assetUrl('assets/events/sangeet.png'),
    artworkName: 'Musical motif',
  },
  haldi: {
    number: '03',
    description:
      'A joyful ceremony filled with turmeric, laughter and blessings.',
    artwork: assetUrl('assets/events/haldi.png'),
    artworkName: 'Floral turmeric motif',
  },
  'shubh-vivaah': {
    number: '04',
    description: 'Beside the sacred Agni, two lives become one.',
    artwork: assetUrl('assets/events/shubh-vivaah.png'),
    artworkName: 'Sacred Agni or mandap motif',
  },
  vidai: {
    number: '05',
    description:
      'A tender farewell and the beginning of a new journey.',
    artwork: assetUrl('assets/events/vidai.png'),
    artworkName: 'Doli motif',
  },
}

/**
 * Shared ceremonial mantra slot.
 * Keep empty until Sanskrit text and its exact source are verified.
 */
const journeyMantra = {
  status: 'placeholder',
  sanskrit: '',
  source: '',
}

function EventArtwork({ src, name }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={`event-card__artwork ${failed ? 'event-card__artwork--empty' : ''}`}
      data-artwork={name}
      aria-hidden="true"
    >
      <img
        className={`event-card__artwork-image ${loaded ? 'is-loaded' : ''}`}
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  )
}

function EventCard({ event, index }) {
  const presentation = eventPresentation[event.id]
  const venue = [event.venue, event.location].filter(Boolean).join(' · ')
  const eventTime = event.time || event.period

  return (
    <Reveal className={`celebrations__item celebrations__item--${index + 1}`} delay={index * 0.06}>
      <article
        className={`event-card event-card--${event.id} ${event.featured ? 'event-card--featured' : ''}`}
        id={event.slug}
      >
        <span className="event-card__corner event-card__corner--tl" aria-hidden="true" />
        <span className="event-card__corner event-card__corner--tr" aria-hidden="true" />
        <span className="event-card__corner event-card__corner--bl" aria-hidden="true" />
        <span className="event-card__corner event-card__corner--br" aria-hidden="true" />

        <span className="event-card__number" aria-label={`Event ${presentation.number}`}>
          {presentation.number}
        </span>

        <div className="event-card__content">
          <time className="event-card__date" dateTime={event.date.iso}>
            {event.date.display}
          </time>
          <h3 className="event-card__title">{event.name}</h3>

          {(eventTime || venue) && (
            <div className="event-card__details">
              {eventTime && <p>{eventTime}</p>}
              {venue && <p>{venue}</p>}
            </div>
          )}

          <p className="event-card__description">
            {presentation.description}
          </p>
        </div>

        <EventArtwork
          src={presentation.artwork}
          name={presentation.artworkName}
        />
      </article>
    </Reveal>
  )
}

export default function Timeline() {
  return (
    <section id="celebrations" className="section celebrations">
      <div className="section__inner">
        <Reveal>
          <header className="celebrations__header">
            <p className="celebrations__eyebrow">The Wedding Celebrations</p>
            <h2 className="celebrations__title">Our Wedding Celebrations</h2>
            <p className="celebrations__intro">
              With the blessings of our families, we invite you to celebrate
              these cherished moments with us.
            </p>
            <div className="celebrations__divider" data-bloom aria-hidden="true">
              <span />
              <LotusMotif size={38} />
              <span />
            </div>
          </header>
        </Reveal>

        <div className="celebrations__grid">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        <Reveal delay={0.14}>
          <div
            className="celebrations__mantra"
            data-status={journeyMantra.status}
            aria-label="Ceremonial Sanskrit mantra area"
          >
            <span className="celebrations__mantra-ornament" aria-hidden="true" />
            {journeyMantra.sanskrit && (
              <>
                <blockquote lang="sa">{journeyMantra.sanskrit}</blockquote>
                {journeyMantra.source && <cite>{journeyMantra.source}</cite>}
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
