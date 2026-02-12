<script>
	import { formatDate, formatShortDate } from '$lib/utils/formatDate.js';
	import SanityImage from '$lib/components/shared/SanityImage.svelte';

	let { event } = $props();
	let isUpcoming = $derived(new Date(event.eventDate) > new Date());
</script>

<a href="/news/{event._id}" class="block">
<article class="group overflow-hidden rounded-2xl border border-gray-100 bg-card shadow-sm transition hover:shadow-md">
	<div class="relative">
		{#if isUpcoming}
			<span class="absolute top-3 left-3 z-10 rounded-full bg-accent-blue px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
				Upcoming
			</span>
		{/if}

		{#if event.image}
			<div class="aspect-video overflow-hidden">
				<SanityImage
					image={event.image}
					alt={event.image?.alt || event.title}
					class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
				/>
			</div>
		{:else}
			<div class="flex aspect-video items-center justify-center bg-gradient-to-br from-accent-blue/20 to-accent-yellow/20">
				<svg class="h-12 w-12 text-accent-blue/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
			</div>
		{/if}
	</div>

	<div class="p-5">
		<div class="mb-2 flex items-center gap-2 text-sm text-gray-500">
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
			</svg>
			<time datetime={event.eventDate}>{formatDate(event.eventDate)}</time>
		</div>

		<h3 class="mb-2 text-lg font-bold text-gray-900">{event.title}</h3>

		{#if event.description}
			<p class="mb-3 line-clamp-2 text-sm text-gray-600">{event.description}</p>
		{/if}

		{#if event.location}
			<div class="flex items-center gap-1.5 text-sm text-gray-500">
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				{event.location}
			</div>
		{/if}
	</div>
</article>
</a>
