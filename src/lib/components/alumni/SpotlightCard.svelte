<script>
	import SanityImage from '$lib/components/shared/SanityImage.svelte';

	let { spotlight } = $props();
</script>

<div class="overflow-hidden rounded-2xl border border-gray-100 bg-card shadow-sm transition hover:shadow-md">
	<!-- Photo -->
	<div class="aspect-square w-full overflow-hidden bg-gray-100">
		{#if spotlight.photo}
			<SanityImage
				image={spotlight.photo}
				alt={spotlight.photo?.alt || spotlight.name}
				width={480}
				class="h-full w-full object-cover"
			/>
		{:else}
			<div class="flex h-full w-full items-center justify-center bg-accent-blue/10">
				<svg class="h-16 w-16 text-accent-blue/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
				</svg>
			</div>
		{/if}
	</div>

	<!-- Info -->
	<div class="p-5">
		<h3 class="text-lg font-bold text-gray-900">{spotlight.name}</h3>
		{#if spotlight.batch}
			<p class="mt-1 text-sm font-medium text-accent-blue-dark">Batch {spotlight.batch}</p>
		{/if}
		{#if spotlight.quote}
			<p class="mt-3 text-sm leading-relaxed text-gray-600 italic">"{spotlight.quote}"</p>
		{/if}
	</div>
</div>
