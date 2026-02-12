<script>
	import SEO from '$lib/components/shared/SEO.svelte';
	import SanityImage from '$lib/components/shared/SanityImage.svelte';
	import PortableTextRenderer from '$lib/components/blog/PortableTextRenderer.svelte';
	import { formatDate } from '$lib/utils/formatDate.js';
	import { urlFor } from '$lib/sanity/image.js';

	let { data } = $props();
	let post = $derived(data.post);
	let ogImage = $derived(post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : '/images/og-image.jpg');
</script>

<SEO
	title={post.title}
	description={post.excerpt || ''}
	image={ogImage}
	type="article"
/>

<article class="py-20 md:py-28">
	<div class="mx-auto max-w-3xl px-6">
		<!-- Back link -->
		<a
			href="/blog"
			class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-accent-blue-dark"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			Back to all posts
		</a>

		<!-- Header -->
		<header class="mb-10">
			{#if post.category?.title}
				<span class="mb-4 inline-block rounded-full bg-accent-blue/15 px-3 py-1 text-xs font-semibold text-accent-blue-dark">
					{post.category.title}
				</span>
			{/if}

			<h1 class="mb-4 font-display text-3xl leading-tight font-extrabold text-gray-900 md:text-5xl">
				{post.title}
			</h1>

			<time datetime={post.publishedAt} class="text-sm text-gray-500">
				{formatDate(post.publishedAt)}
			</time>
		</header>

		<!-- Featured image -->
		{#if post.mainImage}
			<div class="mb-10 overflow-hidden rounded-2xl">
				<SanityImage
					image={post.mainImage}
					alt={post.mainImage?.alt || post.title}
					class="w-full object-cover"
				/>
			</div>
		{/if}

		<!-- Body content -->
		{#if post.body}
			<PortableTextRenderer content={post.body} />
		{/if}

		<!-- Bottom navigation -->
		<div class="mt-16 border-t border-gray-100 pt-8">
			<a
				href="/blog"
				class="inline-flex items-center gap-2 font-semibold text-accent-blue-dark transition hover:gap-3"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				Back to all posts
			</a>
		</div>
	</div>
</article>
