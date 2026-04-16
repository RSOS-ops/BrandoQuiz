const WRONG_SLANG = [
  'Shitty',
  'Fuck',
  'Mid',
  'Trash',
  'Cooked',
  'Chalked',
  'Clapped',
  'Dogshit',
  'Ass',
  'Busted',
  'Wack',
  'Washed',
  'Fumbled',
  'Whiffed',
  'Scrub',
  'Bozo',
  'Garbage',
  'Botched',
  'Bricked',
  'Threw',
  'Rekt',
  'Bogus',
  'Flop',
  'Weak',
  'Griefed',
  'Cringe',
  'L',
  'Cheeks',
  'Fried',
  'Sold',
  'Tragic',
  'Choked',
  'Braindead',
  'NPC',
  'Fucked',
  'Bullshit',
  'Dirt',
  'Goofy',
  'Clipped',
  'Smoked',
  'Doomed',
  'Rolled',
  'Bunk',
  'Clueless',
  'Melted',
  'Dumpster',
  'Owned',
  'Jebaited',
  'Trashcan',
  'Crappy',
  'Skill Issue',
  'Negative Aura',
  'Brainrot',
  'Smooth Brain',
  'Trolling',
  'Inting',
  'Gapped',
  'Dusty',
  'Fraud',
  'Bum',
  'Absolute Bot',
  'Iron Rank',
  'Smoking Your Pack',
  'Fucking Pathetic',
  'Dumbfuck',
  'Eat Shit',
  'Fucking Idiot',
  'Brainless',
  'Absolute Shit',
  'Fucking Terrible',
  'Dumb As Fuck',
  'Absolute Joke',
  'Shit Tier',
  'Moronic',
  'Fucking Fail',
]

const FATE_SLANG = [
  "Yeah, I'm cooked",
  "I fucked up",
  "Taking my L",
  "My fucking bad",
  "Absolute skill issue",
  "I'm a dumbass",
  "I actually sold",
  "I ate shit",
  "I'm literally a bot",
  "I am fucking dogshit",
  "Certified smooth brain",
  "Yeah, I'm shit",
  "Negative aura moment",
  "I'm fucking stupid",
  "Room temperature IQ",
  "Fucking brain dead",
  "Just uninstall me",
  "Take my fucking L",
  "Yeah I chalked it",
  "Fuck my life",
  "I accept my fate",
]

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function Griefed({ griefImage, ultrarare, onDismiss }) {
  const word = pick(WRONG_SLANG)
  const fate = pick(FATE_SLANG)

  if (ultrarare) {
    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 cursor-pointer"
        onClick={onDismiss}
      >
        <img
          src={griefImage}
          alt=""
          className="w-[640px] h-[640px] max-w-[90vw] max-h-[90vh] object-contain"
        />
      </div>
    )
  }

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
          {griefImage
            ? <img src={griefImage} alt="" className={`${griefImage.includes('grief_28.png') ? 'w-[480px] h-[480px] max-w-none -ml-4' : 'w-[240px] h-[240px]'} object-contain mb-3 mx-auto`} />
            : <div className="text-6xl mb-3">🤡</div>
          }
          <p className="text-5xl font-extrabold text-red-600 mb-2 tracking-tight leading-tight">
            {word}
          </p>
          <p className="text-slate-500 text-base mt-2">Better luck next time...</p>
        </div>
        <div className="px-5 pb-6">
          <button
            onClick={onDismiss}
            className="bg-red-600 active:bg-red-800 text-white font-bold px-6 py-4 rounded-2xl transition-colors duration-150 w-full text-lg min-h-[56px]"
          >
            {fate}
          </button>
        </div>
      </div>
    </div>
  )
}
