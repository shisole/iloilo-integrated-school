<script>
	import { SCHOOL_NAME } from '$lib/utils/constants.js';
	import { urlFor } from '$lib/sanity/image.js';

	let {
		title = '',
		description = 'Official website of Iloilo Integrated School Inc. Nurturing young minds since 2001.',
		image = '',
		ogImage = null,
		url = '',
		type = 'website'
	} = $props();

	let resolvedImage = $derived(
		image || (ogImage ? urlFor(ogImage).width(1200).height(630).url() : '/images/logo.png')
	);

	let fullTitle = $derived(title ? `${title} | ${SCHOOL_NAME}` : SCHOOL_NAME);

	let jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'EducationalOrganization',
			name: SCHOOL_NAME,
			description: description,
			url: url || undefined,
			logo: '/images/logo.png',
			foundingDate: '2001',
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Iloilo City',
				addressRegion: 'Western Visayas',
				addressCountry: 'PH'
			}
		})
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />

	<!-- Open Graph -->
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	{#if resolvedImage}
		<meta property="og:image" content={resolvedImage} />
	{/if}
	{#if url}
		<meta property="og:url" content={url} />
	{/if}
	<meta property="og:site_name" content={SCHOOL_NAME} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	{#if resolvedImage}
		<meta name="twitter:image" content={resolvedImage} />
	{/if}

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>
