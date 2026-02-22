<script>
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';

	const FB_PAGE_URL = 'https://www.facebook.com/iis2001';
</script>

<ScrollReveal>
	{#snippet children()}
		<div class="mx-auto max-w-4xl px-6 py-10 md:py-14">
			<div class="flex flex-col items-center gap-5 rounded-2xl bg-[#1877F2]/5 px-8 py-8 sm:flex-row sm:justify-between sm:gap-8">
				<div class="flex items-center gap-4">
					<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1877F2]">
						<svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
							<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
						</svg>
					</div>
					<div>
						<p class="font-bold text-gray-900">Stay connected with IIS</p>
						<p class="text-sm text-gray-600">Latest updates, photos, and announcements</p>
					</div>
				</div>
				<a
					href={FB_PAGE_URL}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1877F2] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#166FE5]"
				>
					Follow Us on Facebook
				</a>
			</div>
		</div>
	{/snippet}
</ScrollReveal>
