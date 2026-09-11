const STORAGE_KEY = 'number-quest-progress-v1'
const LEVELS_PER_TIER = 6

function defaultProgress() {
  return {
    name: '',
    tiers: {
      explorer: { unlocked: 1, stars: {} },
      adventurer: { unlocked: 1, stars: {} },
      champion: { unlocked: 1, stars: {} },
    },
    bestQuizScore: {},
  }
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress()
    const parsed = JSON.parse(raw)
    return { ...defaultProgress(), ...parsed }
  } catch {
    return defaultProgress()
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // storage unavailable (e.g. private browsing) — game still works, just won't persist
  }
}

export function recordLevelResult(progress, tierId, level, starsEarned) {
  const next = structuredClone(progress)
  const tier = next.tiers[tierId]
  const prevStars = tier.stars[level] || 0
  tier.stars[level] = Math.max(prevStars, starsEarned)
  if (starsEarned > 0 && level === tier.unlocked && tier.unlocked < LEVELS_PER_TIER) {
    tier.unlocked += 1
  }
  return next
}

export function recordQuizResult(progress, tierId, score, total) {
  const next = structuredClone(progress)
  const key = tierId
  const prevBest = next.bestQuizScore[key]
  if (!prevBest || score > prevBest.score) {
    next.bestQuizScore[key] = { score, total }
  }
  return next
}

export const LEVELS_PER_TIER_EXPORT = LEVELS_PER_TIER
