<script>
	import { page } from '$app/state';
	import SEO from '$lib/components/shared/SEO.svelte';
	import SanityImage from '$lib/components/shared/SanityImage.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import PortableTextRenderer from '$lib/components/blog/PortableTextRenderer.svelte';
	import { formatDate } from '$lib/utils/formatDate.js';
	import { urlFor } from '$lib/sanity/image.js';

	let { data } = $props();
	let post = $derived(data.post);
	let ogImage = $derived(post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : '/images/og-image.jpg');
	let pageUrl = $derived(page.url.href);
	let copied = $state(false);

async function copyLink() {
	await navigator.clipboard.writeText(pageUrl);
	copied = true;
	setTimeout(() => (copied = false), 2000);
}
</script>

<SEO
	title={post.title}
	description={post.excerpt || ''}
	image={ogImage}
	type="article"
/>

<article class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

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

			<!-- Share buttons -->
			<div class="mt-4 flex items-center gap-2">
				<span class="text-sm font-medium text-gray-500">Share:</span>
				<a
					href="https://www.facebook.com/sharer/sharer.php?u={encodeURIComponent(pageUrl)}"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-blue-100 hover:text-blue-600"
					aria-label="Share on Facebook"
				>
					<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
						<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
					</svg>
				</a>
				<a
					href="https://twitter.com/intent/tweet?url={encodeURIComponent(pageUrl)}&text={encodeURIComponent(post.title)}"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-sky-100 hover:text-sky-500"
					aria-label="Share on X"
				>
					<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
					</svg>
				</a>
				<button
					type="button"
					class="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
					onclick={copyLink}
					aria-label="Copy link"
				>
					{#if copied}
						<svg class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
						</svg>
					{:else}
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
							<path stroke-linecap="round" stroke-linejoin="round" d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
						</svg>
					{/if}
				</button>
			</div>
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
