import { squareDims } from '../utils/problems.js'

export default function SquareGrid({ count, colorClass = 'dot-a' }) {
  const { cols } = squareDims(count)
  return (
    <div className="square-grid" style={{ '--cols': cols }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={`dot ${colorClass}`} />
      ))}
    </div>
  )
}