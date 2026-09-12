import DominoGroup from './DominoGroup.jsx'
import ArrayGrid from './ArrayGrid.jsx'

const OP_WORDS = {
  '+': 'added to',
  '-': 'take away',
  '×': 'sets of',
  '÷': 'divided by',
}



export default function VisualHelper({ operands }) {
  if (!operands) return null
  const { a, b, op } = operands


if (op === '×' || op === '÷') {
  const isDivision = op === '÷'
  const rows = isDivision ? a / b : a
  const cols = isDivision ? b : b
  return (
    <div className="visual-helper">
      <ArrayGrid rows={rows} cols={cols} colorClass="dot-a" />
    </div>
  )
}
  return (
    <div className="visual-helper">
      <DominoGroup value={a} />
      <span className="visual-op">{OP_WORDS[op] || op}</span>
      <DominoGroup value={b} />
    </div>
  )
}