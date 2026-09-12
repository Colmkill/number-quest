import DominoGroup from './DominoGroup.jsx'

const OP_WORDS = {
  '+': 'added to',
  '-': 'take away',
  '×': 'sets of',
  '÷': 'divided by',
}

export default function VisualHelper({ operands }) {
  if (!operands) return null
  const { a, b, op } = operands

  return (
    <div className="visual-helper">
      <DominoGroup value={a} />
      <span className="visual-op">{OP_WORDS[op] || op}</span>
      <DominoGroup value={b} />
    </div>
  )
}