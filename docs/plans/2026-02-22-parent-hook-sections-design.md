# Parent Hook Sections — Design Document

**Goal:** Add three new sections after the Hero to hook prospective parents browsing the homepage. These sections answer "Why this school?", prove credibility with numbers, and build trust through parent voices.

**Position:** Between Hero and GalleryPreview on the homepage.

---

## Section 1: Why Choose IIS? — Value Proposition Cards

**Component:** `WhyChooseIIS.svelte`
**Background:** White/light, contrasts with Hero above
**Layout:** 4 cards — 1 col mobile, 2 col tablet, 4 col desktop

Each card has:
- SVG icon (no emojis)
- Bold title
- 1-line description

Fallback cards:
1. **25 Years of Trust** — "A DepEd-recognized school serving Iloilo families since 2001."
2. **Every Child Seen** — "Small class sizes where no child is left behind or unseen."
3. **Values Over Scores** — "Character, kindness, and resilience at the core of learning."
4. **A Resilient Community** — "Survived storms and a pandemic — still standing, still dreaming."

**Data:** Hardcoded fallbacks, overridable from Sanity via `whyChooseUs[]{ title, description }` on siteSettings.

---

## Section 2: By the Numbers — Stats Bar

**Component:** `ByTheNumbers.svelte`
**Background:** `bg-accent-blue/5` for visual separation
**Layout:** 4 stats — 2x2 grid mobile, horizontal row desktop

Each stat:
- Large bold value (e.g., "25+")
- Label below (e.g., "Years of Excellence")
- Animated count-up on scroll via IntersectionObserver

Fallback stats:
1. **25+** Years of Excellence
2. **500+** Graduates
3. **30+** Dedicated Teachers
4. **DepEd** Recognized

**Data:** Hardcoded fallbacks, overridable from Sanity via `schoolStats[]{ value, label }` on siteSettings.

---

## Section 3: What Parents Say — Testimonials

**Component:** `WhatParentsSay.svelte`
**Background:** White/card
**Layout:** 2-3 cards — 1 col mobile, 3 col desktop

Each testimonial:
- Quote text (italic)
- Parent name + role (e.g., "Parent of Grade 4 student")
- No photo

Fallback testimonials (placeholder):
1. "IIS gave my child a second home. The teachers truly care — they know every student by name." — Maria S., Parent of Grade 3 student
2. "What I love about IIS is the values they teach. My child comes home kinder, more confident, and excited to learn." — Jose R., Parent of Grade 5 student
3. "We chose IIS because of their heart. Twenty-five years later, they still treat every family like their own." — Ana L., Parent of Grade 1 student

**Data:** Hardcoded fallbacks, overridable from Sanity via `testimonials[]{ quote, name, role }` on siteSettings.

---

## Updated Homepage Flow

```
Hero
→ Why Choose IIS? (NEW)
→ By the Numbers (NEW)
→ What Parents Say (NEW)
→ GalleryPreview
→ FacebookFeed
→ SchoolStory (timeline)
→ OurHeart (values + founder)
→ CallToAction
→ FindUs
```

---

## Sanity Query Changes

Add to `siteSettingsQuery`:
```
whyChooseUs[]{ title, description },
schoolStats[]{ value, label },
testimonials[]{ quote, name, role }
```

All three use fallback arrays when Sanity fields are empty/undefined.

---

## Tech Notes

- All components use Svelte 5 runes (`$props`, `$state`, `$derived`)
- Tailwind CSS 4 utility classes only
- ScrollReveal for fade-in animations
- Count-up animation in ByTheNumbers uses IntersectionObserver + requestAnimationFrame
- No new API routes or external data sources needed
