import './SectionHeader.css'

export default function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'center',
  className = '',
}) {
  return (
    <header className={`section-header section-header--${align} ${className}`.trim()}>
      {eyebrow && <span className="section__eyebrow">{eyebrow}</span>}
      {title && <h2 className="section__title">{title}</h2>}
      {lede && <p className="section__lede">{lede}</p>}
    </header>
  )
}
