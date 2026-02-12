<script>
	import SanityImage from '$lib/components/shared/SanityImage.svelte';

	let { leader } = $props();
	let showBio = $state(false);
</script>

<div
	class="group overflow-hidden rounded-2xl border border-gray-100 bg-card p-6 text-center shadow-sm transition hover:shadow-md"
>
	<!-- Photo -->
	<div class="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-accent-blue/20">
		{#if leader.photo}
			<SanityImage
				image={leader.photo}
				alt={leader.photo?.alt || leader.name}
				class="h-full w-full object-cover"
			/>
		{:else}
			<div class="flex h-full w-full items-center justify-center bg-accent-blue/10">
				<svg class="h-12 w-12 text-accent-blue/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
				</svg>
			</div>
		{/if}
	</div>

	<!-- Info -->
	<h3 class="text-lg font-bold text-gray-900">{leader.name}</h3>
	<p class="mb-3 text-sm font-medium text-accent-blue-dark">{leader.role}</p>

	<!-- Bio toggle -->
	{#if leader.bio}
		<button
			onclick={() => (showBio = !showBio)}
			class="text-sm font-medium text-gray-500 transition hover:text-accent-blue-dark"
		>
			{showBio ? 'Hide Bio' : 'View Bio'}
		</button>

		{#if showBio}
			<p class="mt-3 text-sm leading-relaxed text-gray-600">
				{leader.bio}
			</p>
		{/if}
	{/if}
</div>
