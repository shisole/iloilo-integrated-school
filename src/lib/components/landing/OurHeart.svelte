<script>
	import { urlFor } from '$lib/sanity/image.js';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';

	let { settings = null } = $props();

	const fallbackValues = [
		{
			title: 'Compassion',
			description: 'Every child deserves to be seen, to be guided, to be believed in.'
		},
		{
			title: 'Inclusivity',
			description:
				'A home for children who needed second chances. A home where every voice mattered.'
		},
		{
			title: 'Resilience',
			description: 'We are the dream that endured storms. The school that survived silence.'
		},
		{
			title: 'Holistic Growth',
			description:
				'Every child is smart in many ways. True education is measured by kindness, resilience, and character.'
		}
	];

	const fallbackFounder = {
		name: 'Dr. Ronnie Samoro',
		role: 'Founder',
		quote:
			'Education is love in action. Leadership is service. A school is built not by walls, but by vision.',
		description:
			'Our founder, mentor, and guiding light. He planted the dream of IIS in all of us — a dream that every child deserves compassionate, quality education.'
	};

	const fallbackTagline = 'I am IIS. I am you. I am me. I am WE.';

	let values = $derived(
		settings?.coreValues?.length ? settings.coreValues : fallbackValues
	);

	let founder = $derived(settings?.founderTribute?.name ? settings.founderTribute : fallbackFounder);

	let founderPhoto = $derived(
		founder?.photo ? urlFor(founder.photo).width(320).quality(80).url() : null
	);

	let tagline = $derived(settings?.anniversaryTagline || fallbackTagline);
</script>

<section class="bg-gradient-to-b from-transparent via-accent-blue/5 to-transparent py-20 md:py-28">
	<div class="mx-auto max-w-5xl px-6">
		<SectionHeading title="Our Heart" subtitle="The values that guide everything we do" />

		<!-- Core Values Grid -->
		<div class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
			{#each values as value, i}
				<ScrollReveal delay={i * 100}>
					{#snippet children()}
						<div class="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm">
							<h3 class="mb-2 text-lg font-bold text-gray-900">{value.title}</h3>
							<p class="text-gray-600 italic">"{value.description}"</p>
						</div>
					{/snippet}
				</ScrollReveal>
			{/each}
		</div>

		<!-- Founder Tribute -->
		<ScrollReveal delay={200}>
			{#snippet children()}
				<div class="mt-16 overflow-hidden rounded-3xl border border-gray-100 bg-card shadow-sm">
					<div class="flex flex-col items-center gap-8 p-8 md:flex-row md:p-12">
						{#if founderPhoto}
							<div class="shrink-0">
								<img
									src={founderPhoto}
									alt={founder.name}
									class="h-40 w-40 rounded-full object-cover shadow-md"
									loading="lazy"
								/>
							</div>
						{:else}
							<div class="flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-accent-blue/10">
								<span class="text-5xl text-accent-blue/40" aria-hidden="true">&#10022;</span>
							</div>
						{/if}
						<div class="text-center md:text-left">
							<blockquote class="mb-4 text-lg text-gray-700 italic">
								"{founder.quote}"
							</blockquote>
							<p class="font-bold text-gray-900">{founder.name}</p>
							<p class="text-sm text-gray-500">{founder.role}</p>
							{#if founder.description}
								<p class="mt-3 text-gray-600">{founder.description}</p>
							{/if}
						</div>
					</div>
				</div>
			{/snippet}
		</ScrollReveal>

		<!-- Anniversary Tagline -->
		<ScrollReveal delay={300}>
			{#snippet children()}
				<div class="mt-16 text-center">
					<p class="text-2xl font-bold text-gray-900 md:text-3xl">
						{tagline}
					</p>
					<div class="mx-auto mt-4 h-1 w-24 rounded-full bg-accent-yellow"></div>
				</div>
			{/snippet}
		</ScrollReveal>
	</div>
</section>
