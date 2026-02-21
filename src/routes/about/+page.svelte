<script>
	import { urlFor } from '$lib/sanity/image.js';
	import SEO from '$lib/components/shared/SEO.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';
	import LeaderGrid from '$lib/components/leadership/LeaderGrid.svelte';
	import PortableTextRenderer from '$lib/components/blog/PortableTextRenderer.svelte';
	import { slide } from 'svelte/transition';

	let { data } = $props();

	let settings = $derived(data.settings);
	let leaders = $derived(data.leaders || []);
	let faqs = $derived(data.faqs || []);

	let missionText = $derived(
		settings?.missionText ||
			'To provide quality education that nurtures the holistic development of every learner, fostering academic excellence, moral integrity, and social responsibility.'
	);
	let visionText = $derived(
		settings?.visionText ||
			'A leading educational institution that empowers students to become compassionate, innovative, and globally competitive individuals.'
	);
	let missionImageUrl = $derived(
		settings?.missionImage ? urlFor(settings.missionImage).width(960).quality(80).url() : null
	);
	let visionImageUrl = $derived(
		settings?.visionImage ? urlFor(settings.visionImage).width(960).quality(80).url() : null
	);

	// FAQ accordion state
	let openId = $state(null);
	const categories = ['General', 'Enrollment', 'Academics', 'School Life'];

	let groupedFaqs = $derived.by(() => {
		const groups = {};
		for (const faq of faqs) {
			const cat = faq.category || 'General';
			if (!groups[cat]) groups[cat] = [];
			groups[cat].push(faq);
		}
		return categories.filter((c) => groups[c]?.length > 0).map((c) => ({ category: c, items: groups[c] }));
	});

	function toggle(id) {
		openId = openId === id ? null : id;
	}

	const sections = [
		{ id: 'mission-vision', label: 'Mission & Vision' },
		{ id: 'leadership', label: 'Leadership' },
		{ id: 'faq', label: 'FAQ' }
	];
</script>

<SEO
	title="About Us"
	description="Learn about the mission, vision, leadership, and frequently asked questions about Iloilo Integrated School Inc."
