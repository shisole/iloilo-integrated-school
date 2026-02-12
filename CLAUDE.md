# CLAUDE.md — Iloilo Integrated School Website

## Quick Reference

```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm preview    # Preview production build
```

## Tech Stack

- **Framework**: SvelteKit 2 + Svelte 5 (runes syntax)
- **Styling**: Tailwind CSS 4 (utility classes, custom `@theme` variables in `src/app.css`)
- **CMS**: Sanity.io (GROQ queries in `src/lib/sanity/queries.js`)
- **Deployment**: Vercel (adapter-auto)
- **Package Manager**: pnpm
- **Language**: JavaScript (no TypeScript)

## Project Structure

```
src/
├── routes/
│   ├── +layout.svelte          # Global layout (Navbar, Footer, CubeLoader)
│   ├── +layout.server.js       # Global data (site settings from Sanity)
│   ├── +page.svelte             # Landing page
│   ├── blog/                    # Blog listing + [slug] detail
│   ├── news/                    # News listing + [id] detail
│   ├── leadership/              # Leadership team page
│   └── api/posts/               # API endpoint
├── lib/
│   ├── components/
│   │   ├── landing/             # Hero, SchoolStory, WhatsHappening, CallToAction
│   │   ├── layout/              # Navbar, Footer, MobileMenu
│   │   └── shared/              # SEO, SanityImage, CubeLoader, ScrollReveal
│   ├── sanity/                  # Client, config, image builder, GROQ queries
│   └── utils/                   # Constants, date formatting
└── app.css                      # Tailwind theme (accent-yellow, accent-blue, bg-page)
```

## Coding Conventions

- **Svelte 5 runes**: Use `$props()`, `$state()`, `$derived()`, `$effect()` — no legacy `export let` or `$:` syntax
- **Component naming**: PascalCase (e.g., `CubeLoader.svelte`), organized by feature folder
- **Data fetching**: Server-side `load()` functions in `+page.server.js` / `+layout.server.js`
- **Styling**: Tailwind utility classes only; custom colors via `@theme` variables (`accent-yellow`, `accent-blue`, `bg-page`, `bg-card`)
- **Responsive**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints
- **No test/lint scripts configured** — manual verification via `pnpm dev`

## Environment Variables

Sanity credentials are configured in `.env` files (`VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`). See `.env.example` for reference.
