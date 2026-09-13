import { useState, useEffect } from 'react'
import Home from './components/Home.jsx'
import Practice from './components/Practice.jsx'
import Quiz from './components/Quiz.jsx'
import Adventure from './components/Adventure.jsx'
import { loadProgress, saveProgress, clearProgress, recordLevelResult, recordQuizResult } from './utils/progress.js'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  function updateName(name) {
    setProgress((p) => ({ ...p, name }))
  }

  function handleLevelComplete(tierId, level, stars) {
    setProgress((p) => recordLevelResult(p, tierId, level, stars))
  }

  function handleQuizFinish(tierId, score, total) {
    setProgress((p) => recordQuizResult(p, tierId, score, total))
  }

  return (
    <div className="app">
     {screen === 'home' && (
  <Home name={progress.name} onNameChange={updateName} onNavigate={setScreen} onReset={handleResetProgress} />
)}
      {screen === 'practice' && <Practice onBack={() => setScreen('home')} />}
      {screen === 'quiz' && (
        <Quiz onBack={() => setScreen('home')} onFinish={handleQuizFinish} />
      )}
      {screen === 'adventure' && (
        <Adventure
          onBack={() => setScreen('home')}
          progress={progress}
          onLevelComplete={handleLevelComplete}
        />
      )}
    </div>
  )

function handleResetProgress() {
  setProgress(clearProgress())
}
}
