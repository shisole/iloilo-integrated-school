<script>
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';

	const FB_PAGE_URL = 'https://www.facebook.com/iis2001';
	const encodedUrl = encodeURIComponent(FB_PAGE_URL);
</script>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading
			title="From Our Facebook"
			subtitle="Follow us on Facebook for the latest updates, photos, and announcements"
		/>

		<ScrollReveal>
			{#snippet children()}
				<div class="mx-auto mt-12 max-w-[500px]">
					<!-- Facebook Page Plugin -->
					<div class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
						<iframe
							title="Iloilo Integrated School Facebook Page"
							src="https://www.facebook.com/plugins/page.php?href={encodedUrl}&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
							width="100%"
							height="800"
							style="border:none;overflow:hidden"
							scrolling="no"
							frameborder="0"
							allowfullscreen
							allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
							loading="lazy"
						></iframe>
					</div>

					<!-- Follow button -->
					<div class="mt-6 text-center">
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
				</div>
			{/snippet}
		</ScrollReveal>
	</div>
</section>
