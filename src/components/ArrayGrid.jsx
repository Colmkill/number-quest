export default function ArrayGrid({ rows, cols, colorClass = 'dot-a' }) {
  return (
    <div className="array-grid" style={{ '--cols': cols }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span key={i} className={`dot ${colorClass}`} />
      ))}
    </div>
  )
}