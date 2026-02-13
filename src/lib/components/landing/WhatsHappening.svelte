<script>
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';
	import SkeletonCard from '$lib/components/shared/SkeletonCard.svelte';
	import EventCard from './EventCard.svelte';

	let { events = [], pastEvents = [], loading = false } = $props();
	let allEvents = $derived([...events, ...pastEvents]);
</script>

<section id="whats-happening" class="bg-accent-blue/5 py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading
			title="What's Happening"
			subtitle="Stay up to date with the latest events and activities at our school"
		/>

		{#if loading}
			<div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each Array(4) as _}
					<SkeletonCard variant="event" />
				{/each}
			</div>
		{:else if allEvents.length > 0}
			<ScrollReveal>
				{#snippet children()}
					<div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{#each allEvents as event}
							<EventCard {event} />
						{/each}
					</div>
				{/snippet}
			</ScrollReveal>
		{:else}
			<div class="mt-12 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
				<svg class="mx-auto mb-4 h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
				<p class="text-gray-500">No events at the moment.</p>
				<p class="mt-1 text-sm text-gray-400">Check back soon for new activities!</p>
			</div>
		{/if}

		<div class="mt-10 text-center">
			<a
				href="/news"
				class="inline-flex items-center gap-2 font-semibold text-accent-blue-dark transition hover:gap-3"
			>
				View All News
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</a>
		</div>
	</div>
</section>
