import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import './Countdown.css'

function getTimeParts(targetMs) {
  const diff = targetMs - Date.now()
  if (diff <= 0) return null

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}

function pad(value) {
  return String(value).padStart(2, '0')
}

function AnimatedNumber({ value, wide }) {
  const reduceMotion = useReducedMotion()

  return (
    <span
      className={`countdown__value${wide ? ' countdown__value--days' : ''}`}
      aria-hidden="true"
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={value}
          className="countdown__value-digit"
          initial={reduceMotion ? false : { opacity: 0, y: 7 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -7 }}
          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/**
 * Real-time countdown to a configurable ISO target.
 * Shows an elegant completed message when the target is reached.
 */
export default function Countdown({
  targetIso,
  completedMessage = 'The auspicious day has arrived',
  className = '',
}) {
  const targetMs = Number.isFinite(Date.parse(targetIso))
    ? Date.parse(targetIso)
    : NaN

  const [parts, setParts] = useState(() =>
    Number.isFinite(targetMs) ? getTimeParts(targetMs) : null,
  )

  useEffect(() => {
    if (!Number.isFinite(targetMs)) return undefined

    const tick = () => setParts(getTimeParts(targetMs))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [targetMs])

  if (!Number.isFinite(targetMs)) return null

  if (parts === null) {
    return (
      <div
        className={`countdown countdown--complete ${className}`.trim()}
        role="status"
        aria-live="polite"
      >
        <p className="countdown__complete-message">{completedMessage}</p>
      </div>
    )
  }

  const units = [
    { key: 'days', label: 'Days', value: parts.days, wide: true },
    { key: 'hours', label: 'Hours', value: pad(parts.hours) },
    { key: 'minutes', label: 'Minutes', value: pad(parts.minutes) },
    { key: 'seconds', label: 'Seconds', value: pad(parts.seconds) },
  ]

  return (
    <div
      className={`countdown ${className}`.trim()}
      role="timer"
      aria-live="off"
      aria-label={`Countdown: ${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes, ${parts.seconds} seconds`}
    >
      <span className="countdown__corner countdown__corner--tl" aria-hidden="true" />
      <span className="countdown__corner countdown__corner--tr" aria-hidden="true" />
      <span className="countdown__corner countdown__corner--bl" aria-hidden="true" />
      <span className="countdown__corner countdown__corner--br" aria-hidden="true" />

      <div className="countdown__track">
        {units.map((unit, index) => (
          <div key={unit.key} className="countdown__segment-wrap">
            {index > 0 && (
              <span className="countdown__separator" aria-hidden="true" />
            )}
            <div className="countdown__segment">
              <AnimatedNumber value={unit.value} wide={unit.wide} />
              <span className="countdown__label">{unit.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
