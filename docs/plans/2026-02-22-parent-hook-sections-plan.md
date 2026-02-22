# Parent Hook Sections — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add three new homepage sections (Why Choose IIS, By the Numbers, What Parents Say) after the Hero to hook prospective parents.

**Architecture:** Three new Svelte landing components with hardcoded fallback data, overridable from Sanity CMS. New GROQ fields on siteSettingsQuery. Components placed between Hero and GalleryPreview on the home page. Count-up animation in stats section via IntersectionObserver.

**Tech Stack:** SvelteKit 2, Svelte 5 (runes), Tailwind CSS 4, Sanity CMS (GROQ queries)

---

### Task 1: Add Sanity Query Fields

**Files:**
- Modify: `src/lib/sanity/queries.js:1-20`

**Step 1: Add new fields to siteSettingsQuery**

In `src/lib/sanity/queries.js`, add three new fields after the `anniversaryTagline` line (line 19), before the closing `}`:

```javascript
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
	schoolName,
	tagline,
	foundedYear,
	address,
	phone,
	email,
	facebookUrl,
	enrollmentUrl,
	heroImages,
	schoolStory,
	milestones[]{ year, title, description, image },
	missionText,
	missionImage,
	visionText,
	visionImage,
	coreValues[]{ title, description },
	founderTribute{ name, role, photo, quote, description },
	anniversaryTagline,
	whyChooseUs[]{ title, description },
	schoolStats[]{ value, label },
	testimonials[]{ quote, name, role }
}`;
```

**Step 2: Verify dev server still works**

Run: `pnpm dev`
Expected: Dev server starts without errors. New fields return `undefined`/`null` until populated in Sanity Studio.

**Step 3: Commit**

```bash
git add src/lib/sanity/queries.js
git commit -m "feat: add whyChooseUs, schoolStats, testimonials to Sanity query"
```

---

### Task 2: Create WhyChooseIIS Component

**Files:**
- Create: `src/lib/components/landing/WhyChooseIIS.svelte`

**Step 1: Create the component**

Create `src/lib/components/landing/WhyChooseIIS.svelte`:

```svelte
<script>
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';

	let { settings = null } = $props();

	const fallbackReasons = [
		{
			title: '25 Years of Trust',
			description: 'A DepEd-recognized school serving Iloilo families since 2001.'
		},
		{
			title: 'Every Child Seen',
			description: 'Small class sizes where no child is left behind or unseen.'
		},
		{
			title: 'Values Over Scores',
			description: 'Character, kindness, and resilience at the core of learning.'
		},
		{
			title: 'A Resilient Community',
			description: 'Survived storms and a pandemic — still standing, still dreaming.'
		}
	];

	const icons = [
		// Shield/trust
		'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />',
		// Heart/care
		'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />',
		// Star/values
		'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />',
		// Users/community
		'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />'
	];

	let reasons = $derived(
		settings?.whyChooseUs?.length ? settings.whyChooseUs : fallbackReasons
	);
