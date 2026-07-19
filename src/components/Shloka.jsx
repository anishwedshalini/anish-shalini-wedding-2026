import './Shloka.css'

/**
 * Reusable shloka block.
 * Verified entries show Sanskrit + meaning + citation.
 * Placeholder entries show a clearly marked content slot.
 */
export default function Shloka({ shloka, className = '' }) {
  if (!shloka) return null

  const isVerified = shloka.status === 'verified'
  const citation =
    isVerified && shloka.source?.scripture && shloka.source?.reference
      ? `${shloka.source.scripture} ${shloka.source.reference}`
      : null

  return (
    <figure
      className={`shloka ${isVerified ? 'shloka--verified' : 'shloka--placeholder'} ${className}`.trim()}
      aria-label={isVerified ? 'Sanskrit verse' : 'Shloka placeholder'}
    >
      <div className="shloka__ornament" aria-hidden="true" />

      {isVerified ? (
        <>
          <blockquote className="shloka__sanskrit" lang="sa">
            {shloka.sanskrit.split('\n').map((line, i) => (
              <span key={i} className="shloka__line">
                {line}
              </span>
            ))}
          </blockquote>
          {shloka.meaning && (
            <p className="shloka__meaning">
              {shloka.meaning.split('\n').map((line, i) => (
                <span key={i} className="shloka__meaning-line">
                  {line}
                </span>
              ))}
            </p>
          )}
          {citation && (
            <figcaption className="shloka__source">
              {shloka.source.sanskrit && (
                <span className="shloka__source-sanskrit" lang="sa">
                  {shloka.source.sanskrit}
                </span>
              )}
              <span className="shloka__source-english">{citation}</span>
            </figcaption>
          )}
        </>
      ) : (
        <div className="shloka__placeholder">
          <p className="shloka__placeholder-label">Shloka content placeholder</p>
          <p className="shloka__placeholder-note">
            {shloka.placeholderNote ||
              'Add a verified Sanskrit mantra with scripture name and exact verse number.'}
          </p>
        </div>
      )}
    </figure>
  )
}
