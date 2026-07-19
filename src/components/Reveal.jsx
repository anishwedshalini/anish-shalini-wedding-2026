import { useReducedMotion } from 'framer-motion'
import { motion } from 'framer-motion'

/**
 * Fade/slide reveal on scroll. Falls back to static content when
 * prefers-reduced-motion is set.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 12,
  once = true,
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
