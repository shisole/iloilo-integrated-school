# Alumni Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a new `/alumni` page with tabbed Officers and Spotlights sections, powered by Sanity CMS.

**Architecture:** New SvelteKit route at `/alumni` with server-side Sanity data fetching. Two GROQ queries load officers and spotlights. Client-side tab switching between Officers (three grouped categories) and Spotlights (card grid). Components follow existing LeaderCard pattern.

**Tech Stack:** SvelteKit 2, Svelte 5 (runes), Tailwind CSS 4, Sanity CMS (GROQ)

---

### Task 1: Add GROQ Queries

**Files:**
- Modify: `src/lib/sanity/queries.js`

**Step 1: Add alumni officer and spotlight queries**

Add these two exports at the bottom of `src/lib/sanity/queries.js`:

```javascript
export const alumniOfficersQuery = `*[_type == "alumniOfficer"] | order(
  select(
    category == "executive" => 0,
    category == "business" => 1,
    category == "batch" => 2
  ) asc,
  order asc
){
	_id,
	name,
	role,
	category,
	photo,
	batchYear,
	order
}`;

export const alumniSpotlightsQuery = `*[_type == "alumniSpotlight"] | order(order asc){
	_id,
	name,
	photo,
	batch,
	quote,
	order
}`;
```

**Step 2: Verify no syntax errors**

Run: `pnpm build`
Expected: Build succeeds (queries are just strings, no runtime impact yet)

**Step 3: Commit**

```bash
git add src/lib/sanity/queries.js
git commit -m "feat(alumni): add GROQ queries for officers and spotlights"
```

---

### Task 2: Add Navigation Links

**Files:**
- Modify: `src/lib/components/layout/Navbar.svelte`
- Modify: `src/lib/components/layout/MobileMenu.svelte`

**Step 1: Add Alumni to desktop nav**

In `src/lib/components/layout/Navbar.svelte`, insert `{ href: '/alumni', label: 'Alumni' }` into the `navLinks` array between Gallery and Admissions:

```javascript
const navLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/news', label: 'News' },
	{ href: '/blog', label: 'Blog' },
	{ href: '/gallery', label: 'Gallery' },
	{ href: '/alumni', label: 'Alumni' },
	{ href: '/admissions', label: 'Admissions' },
	{ href: '/contact', label: 'Contact' }
];
```

**Step 2: Add Alumni to mobile nav**

In `src/lib/components/layout/MobileMenu.svelte`, make the same change to the `navLinks` array:

```javascript
const navLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/news', label: 'News' },
	{ href: '/blog', label: 'Blog' },
	{ href: '/gallery', label: 'Gallery' },
	{ href: '/alumni', label: 'Alumni' },
	{ href: '/admissions', label: 'Admissions' },
	{ href: '/contact', label: 'Contact' }
];
```

**Step 3: Verify navigation renders**

