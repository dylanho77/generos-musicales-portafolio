# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server (http://localhost:5173)
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build

There is no linter and no test suite configured.

## Stack

React 19 + Vite + Tailwind CSS v4 (via the `@tailwindcss/vite` plugin; no `tailwind.config.js`). Plain JavaScript (JSX), no TypeScript. All UI text is in Spanish and must stay that way.

## Architecture

Single-page app with no router and no backend or external APIs.

- `src/data/generos.js` is the single source of truth: exports `categorias` (filter tabs, with `"Todos"` first) and `generos` (one object per genre). Adding a genre means adding an object there. Its `categoria` must match one of the `categorias` strings exactly, since filtering is by string equality.
- `src/App.jsx` owns all state (`busqueda`, `categoria`, `abierto`). Search is accent-insensitive and matches genre name, country (`pais`) and the `iconicos` artist/song strings. Category filter and search combine.
- `GenreCard` opens the detail view by calling `onOpen(genero)`; `GenreModal` renders it (Esc / backdrop click closes, locks body scroll) and embeds `Player`.
- `Player` is a simulated player: a fake 180 s timer with no audio. `Waveform` is purely CSS-animated bars.
- Song names in `iconicos` use the format `"Artista – Canción"`; `Player` splits on `" – "` to label track buttons, so keep that separator.

## Styling

Theme colors are defined in `@theme` in `src/index.css` (`bg` #0A0A0F, `card` #14141F, `line` border color) and used as Tailwind utilities (`bg-bg`, `bg-card`, `border-line`). Each genre has its own accent `color` hex applied via inline styles. The wave and modal animations (`.wave-bar`, `.wave-paused`, `.pop`) are custom CSS in `index.css`.
