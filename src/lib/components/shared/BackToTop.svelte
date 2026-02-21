<script>
	import { fade } from 'svelte/transition';

	let isVisible = $state(false);

	$effect(() => {
		function onScroll() {
			isVisible = window.scrollY > 300;
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

{#if isVisible}
	<button
		type="button"
		onclick={scrollToTop}
		class="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue text-white shadow-lg transition hover:bg-accent-blue-dark hover:shadow-xl"
		aria-label="Back to top"
		transition:fade={{ duration: 200 }}
	>
		<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
		</svg>
	</button>
{/if}
