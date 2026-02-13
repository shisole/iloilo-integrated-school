<script>
	import { fade } from 'svelte/transition';

	let { photos = [], currentIndex = 0, onclose, onnavigate } = $props();

	function prev(e) {
		e.stopPropagation();
		onnavigate(currentIndex > 0 ? currentIndex - 1 : photos.length - 1);
	}

	function next(e) {
		e.stopPropagation();
		onnavigate(currentIndex < photos.length - 1 ? currentIndex + 1 : 0);
	}

	function handleKeydown(e) {
		if (e.key === 'Escape') onclose();
		if (e.key === 'ArrowLeft') prev(e);
		if (e.key === 'ArrowRight') next(e);
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
<div
	class="fixed inset-0 z-60 flex items-center justify-center bg-black/90"
	transition:fade={{ duration: 200 }}
	onclick={onclose}
>
	<!-- Close button -->
	<button
		type="button"
		class="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
		onclick={onclose}
		aria-label="Close lightbox"
	>
		<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	</button>

	<!-- Photo counter -->
	<div class="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
		{currentIndex + 1} / {photos.length}
	</div>

	<!-- Previous button -->
	<button
		type="button"
		class="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
		onclick={prev}
		aria-label="Previous photo"
	>
		<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
		</svg>
	</button>

	<!-- Image -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_click_events_have_key_events -->
	<img
		src={photos[currentIndex]}
		alt="Photo {currentIndex + 1} of {photos.length}"
		class="max-h-[90vh] max-w-[90vw] object-contain"
		onclick={(e) => e.stopPropagation()}
	/>

	<!-- Next button -->
	<button
		type="button"
		class="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
		onclick={next}
		aria-label="Next photo"
	>
		<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
		</svg>
	</button>
</div>
