<script>
	let { variant = 'event' } = $props();
</script>

<article class="overflow-hidden rounded-2xl border border-gray-100 bg-card shadow-sm">
	<!-- Image skeleton -->
	<div class="aspect-video animate-skeleton bg-gray-200"></div>

	<!-- Content skeleton -->
	<div class="p-5">
		{#if variant === 'event'}
			<!-- Date -->
			<div class="mb-2 flex items-center gap-2">
				<div class="h-4 w-4 animate-skeleton rounded bg-gray-200"></div>
				<div class="h-4 w-24 animate-skeleton rounded bg-gray-200"></div>
			</div>
			<!-- Title -->
			<div class="mb-2 h-6 w-3/4 animate-skeleton rounded bg-gray-200"></div>
			<!-- Description -->
			<div class="mb-3 space-y-1.5">
				<div class="h-4 w-full animate-skeleton rounded bg-gray-200"></div>
				<div class="h-4 w-2/3 animate-skeleton rounded bg-gray-200"></div>
			</div>
			<!-- Location -->
			<div class="flex items-center gap-1.5">
				<div class="h-4 w-4 animate-skeleton rounded bg-gray-200"></div>
				<div class="h-4 w-28 animate-skeleton rounded bg-gray-200"></div>
			</div>
		{:else}
			<!-- Category badge -->
			<div class="mb-2 h-6 w-20 animate-skeleton rounded-full bg-gray-200"></div>
			<!-- Title -->
			<div class="mb-2 h-6 w-3/4 animate-skeleton rounded bg-gray-200"></div>
			<!-- Excerpt -->
			<div class="mb-3 space-y-1.5">
				<div class="h-4 w-full animate-skeleton rounded bg-gray-200"></div>
				<div class="h-4 w-2/3 animate-skeleton rounded bg-gray-200"></div>
			</div>
			<!-- Date -->
			<div class="h-3 w-24 animate-skeleton rounded bg-gray-200"></div>
		{/if}
	</div>
</article>
