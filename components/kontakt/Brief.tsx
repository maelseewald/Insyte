'use client'

type Props = {
  name: string
  nachricht: string
  /** Wird erst nach dem Mount gesetzt, sonst weicht der Server ab. */
  datum: string
}

export default function Brief({ name, nachricht, datum }: Props) {
  return (
    <div className="bf">
      <div className="bf-falz" />

      <span className="bf-datum">{datum ? `Zürich, ${datum}` : ''}</span>

      <p className="bf-anrede">Hallo Insyte,</p>

      {nachricht ? (
        <p className="bf-text">{nachricht}</p>
      ) : (
        <div className="bf-linien" aria-hidden="true">
          <span className="bf-linie" style={{ width: '100%' }} />
          <span className="bf-linie" style={{ width: '100%' }} />
          <span className="bf-linie" style={{ width: '84%' }} />
          <span className="bf-linie" style={{ width: '92%' }} />
          <span className="bf-linie" style={{ width: '46%' }} />
        </div>
      )}

      <div className="bf-signatur">
        <span className="bf-gruss">Freundliche Grüsse</span>
        {name ? (
          <span className="bf-name">{name}</span>
        ) : (
          <span
            className="bf-linie"
            style={{ width: '52%' }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  )
}
