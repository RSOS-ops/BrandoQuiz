const SECTIONS = ['acronym', 'situational', 'all']
const keyFor = (section) => `brandoquiz:score:${section}`
const LIFETIME_WRONG_KEY = 'brandoquiz:lifetimeWrongCount'
const LIFETIME_WRONG_ULTRARARE_KEY = 'brandoquiz:lifetimeWrongCountUltrarare'

function readRaw(section) {
  try {
    const raw = localStorage.getItem(keyFor(section))
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || !parsed.last || typeof parsed.last.correct !== 'number') return null
    return parsed
  } catch {
    return null
  }
}

export function getSectionScore(section) {
  return readRaw(section)
}

export function recordSectionAttempt(section, { correct, total }) {
  if (!SECTIONS.includes(section)) return
  if (typeof correct !== 'number' || typeof total !== 'number' || total <= 0) return

  const existing = readRaw(section)
  const attempt = { correct, total }
  const newPct = correct / total

  let best = attempt
  if (existing && existing.best && existing.best.total > 0) {
    const bestPct = existing.best.correct / existing.best.total
    if (bestPct >= newPct) best = existing.best
  }

  const payload = { last: attempt, best }
  try {
    localStorage.setItem(keyFor(section), JSON.stringify(payload))
  } catch {
    // ignore quota or availability errors
  }
}

export function clearSectionScore(section) {
  try {
    localStorage.removeItem(keyFor(section))
  } catch {
    // ignore
  }
}

export function getAllSectionScores() {
  return {
    acronym: getSectionScore('acronym'),
    situational: getSectionScore('situational'),
    all: getSectionScore('all'),
  }
}

function incrementCounter(key) {
  let current = 0
  try {
    const raw = localStorage.getItem(key)
    const parsed = raw ? parseInt(raw, 10) : 0
    if (Number.isFinite(parsed) && parsed >= 0) current = parsed
  } catch {
    // ignore
  }
  const next = current + 1
  try {
    localStorage.setItem(key, String(next))
  } catch {
    // ignore
  }
  return next
}

export function incrementLifetimeWrongCount() {
  return incrementCounter(LIFETIME_WRONG_KEY)
}

export function incrementLifetimeWrongCountUltrarare() {
  return incrementCounter(LIFETIME_WRONG_ULTRARARE_KEY)
}

export function resetLifetimeWrongCountUltrarare() {
  try {
    localStorage.setItem(LIFETIME_WRONG_ULTRARARE_KEY, '0')
  } catch {
    // ignore
  }
}

export function getAggregateScore() {
  const scores = getAllSectionScores()
  const pcts = SECTIONS
    .map((s) => scores[s])
    .filter((entry) => entry && entry.last && entry.last.total > 0)
    .map((entry) => entry.last.correct / entry.last.total)

  if (pcts.length === 0) return null

  const avg = pcts.reduce((sum, p) => sum + p, 0) / pcts.length
  return {
    percentage: avg * 100,
    sectionsAttempted: pcts.length,
    sectionsTotal: SECTIONS.length,
  }
}
