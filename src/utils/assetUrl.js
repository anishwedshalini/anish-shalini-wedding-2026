/**
 * Prefix public/ asset paths with Vite's configured base
 * (required for GitHub Pages project URLs).
 */
export function assetUrl(path) {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${String(path).replace(/^\//, '')}`
}
