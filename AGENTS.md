# Widdgys Repo Guide

## What this repo is
Widdgys is a Vite + React dashboard prototype that showcases a responsive grid layout with live-style widgets (clock, simulated Nasdaq ticker, sparkline chart). It is primarily a UI/UX playground focused on layout, motion, and visual system design.

## How to contribute
- Keep changes small and focused; avoid unrelated refactors.
- Prefer TypeScript React components and hooks.
- Follow the existing visual language in `src/App.css` and `src/index.css` unless the change explicitly redefines the look.
- Use ASCII in source files unless a feature requires Unicode.

## Project structure
- `src/App.tsx`: app shell and layout composition.
- `src/components/`: presentational components (e.g., `WidgetGrid`, `Sparkline`).
- `src/data/`: widget data builders and shared types.
- `src/hooks/`: reusable logic for time/ticker updates.
- `src/App.css`, `src/index.css`: global and component-level styling.

## Local development
- Install: `npm install`
- Run dev server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## Notes
- The Nasdaq ticker is currently simulated (no network calls).
- If you add new widgets, include them in `src/data/widgets.ts` and render in `WidgetGrid`.
