// Drei gestaffelte Fenster als Hero-Illustration: Terminal, Code, und das
// Drahtgerüst einer Website. Durchgehend Terminal-Bildsprache — Monospace,
// Haarlinien, keine Flächen.
//
// Rein deklarativ: kein Bild, kein zusätzliches JS. Styling in globals.css
// unter .win-*, das Schweben ist ein CSS-Keyframe.
//
// Dekorativ, deshalb aria-hidden: der Inhalt wiederholt nur, was die
// Überschrift daneben bereits sagt.

function Window({
  title,
  children,
  index,
}: {
  title: string
  children: React.ReactNode
  index: 1 | 2 | 3
}) {
  return (
    <div className={`win win-${index}`}>
      <div className="win-bar">
        <span className="win-dot win-dot-1" />
        <span className="win-dot win-dot-2" />
        <span className="win-dot win-dot-3" />
        <span className="win-title">{title}</span>
      </div>
      <div className="win-body">{children}</div>
    </div>
  )
}

export default function WindowStack() {
  return (
    <div className="win-stack" aria-hidden="true">
      <Window title="~/insyte — zsh" index={1}>
        <p>
          <span className="c-prompt">$</span> npm run build
        </p>
        <p className="c-dim">▲ Next.js 14.2.35</p>
        <p>
          <span className="c-ok">✓</span> Compiled successfully
        </p>
        <p>
          <span className="c-ok">✓</span> 14/14 pages
          <span className="win-caret" />
        </p>
      </Window>

      <Window title="Hero.tsx" index={2}>
        <p>
          <span className="c-key">export default function</span>{' '}
          <span className="c-fn">Hero</span>() {'{'}
        </p>
        <p className="ind-1">
          <span className="c-key">return</span> (
        </p>
        <p className="ind-2">
          <span className="c-tag">&lt;section</span>{' '}
          <span className="c-attr">id</span>=
          <span className="c-str">&quot;hero&quot;</span>
          <span className="c-tag">&gt;</span>
        </p>
        <p className="ind-3">
          <span className="c-tag">&lt;h1&gt;</span>Wir bauen Websites
          <span className="c-tag">&lt;/h1&gt;</span>
        </p>
        <p className="ind-1">)</p>
        <p>{'}'}</p>
      </Window>

      <Window title="insyte.ch" index={3}>
        <div className="wf">
          {/* Navigationsleiste */}
          <div className="wf-nav">
            <span className="wf-logo" />
            <span className="wf-spacer" />
            <span className="wf-link" />
            <span className="wf-link" />
            <span className="wf-link" />
            <span className="wf-btn" />
          </div>
          {/* Inhaltsbereich */}
          <div className="wf-main">
            <span className="wf-line wf-line-lg" />
            <span className="wf-line wf-line-lg" />
            <span className="wf-line wf-line-sm" />
            <div className="wf-actions">
              <span className="wf-btn" />
              <span className="wf-btn wf-btn-ghost" />
            </div>
          </div>
          {/* Kartenreihe */}
          <div className="wf-cards">
            <span className="wf-card" />
            <span className="wf-card" />
            <span className="wf-card" />
          </div>
        </div>
      </Window>
    </div>
  )
}
