# Token Discovery Table (Axiom Trade Pulse Replica)

This project implements a pixel-perfect, high-performance replica of Axiom Trade's Pulse token discovery table using Next.js 14 App Router, TypeScript (strict), Tailwind CSS, Redux Toolkit, React Query, and Radix UI.

## Tech
- Next.js 14 (App Router), React 18, TypeScript strict
- Tailwind CSS
- Redux Toolkit for complex UI state (sorting, category)
- React Query for server data fetching and caching
- Radix UI primitives (Tooltip, Popover, Dialog)

## Features
- Three token categories: New pairs, Final Stretch, Migrated
- Interactions: hover effects, tooltips, popovers, modal dialogs
- Sorting for Price, 24h, Volume, Market Cap, Age
- Real-time price updates via WebSocket mock with smooth color transitions
- Loading states: skeleton rows with shimmer, progressive UX, error boundaries
- Performance: memoization, no layout shifts, sub-100ms interactions
- Responsive down to 320px

## Getting Started

```bash
pnpm i # or npm i / yarn
pnpm dev # http://localhost:3000
```

## Visual Regression & Snapshots
- Run `pnpm snapshots` to generate UI snapshots.
- Run `pnpm test:visual` to compare against baselines (uses Playwright + Pixelmatch).
- Baseline images should be placed under `./visual-baseline/` (commit your accepted baselines). New runs will produce `./visual-output/` diffs.

## Lighthouse
- Ensure devtools throttling is off. Run Lighthouse for mobile/desktop expecting ≥90 scores.
- Good scores depend on production build: `pnpm build && pnpm start`.

## Notes
- This demo includes a mock `/api/tokens` endpoint and a browser-only WebSocket mock for real-time price updates.
- All components are built atomically and reusable across the app.


