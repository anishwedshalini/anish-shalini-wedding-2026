import './Button.css'

export default function Button({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
  ...props
}) {
  if (!href) return null

  const classes = `btn btn--${variant} ${className}`.trim()
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <a className={classes} href={href} {...externalProps} {...props}>
      <span>{children}</span>
    </a>
  )
}
