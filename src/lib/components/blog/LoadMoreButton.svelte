<script>
	let { onclick, isLoading = false, hasMore = true } = $props();
</script>

{#if hasMore}
	<div class="mt-10 text-center">
		<button
			{onclick}
			disabled={isLoading}
			class="inline-flex items-center gap-2 rounded-full border-2 border-accent-blue px-8 py-3 font-semibold text-gray-700 transition hover:bg-accent-blue/20 disabled:cursor-not-allowed disabled:opacity-50"
		>
			{#if isLoading}
				<svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				Loading...
			{:else}
				Load More Posts
			{/if}
		</button>
	</div>
{/if}
