import { useState, useEffect } from 'react'

export default function ProblemCard({ problem, onAnswer, questionNumber, totalQuestions, onPause }) {
  const [selected, setSelected] = useState(null)
  const [locked, setLocked] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    setSelected(null)
    setLocked(false)
    setShowHelp(false)
  }, [problem])

  useEffect(() => {
    onPause?.(showHelp)          // NEW: tell the parent every time showHelp flips
  }, [showHelp, onPause])

  function choose(option) {
    if (locked) return
    setSelected(option)
    setLocked(true)
    const correct = option === problem.answer

    if (correct) {
      setTimeout(() => onAnswer(true), 700)         // unchanged: auto-advance
    } else {
      setShowHelp(true)                             // NEW: pause here instead
    }
  }

  function continueAfterHelp() {
    setShowHelp(false)
    onAnswer(false)                                 // the delayed "I'm done" signal
  }

  return (
    <div className="problem-card">
      {totalQuestions && (
        <p className="problem-progress">Question {questionNumber} of {totalQuestions}</p>
      )}
      <p className="problem-prompt">{problem.prompt} = ?</p>
      <div className="problem-options">
        {problem.options.map((opt) => {
          let stateClass = ''
          if (locked) {
            if (opt === problem.answer) stateClass = 'is-correct'
            else if (opt === selected) stateClass = 'is-wrong'
          }
          return (
            <button key={opt} className={`option-btn ${stateClass}`} onClick={() => choose(opt)} disabled={locked}>
              {opt}
            </button>
          )
        })}
      </div>

      {locked && !showHelp && (
        <p className="problem-feedback">Nice work! That's it.</p>
      )}

      {showHelp && (
        <div className="helper-panel">
          <h3>Let's break it down</h3>
          <p>{problem.prompt} = <strong>{problem.answer}</strong></p>
          <button className="primary-btn" onClick={continueAfterHelp}>
            Got it — next question
          </button>
        </div>
      )}
    </div>
  )
}
