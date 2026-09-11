import { TIERS } from '../utils/problems.js'

export default function TierPicker({ selected, onSelect }) {
  return (
    <div className="tier-picker" role="tablist" aria-label="Choose a difficulty tier">
      {Object.values(TIERS).map((tier) => (
        <button
          key={tier.id}
          role="tab"
          aria-selected={selected === tier.id}
          className={`tier-chip ${selected === tier.id ? 'is-active' : ''}`}
          style={{ '--tier-color': tier.color }}
          onClick={() => onSelect(tier.id)}
        >
          <span className="tier-chip-name">{tier.name}</span>
          <span className="tier-chip-tagline">{tier.tagline}</span>
        </button>
      ))}
    </div>
  )
}
