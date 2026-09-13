function pointOnRectPerimeter(t, width, height) {
  const perimeter = 2 * (width + height)
  let d = t * perimeter
  if (d <= width) return { x: d, y: 0 }                 // top edge
  d -= width
  if (d <= height) return { x: width, y: d }             // right edge
  d -= height
  if (d <= width) return { x: width - d, y: height }     // bottom edge
  d -= width
  return { x: 0, y: height - d }                          // left edge
}

export default function CertificateStarBorder({ earned, total, width = 297, height = 210, inset = 10 }) {
  const innerW = width - inset * 2
  const innerH = height - inset * 2

  return (
    <div className="certificate-star-border">
      {Array.from({ length: total }, (_, i) => {
        const t = i / total
        const { x, y } = pointOnRectPerimeter(t, innerW, innerH)
        const leftPct = ((x + inset) / width) * 100
        const topPct = ((y + inset) / height) * 100
        return (
          <span
            key={i}
            className={`border-star ${i < earned ? 'is-earned' : 'is-empty'}`}
            style={{ left: `${leftPct}%`, top: `${topPct}%` }}
          >
            ★
          </span>
        )
      })}
    </div>
  )
}