</script>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading
			title="Why Choose IIS?"
			subtitle="What makes our school a home for your child"
		/>

		<div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each reasons as reason, i}
				<ScrollReveal delay={i * 100}>
					{#snippet children()}
						<div class="rounded-2xl border border-gray-100 bg-card p-6 text-center shadow-sm">
							<div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-blue/10">
								<svg class="h-7 w-7 text-accent-blue-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									{@html icons[i % icons.length]}
								</svg>
							</div>
							<h3 class="mb-2 text-lg font-bold text-gray-900">{reason.title}</h3>
							<p class="text-sm text-gray-600">{reason.description}</p>
						</div>
					{/snippet}
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>
```

**Step 2: Verify no syntax errors**

Run: `pnpm dev`
Expected: Dev server compiles without errors (component not yet used on any page).

**Step 3: Commit**

```bash
git add src/lib/components/landing/WhyChooseIIS.svelte
git commit -m "feat: create WhyChooseIIS component with value proposition cards"
```

---

### Task 3: Create ByTheNumbers Component

**Files:**
- Create: `src/lib/components/landing/ByTheNumbers.svelte`

**Step 1: Create the component**

Create `src/lib/components/landing/ByTheNumbers.svelte`:

```svelte
<script>
	let { settings = null } = $props();

	const fallbackStats = [
		{ value: '25+', label: 'Years of Excellence' },
		{ value: '500+', label: 'Graduates' },
		{ value: '30+', label: 'Dedicated Teachers' },
		{ value: 'DepEd', label: 'Recognized' }
	];

	let stats = $derived(
		settings?.schoolStats?.length ? settings.schoolStats : fallbackStats
	);

	let sectionEl = $state(null);
	let hasAnimated = $state(false);

	// Parse numeric value and suffix from stat value string (e.g., "25+" -> { num: 25, suffix: "+" })
	function parseStatValue(val) {
		const match = String(val).match(/^(\d+)(.*)$/);
		if (match) {
			return { num: parseInt(match[1], 10), suffix: match[2] };
		}
		return { num: null, suffix: '', text: val };
	}

	let animatedValues = $state(stats.map(() => 0));

	$effect(() => {
		if (!sectionEl) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasAnimated) {
					hasAnimated = true;
					animateCountUp();
					observer.unobserve(sectionEl);
				}
			},
			{ threshold: 0.3 }
		);

		observer.observe(sectionEl);

		return () => observer.disconnect();
	});

	function animateCountUp() {
		const duration = 1500;
		const startTime = performance.now();

		function tick(now) {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);

			animatedValues = stats.map((stat) => {
				const parsed = parseStatValue(stat.value);
				if (parsed.num !== null) {
					return Math.round(eased * parsed.num);
				}
				return 0;
			});

			if (progress < 1) {
				requestAnimationFrame(tick);
			}
		}

		requestAnimationFrame(tick);
	}
</script>

