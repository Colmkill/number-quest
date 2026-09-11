import { useState } from 'react'
import TierPicker from './TierPicker.jsx'
import ProblemCard from './ProblemCard.jsx'
import Mascot from './Mascot.jsx'
import { TIERS, generateSet } from '../utils/problems.js'

const LEVELS = 6
const QUESTIONS_PER_LEVEL = 5

// x/y positions (%) for a winding path of 6 nodes
const NODE_POS = [
  { x: 14, y: 82 },
  { x: 30, y: 58 },
  { x: 18, y: 34 },
  { x: 42, y: 18 },
  { x: 68, y: 30 },
  { x: 84, y: 12 },
]

function starsFor(correct) {
  if (correct >= QUESTIONS_PER_LEVEL) return 3
  if (correct >= 4) return 2
  if (correct >= 3) return 1
  return 0
}

export default function Adventure({ onBack, progress, onLevelComplete }) {
  const [tier, setTier] = useState('explorer')
  const [activeLevel, setActiveLevel] = useState(null) // level number while playing
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [result, setResult] = useState(null) // { stars, correct }

  const tierProgress = progress.tiers[tier]

  function startLevel(level) {
    setActiveLevel(level)
    setQuestions(generateSet(tier, QUESTIONS_PER_LEVEL))
    setIndex(0)
    setCorrectCount(0)
    setResult(null)
  }

  function handleAnswer(correct) {
    const nextCorrect = correctCount + (correct ? 1 : 0)
    setCorrectCount(nextCorrect)
    const next = index + 1
    if (next >= QUESTIONS_PER_LEVEL) {
      const stars = starsFor(nextCorrect)
      setResult({ stars, correct: nextCorrect })
      onLevelComplete(tier, activeLevel, stars)
    } else {
      setIndex(next)
    }
  }

  function exitLevel() {
    setActiveLevel(null)
    setResult(null)
  }

  if (activeLevel !== null && !result) {
    return (
      <div className="screen">
        <button className="back-btn" onClick={exitLevel}>← Back to map</button>
        <div className="screen-header">
          <Mascot mood="think" size={64} />
          <div>
            <h2>{TIERS[tier].name} · Level {activeLevel}</h2>
            <p className="screen-sub">Answer {QUESTIONS_PER_LEVEL} questions to earn stars.</p>
          </div>
        </div>
        <ProblemCard
          key={index}
          problem={questions[index]}
          onAnswer={handleAnswer}
          questionNumber={index + 1}
          totalQuestions={QUESTIONS_PER_LEVEL}
        />
      </div>
    )
  }

  if (result) {
    const passed = result.stars > 0
    return (
      <div className="screen">
        <button className="back-btn" onClick={exitLevel}>← Back to map</button>
        <div className="quiz-result">
          <Mascot mood={passed ? 'cheer' : 'happy'} size={96} />
          <h2>{result.correct} / {QUESTIONS_PER_LEVEL} correct</h2>
          <div className="stars-row">
            {[1, 2, 3].map((n) => (
              <span key={n} className={`star ${n <= result.stars ? 'is-lit' : ''}`}>★</span>
            ))}
          </div>
          <p>
            {passed
              ? 'Level cleared! The next stop on the map is open.'
              : "So close — get 3 or more correct to clear this level. Give it another go?"}
          </p>
          <div className="quiz-result-actions">
            <button className="primary-btn" onClick={() => startLevel(activeLevel)}>Play again</button>
            <button className="secondary-btn" onClick={exitLevel}>Back to map</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back home</button>
      <div className="screen-header">
        <Mascot mood="happy" size={64} />
        <div>
          <h2>Adventure Map</h2>
          <p className="screen-sub">Clear each stop to open the next one on the path.</p>
        </div>
      </div>

      <TierPicker selected={tier} onSelect={setTier} />

      <div className="adventure-map" style={{ '--tier-color': TIERS[tier].color }}>
        <svg className="adventure-path" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={NODE_POS.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="var(--tier-color)"
            strokeWidth="1.6"
            strokeDasharray="4 3"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
        {NODE_POS.map((pos, i) => {
          const level = i + 1
          const unlocked = level <= tierProgress.unlocked
          const stars = tierProgress.stars[level] || 0
          return (
            <button
              key={level}
              className={`level-node ${unlocked ? 'is-unlocked' : 'is-locked'}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => unlocked && startLevel(level)}
              disabled={!unlocked}
              aria-label={`Level ${level}${unlocked ? '' : ' (locked)'}`}
            >
              <span className="level-node-number">{unlocked ? level : '🔒'}</span>
              {unlocked && (
                <span className="level-node-stars">
                  {[1, 2, 3].map((n) => (
                    <span key={n} className={n <= stars ? 'is-lit' : ''}>★</span>
                  ))}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
