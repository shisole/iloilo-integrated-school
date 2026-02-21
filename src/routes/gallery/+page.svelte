<script>
	import SEO from '$lib/components/shared/SEO.svelte';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import PhotoGrid from '$lib/components/gallery/PhotoGrid.svelte';
	import PhotoLightbox from '$lib/components/gallery/PhotoLightbox.svelte';
	import { formatDate } from '$lib/utils/formatDate.js';

	let { data } = $props();

	let lightbox = $state({ open: false, photos: [], index: 0 });

	function openLightbox(photos, index) {
		lightbox = { open: true, photos, index };
	}

	function closeLightbox() {
		lightbox = { open: false, photos: [], index: 0 };
	}
</script>

<SEO
	title="Photo Gallery"
	description="Browse photos from events and activities at Iloilo Integrated School Inc."
/>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<Breadcrumb items={[{ label: 'Gallery' }]} />
		<SectionHeading
			title="Photo Gallery"
			subtitle="Captured moments from our school events and activities"
		/>

		<div class="mt-12">
			{#if data.galleries.length > 0}
				<div class="space-y-16">
					{#each data.galleries as gallery}
						<div>
							<div class="mb-6">
								<a href="/news/{gallery._id}" class="text-2xl font-bold text-gray-900 hover:text-accent-blue-dark transition-colors">
									{gallery.title}
								</a>
								<div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
									{#if gallery.eventDate}
										<span>{formatDate(gallery.eventDate)}</span>
									{/if}
									{#if gallery.location}
										<span>{gallery.location}</span>
									{/if}
									<span>{gallery.totalPhotos} photos</span>
								</div>
							</div>
							<PhotoGrid
								photos={gallery.photos}
								eventId={gallery.keepslyEventId}
								totalPhotos={gallery.totalPhotos}
								nextCursor={gallery.nextCursor}
								onphotoclick={(index, photos) => openLightbox(photos, index)}
							/>
						</div>
					{/each}
				</div>
			{:else}
				<div class="rounded-xl border-2 border-dashed border-gray-300 px-6 py-16 text-center">
					<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
					</svg>
					<h3 class="mt-4 text-lg font-semibold text-gray-900">No photos yet</h3>
					<p class="mt-2 text-gray-500">Event photos will appear here once they're uploaded.</p>
				</div>
			{/if}
		</div>
	</div>
</section>

{#if lightbox.open}
	<PhotoLightbox
		photos={lightbox.photos}
		currentIndex={lightbox.index}
		onclose={closeLightbox}
		onnavigate={(index) => (lightbox.index = index)}
	/>
{/if}
