<script>
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';
	import { formatDate } from '$lib/utils/formatDate.js';

	let { galleries = [] } = $props();
</script>

{#if galleries.length > 0}
	<section class="py-20 md:py-28">
		<div class="mx-auto max-w-6xl px-6">
			<SectionHeading
				title="Photo Gallery"
				subtitle="Glimpses from our recent school events and activities"
			/>

			<div class="mt-12 space-y-12">
				{#each galleries as gallery}
					<ScrollReveal>
						{#snippet children()}
							<div>
								<div class="mb-4 flex items-end justify-between">
									<div>
										<h3 class="text-lg font-bold text-gray-900">{gallery.title}</h3>
										{#if gallery.eventDate}
											<p class="mt-1 text-sm text-gray-500">{formatDate(gallery.eventDate)}</p>
										{/if}
									</div>
								</div>
								<div class="grid grid-cols-2 gap-2 sm:grid-cols-4 md:gap-3">
									{#each gallery.photos.slice(0, 4) as photo, i}
										<div class="group relative aspect-square overflow-hidden rounded-lg bg-gray-100">
											<img
												src={photo}
												alt="{gallery.title} photo {i + 1}"
												loading="lazy"
												class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
											/>
											{#if i === 3 && gallery.photos.length > 4}
												<a
													href="/gallery"
													class="absolute inset-0 flex items-center justify-center bg-black/50 transition-colors hover:bg-black/60"
												>
													<span class="text-2xl font-bold text-white">+{gallery.photos.length - 4}</span>
												</a>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						{/snippet}
					</ScrollReveal>
				{/each}
			</div>

			<div class="mt-10 text-center">
				<a
					href="/gallery"
					class="inline-flex items-center gap-2 font-semibold text-accent-blue-dark transition hover:gap-3"
				>
					View All Photos
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div>
		</div>
	</section>
{/if}
