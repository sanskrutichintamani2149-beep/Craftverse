# DhanaDrishti

**Simple Finance • Stronger Tomorrows**

DhanaDrishti is an interactive financial literacy, planning and decision-support web platform for students, young earners and first-time financial users in India. It helps people understand their money through plain-language learning, personalised calculations, goal planning, and an AI mentor that knows their own financial context.

> Everything the app shows is calculated live from the user's own data. There are no hardcoded or sample results. Money is calculated by a deterministic engine. AI is only used to explain, never to calculate.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [Supabase Setup](#supabase-setup)
8. [Edge Functions and Secrets](#edge-functions-and-secrets)
9. [Gemini Setup](#gemini-setup)
10. [Firebase Backup Setup](#firebase-backup-setup)
11. [Authentication Setup](#authentication-setup)
12. [Financial Engine](#financial-engine)
13. [Themes](#themes)
14. [Languages](#languages)
15. [Login Page Background Video](#login-page-background-video)
16. [Testing](#testing)
17. [Production Build](#production-build)
18. [Deployment Checklist](#deployment-checklist)
19. [Security and Privacy](#security-and-privacy)
20. [Troubleshooting](#troubleshooting)
21. [Scope](#scope)

---

## Features

**Sidebar (in this exact order)**

1. **Term-O-Pedia** – searchable financial dictionary with categories, flashcards and profession tracks. Every term has two options, **Learn** and **Calculate**.
2. **Dashboard** – CTC → Gross → Deductions → Take-home, monthly expenses, potential savings and a "Where does my money go?" view.
3. **What-If Simulator** – change salary, expenses or savings and see the impact against your current situation.
4. **Goal-Based Planner** – enter a goal and get the monthly savings required.
5. **Financial Document Explainer** – upload a financial document and get a detailed explanation in very simple language.
6. **Financial Health Assessment** – personalised indicators, charts, insights, and an optional playful AI Roast.
7. **Check If Myth or Fact** – check a financial claim (text or image) with classification, confidence, reasoning and sources.
8. **Dark / Light Mode** – both themes work across the whole app.

**Also included**

- Login, Sign Up, Forgot/Reset password, session-expired screen
- Financial Profile (the inputs that power the dashboard)
- 10-Year Roadmap (saving vs investment scenarios)
- Myth vs Reality library
- AI Mentor (personalised chat using your stored data)
- English, Hindi and Marathi
- Basic account and security screens

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, TypeScript, Tailwind CSS |
| Charts | Recharts |
| Data fetching | TanStack Query |
| Validation | Zod |
| Primary backend | Supabase (Auth, PostgreSQL, Row Level Security, Edge Functions) |
| Backup | Firebase Firestore (server-side only) |
| AI | Google Gemini API (explanations only) |
| Testing | Vitest, Playwright, SQL/pgTAP tests for RLS |

---

## Architecture

```text
Frontend (React)
    │
    ▼
Supabase (Auth + Postgres + RLS)  ◄── single source of truth
    │
    ▼
Edge Functions
    │
    ├──► Financial Engine (pure TypeScript, deterministic) ──► stored result ──► Frontend
    │
    ├──► Gemini API (explanations only) ──► Frontend
    │
    └──► Backup queue ──► Firebase Firestore (backup only, never read by the app)
```

**Rules that never change**

- Supabase is the primary database and the only source of live app data.
- Firebase is a backup. The app never reads from it.
- The Financial Engine produces every number. It has no I/O and no AI.
- Gemini explains and personalises. It never calculates financial values.
- Secrets live only in Edge Function secrets, never in the frontend.

---

## Project Structure

```text
.
├── src/
│   ├── components/        # UI components (no DB calls, no calculation logic)
│   ├── pages/             # Route pages
│   ├── services/          # auth, financialProfile, dashboard, termopedia, whatif,
│   │                      # planner, roadmap, health, documentExplainer,
│   │                      # mythReality, aiMentor, language, backup
│   ├── engine/            # Deterministic financial engine (pure TypeScript)
│   ├── financialRules/    # Versioned tax/GST rules (e.g. in-FY2025-26.ts)
│   ├── locales/           # en / hi / mr translation files
│   ├── content/           # Term-O-Pedia content (en / hi / mr)
│   └── theme/             # Dark and light theme tokens
├── supabase/
│   ├── migrations/        # SQL migrations (tables, RLS, triggers)
│   ├── functions/         # Edge Functions
│   ├── tests/             # RLS tests
│   └── config.toml
├── firebase/
│   └── firestore.rules    # Denies all client access
├── public/
│   └── media/             # login-bg.mp4, login-bg-poster.jpg
├── docs/
│   ├── AUDIT.md
│   └── VERIFICATION.md
├── .env.example
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- A Supabase project
- Supabase CLI
- A Google AI Studio account (Gemini key)
- A Firebase project (for backup)

### Install and run

```bash
git clone <your-repo-url>
cd dhanadrishti
npm install
cp .env.example .env.local
# fill in the client-safe values in .env.local
npm run dev
```

The app runs at `http://localhost:5173` by default.

---

## Environment Variables

Copy `.env.example` to `.env.local`. Never commit real values. `.env*` files (except `.env.example`) are in `.gitignore`.

| Variable | Used by | Visibility |
|---|---|---|
| `VITE_SUPABASE_URL` | Frontend | Client-safe |
| `VITE_SUPABASE_ANON_KEY` | Frontend | Client-safe |
| `SUPABASE_SERVICE_ROLE_KEY` | Edge Functions | **Server-only** |
| `GEMINI_API_KEY` | Edge Functions | **Server-only** |
| `GEMINI_MODEL` | Edge Functions | Server-only |
| `FIREBASE_PROJECT_ID` | Backup function | Server-only |
| `FIREBASE_CLIENT_EMAIL` | Backup function | Server-only |
| `FIREBASE_PRIVATE_KEY` | Backup function | **Server-only** |

Only the two `VITE_` variables may ever reach the browser. Everything else is set as an Edge Function secret.

---

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Copy the project URL and anon key into `.env.local`.
3. Log in and link the project:

```bash
supabase login
supabase link --project-ref <your-project-ref>
```

4. Apply the migrations:

```bash
supabase db push
```

This creates the tables, constraints, indexes, triggers, a profile-on-signup trigger, and Row Level Security policies.

### Row Level Security

- RLS is enabled on every table.
- Every user-owned row has `user_id uuid references auth.users(id) on delete cascade`.
- Policies allow select, insert, update and delete only where `user_id = auth.uid()`.
- Anonymous users get no access to user data.
- Static educational content (terms, myths) is public read-only.

Run the RLS tests to confirm user A cannot read, update or delete user B's data:

```bash
supabase test db
```

---

## Edge Functions and Secrets

Edge Functions run the engine, call Gemini, and handle backups. They verify the user's JWT, validate payloads with Zod, rate-limit AI endpoints, restrict CORS, and never log secrets or full financial payloads.

Set secrets (replace the placeholders with your own values):

```bash
supabase secrets set GEMINI_API_KEY=<your-gemini-key>
supabase secrets set GEMINI_MODEL=<model-name>
supabase secrets set FIREBASE_PROJECT_ID=<id>
supabase secrets set FIREBASE_CLIENT_EMAIL=<email>
supabase secrets set FIREBASE_PRIVATE_KEY="<private-key>"
```

Deploy (run this yourself when you are ready; nothing in this repo deploys automatically):

```bash
supabase functions deploy
```

---

## Gemini Setup

1. Create an API key in Google AI Studio.
2. Store it only as the `GEMINI_API_KEY` Edge Function secret.
3. Never put the key in the frontend, in commits, in screenshots, or in chat messages. If a key has ever been shared in plain text, delete it and create a new one.

Gemini is used for:

- AI Mentor (personalised replies from your stored data)
- Financial Document Explainer (detailed, very simple explanations)
- Check If Myth or Fact (structured classification)
- Health Assessment explanations and the AI Roast

If Gemini is unavailable, the app shows a clear AI error state and everything else keeps working.

---

## Firebase Backup Setup

1. Create a Firebase project and enable Firestore.
2. Create a service account and add its details as Edge Function secrets (see above).
3. Deploy `firebase/firestore.rules`, which denies all client access.

How the backup works:

- Supabase is always written first.
- Writes are queued in `backup_queue`.
- A backup function writes to Firestore using deterministic document IDs (`{userId}_{table}_{recordId}`) with merge, so retries are safe.
- Failed backups retry with exponential backoff and track `attempts` and `last_error`.
- A Firebase failure never changes or deletes Supabase data.

---

## Authentication Setup

In the Supabase dashboard under **Authentication**:

- **Email/password:** enabled by default.
- **Google and GitHub login:** add each provider's client ID and secret, and set the redirect URL shown by Supabase.
- **Phone login:** needs an SMS provider configured. Without one, email login is used.
- **Redirect URLs:** add your local and production URLs.

Features: sign up, log in, log out, session persistence, forgot/reset password, session-expired screen, protected routes. Logging out clears all cached user data.

---

## Financial Engine

Located in `src/engine/`. It is pure TypeScript with no network calls, no AI and no randomness, and it is shared by the frontend (instant previews) and Edge Functions (stored results).

Modules: salary/CTC, GST, TDS, income tax, savings, roadmap, what-if, goal planner, health indicators, and the term calculators (SIP, compounding, inflation, EMI, emergency fund, budgeting, equity, mutual funds, ESOPs, credit utilisation).

Principles:

- Inputs are validated. Negative, NaN, Infinity, malformed and absurdly large values are rejected.
- Money uses a decimal-safe approach with documented rounding.
- Every result includes `assumptions` and `engineVersion`.
- Tax and GST rules are never hardcoded in logic. They live in a versioned file such as `src/financialRules/in-FY2025-26.ts`, with a source note and effective date. **Review these against official government sources before release.**

All projections are educational estimates, not guaranteed outcomes or tax advice.

---

## Themes

- **Dark mode:** a layered navy palette with clear contrast between page, sidebar, cards and inputs.
- **Light mode:** an ice and sky-blue palette taken from the logo, with deep navy text.
- The toggle switches instantly, remembers your choice, follows the system theme on first visit, and avoids a flash of the wrong theme.
- Colours are defined as theme tokens, not hardcoded in components.

---

## Languages

English, हिंदी and मराठी. Translation files are in `src/locales/` and Term-O-Pedia content in `src/content/`. The selected language is saved in the user's profile and applied to the interface, educational content, results and AI responses. Numbers use Indian grouping (₹12,34,567).

---

## Login Page Background Video

The login page plays a blurred, muted, looping video behind the interface.

- Files: `public/media/login-bg.mp4` and `public/media/login-bg-poster.jpg`
- The video has no audio, is applied with a blur and a theme-matched overlay so the login form stays readable, and is only used on the login page.
- Users with reduced-motion settings see the still poster instead.
- To replace it, keep the same file names and keep the video small (under about 5 MB).

---

## Testing

```bash
npm run typecheck     # TypeScript checks
npm run lint          # Lint
npm run test          # Vitest (engine and services)
supabase test db      # RLS tests (needs local Supabase)
npx playwright test   # End-to-end journey
```

Coverage includes:

- Engine: normal, decimal, very large, zero, negative, NaN/Infinity, slab boundaries, and property checks (for example take-home is never more than gross)
- Authentication and protected routes
- RLS: no user can access another user's data
- Gemini failure handling and Firebase failure with idempotent retry
- End-to-end: sign up → language → profile → dashboard → change CTC → values update → Term-O-Pedia calculators → Myth/Fact → Roadmap → What-If → Planner → Document Explainer → Health → AI Mentor → logout blocks protected pages → login restores data

---

## Production Build

```bash
npm run build
npm run preview
```

---

## Deployment Checklist

- [ ] `.env.local` is not committed
- [ ] Real values for all variables in the table above are set (server-only ones as Edge Function secrets)
- [ ] Migrations applied and RLS tests pass
- [ ] Edge Functions deployed
- [ ] Google/GitHub OAuth providers configured and redirect URLs added
- [ ] Firestore rules deployed (deny all client access)
- [ ] Tax/GST rules reviewed against official sources
- [ ] Hindi and Marathi content reviewed
- [ ] Both themes checked on every page at mobile, tablet and desktop widths
- [ ] Term-O-Pedia videos play on every term
- [ ] `npm run build` passes with no errors

---

## Security and Privacy

- Only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are client-side.
- Row Level Security isolates every user's data.
- Edge Functions verify the JWT, validate input, rate-limit AI calls and never log secrets.
- Only the data needed for the product is stored.
- Uploaded documents are sent to the AI service to be explained.
- AI answers and calculations are for education only.

---

## Troubleshooting

| Problem | What to check |
|---|---|
| Blank screen after login | Check `VITE_SUPABASE_URL` and anon key in `.env.local`, then restart `npm run dev`. |
| "Not authorised" or empty data | Confirm migrations are applied and the user is logged in. RLS blocks anonymous access by design. |
| AI Mentor or Document Explainer shows an AI error | Check that `GEMINI_API_KEY` and `GEMINI_MODEL` are set as Edge Function secrets and the functions are deployed. |
| Google/GitHub login fails | Check provider credentials and redirect URLs in Supabase Auth settings. |
| Theme does not change | Clear local storage, hard refresh, and check the theme class on `<html>`. |
| YouTube shows "Video unavailable" | The video may not allow embedding. Replace the video ID with an embeddable one. |
| Login background video does not play | Check the file names in `public/media/` and that autoplay is muted. |
| Backup shows failed | Check the Firebase secrets. Retries happen automatically and the app data is not affected. |

---

## Scope

This project builds only the features described above. Gamification (points, XP, badges, streaks, rewards, leaderboards), investment dashboards and unrelated modules are intentionally not included.

---

*Educational information only. Not financial, tax or legal advice.*
