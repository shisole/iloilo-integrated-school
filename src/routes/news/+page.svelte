<script>
	import SEO from '$lib/components/shared/SEO.svelte';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';
	import EventCard from '$lib/components/landing/EventCard.svelte';

	let { data } = $props();
</script>

<SEO
	title="News & Events"
	description="Stay updated with upcoming and previous events at Iloilo Integrated School Inc."
/>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading
			title="News & Events"
			subtitle="Stay updated with all school events and activities"
		/>

		<div class="mt-12">
			<h3 class="text-2xl font-bold text-gray-900">Upcoming Events</h3>
			{#if data.upcomingEvents.length > 0}
				<ScrollReveal>
					{#snippet children()}
						<div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{#each data.upcomingEvents as event}
								<EventCard {event} />
							{/each}
						</div>
					{/snippet}
				</ScrollReveal>
			{:else}
				<div class="mt-6 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
					<svg class="mx-auto mb-4 h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<p class="text-gray-500">No upcoming events at the moment.</p>
					<p class="mt-1 text-sm text-gray-400">Check back soon for new activities!</p>
				</div>
			{/if}
		</div>

		<div class="mt-16">
			<h3 class="text-2xl font-bold text-gray-900">Previous Events</h3>
			{#if data.pastEvents.length > 0}
				<ScrollReveal>
					{#snippet children()}
						<div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{#each data.pastEvents as event}
								<EventCard {event} />
							{/each}
						</div>
					{/snippet}
				</ScrollReveal>
			{:else}
				<div class="mt-6 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
					<svg class="mx-auto mb-4 h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<p class="text-gray-500">No previous events to show.</p>
				</div>
			{/if}
		</div>
	</div>
</section>
