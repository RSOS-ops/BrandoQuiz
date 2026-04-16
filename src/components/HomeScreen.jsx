import { getAllSectionScores, getAggregateScore, clearSectionScore } from '../utils/scoreStorage.js'

const SECTIONS = [
  {
    id: 'acronym',
    title: 'Foundational Knowledge',
    subtitle: 'Acronyms Quiz',
    description: 'Drill the meanings of M.R.S.T.D., G.R.A.C.E., O.A.R.S., F.O.R.M., and U.P.R.',
    accent: 'blue',
  },
  {
    id: 'situational',
    title: 'Practical Application',
    subtitle: 'Situational Judgment Questions',
    description: 'Pick the most effective response to realistic client scenarios.',
    accent: 'emerald',
  },
  {
    id: 'all',
    title: 'Cumulative Mastery',
    subtitle: 'All Questions',
    description: 'The full question bank — foundational, practical, and beyond.',
    accent: 'indigo',
  },
]

const ACCENT_CLASSES = {
  blue: {
    border: 'border-blue-200',
    text: 'text-blue-700',
    button: 'bg-blue-600 active:bg-blue-800',
  },
  emerald: {
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    button: 'bg-emerald-600 active:bg-emerald-800',
  },
  indigo: {
    border: 'border-indigo-200',
    text: 'text-indigo-700',
    button: 'bg-indigo-600 active:bg-indigo-800',
  },
}

function formatScore(scoreObj) {
  if (!scoreObj || !scoreObj.correct || !scoreObj.total) return null
  const pct = Math.round((scoreObj.correct / scoreObj.total) * 100)
  return `${scoreObj.correct} / ${scoreObj.total} (${pct}%)`
}

export default function HomeScreen({ onStartSection, onScoresChanged }) {
  const scores = getAllSectionScores()
  const aggregate = getAggregateScore()

  function handleReset(sectionId, sectionTitle) {
    const ok = window.confirm(`Reset your score for "${sectionTitle}"? This clears both last and best scores for that section.`)
    if (!ok) return
    clearSectionScore(sectionId)
    onScoresChanged?.()
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
      <div className="max-w-lg md:max-w-4xl mx-auto space-y-4">
        <div className="bg-white rounded-2xl shadow-md px-6 py-6 text-center font-black-ops tracking-wide">
         /* <div className="text-5xl mb-3">🧠</div>/*
          <h1 className="text-3xl md:text-4xl text-slate-800 mb-5 leading-tight">
            Brandon's "They Can't Stop Me" Promotion Domination Mission
          </h1>

          <div className="border-t border-slate-100 pt-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
              Overall Proficiency
            </p>
            {aggregate ? (
              <>
                <div className="text-6xl font-bold text-blue-600">
                  {aggregate.percentage.toFixed(1)}%
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  Averaged across {aggregate.sectionsAttempted} of {aggregate.sectionsTotal} sections
                </p>
                {aggregate.percentage > 95 ? (
                  <h1 className="text-2xl font-extrabold text-blue-600 mt-4 uppercase">OK NOW YOU OWE CHIP SOME OF THAT NEXT CHECK!</h1>
                ) : aggregate.percentage > 90 ? (
                  <h1 className="text-2xl font-extrabold text-blue-600 mt-4 uppercase">YOU FUCKING GOT THIS DOGGIE!!!</h1>
                ) : aggregate.percentage > 80 ? (
                  <h2 className="text-lg font-bold text-slate-700 mt-4">You're Killin It Bro!</h2>
                ) : aggregate.percentage > 75 ? (
                  <h2 className="text-lg font-bold text-slate-700 mt-4">Go Brando Go!</h2>
                ) : aggregate.percentage > 50 ? (
                  <h2 className="text-lg font-bold text-slate-700 mt-4">C'mon Brandon!</h2>
                ) : null}
              </>
            ) : (
              <>
                <div className="text-6xl font-bold text-slate-300">—</div>
                <p className="text-sm text-slate-500 mt-1">
                  Take a section to see your score
                </p>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SECTIONS.map((section) => {
            const entry = scores[section.id]
            const last = formatScore(entry?.last)
            const best = formatScore(entry?.best)
            const classes = ACCENT_CLASSES[section.accent]

            return (
              <div
                key={section.id}
                className={`bg-white rounded-2xl shadow-md px-5 py-5 border-l-4 ${classes.border} flex flex-col`}
              >
              <h2 className={`text-lg font-bold ${classes.text}`}>{section.title}</h2>
              <p className="text-sm font-semibold text-slate-700">{section.subtitle}</p>
              <p className="text-sm text-slate-500 mt-1 mb-3">{section.description}</p>

              <div className="bg-slate-50 rounded-lg px-3 py-2 mb-4 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Last attempt</span>
                  <span className="text-slate-800 font-semibold">
                    {last ?? 'Not attempted'}
                  </span>
                </div>
                {best && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Best score</span>
                    <span className="text-slate-800 font-semibold">{best}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => onStartSection(section.id)}
                  className={`${classes.button} text-white font-bold px-4 py-3 rounded-xl transition-colors duration-150 flex-1 min-h-[48px]`}
                >
                  Start
                </button>
                <button
                  onClick={() => handleReset(section.id, section.subtitle)}
                  disabled={!entry}
                  className="bg-white border border-slate-200 text-slate-600 active:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-semibold px-4 py-3 rounded-xl transition-colors duration-150 min-h-[48px]"
                >
                  Reset Score
                </button>
              </div>
            </div>
          )
          })}
        </div>
      </div>
    </div>
  )
}

export { SECTIONS }
