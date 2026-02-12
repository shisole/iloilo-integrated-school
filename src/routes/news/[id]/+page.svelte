<script>
	import SEO from '$lib/components/shared/SEO.svelte';
	import SanityImage from '$lib/components/shared/SanityImage.svelte';
	import PortableTextRenderer from '$lib/components/blog/PortableTextRenderer.svelte';
	import CountdownTimer from '$lib/components/shared/CountdownTimer.svelte';
	import { formatDate } from '$lib/utils/formatDate.js';
	import { urlFor } from '$lib/sanity/image.js';

	let { data } = $props();
	let event = $derived(data.event);
	let ogImage = $derived(
		event.image ? urlFor(event.image).width(1200).height(630).url() : '/images/og-image.jpg'
	);
	let isUpcoming = $derived(new Date(event.eventDate) > new Date());
</script>

<SEO title={event.title} description={event.description || ''} image={ogImage} type="article" />

<article class="py-20 md:py-28">
	<div class="mx-auto max-w-3xl px-6">
		<!-- Back link -->
		<a
			href="/news"
			class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-accent-blue-dark"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 19l-7-7 7-7"
				/>
			</svg>
			Back to all news
		</a>

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
		</header>

		<!-- Countdown timer for upcoming events -->
		{#if isUpcoming}
			<div class="mb-10">
				<CountdownTimer targetDate={event.eventDate} />
			</div>
		{/if}

		<!-- Featured image -->
		{#if event.image}
			<div class="mb-10 overflow-hidden rounded-2xl">
				<SanityImage
					image={event.image}
					alt={event.image?.alt || event.title}
					class="w-full object-cover"
				/>
			</div>
		{/if}

		<!-- Body content -->
		{#if event.body}
			<PortableTextRenderer content={event.body} />
		{:else if event.description}
			<div class="prose prose-lg max-w-none text-gray-700">
				<p>{event.description}</p>
			</div>
		{/if}

		<!-- Bottom navigation -->
		<div class="mt-16 border-t border-gray-100 pt-8">
			<a
				href="/news"
				class="inline-flex items-center gap-2 font-semibold text-accent-blue-dark transition hover:gap-3"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				Back to all news
			</a>
		</div>
	</div>
</article>
