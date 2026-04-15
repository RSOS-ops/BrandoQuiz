const REGULAR_SLANG = [
  'Facts',
  'Spot on',
  'Dead on',
  'Bingo',
  'Precisely',
  'Valid',
  'W',
  'Based',
  'No cap',
  'Gas',
  'Bet',
  'Main character energy',
  'Cracked',
  'Cooking',
  'Clutch',
  'Nailed it',
  'Light work',
  'Fire',
]

const STREAK_SLANG = [
  'Goated',
  'God tier',
  "He's Him",
  'Infinite Aura',
  'Built different',
  'Based AF',
  'Hard',
  'Big brain',
  'On god',
  'Cold',
  'Deadass',
  'Straight heat',
  'Real',
  "Fuckin' facts",
  'Holy shit',
]

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function CelebrationPopup({ streak, onDismiss }) {
  const isStreak = streak >= 3
  const word = isStreak ? pick(STREAK_SLANG) : pick(REGULAR_SLANG)

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onDismiss}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl mx-5 w-full max-w-sm text-center overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-8 pt-8 pb-6">
          <div className="text-6xl mb-3">{isStreak ? '🔥🔥🔥' : '🔥'}</div>
          <p className="text-5xl font-extrabold text-blue-600 mb-2 tracking-tight leading-tight">
            {word}
          </p>
          {isStreak ? (
            <p className="text-slate-700 font-bold text-xl mt-2">
              {streak} in a row!!
            </p>
          ) : (
            <p className="text-slate-500 text-base mt-1">Keep it up!</p>
          )}
        </div>
        <div className="px-5 pb-6">
          <button
            onClick={onDismiss}
            className="bg-blue-600 active:bg-blue-800 text-white font-bold px-6 py-4 rounded-2xl transition-colors duration-150 w-full text-lg min-h-[56px]"
          >
            Got it ✓
          </button>
        </div>
      </div>
    </div>
  )
}
