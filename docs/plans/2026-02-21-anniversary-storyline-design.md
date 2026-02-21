# Anniversary Storyline Content — Design

## Context

IIS is celebrating its 25th anniversary. A narration script from the celebration event contains rich historical data, core values, and founder tribute content. This design extracts that content for the website home page.

## Data Source

Anniversary celebration narration script covering: founding (2001), Typhoon Frank (2007), COVID pandemic (2020), founder Dr. Ronnie Samoro's passing (2023), and the 25th anniversary (2026).

## Changes

### 1. Enriched Timeline Milestones

Update fallback milestones in `SchoolStory.svelte` from 5 generic entries to 5 real ones:

| Year | Title | Description |
|------|-------|-------------|
| 2001 | The Birth of a Dream | Founded with 15 students and a handful of dedicated teachers. A promise that learning would be compassionate, that differences would be honored, and no child would be left unseen. |
| 2007 | Tested, But Not Broken | When Typhoon Frank came, the waters rose around the school. Much was lost, but faith remained. IIS rebuilt — not because it was easy, but because giving up was never an option. |
| 2020 | Surviving the Silence | Classrooms closed and the world paused. But the mission did not. IIS taught through screens, cared through distance, and kept doors open — not always in buildings, but always in spirit. |
| 2023 | Honoring Our Founder | IIS lost Dr. Ronnie Samoro — founder, mentor, and guiding light. He taught that education is love in action, and that a school is built not by walls, but by vision. His dream lives on in all of us. |
| 2026 | 25 Years of Hope | From 15 students to generations of dreamers, leaders, and achievers. Twenty-five years of courage, endurance, and a dream that learned to survive — and to move forward. |

### 2. New "Our Heart" Section

New component `OurHeart.svelte` placed between `SchoolStory` and `CallToAction`.

**Core Values Cards** (grid layout):
1. Compassion — "Every child deserves to be seen, to be guided, to be believed in."
2. Inclusivity — "A home for children who needed second chances. A home where every voice mattered."
3. Resilience — "We are the dream that endured storms. The school that survived silence."
4. Holistic Growth — "Every child is smart in many ways. True education is measured by kindness, resilience, and character."

**Founder Tribute Block:**
- Photo (from Sanity), name, role
- Quote: "Education is love in action. Leadership is service. A school is built not by walls, but by vision."
- Brief context about his legacy

**Anniversary Tagline:**
- "I am IIS. I am you. I am me. I am WE."

### 3. Sanity CMS Integration

**New fields on `siteSettings`:**
- `coreValues[]{ title, description }` — value cards
- `founderTribute{ name, role, photo, quote, description }` — founder info
- `anniversaryTagline` — string

**GROQ query update** in `queries.js`:
```
coreValues[]{ title, description },
founderTribute{ name, role, photo, quote, description },
anniversaryTagline
```

Fallback data hardcoded in `OurHeart.svelte` for when Sanity fields are not populated.

### 4. Home Page Layout Order

```
Hero → WhatsHappening → GalleryPreview → FacebookFeed → SchoolStory → OurHeart → CallToAction → FindUs
```

## Files Affected

- `src/lib/components/landing/SchoolStory.svelte` — update fallback milestones
- `src/lib/components/landing/OurHeart.svelte` — new component
- `src/routes/+page.svelte` — add OurHeart to layout
- `src/lib/sanity/queries.js` — add new fields to siteSettingsQuery
