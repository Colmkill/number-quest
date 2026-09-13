import Mascot from './Mascot.jsx'

export default function Home({ name, onNameChange, onNavigate, onReset }) {
  return (
    <div className="home">
      <div className="home-hero">
        <Mascot mood="cheer" size={112} />
        <h1>Number Quest</h1>
        <p className="home-tagline">
          A calm, friendly place to get better at maths — one problem at a time.
        </p>
        <label className="name-field">
          <span>What should we call you? (optional)</span>
          <input
            type="text"
            maxLength={20}
            placeholder="Type your name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </label>
      </div>

      <div className="home-paths">
        <button className="path-signpost path-practice" onClick={() => onNavigate('practice')}>
          <span className="path-label">Practice</span>
          <span className="path-desc">No timer, no pressure — try as many as you like.</span>
        </button>
        <button className="path-signpost path-quiz" onClick={() => onNavigate('quiz')}>
          <span className="path-label">Quiz Challenge</span>
          <span className="path-desc">Ten questions, a gentle timer, see your score.</span>
        </button>
        <button className="path-signpost path-adventure" onClick={() => onNavigate('adventure')}>
          <span className="path-label">Adventure Map</span>
          <span className="path-desc">Walk the path, unlock levels, earn stars.</span>
        </button>
      </div>
      
<button className="secondary-btn" onClick={() => { if (confirm('Reset all progress? This cannot be undone.')) onReset() }}>
  Reset my progress
</button>
      <p className="home-footnote">
        Everything you do stays on this device. No accounts, no sign-ups, nothing shared.
      </p>
    </div>
  )
}
