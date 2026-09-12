import { useState, useEffect, useRef, useCallback } from 'react'
import TierPicker from './TierPicker.jsx'
import ProblemCard from './ProblemCard.jsx'
import Mascot from './Mascot.jsx'
import { generateSet } from '../utils/problems.js'

const QUESTION_COUNT = 10
const SECONDS_PER_QUESTION = 20

function encouragement(score, total) {
  const pct = score / total
  if (pct === 1) return "Perfect score! You solved every single one."
  if (pct >= 0.8) return "Brilliant work — you're really getting the hang of this."
  if (pct >= 0.5) return "Solid effort! A little more practice and you'll fly through these."
  return "Good try! Practice mode is a great place to warm up before your next quiz."
}

export default function Quiz({ onBack, onFinish }) {
  const [tier, setTier] = useState('explorer')
  const [stage, setStage] = useState('setup') // setup | playing | done
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_QUESTION)
  const problemKeyRef = useRef(0)

  const startQuiz = () => {
    setQuestions(generateSet(tier, QUESTION_COUNT))
    setIndex(0)
    setScore(0)
    setTimeLeft(SECONDS_PER_QUESTION)
    setStage('playing')
    problemKeyRef.current += 1
  }

  const advance = useCallback((correct) => {
    setScore((s) => s + (correct ? 1 : 0))
    setIndex((i) => {
      const next = i + 1
      if (next >= QUESTION_COUNT) {
        setStage('done')
      } else {
        setTimeLeft(SECONDS_PER_QUESTION)
        problemKeyRef.current += 1
      }
      return next
    })
  }, [])

  const [paused, setPaused] = useState(false)   // NEW

useEffect(() => {
  if (stage !== 'playing' || paused) return    // ← paused added here
  if (timeLeft <= 0) {
    advance(false)
    return
  }
  const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
  return () => clearTimeout(t)
}, [stage, timeLeft, paused, advance])

  useEffect(() => {
    if (stage === 'done') {
      onFinish(tier, score, QUESTION_COUNT)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage])

  if (stage === 'setup') {
    return (
      <div className="screen">
        <button className="back-btn" onClick={onBack}>← Back home</button>
        <div className="screen-header">
          <Mascot mood="think" size={64} />
          <div>
            <h2>Quiz Challenge</h2>
            <p className="screen-sub">10 questions, {SECONDS_PER_QUESTION}s each. Pick your tier to start.</p>
          </div>
        </div>
        <TierPicker selected={tier} onSelect={setTier} />
        <button className="primary-btn" onClick={startQuiz}>Start quiz</button>
      </div>
    )
  }

  if (stage === 'done') {
    return (
      <div className="screen">
        <button className="back-btn" onClick={onBack}>← Back home</button>
        <div className="quiz-result">
          <Mascot mood={score >= QUESTION_COUNT * 0.5 ? 'cheer' : 'happy'} size={96} />
          <h2>{score} / {QUESTION_COUNT}</h2>
          <p>{encouragement(score, QUESTION_COUNT)}</p>
          <div className="quiz-result-actions">
            <button className="primary-btn" onClick={startQuiz}>Try again</button>
            <button className="secondary-btn" onClick={onBack}>Back home</button>
          </div>
        </div>
      </div>
    )
  }

  const problem = questions[index]
  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back home</button>
      <div className="quiz-hud">
        <div className="quiz-timer" style={{ '--pct': `${(timeLeft / SECONDS_PER_QUESTION) * 100}%` }}>
          <span>{timeLeft}s</span>
        </div>
        <div className="quiz-score">Score: {score}</div>
      </div>
      
        <ProblemCard
          key={problemKeyRef.current}
          problem={problem}
          onAnswer={advance}
          onPause={setPaused}          
          questionNumber={index + 1}
          totalQuestions={QUESTION_COUNT}
        />
    </div>
  )
}
