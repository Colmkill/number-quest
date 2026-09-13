import { useRowHighlight } from '../hooks/useRowHighlight.js'

export default function ArrayGrid({ rows, cols, colorClass = 'dot-a' }) {
  const activeRow = useRowHighlight(rows, 750)

  return (
    <div className="array-grid" style={{ '--cols': cols }}>
      {Array.from({ length: rows * cols }).map((_, i) => {
        const row = Math.floor(i / cols)
        return (
          <span
            key={i}
            className={`dot ${colorClass} ${row === activeRow ? 'is-highlighted' : ''}`}
          />
        )
      })}
    </div>
  )
}