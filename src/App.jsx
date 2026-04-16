import { useState, useEffect } from 'react'
import { acronymQuestions } from './data/questions-1.js'
import { situationalQuestions } from './data/questions-2.js'
import Scoreboard from './components/Scoreboard.jsx'
import QuestionBlock from './components/QuestionBlock.jsx'
import FeedbackSection from './components/FeedbackSection.jsx'
import CelebrationPopup from './components/CelebrationPopup.jsx'
import Griefed from './components/Griefed.jsx'
import HomeScreen, { SECTIONS } from './components/HomeScreen.jsx'
import { recordSectionAttempt, incrementLifetimeWrongCount, incrementLifetimeWrongCountUltrarare } from './utils/scoreStorage.js'

// ── Grief image hat logic ────────────────────────────────────────────────────
const GRIEF_IMAGE_FILENAMES = [
  'grief_01.png', 'grief_02.png', 'grief_03.png', 'grief_04.png', 'grief_05.png',
  'grief_06.png', 'grief_07.png', 'grief_08.png', 'grief_09.png', 'grief_10.png',
  'grief_11.png', 'grief_12.png', 'grief_13.png', 'grief_14.png', 'grief_15.png',
  'grief_16.png', 'grief_17.png', 'grief_18.png', 'grief_19.png', 'grief_20.png',
  'grief_21.png', 'grief_22.png', 'grief_23.png', 'grief_24.png', 'grief_25.png',
  'grief_26.png', 'grief_27.png', 'grief_28.png'
]

let _wrongSinceLastImage = 0
let _griefHat = []

function getNextGriefImage() {
  const lifetimeCount = incrementLifetimeWrongCount()
  const ultrarareCount = incrementLifetimeWrongCountUltrarare()
  _wrongSinceLastImage++

  if (ultrarareCount >= 30 && ultrarareCount % 30 === 0) {
    return { image: `${import.meta.env.BASE_URL}grief-images/grief-ultrarare.png`, ultrarare: true }
  }

  if (lifetimeCount >= 10 && (lifetimeCount - 10) % 20 === 0) {
    return { image: `${import.meta.env.BASE_URL}grief-images/grief-rare.png`, ultrarare: false }
  }

  if (_wrongSinceLastImage >= 3) {
    _wrongSinceLastImage = 0
    if (_griefHat.length === 0) {
      _griefHat = [...GRIEF_IMAGE_FILENAMES]
      for (let i = _griefHat.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [_griefHat[i], _griefHat[j]] = [_griefHat[j], _griefHat[i]]
      }
    }
    return { image: `${import.meta.env.BASE_URL}grief-images/${_griefHat.pop()}`, ultrarare: false }
  }
  return { image: null, ultrarare: false }
}

function fisherYatesShuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildDeckForSection(sectionId) {
  let pool = []
  if (sectionId === 'acronym') pool = acronymQuestions
  else if (sectionId === 'situational') pool = situationalQuestions
  else pool = [...acronymQuestions, ...situationalQuestions]

  // Hat shuffle the options for each question
  const poolWithOptionsShuffled = pool.map((q) => {
    const correctAnswerText = q.options[q.correctAnswer]
    const shuffledOptions = fisherYatesShuffle(q.options)
    const newCorrectAnswerIndex = shuffledOptions.indexOf(correctAnswerText)

    return {
      ...q,
      options: shuffledOptions,
      correctAnswer: newCorrectAnswerIndex,
    }
  })

  return fisherYatesShuffle(poolWithOptionsShuffled)
}

function sectionMeta(sectionId) {
  return SECTIONS.find((s) => s.id === sectionId) ?? null
}

