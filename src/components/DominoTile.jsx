// src/components/DominoTile.jsx
import { dominoSplit } from '../utils/problems.js'

function PipHalf({ count }) {
  return (
    <div className={`pip-half pip-half-${count}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="dot" />
      ))}
    </div>
  )
}

export default function DominoTile({ value }) {
  const [top, bottom] = dominoSplit(value)
  return (
    <div className="domino-tile">
      <PipHalf count={top} />
      <div className="domino-divider" />
      <PipHalf count={bottom} />
    </div>
  )
}