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
