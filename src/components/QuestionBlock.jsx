export default function QuestionBlock({
  question,
  options,
  selectedAnswer,
  correctAnswer,
  onSelect,
  phase,
  eliminatedIndices,
  onHint,
}) {
  const hintUsed = eliminatedIndices.length > 0

  function getButtonClass(index) {
    const isEliminated = eliminatedIndices.includes(index)
    const base =
      'w-full text-left px-4 py-4 rounded-xl mb-3 border transition-colors duration-150 font-medium text-base leading-snug min-h-[52px]'

    if (phase === 'question') {
      if (isEliminated) {
        return `${base} bg-slate-50 border-slate-200 text-slate-300 cursor-pointer`
      }
      return `${base} bg-white border-slate-300 text-slate-700 active:bg-blue-50 active:border-blue-400 cursor-pointer`
    }

    // feedback phase
    if (index === selectedAnswer) {
      if (index === correctAnswer) {
        return `${base} bg-green-100 border-2 border-green-500 text-green-800`
      }
      return `${base} bg-amber-100 border-2 border-amber-500 text-amber-800`
    }

    if (index === correctAnswer) {
      return `${base} bg-green-50 border border-green-300 text-green-700`
    }

    return `${base} bg-white border-slate-200 text-slate-400 opacity-50`
  }

  return (
    <div>
      <p className="text-slate-800 text-lg font-semibold mb-4 leading-relaxed">
        {question}
      </p>

      {phase === 'question' && !hintUsed && (
        <button
          onClick={onHint}
          className="flex items-center gap-1.5 text-amber-600 active:text-amber-800 text-sm font-semibold mb-4 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 active:bg-amber-100 transition-colors duration-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
            <path d="M9 18h6"/><path d="M10 22h4"/>
          </svg>
          Hint
        </button>
      )}

      {options.map((option, index) => {
        const isEliminated = eliminatedIndices.includes(index)
        return (
          <button
            key={index}
            className={getButtonClass(index)}
            onClick={() => onSelect(index)}
            disabled={phase === 'feedback'}
          >
            <span className="text-slate-400 font-bold mr-2 text-sm">
              {String.fromCharCode(65 + index)}.
            </span>
            <span className={isEliminated && phase === 'question' ? 'line-through' : ''}>
              {option}
            </span>
          </button>
        )
      })}
    </div>
  )
}
