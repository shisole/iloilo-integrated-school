# Missing Features Design

## Features

### 1. Contact Form
Add a contact form to the existing `/contact` page, below the info cards and above the map.

**Fields:** Name (required), Email (required, validated), Subject (optional), Message (required, textarea)

**Behavior:**
- Client-side validation with inline error messages
- Submit button disabled while fields are invalid
- On submit, show success message (no backend wired yet — simulate success)
- Form resets after successful submission

**File:** `src/routes/contact/+page.svelte` — add form section inline

### 2. 404 Page
Custom error page using SvelteKit's `+error.svelte` convention.

**Content:** School logo, "Page Not Found" heading, friendly message, "Go Home" button

**File:** `src/routes/+error.svelte`

### 3. Back-to-Top Button
Floating button in bottom-right corner, visible on all pages.

**Behavior:** Appears after scrolling 300px down. Smooth scrolls to top on click. Fade transition.

**Files:**
- `src/lib/components/shared/BackToTop.svelte` — the component
- `src/routes/+layout.svelte` — add component to global layout
