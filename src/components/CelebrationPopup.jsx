const REGULAR_SLANG = [
  'Facts',
  'Spot On',
  'Dead On',
  'Bingo',
  'Precisely',
  'Valid',
  'W',
  'Based',
  'No Cap',
  'Gas',
  'Bet',
  'Main Character Energy',
  'Cracked',
  'Cooking',
  'Clutch',
  'Nailed It',
  'Light Work',
  'Fire',
  'Peak',
  'Dub',
  'Ate That',
  'Left No Crumbs',
  'Top Tier',
  'Locked In',
  'Big Brain',
  'Clean',
  'Too Easy',
  'Money',
  'On Point',
  'Real',
  "Chef's Kiss",
  'Good Shit',
  'Type Shit',
  'Solid',
  'Fucking Right',
  'Dope',
  'Hell Yeah',
  'Word',
  'Say Less',
  'Smooth',
  'Tough',
  'Sick',
  'Legit',
  'Slaps',
  'Checks Out',
  'Banger',
  'Fuck Yeah',
  'Right As Hell',
  'Fucking Solid',
  'On The Nose',
  'Correct As Fuck',
]

const STREAK_SLANG = [
  'God Mode',
  'Elite',
  'Locked The Fuck In',
  'Absolute Demon',
  'Fucking Cracked',
  'Final Boss Energy',
  'Different Breed',
  'Fucking Untouchable',
  'Absolute Cinema',
  'Straight Fucking Gas',
  'On A Fucking Tear',
  'Going Stupid',
  'Fucking Nasty',
  'Masterclass',
  'Smurfing',
  'Too Fucking Clean',
  'Ascended',
  'Absolute Unit',
  'Fucking Legendary',
  'Peaking',
  'Out Of Your Fucking Mind',
  "Chef's Kiss",
  'Goated',
  'God Tier',
  "He's Him",
  'Infinite Aura',
  'Built Different',
  'Based AF',
  'Hard',
  'Big Brain',
  'On God',
  'Cold',
  'Deadass',
  'Straight Heat',
  'Real',
  "Fuckin' Facts",
  'Holy Shit',
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
