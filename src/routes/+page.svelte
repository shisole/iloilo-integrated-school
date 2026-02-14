<script>
	import SEO from '$lib/components/shared/SEO.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
	import SchoolStory from '$lib/components/landing/SchoolStory.svelte';
	import WhatsHappening from '$lib/components/landing/WhatsHappening.svelte';
	import CallToAction from '$lib/components/landing/CallToAction.svelte';
	import GalleryPreview from '$lib/components/landing/GalleryPreview.svelte';
	import FacebookFeed from '$lib/components/landing/FacebookFeed.svelte';
	import FindUs from '$lib/components/landing/FindUs.svelte';

	let { data } = $props();
</script>

<SEO
	title="Iloilo Integrated School Inc."
	description="Quality elementary education in Iloilo since 2001. Nurturing young minds through holistic learning, values formation, and creative expression."
/>

<Hero settings={data.settings} />
<WhatsHappening events={data.events} pastEvents={data.pastEvents} />
<GalleryPreview galleries={data.galleryPreview} />
<FacebookFeed />
<SchoolStory settings={data.settings} />
<CallToAction settings={data.settings} />
<FindUs settings={data.settings} />
