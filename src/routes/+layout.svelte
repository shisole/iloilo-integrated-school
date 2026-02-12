<script>
	import '../app.css';
	import { navigating } from '$app/state';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import CubeLoader from '$lib/components/shared/CubeLoader.svelte';

	let { data, children } = $props();
</script>

{#if navigating.to}
	<CubeLoader />
{/if}

<div class="flex min-h-screen flex-col bg-page font-body">
	<Navbar settings={data.settings} />

	<main class="flex-1">
		{@render children()}
	</main>

	<Footer settings={data.settings} />
</div>
