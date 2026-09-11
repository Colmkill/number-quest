import { useState } from 'react'
import TierPicker from './TierPicker.jsx'
import ProblemCard from './ProblemCard.jsx'
import Mascot from './Mascot.jsx'
import { generateProblem } from '../utils/problems.js'

export default function Practice({ onBack }) {
  const [tier, setTier] = useState('explorer')
  const [problem, setProblem] = useState(() => generateProblem('explorer'))
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(0)
  const [solved, setSolved] = useState(0)

  function changeTier(t) {
    setTier(t)
    setProblem(generateProblem(t))
    setStreak(0)
  }

  function handleAnswer(correct) {
    setSolved((s) => s + 1)
    if (correct) {
      setStreak((s) => {
        const next = s + 1
        setBest((b) => Math.max(b, next))
        return next
      })
    } else {
      setStreak(0)
    }
    setProblem(generateProblem(tier))
  }

  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back home</button>
      <div className="screen-header">
        <Mascot mood={streak >= 3 ? 'cheer' : 'happy'} size={64} />
        <div>
          <h2>Practice</h2>
          <p className="screen-sub">Take your time. There's no clock and no wrong-answer penalty.</p>
        </div>
      </div>

      <TierPicker selected={tier} onSelect={changeTier} />

      <div className="practice-stats">
        <div className="stat"><span className="stat-value">{streak}</span><span className="stat-label">Current streak</span></div>
        <div className="stat"><span className="stat-value">{best}</span><span className="stat-label">Best streak</span></div>
        <div className="stat"><span className="stat-value">{solved}</span><span className="stat-label">Solved today</span></div>
      </div>

      <ProblemCard problem={problem} onAnswer={handleAnswer} />
    </div>
  )
}
