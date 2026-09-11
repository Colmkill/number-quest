# Number Quest 🌟

A bright, friendly maths practice game for learners of every level — built with React + Vite, ready to deploy on Vercel.

**No accounts, no tracking, no ads.** All progress is saved only in the player's own browser (`localStorage`), and nothing is ever sent to a server.

## What's inside

- **Practice** — untimed, unlimited questions, no penalty for wrong answers
- **Quiz Challenge** — 10 timed questions, encouraging feedback at the end regardless of score
- **Adventure Map** — a path of 6 levels per tier; earn stars to unlock the next stop
- Three difficulty tiers: **Explorer** (addition/subtraction), **Adventurer** (multiplication/division), **Champion** (fractions, decimals, simple algebra)

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional, to check the production build locally
```

## Project structure

```
src/
  components/    UI screens (Home, Practice, Quiz, Adventure) and shared pieces
  utils/
    problems.js  Question generation for all three tiers
    progress.js  localStorage save/load helpers
  App.jsx        Screen routing and top-level state
  index.css      Design system (colors, type, layout)
```

## Customising

- **Colors & fonts**: edit the CSS variables at the top of `src/index.css`
- **Difficulty / question types**: edit the generator functions in `src/utils/problems.js`
- **Number of levels or questions per quiz**: constants at the top of `Adventure.jsx` and `Quiz.jsx`