export default function App() {
  const [activeSection, setActiveSection] = useState(null)
  const [deck, setDeck] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [eliminatedIndices, setEliminatedIndices] = useState([])
  const [phase, setPhase] = useState('home') // 'home' | 'question' | 'feedback' | 'complete'
  const [showCelebration, setShowCelebration] = useState(false)
  const [showGriefed, setShowGriefed] = useState(false)
  const [griefImage, setGriefImage] = useState(null)
  const [griefUltrarare, setGriefUltrarare] = useState(false)
  const [homeRefresh, setHomeRefresh] = useState(0)

  const currentQuestion = deck[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === deck.length - 1
  const activeMeta = sectionMeta(activeSection)

  useEffect(() => {
    if (!showCelebration) return
    const t = setTimeout(() => setShowCelebration(false), 5000)
    return () => clearTimeout(t)
  }, [showCelebration])

  useEffect(() => {
    if (!showGriefed) return
    const t = setTimeout(() => setShowGriefed(false), griefUltrarare ? 7000 : 5000)
    return () => clearTimeout(t)
  }, [showGriefed, griefUltrarare])

  function startSection(sectionId) {
    const newDeck = buildDeckForSection(sectionId)
    if (newDeck.length === 0) return
    setActiveSection(sectionId)
    setDeck(newDeck)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setStreak(0)
    setEliminatedIndices([])
    setShowCelebration(false)
    setShowGriefed(false)
    setPhase('question')
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

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
      const grief = getNextGriefImage()
      setGriefImage(grief.image)
      setGriefUltrarare(grief.ultrarare)
      setShowGriefed(true)
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
      if (activeSection) {
        recordSectionAttempt(activeSection, { correct: score, total: deck.length })
      }
      setPhase('complete')
    } else {
      setCurrentQuestionIndex(i => i + 1)
      setSelectedAnswer(null)
      setPhase('question')
    }
  }

  function goHome() {
    setActiveSection(null)
    setDeck([])
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setStreak(0)
    setEliminatedIndices([])
    setPhase('home')
    setShowCelebration(false)
    setShowGriefed(false)
    setHomeRefresh(n => n + 1)
  }

  function retakeSection() {
    if (!activeSection) {
      goHome()
      return
    }
    startSection(activeSection)
  }

  // ── Home / section picker ────────────────────────────────────────────────
  if (phase === 'home') {
    return (
      <HomeScreen
        key={homeRefresh}
        onStartSection={startSection}
        onScoresChanged={() => setHomeRefresh(n => n + 1)}
      />
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
          <h2 className="text-2xl font-bold text-slate-800 mb-1">Section Complete!</h2>
          {activeMeta && (
            <p className="text-sm text-slate-500 mb-2">{activeMeta.subtitle}</p>
          )}
          <div className="text-7xl font-bold text-blue-600 my-4">{pct}%</div>
          <p className="text-slate-600 text-lg mb-1">
            You got <span className="font-bold text-slate-800">{score}</span> out of{' '}
            <span className="font-bold text-slate-800">{deck.length}</span> correct
          </p>
          <p className={`font-semibold mt-2 mb-8 text-base ${messageColor}`}>{message}</p>
          <div className="space-y-3">
            <button
              onClick={retakeSection}
              className="bg-blue-600 active:bg-blue-800 text-white font-bold px-8 py-4 rounded-2xl transition-colors duration-150 text-lg w-full min-h-[56px]"
            >
              Retake This Section
            </button>
            <button
              onClick={goHome}
              className="bg-white border border-slate-200 text-slate-700 active:bg-slate-100 font-semibold px-8 py-4 rounded-2xl transition-colors duration-150 text-lg w-full min-h-[56px]"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Active quiz ───────────────────────────────────────────────────────────
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer

  return (
    <div className="min-h-screen bg-slate-50">
      {showCelebration && <CelebrationPopup streak={streak} onDismiss={() => setShowCelebration(false)} />}
      {showGriefed && <Griefed griefImage={griefImage} ultrarare={griefUltrarare} onDismiss={() => setShowGriefed(false)} />}

      <div
        className="max-w-2xl mx-auto px-4 pt-4 pb-10 space-y-4"
        style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}
      >
        <Scoreboard
          score={score}
          total={deck.length}
          currentIndex={currentQuestionIndex}
          sectionTitle={activeMeta?.subtitle}
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
            onClick={goHome}
            className="text-slate-400 active:text-red-500 text-sm underline transition-colors duration-150 px-4 py-3 min-h-[44px]"
          >
            Exit to Home
          </button>
        </div>
      </div>
    </div>
  )
}
