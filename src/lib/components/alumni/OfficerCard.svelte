<script>
	import SanityImage from '$lib/components/shared/SanityImage.svelte';

	let { officer } = $props();
</script>

<div class="flex items-center gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-card p-4 shadow-sm transition hover:shadow-md">
	<!-- Photo -->
	<div class="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-accent-blue/20">
		{#if officer.photo}
			<SanityImage
				image={officer.photo}
				alt={officer.photo?.alt || officer.name}
				width={128}
				class="h-full w-full object-cover"
			/>
		{:else}
			<div class="flex h-full w-full items-center justify-center bg-accent-blue/10">
				<svg class="h-8 w-8 text-accent-blue/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
				</svg>
			</div>
		{/if}
	</div>

	<!-- Info -->
	<div>
		<h3 class="text-base font-bold text-gray-900">{officer.name}</h3>
		<p class="text-sm font-medium text-accent-blue-dark">{officer.role}</p>
	</div>
</div>
