<script>
	import { page } from '$app/state';
	import SEO from '$lib/components/shared/SEO.svelte';
	import SanityImage from '$lib/components/shared/SanityImage.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import PortableTextRenderer from '$lib/components/blog/PortableTextRenderer.svelte';
	import CountdownTimer from '$lib/components/shared/CountdownTimer.svelte';
	import PhotoGrid from '$lib/components/gallery/PhotoGrid.svelte';
	import PhotoLightbox from '$lib/components/gallery/PhotoLightbox.svelte';
	import { formatDate } from '$lib/utils/formatDate.js';
	import { urlFor } from '$lib/sanity/image.js';

	let { data } = $props();
	let event = $derived(data.event);
	let pageUrl = $derived(page.url.href);
	let ogImage = $derived(
		event.image ? urlFor(event.image).width(1200).height(630).url() : '/images/og-image.jpg'
	);
	let isUpcoming = $derived(new Date(event.eventDate) > new Date());

	let heroImageUrl = $derived(
		event.image ? urlFor(event.image).width(1920).url() : ''
	);

	let lightbox = $state({ open: false, photos: [], index: 0 });
	let copied = $state(false);

	async function copyLink() {
		await navigator.clipboard.writeText(pageUrl);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<SEO title={event.title} description={event.description || ''} image={ogImage} url={pageUrl} type="article" />

<article class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<Breadcrumb items={[{ label: 'News', href: '/news' }, { label: event.title }]} />

		<!-- Header -->
		<header class="mb-10">
			<h1
				class="mb-4 font-display text-3xl leading-tight font-extrabold text-gray-900 md:text-5xl"
			>
				{event.title}
			</h1>

			<div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
				<div class="flex items-center gap-1.5">
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<time datetime={event.eventDate}>{formatDate(event.eventDate)}</time>
					{#if event.endDate}
						<span>–</span>
						<time datetime={event.endDate}>{formatDate(event.endDate)}</time>
					{/if}
				</div>

				{#if event.location}
					<div class="flex items-center gap-1.5">
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						{event.location}
					</div>
				{/if}
			</div>

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
					href="https://twitter.com/intent/tweet?url={encodeURIComponent(pageUrl)}&text={encodeURIComponent(event.title)}"
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

		<!-- Countdown timer for upcoming events -->
		{#if isUpcoming}
			<div class="mb-10">
				<CountdownTimer targetDate={event.eventDate} />
			</div>
		{/if}

		<!-- Featured image -->
		{#if event.image}
			<button
				type="button"
				class="group mb-10 w-full cursor-zoom-in overflow-hidden rounded-2xl"
				onclick={() => (lightbox = { open: true, photos: [heroImageUrl], index: 0 })}
			>
				<SanityImage
					image={event.image}
					alt={event.image?.alt || event.title}
					class="max-h-[36rem] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
				/>
			</button>
		{/if}

		<!-- Body content -->
		{#if event.body}
			<PortableTextRenderer content={event.body} />
		{:else if event.description}
			<div class="prose prose-2xl max-w-none text-gray-600">
				<p>{event.description}</p>
			</div>
		{/if}

		<!-- Event photos -->
		{#if data.galleryPhotos.length > 0}
			<div class="mt-12">
				<h2 class="mb-1 text-2xl font-bold text-gray-900">Event Photos</h2>
				<p class="mb-6 text-sm text-gray-500">{data.galleryPhotos.length} photos</p>
				<PhotoGrid
					photos={data.galleryPhotos}
					onphotoclick={(index) => (lightbox = { open: true, photos: data.galleryPhotos, index })}
				/>
			</div>
		{/if}

		<!-- Bottom navigation -->
		<div class="mt-16 border-t border-gray-100 pt-8">
			<a
				href="/news"
				class="inline-flex items-center gap-2 font-semibold text-accent-blue-dark transition hover:gap-3"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				Back to all news
			</a>
		</div>
	</div>
</article>

{#if lightbox.open}
	<PhotoLightbox
		photos={lightbox.photos}
		currentIndex={lightbox.index}
		onclose={() => (lightbox = { open: false, photos: [], index: 0 })}
		onnavigate={(index) => (lightbox.index = index)}
	/>
{/if}
