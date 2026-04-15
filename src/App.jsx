import { useState, useEffect } from 'react'
import { questions } from './data/questions.js'
import Scoreboard from './components/Scoreboard.jsx'
import QuestionBlock from './components/QuestionBlock.jsx'
import FeedbackSection from './components/FeedbackSection.jsx'
import CelebrationPopup from './components/CelebrationPopup.jsx'

function fisherYatesShuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const [deck, setDeck] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [eliminatedIndices, setEliminatedIndices] = useState([])
  const [phase, setPhase] = useState('intro') // 'intro' | 'question' | 'feedback' | 'complete'
  const [showCelebration, setShowCelebration] = useState(false)

  const currentQuestion = deck[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === deck.length - 1

  // Auto-dismiss celebration after 5 seconds
  useEffect(() => {
    if (!showCelebration) return
    const t = setTimeout(() => setShowCelebration(false), 5000)
    return () => clearTimeout(t)
  }, [showCelebration])

  function handleSelectAnswer(index) {
    if (phase !== 'question') return
    const isCorrect = index === currentQuestion.correctAnswer
    setSelectedAnswer(index)
    if (isCorrect) {
      setScore(s => s + 1)
      setStreak(s => s + 1)
      setShowCelebration(true)
    } else {
      setStreak(0)
    }
    setPhase('feedback')
  }

  function handleHint() {
    const wrongIndices = currentQuestion.options
      .map((_, i) => i)
      .filter(i => i !== currentQuestion.correctAnswer)
    const shuffled = fisherYatesShuffle(wrongIndices)
    setEliminatedIndices(shuffled.slice(0, 2))
  }

  function handleNextQuestion() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setEliminatedIndices([])
    if (isLastQuestion) {
      setPhase('complete')
    } else {
      setCurrentQuestionIndex(i => i + 1)
      setSelectedAnswer(null)
      setPhase('question')
    }
  }

  function handleReset() {
    setDeck([])
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setStreak(0)
    setEliminatedIndices([])
    setPhase('intro')
    setShowCelebration(false)
  }

  // ── Intro screen ─────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="bg-white rounded-2xl shadow-md px-6 py-8 max-w-lg w-full text-center">
          <div className="text-6xl mb-4">🧠</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Recovery Counseling Quiz
          </h1>
          <p className="text-slate-500 mb-1 text-xs font-semibold uppercase tracking-widest">
            M.R.S.T.D. · G.R.A.C.E. · O.A.R.S. · F.O.R.M. · U.P.R.
          </p>
          <p className="text-slate-600 mt-4 mb-8 leading-relaxed text-base">
            Test your knowledge of the core frameworks used in drug and alcohol
            recovery counseling. {questions.length} questions total — take your time
            and read each explanation to reinforce your learning.
          </p>
          <button
            onClick={() => { setDeck(fisherYatesShuffle(questions)); setPhase('question') }}
            className="bg-blue-600 active:bg-blue-800 text-white font-bold px-8 py-4 rounded-2xl transition-colors duration-150 text-xl w-full min-h-[56px]"
          >
            Start Quiz
          </button>
        </div>
      </div>
    )
  }

  // ── Results screen ────────────────────────────────────────────────────────
  if (phase === 'complete') {
    const pct = Math.round((score / deck.length) * 100)
    let message, messageColor
    if (pct >= 90) {
      message = 'Outstanding! You are clearly ready for this role.'
      messageColor = 'text-green-700'
    } else if (pct >= 75) {
      message = 'Great work! Review the explanations for any you missed.'
      messageColor = 'text-blue-700'
    } else if (pct >= 60) {
      message = 'Good effort — keep studying and you\'ll nail it.'
      messageColor = 'text-amber-700'
    } else {
      message = 'Keep reviewing the material — you\'ve got this!'
      messageColor = 'text-slate-600'
    }

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        {showCelebration && <CelebrationPopup streak={streak} onDismiss={() => setShowCelebration(false)} />}
        <div className="bg-white rounded-2xl shadow-md px-6 py-8 max-w-lg w-full text-center">
          <div className="text-6xl mb-4">🎓</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
          <div className="text-7xl font-bold text-blue-600 my-4">{pct}%</div>
          <p className="text-slate-600 text-lg mb-1">
            You got <span className="font-bold text-slate-800">{score}</span> out of{' '}
            <span className="font-bold text-slate-800">{deck.length}</span> correct
          </p>
          <p className={`font-semibold mt-2 mb-8 text-base ${messageColor}`}>{message}</p>
          <button
            onClick={handleReset}
            className="bg-blue-600 active:bg-blue-800 text-white font-bold px-8 py-4 rounded-2xl transition-colors duration-150 text-xl w-full min-h-[56px]"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    )
  }

  // ── Active quiz ───────────────────────────────────────────────────────────
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer

  return (
    <div className="min-h-screen bg-slate-50">
      {showCelebration && <CelebrationPopup streak={streak} onDismiss={() => setShowCelebration(false)} />}

      <div
        className="max-w-2xl mx-auto px-4 pt-4 pb-10 space-y-4"
        style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}
      >
        <Scoreboard
          score={score}
          total={deck.length}
          currentIndex={currentQuestionIndex}
        />

        <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">
          <QuestionBlock
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedAnswer={selectedAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            onSelect={handleSelectAnswer}
            phase={phase}
            eliminatedIndices={eliminatedIndices}
            onHint={handleHint}
          />

          {phase === 'feedback' && (
            <>
              <FeedbackSection
                isCorrect={isCorrect}
                explanation={currentQuestion.explanation}
                correctAnswer={currentQuestion.correctAnswer}
                options={currentQuestion.options}
              />
              <button
                onClick={handleNextQuestion}
                className="bg-blue-600 active:bg-blue-800 text-white font-bold px-6 py-4 rounded-2xl transition-colors duration-150 w-full text-lg min-h-[56px]"
              >
                {isLastQuestion ? 'See Results' : 'Next Question →'}
              </button>
            </>
          )}
        </div>

        <div className="flex justify-center py-2">
          <button
            onClick={handleReset}
            className="text-slate-400 active:text-red-500 text-sm underline transition-colors duration-150 px-4 py-3 min-h-[44px]"
          >
            Reset &amp; Start Over
          </button>
        </div>
      </div>
    </div>
  )
}
