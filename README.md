# Recovery Counseling Quiz App

An interactive, mobile-first quiz application for professionals preparing for careers in drug and alcohol recovery counseling. Built as a fully static Single Page Application — no backend, no accounts, just open and study.

---

## What It Covers

All 35 questions are derived from the core counseling frameworks taught in recovery staff training:

| Framework | Description |
|-----------|-------------|
| **M.R.S.T.D.** | The master acronym — Motivational Interviewing, REBT, Stages of Change, Trauma-Informed Care, Disease Concept |
| **G.R.A.C.E.** | The five MI principles: Generate a gap, Roll with resistance, Avoid argumentation, Can do, Express empathy |
| **O.A.R.S.** | Communication techniques: Open-ended questions, Affirmations, Reflective listening, Summarize |
| **F.O.R.M.** | Rapport-building: Family, Occupation, Recreation, Motivation |
| **U.P.R.** | Unconditional Positive Regard |
| **REBT** | Rational Emotive Behavior Therapy — belief-focused reframing |
| **Stages of Change** | Precontemplation → Contemplation → Preparation → Action → Maintenance |
| **Disease Concept** | Addiction as a chronic illness, not a willpower failure |
| **Trauma-Informed Care** | Creating safe, healing-centered environments |

---

## Features

- **35 randomized questions** — shuffled fresh every session using Fisher-Yates
- **Instant answer feedback** — correct/incorrect shown immediately with color coding
- **Detailed explanations** — every answer reveals a thorough educational breakdown
- **Hint system** — eliminates 2 wrong answers when you need a nudge
- **Streak rewards** — standard slang popup for correct answers; special high-energy popup when you get 3+ in a row
- **Progress bar** — always know how far through the quiz you are
- **Score tracking** — running score displayed throughout
- **Mobile-first** — built for phone use with large tap targets, safe area support, and auto-scroll between questions

---

## Tech Stack

- [React 19](https://react.dev/) via [Vite 8](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- Static SPA — no server, no database, no auth
- Deployed via [GitHub Actions](https://github.com/features/actions) to [GitHub Pages](https://pages.github.com/)


## Adding or Editing Questions

All content lives in [`src/data/questions.js`](src/data/questions.js). Each question follows this shape:

```js
{
  id: 36,
  imageFile: "IMG_20260414_224812.jpg",  // kept for reference, not displayed
  question: "Your question text here?",
  options: [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  correctAnswer: 0,   // zero-indexed
  explanation: "Detailed educational explanation shown after answering..."
}
```
