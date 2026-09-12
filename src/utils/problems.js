// Problem generation for Number Quest.
// Every tier returns: { prompt, answer, options, format }
// "answer" and "options" are display strings so fractions/decimals compare cleanly.

export const TIERS = {
  explorer: {
    id: 'explorer',
    name: 'Explorer',
    tagline: 'Addition & subtraction',
    color: '#6BCB77',
  },
  adventurer: {
    id: 'adventurer',
    name: 'Adventurer',
    tagline: 'Multiplication & division',
    color: '#4EC5E0',
  },
  champion: {
    id: 'champion',
    name: 'Champion',
    tagline: 'Fractions, decimals & algebra',
    color: '#FF6B6B',
  },
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b)
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Build a set of 4 unique options (1 correct + 3 distractors) from a list of
// candidate wrong numbers, falling back to random nearby numbers if needed.
function buildNumericOptions(correct, distractorCandidates, min = -999999) {
  const seen = new Set([String(correct)])
  const options = [correct]
  const pool = shuffle(distractorCandidates.filter((d) => d !== correct && d >= min))
  for (const d of pool) {
    if (options.length >= 4) break
    if (!seen.has(String(d))) {
      seen.add(String(d))
      options.push(d)
    }
  }
  let spread = 1
  while (options.length < 4) {
    const candidate = correct + (options.length % 2 === 0 ? spread : -spread) * (spread)
    spread++
    if (candidate >= min && !seen.has(String(candidate))) {
      seen.add(String(candidate))
      options.push(candidate)
    }
  }
  return shuffle(options).map(String)
}

function explorerProblem() {
  const op = Math.random() < 0.5 ? '+' : '-'
  let a = randInt(1, 12)
  let b = randInt(1, 12)
  if (op === '-' && b > a) [a, b] = [b, a] // keep results non-negative, friendly for beginners
  const answer = op === '+' ? a + b : a - b
  const distractors = [
    answer + 1,
    answer - 1,
    op === '+' ? a - b : a + b,
    answer + 2,
    answer - 2,
  ]
  return {
    prompt: `${a} ${op} ${b}`,
    answer: String(answer),
    options: buildNumericOptions(answer, distractors, 0),
    format: 'number',
    operands: { a, b, op },
  }
}

function adventurerProblem() {
  const opRoll = Math.random()
  if (opRoll < 0.35) {
    // bigger addition/subtraction
    const op = Math.random() < 0.5 ? '+' : '-'
    let a = randInt(10, 60)
    let b = randInt(10, 60)
    if (op === '-' && b > a) [a, b] = [b, a]
    const answer = op === '+' ? a + b : a - b
    const distractors = [answer + 5, answer - 5, answer + 10, answer - 1, answer + 1]
    return {
      prompt: `${a} ${op} ${b}`,
      answer: String(answer),
      options: buildNumericOptions(answer, distractors, 0),
      format: 'number',
    }
  } else if (opRoll < 0.7) {
    // multiplication
    const a = randInt(2, 12)
    const b = randInt(2, 12)
    const answer = a * b
    const distractors = [a * (b + 1), a * (b - 1), (a + 1) * b, answer + a, answer - b]
    return {
      prompt: `${a} × ${b}`,
      answer: String(answer),
      options: buildNumericOptions(answer, distractors, 0),
      format: 'number',
    }
  } else {
    // exact division
    const b = randInt(2, 12)
    const answer = randInt(2, 12)
    const a = b * answer
    const distractors = [answer + 1, answer - 1, answer + 2, b, a - answer]
    return {
      prompt: `${a} ÷ ${b}`,
      answer: String(answer),
      options: buildNumericOptions(answer, distractors, 0),
      format: 'number',
    }
  }
}

function championProblem() {
  const opRoll = Math.random()
  if (opRoll < 0.34) {
    // like-denominator fraction addition/subtraction
    const den = [4, 5, 6, 8, 10][randInt(0, 4)]
    let n1 = randInt(1, den - 1)
    let n2 = randInt(1, den - 1)
    const op = Math.random() < 0.5 ? '+' : '-'
    if (op === '-' && n2 > n1) [n1, n2] = [n2, n1]
    let num = op === '+' ? n1 + n2 : n1 - n2
    let d = den
    const g = gcd(Math.max(num, 1), d)
    if (num > 0 && g > 1) {
      num = num / g
      d = d / g
    }
    const answer = d === 1 ? String(num) : `${num}/${d}`
    const wrongForm = op === '+' ? `${n1 + n2}/${den}` : `${Math.abs(n1 - n2)}/${den}`
    const distractorSet = new Set([answer, wrongForm, `${n1}/${den}`, `${n2}/${den}`, `${num + 1}/${d}`, `${Math.max(num - 1, 0)}/${d}`])
    distractorSet.delete(answer)
    const options = shuffle([answer, ...Array.from(distractorSet).slice(0, 3)])
    return {
      prompt: `${n1}/${den} ${op} ${n2}/${den}`,
      answer,
      options: options.length >= 4 ? options.slice(0, 4) : options.concat([`${num}/${d + 2}`]),
      format: 'fraction',
    }
  } else if (opRoll < 0.67) {
    // decimals, one decimal place
    const op = Math.random() < 0.5 ? '+' : '-'
    let a = randInt(10, 99) / 10
    let b = randInt(10, 99) / 10
    if (op === '-' && b > a) [a, b] = [b, a]
    const answer = Math.round((op === '+' ? a + b : a - b) * 10) / 10
    const distractors = [
      Math.round((answer + 1) * 10) / 10,
      Math.round((answer - 1) * 10) / 10,
      Math.round((answer + 0.1) * 10) / 10,
      Math.round((answer - 0.1) * 10) / 10,
      Math.round((a + b) * 10) / 10,
    ]
    const opts = buildNumericOptions(answer, distractors, 0).map((v) => Number(v).toFixed(1))
    return {
      prompt: `${a.toFixed(1)} ${op} ${b.toFixed(1)}`,
      answer: answer.toFixed(1),
      options: opts,
      format: 'decimal',
    }
  } else {
    // simple algebra: x + a = b  or  x - a = b
    const op = Math.random() < 0.5 ? '+' : '-'
    const x = randInt(1, 20)
    const a = randInt(1, 20)
    const b = op === '+' ? x + a : x - a
    const distractors = [x + 1, x - 1, b - a, b + a, x + a]
    return {
      prompt: `x ${op} ${a} = ${b}`,
      answer: String(x),
      options: buildNumericOptions(x, distractors, -50),
      format: 'algebra',
    }
  }
}

const GENERATORS = {
  explorer: explorerProblem,
  adventurer: adventurerProblem,
  champion: championProblem,
}

export function generateProblem(tierId) {
  const fn = GENERATORS[tierId] || explorerProblem
  return fn()
}

export function generateSet(tierId, count) {
  const set = []
  for (let i = 0; i < count; i++) set.push(generateProblem(tierId))
  return set
}

export function dominoSplit(n) {
  if (n <= 0) return [0, 0]
  const top = Math.min(6, Math.ceil(n / 2))
  const bottom = n - top
  return [top, bottom]
}
export function dominoChunks(n) {
  const chunks = []
  let remaining = n
  while (remaining > 10) {
    chunks.push(10)
    remaining -= 10         
  }
  chunks.push(remaining)
  return chunks
}