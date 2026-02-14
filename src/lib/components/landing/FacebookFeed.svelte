<script>
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';

	const FB_PAGE_URL = 'https://www.facebook.com/iis2001';

	let wrapper = $state(null);
	let loaded = $state(false);
	let containerWidth = $state(500);

	// Clamp to Facebook's min 180 / max 500
	let fbWidth = $derived(Math.min(500, Math.max(180, containerWidth)));

	function renderPlugin() {
		if (!wrapper) return;

		// Measure container
		containerWidth = wrapper.offsetWidth;

		// Clear previous render
		const fbDiv = wrapper.querySelector('.fb-page-wrapper');
		if (fbDiv) fbDiv.innerHTML = createFbMarkup();

		// Ask SDK to re-parse
		if (window.FB) {
			window.FB.XFBML.parse(wrapper);
		}
	}

	function createFbMarkup() {
		return `<div class="fb-page"
			data-href="${FB_PAGE_URL}"
			data-tabs="timeline"
			data-width="${fbWidth}"
			data-height="600"
			data-small-header="false"
			data-adapt-container-width="true"
			data-hide-cover="false"
			data-show-facepile="true">
			<blockquote cite="${FB_PAGE_URL}" class="fb-xfbml-parse-ignore">
				<a href="${FB_PAGE_URL}">Iloilo Integrated School</a>
			</blockquote>
		</div>`;
	}

	$effect(() => {
		if (!wrapper) return;

		containerWidth = wrapper.offsetWidth;

		if (!document.getElementById('facebook-jssdk')) {
			const script = document.createElement('script');
			script.id = 'facebook-jssdk';
			script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0';
			script.async = true;
			script.defer = true;
			script.crossOrigin = 'anonymous';
			script.onload = () => {
				loaded = true;
				renderPlugin();
			};
			document.body.appendChild(script);
		} else {
			loaded = true;
			renderPlugin();
		}

		// Debounced resize handler to re-render at new width
		let resizeTimer;
		function onResize() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				const newWidth = wrapper?.offsetWidth;
				if (newWidth && Math.abs(newWidth - containerWidth) > 20) {
					renderPlugin();
				}
			}, 300);
		}

		window.addEventListener('resize', onResize);
		return () => {
			clearTimeout(resizeTimer);
			window.removeEventListener('resize', onResize);
		};
	});
</script>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading
			title="From Our Facebook"
			subtitle="Follow us on Facebook for the latest updates, photos, and announcements"
		/>

		<ScrollReveal>
			{#snippet children()}
				<div class="mt-12 mx-auto max-w-[500px]">
					<div bind:this={wrapper} class="w-full">
						{#if !loaded}
							<div class="flex h-[600px] items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
								<div class="text-center">
									<div class="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#1877F2]"></div>
									<p class="text-sm text-gray-400">Loading Facebook feed...</p>
								</div>
							</div>
						{/if}

						<div class="fb-page-wrapper">
							<div
								class="fb-page"
								data-href={FB_PAGE_URL}
								data-tabs="timeline"
								data-width={fbWidth}
								data-height="600"
								data-small-header="false"
								data-adapt-container-width="true"
								data-hide-cover="false"
								data-show-facepile="true"
							>
								<blockquote cite={FB_PAGE_URL} class="fb-xfbml-parse-ignore">
									<a href={FB_PAGE_URL}>Iloilo Integrated School</a>
								</blockquote>
							</div>
						</div>
					</div>
				</div>

				<!-- Follow CTA -->
				<div class="mt-8 text-center">
					<a
						href={FB_PAGE_URL}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-8 py-3.5 font-semibold text-white shadow-lg transition hover:bg-[#166FE5]"
					>
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
						</svg>
						Follow Us on Facebook
					</a>
				</div>
			{/snippet}
		</ScrollReveal>
	</div>
</section>