Run: `pnpm dev`
Check: Visit any page, confirm "Alumni" appears in both desktop and mobile nav between Gallery and Admissions. Click it — should 404 for now (route doesn't exist yet).

**Step 4: Commit**

```bash
git add src/lib/components/layout/Navbar.svelte src/lib/components/layout/MobileMenu.svelte
git commit -m "feat(alumni): add Alumni link to navigation"
```

---

### Task 3: Create OfficerCard Component

**Files:**
- Create: `src/lib/components/alumni/OfficerCard.svelte`

**Step 1: Create the component**

Based on `src/lib/components/leadership/LeaderCard.svelte` but without the bio toggle. Create `src/lib/components/alumni/OfficerCard.svelte`:

```svelte
<script>
	import SanityImage from '$lib/components/shared/SanityImage.svelte';

	let { officer } = $props();
</script>

<div class="overflow-hidden rounded-2xl border border-gray-100 bg-card p-6 text-center shadow-sm transition hover:shadow-md">
	<!-- Photo -->
	<div class="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-accent-blue/20">
		{#if officer.photo}
			<SanityImage
				image={officer.photo}
				alt={officer.photo?.alt || officer.name}
				class="h-full w-full object-cover"
			/>
		{:else}
			<div class="flex h-full w-full items-center justify-center bg-accent-blue/10">
				<svg class="h-12 w-12 text-accent-blue/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
				</svg>
			</div>
		{/if}
	</div>

	<!-- Info -->
	<h3 class="text-lg font-bold text-gray-900">{officer.name}</h3>
	<p class="text-sm font-medium text-accent-blue-dark">{officer.role}</p>
</div>
```

**Step 2: Commit**

```bash
git add src/lib/components/alumni/OfficerCard.svelte
git commit -m "feat(alumni): create OfficerCard component"
```

---

### Task 4: Create BatchRepTable Component

**Files:**
- Create: `src/lib/components/alumni/BatchRepTable.svelte`

**Step 1: Create the component**

This component receives an array of batch rep officers and renders them as a compact table. Create `src/lib/components/alumni/BatchRepTable.svelte`:

```svelte
<script>
	let { officers = [] } = $props();

	// Group by batchYear, then sort by year ascending
	let rows = $derived(() => {
		const grouped = {};
		for (const officer of officers) {
			const year = officer.batchYear || 'Unknown';
			if (!grouped[year]) grouped[year] = [];
			grouped[year].push(officer.name);
		}
		return Object.entries(grouped)
			.sort(([a], [b]) => Number(a) - Number(b))
			.map(([year, names]) => ({ year, names: names.join(', ') }));
	});
</script>

<div class="overflow-hidden rounded-2xl border border-gray-100 bg-card shadow-sm">
	<table class="w-full">
		<thead>
			<tr class="border-b border-gray-100 bg-gray-50">
				<th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Batch</th>
				<th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Representative(s)</th>
			</tr>
		</thead>
		<tbody>
			{#each rows() as row, i}
				<tr class="{i % 2 === 1 ? 'bg-gray-50/50' : ''} border-b border-gray-50 last:border-b-0">
					<td class="px-6 py-3 text-sm font-semibold text-accent-blue-dark">{row.year}</td>
					<td class="px-6 py-3 text-sm text-gray-700">{row.names || '—'}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
```

**Step 2: Commit**

```bash
git add src/lib/components/alumni/BatchRepTable.svelte
git commit -m "feat(alumni): create BatchRepTable component"
```

---

### Task 5: Create SpotlightCard Component

**Files:**
- Create: `src/lib/components/alumni/SpotlightCard.svelte`

**Step 1: Create the component**

Square photo with rounded corners (not circular — to differentiate from officers). Create `src/lib/components/alumni/SpotlightCard.svelte`:

```svelte
<script>
	import SanityImage from '$lib/components/shared/SanityImage.svelte';

	let { spotlight } = $props();
</script>

<div class="overflow-hidden rounded-2xl border border-gray-100 bg-card shadow-sm transition hover:shadow-md">
	<!-- Photo -->
	<div class="aspect-square w-full overflow-hidden bg-gray-100">
		{#if spotlight.photo}
			<SanityImage
				image={spotlight.photo}
				alt={spotlight.photo?.alt || spotlight.name}
				class="h-full w-full object-cover"
			/>
		{:else}
			<div class="flex h-full w-full items-center justify-center bg-accent-blue/10">
				<svg class="h-16 w-16 text-accent-blue/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
				</svg>
			</div>
		{/if}
	</div>

	<!-- Info -->
	<div class="p-5">
		<h3 class="text-lg font-bold text-gray-900">{spotlight.name}</h3>
		{#if spotlight.batch}
			<p class="mt-1 text-sm font-medium text-accent-blue-dark">Batch {spotlight.batch}</p>
		{/if}
		{#if spotlight.quote}
			<p class="mt-3 text-sm leading-relaxed text-gray-600 italic">"{spotlight.quote}"</p>
		{/if}
	</div>
</div>
```

**Step 2: Commit**

```bash
git add src/lib/components/alumni/SpotlightCard.svelte
git commit -m "feat(alumni): create SpotlightCard component"
```

---

### Task 6: Create Server-Side Data Loader

**Files:**
- Create: `src/routes/alumni/+page.server.js`

**Step 1: Create the load function**

Follows the existing pattern from `src/routes/about/+page.server.js` — parallel Sanity queries with graceful degradation. Create `src/routes/alumni/+page.server.js`:

```javascript
import { getClient } from '$lib/sanity/client.js';
import { alumniOfficersQuery, alumniSpotlightsQuery } from '$lib/sanity/queries.js';

export async function load() {
	const client = getClient();
	if (!client) return { officers: [], spotlights: [] };

	try {
		const [officers, spotlights] = await Promise.all([
			client.fetch(alumniOfficersQuery),
			client.fetch(alumniSpotlightsQuery)
		]);
		return {
			officers: officers || [],
			spotlights: spotlights || []
		};
	} catch {
		return { officers: [], spotlights: [] };
	}
}
```

**Step 2: Commit**

```bash
git add src/routes/alumni/+page.server.js
git commit -m "feat(alumni): add server-side data loader"
```

---

### Task 7: Create Alumni Page

**Files:**
- Create: `src/routes/alumni/+page.svelte`

**Step 1: Create the page component**

This is the main page that ties everything together — tabs, officers sections, spotlights grid. Create `src/routes/alumni/+page.svelte`:

```svelte
<script>
	import SEO from '$lib/components/shared/SEO.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';
	import OfficerCard from '$lib/components/alumni/OfficerCard.svelte';
	import BatchRepTable from '$lib/components/alumni/BatchRepTable.svelte';
	import SpotlightCard from '$lib/components/alumni/SpotlightCard.svelte';

	let { data } = $props();
	let officers = $derived(data.officers);
	let spotlights = $derived(data.spotlights);

	let activeTab = $state('officers');

	// Group officers by category
	let executive = $derived(officers.filter((o) => o.category === 'executive'));
	let business = $derived(officers.filter((o) => o.category === 'business'));
	let batch = $derived(officers.filter((o) => o.category === 'batch'));

	const tabs = [
		{ id: 'officers', label: 'Officers' },
		{ id: 'spotlights', label: 'Spotlights' }
	];
</script>

<SEO title="Alumni" description="Meet the IIS Alumni Club officers and discover stories from our distinguished alumni community." />

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<Breadcrumb items={[{ label: 'Alumni' }]} />
		<SectionHeading title="Alumni" subtitle="IIS Alumni Club" />

		<!-- Tabs -->
		<div class="mt-10 flex justify-center gap-2">
			{#each tabs as tab}
				<button
					type="button"
					onclick={() => (activeTab = tab.id)}
					class="rounded-full px-6 py-2.5 text-sm font-medium transition-colors {activeTab === tab.id
						? 'bg-accent-blue text-white shadow-sm'
						: 'text-gray-600 hover:bg-gray-100'}"
				>
					{tab.label}
				</button>
			{/each}
		</div>

		<!-- Officers Tab -->
		{#if activeTab === 'officers'}
			<div class="mt-12">
				<!-- Executive Officers -->
				<ScrollReveal>
					{#snippet children()}
						<div>
							<h3 class="text-2xl font-bold text-gray-900">Executive Officers</h3>
							<div class="mt-2 h-1 w-12 rounded-full bg-accent-yellow"></div>
							{#if executive.length > 0}
								<div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
									{#each executive as officer}
										<OfficerCard {officer} />
									{/each}
								</div>
							{:else}
								<p class="mt-6 text-gray-500">Officer information coming soon.</p>
							{/if}
						</div>
					{/snippet}
				</ScrollReveal>

				<!-- Business Managers -->
				<ScrollReveal>
					{#snippet children()}
						<div class="mt-16">
							<h3 class="text-2xl font-bold text-gray-900">Business Managers</h3>
							<div class="mt-2 h-1 w-12 rounded-full bg-accent-yellow"></div>
							{#if business.length > 0}
								<div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
									{#each business as officer}
										<OfficerCard {officer} />
									{/each}
								</div>
							{:else}
								<p class="mt-6 text-gray-500">Business manager information coming soon.</p>
							{/if}
						</div>
					{/snippet}
				</ScrollReveal>

				<!-- Batch Representatives -->
				<ScrollReveal>
					{#snippet children()}
						<div class="mt-16">
							<h3 class="text-2xl font-bold text-gray-900">Batch Representatives</h3>
							<div class="mt-2 h-1 w-12 rounded-full bg-accent-yellow"></div>
							{#if batch.length > 0}
								<div class="mt-8">
									<BatchRepTable officers={batch} />
								</div>
							{:else}
								<p class="mt-6 text-gray-500">Batch representative information coming soon.</p>
							{/if}
						</div>
					{/snippet}
				</ScrollReveal>
			</div>
		{/if}

		<!-- Spotlights Tab -->
		{#if activeTab === 'spotlights'}
			<div class="mt-12">
				{#if spotlights.length > 0}
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{#each spotlights as spotlight}
							<ScrollReveal>
								{#snippet children()}
									<SpotlightCard {spotlight} />
								{/snippet}
							</ScrollReveal>
						{/each}
					</div>
				{:else}
					<div class="mt-8 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
						<svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
						</svg>
						<p class="mt-4 text-lg font-medium text-gray-500">Alumni spotlights coming soon</p>
						<p class="mt-1 text-sm text-gray-400">Check back later for stories from our distinguished alumni.</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</section>
```

**Step 2: Verify the page renders**

Run: `pnpm dev`
Check:
1. Visit `/alumni` — page loads with Breadcrumb, SectionHeading, tabs
2. Officers tab is active by default, shows empty states for all 3 categories (no Sanity data yet)
3. Click "Spotlights" tab — shows empty state with star icon
4. Click "Officers" tab — switches back
5. Navigation link is highlighted when on `/alumni`
6. Mobile nav shows Alumni link and works

**Step 3: Commit**

```bash
git add src/routes/alumni/+page.svelte
git commit -m "feat(alumni): create Alumni page with tabs, officers, and spotlights"
```

---

### Task 8: Final Verification

**Step 1: Run production build**

Run: `pnpm build`
Expected: Build succeeds with no errors.

**Step 2: Preview production build**

Run: `pnpm preview`
Check: Visit `/alumni`, verify all sections render correctly in production mode.

**Step 3: Verify responsive design**

Check in browser dev tools:
- Mobile (375px): 2-col officer grid, 1-col spotlight grid, tabs fit
- Tablet (768px): 3-col officer grid, 2-col spotlight grid
- Desktop (1024px+): 5-col executive grid, 3-col business grid, 3-col spotlight grid
- Batch rep table is readable at all sizes

**Step 4: Final commit (if any tweaks needed)**

```bash
git add -A
git commit -m "feat(alumni): finalize Alumni page implementation"
```

---

## Notes

- **Sanity schemas** are not in this repo — they live in the Sanity Studio project. The `alumniOfficer` and `alumniSpotlight` content types need to be created there separately. Until then, the page gracefully shows empty states.
- **No tests** — this project doesn't have a test suite. Verification is manual via `pnpm dev` and `pnpm build`.
- The page works immediately with empty states and will populate automatically once Sanity content is added.
