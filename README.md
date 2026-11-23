# ALLEN AI Doubt Solver

A personalised AI doubt solver for JEE aspirants that explains at the depth each student actually needs.

**Live:** https://allen-ai-doubtsolver.vercel.app

## What it is / why I built it

Most AI doubt solvers give every student the same answer. A topper preparing for JEE Advanced wants the formula and the result in three lines; a student who's shaky on basics needs terms defined and every step justified. One explanation style fails both.

This prototype, built for ALLEN's student app, profiles each student with a short 10-question diagnostic and then routes them to one of four explanation modes. "Allie", the AI tutor, answers doubts in that mode, and the student can switch modes anytime. I built it as a PM concept prototype before Allen Digital shipped a similar feature.

> Independent concept prototype. Not affiliated with or endorsed by ALLEN / Allen Digital.

## Features

- **Onboarding** — name, class (10 / 11 / 12 / 12th pass), target exam (JEE Main / Advanced) and exam year.
- **10-question profile quiz** — 3 learning-style questions, 3 Physics / Maths / Chemistry diagnostics, 3 subject-confidence questions and 1 prep-stage question.
- **Mode scoring** — style answers pick a mode; weak diagnostic results stop a student from being pushed into an overly compressed mode.
- **Four explanation modes**, each with its own system prompt and token budget:
  - **Sprinter** — direct answer, key formula, result
  - **Advanced** — concept, then one clean worked example
  - **Intermediate** — concept explained first, then step-by-step solution
  - **Foundation** — built from the ground up, no jumps
- **Allie chat** — Markdown + LaTeX rendering (MathJax, sanitised with DOMPurify), mode switcher in the chat, image attach (shown in the chat; the student types the question) and browser voice input where supported.
- **Home screen** with the student's persona and a doubt-solver CTA.
- OpenAI key stays server-side in a Vercel serverless function.

## Tech stack

- Vanilla HTML, CSS and JavaScript (no build step)
- Vercel serverless function `api/allie.js` proxying the OpenAI Chat Completions API
- marked, DOMPurify and MathJax via CDN

## Run locally

Requires the [Vercel CLI](https://vercel.com/docs/cli).

```bash
# set OPENAI_API_KEY (and optionally OPENAI_MODEL) in a .env file or your shell
vercel dev --listen 3001
# open http://localhost:3001
```

Environment variables:

- `OPENAI_API_KEY` — required
- `OPENAI_MODEL` — optional, overrides the default model

Note: when the page is served from `localhost:3000`, the frontend calls the API at `localhost:3001/api/allie`; on any other host it calls `/api/allie` on the same origin. Running `vercel dev` on port 3001 serves both.

Without the API you can still click through onboarding, the quiz and the mode result by opening `index.html` directly; only chat needs the function.

## Project structure

```
index.html        All screens: info, quiz, home, doubts (chat), modes modal
css/styles.css
js/
  state.js        App state + API URL
  questions.js    The 10 profile questions
  scoring.js      Mode recommendation logic
  prompts.js      Per-mode system prompts
  api.js          Chat calls, image + voice input
  ui.js, app.js   Rendering and navigation
api/allie.js      Vercel serverless function (OpenAI proxy)
```

## Status

Working prototype, deployed on Vercel.
