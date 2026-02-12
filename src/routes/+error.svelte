<script>
	import { page } from '$app/state';
	import SEO from '$lib/components/shared/SEO.svelte';
</script>

<SEO title="Page Not Found" description="The page you're looking for doesn't exist." />

<section class="flex min-h-[60vh] items-center justify-center py-20">
	<div class="px-6 text-center">
		<div class="mb-6 text-8xl font-extrabold text-accent-blue/30">
			{page.status}
		</div>

		<h1 class="mb-4 text-3xl font-bold text-gray-900">
			{#if page.status === 404}
				Page Not Found
			{:else}
				Something Went Wrong
			{/if}
		</h1>

		<p class="mx-auto mb-8 max-w-md text-gray-600">
			{#if page.status === 404}
				The page you're looking for doesn't exist or has been moved.
			{:else}
				{page.error?.message || 'An unexpected error occurred.'}
			{/if}
		</p>

		<a
			href="/"
			class="inline-block rounded-full bg-accent-yellow px-8 py-3 font-semibold text-gray-800 shadow-lg transition hover:bg-accent-yellow-dark hover:shadow-xl"
		>
			Go Home
		</a>
	</div>
</section>
