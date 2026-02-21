# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- **Photo API**: Keepsly (cursor-based pagination at `https://keepsly.vercel.app/api/photos`)
- **Deployment**: Vercel (adapter-auto)
- **Package Manager**: pnpm
- **Language**: JavaScript (no TypeScript)

## Architecture Overview

### Data Sources

**Sanity CMS** (`src/lib/sanity/`)
- `client.js` — Validates project ID with regex, returns `null` if unconfigured (graceful degradation)
- `queries.js` — All GROQ queries centralized here
- `image.js` — Image URL builder using `@sanity/image-url`
- Content: site settings, blog posts, news/events, leadership, FAQs, timeline milestones

**Keepsly API** (`src/lib/utils/keepsly.js`)
- External photo gallery service with cursor-based pagination
- `fetchKeepslyPhotos(eventId, { limit, cursor })` — Direct API call with pagination
- `fetchKeepslyPhotoPaged(eventId, cursor, limit)` — Returns `{ photos, totalPhotos, nextCursor, hasMore }`
- Response maps `data.total` → `totalPhotos` for consistency

### Gallery Pagination Pattern

**Server-side pagination** (not client-side slicing):
- Initial SSR: First 12 photos + `totalPhotos` + `nextCursor` from Keepsly API
- Client loads more via `/api/gallery?eventId=xxx&cursor=yyy`
- `PhotoGrid.svelte` has dual modes:
  - **Server mode**: `eventId` provided → fetch from API, track cursor, infinite scroll
  - **UI mode**: No `eventId` → progressive reveal from `photos` prop (backward compat for news detail)

### Image Optimization

**Hero Carousel** (`src/lib/components/landing/Hero.svelte`):
- Loads only current slide image (1920px, quality 80)
- Preloads next slide via `<svelte:head><link rel="preload">`
- Uses `{#key currentIndex}` to swap images without loading all upfront

**Sanity Images**:
- All use `urlFor(image).width(N).quality(80).url()` pattern
- Common sizes: 480px (timeline), 960px (content), 1920px (hero/detail)

### Component Patterns

**Landing Page Composition** (`src/routes/+page.svelte`):
```
Hero → WhatsHappening → GalleryPreview → FacebookFeed → SchoolStory → CallToAction
```

**Layout** (`src/routes/+layout.svelte`):
- Global: Navbar, Footer, BackToTop, CubeLoader (for initial page load)
- `+layout.server.js` fetches site settings from Sanity (available as `data.settings` in all pages)

**Shared Components** (`src/lib/components/shared/`):
- `SEO.svelte` — Meta tags, Open Graph, schema.org JSON-LD
- `SanityImage.svelte` — Responsive image wrapper for Sanity assets
- `ScrollReveal.svelte` — Intersection Observer for fade-in animations
- `CountdownTimer.svelte` — Real-time countdown for events

**PhotoGrid + PhotoLightbox Pattern**:
```svelte
<!-- Parent component -->
<PhotoGrid
  photos={initial12}
  eventId={id}           // Optional: enables server-fetch mode
  totalPhotos={87}       // Optional: for displaying count
  nextCursor={cursor}    // Optional: for pagination
  onphotoclick={(index, loadedPhotos) => openLightbox(loadedPhotos, index)}
/>

<PhotoLightbox
  photos={lightbox.photos}  // Receives dynamically-loaded photos from PhotoGrid
  currentIndex={lightbox.index}
  onclose={closeLightbox}
  onnavigate={(i) => lightbox.index = i}
/>
```

## Coding Conventions

**Svelte 5 Runes** (strict):
- `$props()` for component props (never `export let`)
- `$state()` for reactive state
- `$derived()` for computed values
- `$effect()` for side effects
- No legacy `$:` reactive statements

**Component Naming**:
- PascalCase files: `PhotoGrid.svelte`, `CallToAction.svelte`
- Organized by feature: `landing/`, `layout/`, `shared/`, `gallery/`, `blog/`

**Data Fetching**:
- Server-side in `+page.server.js` / `+layout.server.js` via `load()` functions
- API routes in `src/routes/api/` for client-side pagination/fetching
- Always handle `null` client gracefully (Sanity not configured)

**Styling**:
- Tailwind utility classes only (no CSS modules, no `<style>` blocks except for keyframes)
- Custom theme colors via `@theme` in `src/app.css`:
  - `accent-yellow` (#fefe9d), `accent-yellow-dark`
  - `accent-blue` (#9bb8f0), `accent-blue-dark`
  - `bg-page` (#f7fcfe), `bg-card` (white)
- Mobile-first: `sm:`, `md:`, `lg:` breakpoints

**Performance**:
- `loading="lazy"` on all gallery images
- Hero carousel: load only current slide, preload next
- Sanity images: specify width/quality via `urlFor()`
- Gallery pagination: 12 photos per page (`PHOTOS_PER_PAGE` constant)

## Environment Variables

```bash
PUBLIC_SANITY_PROJECT_ID=your_project_id_here
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2025-02-06
```

**Note**: All env vars must be prefixed with `PUBLIC_` to be accessible in client code (SvelteKit convention). The Sanity client gracefully returns `null` if project ID is invalid/missing.

## API Endpoints

**Internal APIs**:
- `GET /api/posts?page=N` — Paginated blog posts from Sanity
- `GET /api/gallery?eventId=xxx&cursor=yyy` — Paginated photos from Keepsly

**External APIs**:
- Keepsly: `GET https://keepsly.vercel.app/api/photos/{eventId}?limit=20&cursor=xxx`
  - Response: `{ photos: [...], eventName: "...", total: 87, nextCursor: "20" }`
  - `nextCursor` is `null` when no more photos