/>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<Breadcrumb items={[{ label: 'About Us' }]} />
		<SectionHeading
			title="About Us"
			subtitle="Our mission drives what we do. Our vision inspires where we're going."
		/>

		<!-- Jump Links -->
		<div class="mt-10 flex flex-wrap justify-center gap-3">
			{#each sections as section}
				<a
					href="#{section.id}"
					class="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:border-accent-blue hover:text-accent-blue-dark"
				>
					{section.label}
				</a>
			{/each}
		</div>

		<!-- ============================================ -->
		<!-- Mission & Vision -->
		<!-- ============================================ -->
		<div id="mission-vision" class="scroll-mt-24">
			<!-- Mission -->
			<ScrollReveal>
				<div class="mt-20 flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
					<div class="w-full lg:w-[60%]">
						{#if missionImageUrl}
							<img
								src={missionImageUrl}
								alt="Our Mission"
								class="h-72 w-full rounded-2xl object-cover shadow-lg sm:h-80 md:h-96"
								loading="lazy"
							/>
						{:else}
							<div
								class="flex h-72 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-yellow/20 shadow-lg sm:h-80 md:h-96"
							>
								<svg class="h-20 w-20 text-accent-blue/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
									/>
								</svg>
							</div>
						{/if}
					</div>

					<div class="w-full lg:w-[40%]">
						<span class="mb-3 inline-block rounded-full bg-accent-blue/15 px-4 py-1.5 text-sm font-semibold tracking-wide text-accent-blue-dark">
							Our Mission
						</span>
						<h3 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">Mission</h3>
						<p class="text-lg leading-relaxed text-gray-600">{missionText}</p>
					</div>
				</div>
			</ScrollReveal>

			<!-- Vision (reversed layout) -->
			<ScrollReveal>
				<div class="mt-20 flex flex-col-reverse items-center gap-10 lg:flex-row lg:gap-16">
					<div class="w-full lg:w-[40%]">
						<span class="mb-3 inline-block rounded-full bg-accent-yellow/30 px-4 py-1.5 text-sm font-semibold tracking-wide text-amber-700">
							Our Vision
						</span>
						<h3 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">Vision</h3>
						<p class="text-lg leading-relaxed text-gray-600">{visionText}</p>
					</div>

					<div class="w-full lg:w-[60%]">
						{#if visionImageUrl}
							<img
								src={visionImageUrl}
								alt="Our Vision"
								class="h-72 w-full rounded-2xl object-cover shadow-lg sm:h-80 md:h-96"
								loading="lazy"
							/>
						{:else}
							<div
								class="flex h-72 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-accent-yellow/20 to-accent-blue/20 shadow-lg sm:h-80 md:h-96"
							>
								<svg class="h-20 w-20 text-accent-yellow-dark/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</div>
						{/if}
					</div>
				</div>
			</ScrollReveal>
		</div>

		<!-- ============================================ -->
		<!-- Leadership -->
		<!-- ============================================ -->
		<div id="leadership" class="scroll-mt-24 mt-28">
			<ScrollReveal>
				{#snippet children()}
					<div class="text-center">
						<h2 class="text-3xl font-bold text-gray-900 md:text-4xl">Our Leadership</h2>
						<div class="mt-3 h-1 w-16 rounded-full bg-accent-yellow mx-auto"></div>
						<p class="mt-4 max-w-2xl text-lg text-gray-600 mx-auto">Meet the dedicated people who guide, teach, and inspire our students every day</p>
					</div>
				{/snippet}
			</ScrollReveal>

			{#if leaders.length > 0}
				<div class="mt-12">
					<LeaderGrid {leaders} category="administration" label="Administration" />
					<LeaderGrid {leaders} category="faculty" label="Faculty" />
					<LeaderGrid {leaders} category="staff" label="Staff" />
				</div>
			{:else}
				<div class="mt-12 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
					<svg class="mx-auto mb-4 h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
					<p class="text-gray-500">Leadership information coming soon.</p>
					<p class="mt-1 text-sm text-gray-400">Add team members through the Sanity Studio.</p>
				</div>
			{/if}
		</div>

		<!-- ============================================ -->
		<!-- FAQ -->
		<!-- ============================================ -->
		<div id="faq" class="scroll-mt-24 mt-28">
			<ScrollReveal>
				{#snippet children()}
					<div class="text-center">
						<h2 class="text-3xl font-bold text-gray-900 md:text-4xl">Frequently Asked Questions</h2>
						<div class="mt-3 h-1 w-16 rounded-full bg-accent-yellow mx-auto"></div>
						<p class="mt-4 max-w-2xl text-lg text-gray-600 mx-auto">Find answers to common questions about our school</p>
					</div>
				{/snippet}
			</ScrollReveal>

			{#if groupedFaqs.length > 0}
				<div class="mx-auto mt-12 max-w-4xl space-y-10">
					{#each groupedFaqs as group}
						<ScrollReveal>
							{#snippet children()}
								<div>
									<h3 class="mb-4 text-lg font-bold text-gray-900">{group.category}</h3>
									<div class="space-y-3">
										{#each group.items as faq}
											<div class="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
												<button
													type="button"
													class="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-gray-50"
													onclick={() => toggle(faq._id)}
												>
													<span class="font-medium text-gray-900">{faq.question}</span>
													<svg
														class="h-5 w-5 shrink-0 text-gray-400 transition-transform {openId === faq._id ? 'rotate-180' : ''}"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
													</svg>
												</button>
												{#if openId === faq._id}
													<div class="border-t border-gray-100 px-6 py-4" transition:slide={{ duration: 200 }}>
														<PortableTextRenderer content={faq.answer} />
													</div>
												{/if}
											</div>
										{/each}
									</div>
								</div>
							{/snippet}
						</ScrollReveal>
					{/each}
				</div>
			{:else}
				<div class="mt-12 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
					<svg class="mx-auto mb-4 h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<p class="text-gray-500">No FAQs available yet.</p>
					<p class="mt-1 text-sm text-gray-400">Add frequently asked questions through the Sanity Studio.</p>
				</div>
			{/if}
		</div>
	</div>
</section>
