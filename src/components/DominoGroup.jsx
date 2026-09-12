// src/components/DominoGroup.jsx
import DominoTile from './DominoTile.jsx'
import { dominoChunks } from '../utils/problems.js'

export default function DominoGroup({ value }) {
  const chunks = dominoChunks(value)
  return (
    <div className="domino-group">
      {chunks.map((chunk, i) => (
        <DominoTile key={i} value={chunk} />
      ))}
    </div>
  )
}