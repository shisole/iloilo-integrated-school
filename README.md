# Iloilo Integrated School Inc.

The official website for Iloilo Integrated School Inc. (IIS), an elementary school in Iloilo, Philippines founded in 2001. Built with SvelteKit and powered by Sanity CMS.

## Tech Stack

- **Framework:** SvelteKit 2 + Svelte 5 (runes syntax)
- **Styling:** Tailwind CSS 4
- **CMS:** Sanity.io
- **Photo Gallery:** Keepsly API
- **Deployment:** Vercel
- **Package Manager:** pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the project root:

```bash
PUBLIC_SANITY_PROJECT_ID=your_project_id_here
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2025-02-06
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
pnpm preview  # preview the production build
```

## Project Structure

```
src/
├── routes/                # SvelteKit file-based routing
│   ├── about/             # About us (mission, vision, leadership, FAQ)
│   ├── admissions/        # Enrollment information
│   ├── alumni/            # Alumni officers & spotlights
│   ├── blog/              # Blog listing & detail pages
│   ├── calendar/          # Event calendar
│   ├── contact/           # Contact form
│   ├── faq/               # Frequently asked questions
│   ├── gallery/           # Photo gallery with infinite scroll
│   ├── news/              # News & events
│   ├── testimonials/      # Parent testimonials
│   └── api/               # Internal API endpoints
│       ├── gallery/       # Paginated photo endpoint
│       └── posts/         # Paginated blog posts endpoint
│
├── lib/
│   ├── components/        # Svelte components
│   │   ├── alumni/        # Alumni page components
│   │   ├── blog/          # Blog components
│   │   ├── gallery/       # PhotoGrid & PhotoLightbox
│   │   ├── landing/       # Homepage sections
│   │   ├── layout/        # Navbar, Footer, MobileMenu
│   │   ├── leadership/    # Leadership grid & cards
│   │   └── shared/        # SEO, ScrollReveal, SanityImage, etc.
│   │
│   ├── sanity/            # Sanity CMS integration
│   │   ├── client.js      # Sanity client setup
│   │   ├── queries.js     # GROQ queries
│   │   └── image.js       # Image URL builder
│   │
│   └── utils/             # Utilities
│       ├── constants.js   # App constants
│       ├── keepsly.js     # Photo API integration
│       └── formatDate.js  # Date formatting
│
└── app.css                # Global styles & Tailwind theme
```

## Features

- **Landing page** with hero carousel, stats, testimonials, event highlights, and gallery preview
- **Blog** with rich text rendering via Portable Text
- **News & Events** with countdown timers and photo galleries
- **Photo Gallery** with cursor-based pagination and lightbox viewer
- **Alumni** section with officer listings and spotlight stories
- **About** page with mission/vision, leadership directory, and FAQs
- **Admissions** page with enrollment information
- **SEO** with Open Graph tags and schema.org JSON-LD
- **Responsive** mobile-first design with scroll animations
