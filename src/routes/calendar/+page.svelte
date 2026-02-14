<script>
	import SEO from '$lib/components/shared/SEO.svelte';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';

	let { data } = $props();

	let now = $state(new Date());

	let groupedEvents = $derived.by(() => {
		const groups = {};
		for (const event of data.events) {
			const date = new Date(event.eventDate);
			const key = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`;
			const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
			if (!groups[key]) {
				groups[key] = { label, events: [] };
			}
			groups[key].events.push(event);
		}
		return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
	});

	function formatDay(dateString) {
		return new Date(dateString).toLocaleDateString('en-US', { day: 'numeric' });
	}

	function formatMonth(dateString) {
		return new Date(dateString).toLocaleDateString('en-US', { month: 'short' });
	}

	function formatTime(dateString) {
		return new Date(dateString).toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit'
		});
	}

	function isPast(dateString) {
		return new Date(dateString) < now;
	}
</script>

<SEO
	title="Academic Calendar"
	description="View the academic calendar and upcoming events at Iloilo Integrated School Inc."
/>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<Breadcrumb items={[{ label: 'About', href: '/about' }, { label: 'Calendar' }]} />
		<SectionHeading
			title="Academic Calendar"
			subtitle="Stay updated with all school events and important dates"
		/>

		{#if groupedEvents.length > 0}
			<div class="mt-12 space-y-12">
				{#each groupedEvents as [, group]}
					<ScrollReveal>
						{#snippet children()}
							<div>
								<h3 class="mb-6 text-xl font-bold text-gray-900">{group.label}</h3>
								<div class="space-y-4">
									{#each group.events as event}
										{@const past = isPast(event.eventDate)}
										<div class="flex gap-4 rounded-xl border p-4 transition {past
											? 'border-gray-100 bg-gray-50/50'
											: 'border-accent-blue/15 bg-white shadow-sm'}">
											<!-- Date badge -->
											<div class="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl {past
												? 'bg-gray-100 text-gray-400'
												: 'bg-accent-blue text-white'}">
												<span class="text-xs font-medium uppercase leading-none">{formatMonth(event.eventDate)}</span>
												<span class="text-2xl font-bold leading-tight">{formatDay(event.eventDate)}</span>
											</div>

											<!-- Details -->
											<div class="min-w-0 flex-1">
												<h4 class="font-semibold {past ? 'text-gray-500' : 'text-gray-900'}">{event.title}</h4>
												<div class="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm {past ? 'text-gray-400' : 'text-gray-500'}">
													{#if event.location}
														<span class="inline-flex items-center gap-1">
															<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
																<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
															</svg>
															{event.location}
														</span>
													{/if}
													<span class="inline-flex items-center gap-1">
														<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
														</svg>
														{formatTime(event.eventDate)}
													</span>
												</div>
												{#if event.description}
													<p class="mt-2 text-sm {past ? 'text-gray-400' : 'text-gray-600'}">{event.description}</p>
												{/if}
											</div>

											<!-- Status indicator -->
											{#if !past}
												<div class="hidden shrink-0 sm:block">
													<span class="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">Upcoming</span>
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
			<div class="mt-16 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
				<svg class="mx-auto mb-4 h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
				<p class="text-gray-500">No events on the calendar yet.</p>
				<p class="mt-1 text-sm text-gray-400">Events will appear here once they are added.</p>
			</div>
		{/if}
	</div>
</section>
