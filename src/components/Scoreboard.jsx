export default function Scoreboard({ score, total, currentIndex, sectionTitle }) {
  const progress = ((currentIndex) / total) * 100

  return (
    <div className="bg-white rounded-xl shadow-sm px-4 pt-3 pb-2">
      {sectionTitle && (
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
          {sectionTitle}
        </p>
      )}
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-600 font-medium text-sm">
          Question{' '}
          <span className="text-slate-800 font-bold">{currentIndex + 1}</span>
          {' '}of{' '}
          <span className="text-slate-800 font-bold">{total}</span>
        </span>
        <span className="text-slate-600 font-medium text-sm">
          Score:{' '}
          <span className="text-blue-700 font-bold text-base">{score}</span>
          <span className="text-slate-400"> / {total}</span>
        </span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
