<script>
	import { formatDate } from '$lib/utils/formatDate.js';
	import SanityImage from '$lib/components/shared/SanityImage.svelte';

	let { post } = $props();
</script>

<a href="/blog/{post.slug?.current}" class="group block">
	<article class="overflow-hidden rounded-2xl border border-gray-100 bg-card shadow-sm transition hover:shadow-md">
		{#if post.mainImage}
			<div class="aspect-video overflow-hidden">
				<SanityImage
					image={post.mainImage}
					alt={post.mainImage?.alt || post.title}
					class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
				/>
			</div>
		{:else}
			<div class="flex aspect-video items-center justify-center bg-gradient-to-br from-accent-yellow/20 to-accent-blue/20">
				<svg class="h-12 w-12 text-accent-blue/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
				</svg>
			</div>
		{/if}

		<div class="p-5">
			{#if post.category?.title}
				<span class="mb-2 inline-block rounded-full bg-accent-blue/15 px-3 py-1 text-xs font-semibold text-accent-blue-dark">
					{post.category.title}
				</span>
			{/if}

			<h3 class="mb-2 text-lg font-bold text-gray-900 transition group-hover:text-accent-blue-dark">
				{post.title}
			</h3>

			{#if post.excerpt}
				<p class="mb-3 line-clamp-2 text-sm text-gray-600">{post.excerpt}</p>
			{/if}

			<time datetime={post.publishedAt} class="text-xs text-gray-400">
				{formatDate(post.publishedAt)}
			</time>
		</div>
	</article>
</a>
