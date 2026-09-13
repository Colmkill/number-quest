export default function RosetteBadge({ size = 90 }) {
  const petalCount = 14
  const petals = Array.from({ length: petalCount }, (_, i) => (i * 360) / petalCount)

  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Ribbon tails, drawn first so the rosette head overlaps their top edge */}
      <path d="M38 70 L44 138 L50 122 L56 138 L62 70 Z" fill="#E5484D" />
      <path d="M38 70 L44 138 L50 122 L56 138 L62 70 Z" fill="#000000" fillOpacity="0.08" transform="translate(2,0)" />

      {/* Pleated petals, fanned around the center */}
      <g transform="translate(50,50)">
        {petals.map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-26"
            rx="8"
            ry="15"
            fill="#E5484D"
            transform={`rotate(${angle})`}
          />
        ))}
        {/* Base disc, ties the petals together visually */}
        <circle r="26" fill="#FF6B6B" />

            <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#BF9B30" />
                <stop offset="50%" stopColor="#F6D365" />
                <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
            </defs>
            
        {/* Gold stamp in the center */}
        <circle r="19" fill="url(#goldGradient)" stroke="#E0A93C" strokeWidth="2" />
        <circle r="19" fill="none" stroke="#3D3B54" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
        <text x="0" y="7" textAnchor="middle" fontSize="20" fill="#3D3B54">★</text>
      </g>
    </svg>
  )
}