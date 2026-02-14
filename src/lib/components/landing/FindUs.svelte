<script>
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import MapEmbed from '$lib/components/shared/MapEmbed.svelte';

	let { settings = null } = $props();
</script>

<section class="bg-gray-50 py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading
			title="Find Us"
			subtitle="Visit us at our campus or get in touch"
		/>

		<ScrollReveal>
			{#snippet children()}
				<div class="mt-12 grid items-start gap-8 lg:grid-cols-3">
					<!-- Map -->
					<div class="lg:col-span-2">
						<MapEmbed height="350" />
					</div>

					<!-- Contact details -->
					<div class="space-y-6">
						{#if settings?.address}
							<div class="flex gap-4">
								<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-blue/10">
									<svg class="h-5 w-5 text-accent-blue-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
									</svg>
								</div>
								<div>
									<h4 class="text-sm font-semibold text-gray-900">Address</h4>
									<p class="mt-0.5 text-sm text-gray-600">{settings.address}</p>
								</div>
							</div>
						{/if}

						{#if settings?.phone}
							<div class="flex gap-4">
								<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-blue/10">
									<svg class="h-5 w-5 text-accent-blue-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
									</svg>
								</div>
								<div>
									<h4 class="text-sm font-semibold text-gray-900">Phone</h4>
									<a href="tel:{settings.phone}" class="mt-0.5 inline-block text-sm text-accent-blue-dark hover:underline">
										{settings.phone}
									</a>
								</div>
							</div>
						{/if}

						{#if settings?.email}
							<div class="flex gap-4">
								<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-blue/10">
									<svg class="h-5 w-5 text-accent-blue-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
									</svg>
								</div>
								<div>
									<h4 class="text-sm font-semibold text-gray-900">Email</h4>
									<a href="mailto:{settings.email}" class="mt-0.5 inline-block text-sm text-accent-blue-dark hover:underline">
										{settings.email}
									</a>
								</div>
							</div>
						{/if}

						<div class="pt-2">
							<a
								href="/contact"
								class="inline-flex items-center gap-2 rounded-full bg-accent-blue/15 px-6 py-2.5 text-sm font-semibold text-accent-blue-dark transition hover:bg-accent-blue/25"
							>
								More Contact Info
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
						</div>
					</div>
				</div>
			{/snippet}
		</ScrollReveal>
	</div>
</section>