<section bind:this={sectionEl} class="bg-accent-blue/5 py-16 md:py-20">
	<div class="mx-auto max-w-5xl px-6">
		<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
			{#each stats as stat, i}
				{@const parsed = parseStatValue(stat.value)}
				<div class="text-center">
					<p class="text-4xl font-extrabold text-accent-blue-dark md:text-5xl">
						{#if parsed.num !== null}
							{hasAnimated ? animatedValues[i] : 0}{parsed.suffix}
						{:else}
							{stat.value}
						{/if}
					</p>
					<p class="mt-2 text-sm font-medium text-gray-600">{stat.label}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
```

**Step 2: Verify no syntax errors**

Run: `pnpm dev`
Expected: Dev server compiles without errors (component not yet used on any page).

**Step 3: Commit**

```bash
git add src/lib/components/landing/ByTheNumbers.svelte
git commit -m "feat: create ByTheNumbers component with animated count-up stats"
```

---

### Task 4: Create WhatParentsSay Component

**Files:**
- Create: `src/lib/components/landing/WhatParentsSay.svelte`

**Step 1: Create the component**

Create `src/lib/components/landing/WhatParentsSay.svelte`:

```svelte
<script>
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';

	let { settings = null } = $props();

	const fallbackTestimonials = [
		{
			quote: 'IIS gave my child a second home. The teachers truly care — they know every student by name.',
			name: 'Maria S.',
			role: 'Parent of Grade 3 student'
		},
		{
			quote: 'What I love about IIS is the values they teach. My child comes home kinder, more confident, and excited to learn.',
			name: 'Jose R.',
			role: 'Parent of Grade 5 student'
		},
		{
			quote: "We chose IIS because of their heart. Twenty-five years later, they still treat every family like their own.",
			name: 'Ana L.',
			role: 'Parent of Grade 1 student'
		}
	];

	let testimonials = $derived(
		settings?.testimonials?.length ? settings.testimonials : fallbackTestimonials
	);
</script>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading
			title="What Parents Say"
			subtitle="Hear from families who call IIS home"
		/>

		<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each testimonials as testimonial, i}
				<ScrollReveal delay={i * 100}>
					{#snippet children()}
						<div class="rounded-2xl border border-gray-100 bg-card p-8 shadow-sm">
							<svg class="mb-4 h-8 w-8 text-accent-yellow" fill="currentColor" viewBox="0 0 24 24">
								<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
							</svg>
							<blockquote class="mb-6 text-gray-700 italic">
								"{testimonial.quote}"
							</blockquote>
							<div>
								<p class="font-bold text-gray-900">{testimonial.name}</p>
								<p class="text-sm text-gray-500">{testimonial.role}</p>
							</div>
						</div>
					{/snippet}
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>
```

**Step 2: Verify no syntax errors**

Run: `pnpm dev`
Expected: Dev server compiles without errors (component not yet used on any page).

**Step 3: Commit**

```bash
git add src/lib/components/landing/WhatParentsSay.svelte
git commit -m "feat: create WhatParentsSay component with testimonial cards"
```

---

### Task 5: Wire All Three Components into Home Page

**Files:**
- Modify: `src/routes/+page.svelte:1-30`

**Step 1: Add imports and place components**

Update `src/routes/+page.svelte` to this:

```svelte
<script>
	import SEO from '$lib/components/shared/SEO.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
	import WhyChooseIIS from '$lib/components/landing/WhyChooseIIS.svelte';
	import ByTheNumbers from '$lib/components/landing/ByTheNumbers.svelte';
	import WhatParentsSay from '$lib/components/landing/WhatParentsSay.svelte';
	import SchoolStory from '$lib/components/landing/SchoolStory.svelte';
	import OurHeart from '$lib/components/landing/OurHeart.svelte';
	import WhatsHappening from '$lib/components/landing/WhatsHappening.svelte';
	import CallToAction from '$lib/components/landing/CallToAction.svelte';
	import GalleryPreview from '$lib/components/landing/GalleryPreview.svelte';
	import FacebookFeed from '$lib/components/landing/FacebookFeed.svelte';
	import FindUs from '$lib/components/landing/FindUs.svelte';

	let { data } = $props();
</script>

<SEO
	title="Iloilo Integrated School Inc."
	description="Quality elementary education in Iloilo since 2001. Nurturing young minds through holistic learning, values formation, and creative expression."
/>

<Hero settings={data.settings} />
<WhyChooseIIS settings={data.settings} />
<ByTheNumbers settings={data.settings} />
<WhatParentsSay settings={data.settings} />
{#if data.events.length > 0}
	<WhatsHappening events={data.events} pastEvents={data.pastEvents} />
{/if}
<GalleryPreview galleries={data.galleryPreview} />
<FacebookFeed />
<SchoolStory settings={data.settings} />
<OurHeart settings={data.settings} />
<CallToAction settings={data.settings} />
<FindUs settings={data.settings} />
```

**Step 2: Verify in browser**

Run: `pnpm dev` and navigate to the home page.
Expected: After the Hero, three new sections appear in order:
1. "Why Choose IIS?" — 4 icon cards in a row
2. Stats bar with animated count-up numbers on blue background
3. "What Parents Say" — 3 testimonial cards with quote icons

**Step 3: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "feat: add parent hook sections to home page layout"
```

---

### Task 6: Update Hero scroll indicator target

**Files:**
- Modify: `src/lib/components/landing/Hero.svelte:202`

**Step 1: Update scroll target**

The Hero's scroll-down button currently scrolls to `#whats-happening` which may not exist. Update it to scroll to the next section that always exists.

In `src/lib/components/landing/Hero.svelte`, change the onclick on line 202 from:

```javascript
document.getElementById('whats-happening')?.scrollIntoView({ behavior: 'smooth' })
```

to:

```javascript
document.getElementById('why-choose-iis')?.scrollIntoView({ behavior: 'smooth' })
```

Also add `id="why-choose-iis"` to the WhyChooseIIS component's `<section>` tag. In `src/lib/components/landing/WhyChooseIIS.svelte`, change:

```html
<section class="py-20 md:py-28">
```

to:

```html
<section id="why-choose-iis" class="py-20 md:py-28">
```

And update the Hero's aria-label from `"Scroll to What's Happening"` to `"Scroll down"`.

**Step 2: Verify scroll works**

Run: `pnpm dev`, click the scroll indicator arrow on the Hero.
Expected: Smooth scrolls to the "Why Choose IIS?" section.

**Step 3: Commit**

```bash
git add src/lib/components/landing/Hero.svelte src/lib/components/landing/WhyChooseIIS.svelte
git commit -m "fix: update hero scroll target to why-choose-iis section"
```

---

### Task 7: Build Verification

**Step 1: Run production build**

Run: `pnpm build`
Expected: Build completes successfully with no errors.

**Step 2: Preview production build**

Run: `pnpm preview`
Expected: Home page renders correctly with all three new sections. Count-up animation triggers on scroll. All sections show fallback data.

**Step 3: Final commit (if any adjustments needed)**

If any fixes were needed during build verification, commit them.
