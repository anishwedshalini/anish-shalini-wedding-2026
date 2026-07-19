import { motion, useReducedMotion } from 'framer-motion'
import { wedding } from '../data'
import Countdown from '../components/Countdown'
import { assetUrl } from '../utils/assetUrl'
import './Hero.css'

export default function Hero() {
  const reduceMotion = useReducedMotion()

  const fade = (delay = 0, y = 14, duration = 0.65) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
        }

  const imageMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <section id="home" className="hero" aria-label="Opening invitation">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__glow hero__glow--primary" />
        <div className="hero__glow hero__glow--accent" />
        <div className="hero__geometry" />
        <div className="hero__grain" />
      </div>

      <div className="hero__inner">
        <div className="hero__blessing">
          <motion.div
            className="hero__ganesha"
            {...fade(0.02, 8, 0.55)}
          >
            <img
              className="hero__ganesha-image"
              src={assetUrl('assets/decorative/ganesha.png')}
              alt="Lord Ganesha"
              width="681"
              height="1002"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </motion.div>

          <motion.p
            className="hero__mantra"
            lang="sa"
            {...fade(0.09, 8, 0.6)}
          >
            <span>वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।</span>
            <span>निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥</span>
          </motion.p>
        </div>

        <div className="hero__headline">
          <motion.p className="hero__kicker" {...fade(0.2, 10)}>
            Shubh Vivaah
          </motion.p>

          <motion.h1 className="hero__title" {...fade(0.27, 14)}>
            <span className="hero__name">Dr. Anish Kumar</span>
            <span className="hero__weds">Weds</span>
            <span className="hero__name">Dr. Shalini Priya</span>
          </motion.h1>
        </div>

        <motion.figure className="hero__portrait" {...imageMotion}>
          <span className="hero__portrait-line" aria-hidden="true" />
          <img
            className="hero__portrait-image"
            src={assetUrl('assets/couple/hero-couple.jpg')}
            alt="Dr. Anish Kumar and Dr. Shalini Priya seated together beneath a floral wedding arch"
            width="1024"
            height="1536"
            fetchpriority="high"
            decoding="async"
          />
        </motion.figure>

        <div className="hero__details">
          <motion.div className="hero__meta" {...fade(0.44, 10)}>
            <p className="hero__date">{wedding.date.display}</p>
            <span className="hero__meta-ornament" aria-hidden="true" />
            <p className="hero__venue">{wedding.venue.display}</p>
          </motion.div>

          <motion.div className="hero__countdown" {...fade(0.52, 8)}>
            <Countdown
              targetIso={wedding.countdown.targetIso}
              completedMessage={wedding.countdown.completedMessage}
            />
          </motion.div>
        </div>

        <motion.a
          className="hero__scroll"
          href="#introduction"
          {...fade(0.6, 6)}
        >
          <span className="hero__scroll-label">Continue</span>
          <span className="hero__scroll-track" aria-hidden="true">
            <span className="hero__scroll-line" />
          </span>
        </motion.a>
      </div>
    </section>
  )
}
