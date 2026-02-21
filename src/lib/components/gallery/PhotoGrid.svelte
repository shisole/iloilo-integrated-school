<script>
	const BATCH_SIZE = 12;

	let {
		photos = [],
		onphotoclick,
		eventId = undefined,
		totalPhotos = undefined,
		nextCursor: propNextCursor = null
	} = $props();

	// Server-fetched mode (gallery page): fetch more from API
	// UI-only mode (news page): slice from photos prop
	let isServerMode = $derived(!!eventId);

	// State for server-fetched mode
	let extraPhotos = $state([]);
	let cursor = $state(null);
	let canLoadMore = $state(false);
	let loading = $state(false);

	// All loaded photos (initial from server + fetched extras)
	let loadedPhotos = $derived(isServerMode ? [...photos, ...extraPhotos] : photos);

	// UI-only mode: progressive reveal
	let visibleCount = $state(BATCH_SIZE);
	let visiblePhotos = $derived(
		isServerMode ? loadedPhotos : loadedPhotos.slice(0, visibleCount)
	);

	let showSentinel = $derived(
		isServerMode ? canLoadMore : visibleCount < photos.length
	);

	let sentinel = $state(null);

	// Reset state when photos/eventId change (different gallery)
	$effect(() => {
		photos;
		eventId;
		extraPhotos = [];
		cursor = propNextCursor;
		canLoadMore = propNextCursor !== null;
		visibleCount = BATCH_SIZE;
	});

	async function loadMore() {
		if (isServerMode) {
			if (loading || !canLoadMore) return;
			loading = true;
			try {
				const params = new URLSearchParams({ eventId });
				if (cursor) params.set('cursor', cursor);
				const res = await fetch(`/api/gallery?${params}`);
				const data = await res.json();
				extraPhotos = [...extraPhotos, ...data.photos];
				cursor = data.nextCursor;
				canLoadMore = data.hasMore;
			} catch {
				// Silently fail — user can scroll again to retry
			} finally {
				loading = false;
			}
		} else {
			visibleCount = Math.min(visibleCount + BATCH_SIZE, photos.length);
		}
	}

	// IntersectionObserver to load more photos when sentinel is visible
	$effect(() => {
		if (!sentinel) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMore();
				}
			},
			{ rootMargin: '200px' }
		);

		observer.observe(sentinel);

		return () => observer.disconnect();
	});

	function handleClick(index) {
		if (isServerMode) {
			onphotoclick(index, loadedPhotos);
		} else {
			onphotoclick(index);
		}
	}
</script>

<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4">
	{#each visiblePhotos as photo, index}
		<button
			type="button"
			class="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
			onclick={() => handleClick(index)}
		>
			<img
				src={photo}
				alt="Event photo {index + 1}"
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
			<div class="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"></div>
		</button>
	{/each}
</div>

{#if loading}
	<div class="flex justify-center py-8">
		<div class="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-accent-blue"></div>
	</div>
{/if}

{#if showSentinel}
	<div bind:this={sentinel} class="h-1"></div>
{/if}
