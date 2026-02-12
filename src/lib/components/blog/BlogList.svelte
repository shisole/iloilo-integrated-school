<script>
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';
	import BlogCard from './BlogCard.svelte';

	let { posts = [] } = $props();
</script>

{#if posts.length > 0}
	<ScrollReveal>
		{#snippet children()}
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each posts as post}
					<BlogCard {post} />
				{/each}
			</div>
		{/snippet}
	</ScrollReveal>
{:else}
	<div class="rounded-2xl border border-dashed border-gray-200 py-16 text-center">
		<svg class="mx-auto mb-4 h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
		</svg>
		<p class="text-gray-500">No blog posts yet.</p>
		<p class="mt-1 text-sm text-gray-400">Posts added through Sanity Studio will appear here.</p>
	</div>
{/if}
