export default function FeedbackSection({
  isCorrect,
  explanation,
  correctAnswer,
  options,
}) {
  if (isCorrect) {
    return (
      <div className="bg-green-50 border border-green-300 rounded-2xl p-4">
        <p className="text-green-700 font-bold text-lg mb-2">✓ Correct!</p>
        <p className="text-slate-700 text-base leading-relaxed">{explanation}</p>
      </div>
    )
  }

  return (
    <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4">
      <p className="text-amber-700 font-bold text-lg mb-1">✗ Not quite.</p>
      <p className="text-amber-800 font-semibold text-sm mb-3">
        Correct answer:{' '}
        <span className="font-bold">{options[correctAnswer]}</span>
      </p>
      <p className="text-slate-700 text-base leading-relaxed">{explanation}</p>
    </div>
  )
}
