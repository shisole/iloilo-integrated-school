<script>
	import { SCHOOL_NAME } from '$lib/utils/constants.js';

	let {
		title = '',
		description = 'Official website of Iloilo Integrated School Inc. Nurturing young minds since 2001.',
		image = '/images/logo.png',
		url = '',
		type = 'website'
	} = $props();

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
	{#if image}
		<meta property="og:image" content={image} />
	{/if}
	{#if url}
		<meta property="og:url" content={url} />
	{/if}
	<meta property="og:site_name" content={SCHOOL_NAME} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	{#if image}
		<meta name="twitter:image" content={image} />
	{/if}

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>
