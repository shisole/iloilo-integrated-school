# Alumni Page Design

## Overview

A new top-level Alumni page at `/alumni` that showcases the IIS Alumni Club. The page uses tabbed navigation to switch between two sections: Officers and Spotlights.

## Navigation

Alumni added as a top-level nav item between Gallery and Admissions in both Navbar and MobileMenu:

```
Home | About Us ▾ | News | Blog | Gallery | Alumni | Admissions | Contact
```

## Page Layout

- Breadcrumb: Home > Alumni
- SectionHeading: "Alumni" with subtitle "IIS Alumni Club"
- Tab bar: Officers (default) | Spotlights
- SEO component with meta tags

## Officers Tab

Three grouped sections with distinct visual treatments:

### Executive Officers (5 people)

- Reuses LeaderCard pattern: circular photo, name, role
- Grid: 2 cols mobile, 3 cols tablet, 5 cols desktop
- No bio toggle — just photo, name, position
- Members: President (Eienn Jae Corona), VP (Dea Mikaela Bañas), Secretary (Lian Gabrielle Bañas), Treasurer (Eunice Nicole Valderrama), Auditor (Grace Bernaldez Sison)

### Business Managers (3 people)

- Same LeaderCard style as Executive Officers
- Grid: 2 cols mobile, 3 cols desktop
- Members: Rian Glen Arriola, Mary Glanilyn Detoyato, Alwafi Altwirqi

### Batch Representatives (2005–2025)

- Compact table/list layout: Year | Name(s)
- Years with two reps show both names
- 2013 shown as vacant
- Clean card with alternating row backgrounds

Each category has a subheading with subtle divider between sections.

## Spotlights Tab

- Card grid: 1 col mobile, 2 cols tablet, 3 cols desktop
- Each card: square photo (rounded corners), name, batch year, short quote
- White card style with subtle shadow, matching site aesthetic
- ScrollReveal animation on each card
- Empty state: "Alumni spotlights coming soon" if none exist

## Tab Component Behavior

- Two pill-style tabs: active = `bg-accent-blue text-white`, inactive = `text-gray-600 hover:bg-gray-100`
- Client-side tab state via `$state()`, no URL changes
- Subtle fade transition on content switch

## Data Model (Sanity CMS)

### alumniOfficer

| Field     | Type   | Notes                                      |
|-----------|--------|--------------------------------------------|
| name      | string | Required                                   |
| photo     | image  | Optional                                   |
| role      | string | e.g. "President"                           |
| category  | string | "executive" \| "business" \| "batch"       |
| batchYear | string | Only for batch reps, e.g. "2021"           |
| order     | number | Sort order within category                 |

### alumniSpotlight

| Field | Type   | Notes                          |
|-------|--------|--------------------------------|
| name  | string | Required                       |
| photo | image  | Required                       |
| batch | string | e.g. "2009"                    |
| quote | text   | Short quote or achievement     |
| order | number | Manual sort order              |

## Data Fetching

- All data loaded server-side in `+page.server.js`
- Two GROQ queries: officers (sorted by category, then order) and spotlights (sorted by order)
- Small dataset, no client-side pagination needed

## Files to Create/Modify

### New Files
- `src/routes/alumni/+page.svelte` — Alumni page component
- `src/routes/alumni/+page.server.js` — Server-side data loading
- `src/lib/components/alumni/OfficerCard.svelte` — Officer card (based on LeaderCard)
- `src/lib/components/alumni/BatchRepTable.svelte` — Batch representatives table
- `src/lib/components/alumni/SpotlightCard.svelte` — Alumni spotlight card
- Sanity schema files for alumniOfficer and alumniSpotlight

### Modified Files
- `src/lib/sanity/queries.js` — Add alumni GROQ queries
- `src/lib/components/layout/Navbar.svelte` — Add Alumni nav link
- `src/lib/components/layout/MobileMenu.svelte` — Add Alumni mobile nav link
