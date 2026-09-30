# DhanaDrishti (धनदृष्टि / धनदृष्टी)

> **"Simple Finance • Stronger Tomorrows"**  
> *Understand Your Money. See Your Future.*

Interactive financial literacy, planning, and decision-support web platform built for students, young earners, and first-time financial users in India.

---

## 🌟 Visual Identity & Design System

The visual design is derived directly from the login image:
- **Canvas**: Deep-night navy (`#040A1C` to `#071433` to `#0B2A6B`) with soft radial ambient glows (`#2F7BFF` at low opacity).
- **Glassmorphism**: Translucent frosted glass cards (`rgba(7, 20, 51, 0.65)` / `rgba(230, 239, 251, 0.8)` in light mode), `1px` border with cyan glow (`rgba(40, 200, 255, 0.35)`), and 20–24px corner radii.
- **Accents**: Neon Cyan (`#12B8FF`) to Aqua/Teal (`#19E3C0`).
- **Primary Buttons**: Royal Blue (`#1346E0`) to Aqua (`#19E3C0`) gradient pill with trailing arrow icon and glow shadow.
- **Backdrop**: Layered mountain horizon silhouette, winding glowing road, and rising translucent 3D financial growth bars catching horizon sunrise light.
- **Logo**: Reusable SVG monogram containing stylized "D", Indian rupee symbol (`₹`), and rising bar charts in a green-to-cyan gradient, plus wordmark and letter-spaced tagline.
- **Typography**: Plus Jakarta Sans / Manrope + Noto Sans Devanagari for Hindi and Marathi (with adjusted line heights).

---

## 🧭 Left Sidebar Navigation (Strict 8 Items)

1. **Term-O-Pedia** (`/` or `/term/:slug`): Core financial learning dictionary with 15+ curated terms, directly playable YouTube videos, and interactive embedded calculators.
2. **Dashboard** (`/dashboard`): Personal financial overview displaying user inputs and clear step-by-step Indian salary breakdown (**CTC → Gross Salary → Deductions → In-Hand Salary**).
3. **What-If Simulator** (`/what-if`): Live scenario simulator adjusting salary percentage, living expenses, and monthly savings with delta comparisons.
4. **Goal-Based Planner** (`/goal-planner`): Dynamic target planner calculating required monthly and weekly savings with interactive sliders.
5. **Financial Document Explainer** (`/document-explainer`): Drag-and-drop document upload (Salary Slips, Form 16, Loan Agreements) with plain-language itemized breakdowns in English, Hindi, and Marathi.
6. **Financial Health Assessment** (`/financial-health`): 0–100 diagnostic score across 4 financial pillars (Savings Rate, Expense Ratio, Emergency Runway, Cashflow Surplus) with an optional playful **AI Roast Mode 🔥**.
7. **Check If Myth or Fact** (`/myth-or-fact`): Evaluates financial claims with classification (FACT, MYTH, DEPENDS ON CONTEXT), confidence gauge, reasoning, and regulatory sources (RBI, SEBI, IRDAI, CIBIL).
8. **Dark / Light Mode**: Instant appearance toggle row at the bottom of the sidebar.

---

## 🤖 AI Financial Mentor Access

- **Floating Launcher**: "Ask AI Mentor" floating button on all authenticated screens.
- **Contextual In-Screen Buttons**: "Explain Breakdown with AI", "Discuss Document with Mentor", "Review Diagnostic with Mentor".
- **Full-Page Experience**: `/mentor` for deep conversational sessions.
- **Context-Aware**: Automatically utilizes stored CTC, monthly in-hand, expenses, savings, and active goals without repeatedly asking the user.

---

## 🌐 Multilingual Support

- **English** (`en`)
- **हिन्दी (Hindi)** (`hi`)
- **मराठी (Marathi)** (`mr`)
- Accessible via the top-right frosted glass language pill.

---

## 📐 Deterministic Calculation Logic

Deterministic calculations come exclusively from pure mathematical application logic in [`src/utils/calculations.ts`](src/utils/calculations.ts):
- **Indian Salary Breakdown**: FY 2024-25 / 2025-26 New Tax Regime with ₹75,000 standard deduction, Section 87A rebate, Employee EPF (12% of basic), Professional Tax (₹2,400/yr), and 4% Health & Education Cess.
- **GST Engine**: Calculates CGST, SGST, IGST, and total amounts under 0%, 5%, 12%, 18%, 28% slabs (inclusive & exclusive).
- **Goal-Based Planner**: Precise daily, weekly, and monthly required savings.
- **What-If Engine**: Side-by-side delta computations.
- **Financial Health Diagnostic**: 0–100 score with radar charts.

---

## 🔒 Security & Rules Compliance

- **No Fake Data**: No mock sample salaries, no placeholder users, no sample chat histories. All features show authentic empty states and store real user inputs.
- **Real Auth Architecture**: Supabase Auth adapter (`src/services/auth/authAdapter.ts`). If environment variables are missing, sign-in is disabled with a clear "Authentication service is not connected" status alert, adhering strictly to rule 2.4.
- **No Secrets in Client**: All AI and document analysis endpoints call backend routes (`/api/...`).

---

## 🚀 Running the App

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests
node --experimental-strip-types tests/verify-screens.js

# Production build
npm run build
```
