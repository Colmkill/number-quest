import { useState, useEffect } from 'react'
import VisualHelper from './VisualHelper.jsx'

export default function ProblemCard({ problem, onAnswer, questionNumber, totalQuestions, onPause }) {
  const [selected, setSelected] = useState(null)
  const [locked, setLocked] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  // Show pre wrong helper tab 
  const [showDominoTab, setShowDominoTab] = useState(false)
  const [helpPanel, setHelpPanel] = useState('none')  // 'none' | 'wrongAnswer' | 'dominoTab'


  useEffect(() => {
    setSelected(null)
    setLocked(false)
    setShowHelp(false)
    setShowDominoTab(false)

  }, [problem])

  useEffect(() => {
    onPause?.(showHelp)          // NEW: tell the parent every time showHelp flips
  }, [showHelp, onPause])

  function hideDominoTab() {
  setShowDominoTab(false)
}

  function choose(option) {
    if (locked) return
    setSelected(option)
    setLocked(true)
    const correct = option === problem.answer

    if (correct) {
      setTimeout(() => onAnswer(true), 700)         // unchanged: auto-advance
    } else {
       hideDominoTab()
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

      {!locked && (
        <button
          className="tab-toggle-btn"
          onClick={() => {
            setShowHelp(false)
            setShowDominoTab((v) => !v)
          }}
        >
          {showDominoTab ? 'Hide picture' : 'Show picture'}
        </button>
      )}


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
  <>
    <p className="problem-feedback">
      {selected === problem.answer ? "Nice work! That's it." : `Not quite — the answer is ${problem.answer}.`}
    </p>
  </>
)}

      
        {showDominoTab && (
          <div className="helper-panel">
            <h3>Let's break it down</h3>
            <VisualHelper operands={problem.operands} />
            <p>{problem.prompt} </p>
          </div>
        )}

      {showHelp && (
          
        <div className="helper-panel">
          <h3>Let's break it down</h3>
           <VisualHelper operands={problem.operands} /> 
          <p>{problem.prompt} = <strong>{problem.answer}</strong></p>
          <button className="primary-btn" onClick={continueAfterHelp}>
            Got it — next question
          </button>
        </div>
      )}


    </div>


  )
}
