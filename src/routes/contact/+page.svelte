<script>
	import SEO from '$lib/components/shared/SEO.svelte';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';
	import MapEmbed from '$lib/components/shared/MapEmbed.svelte';

	let { data } = $props();

	let settings = $derived(data.settings);

	let hasContactInfo = $derived(settings?.address || settings?.phone || settings?.email || settings?.facebookUrl);
</script>

<SEO
	title="Contact Us"
	description="Get in touch with Iloilo Integrated School Inc. Find our address, phone, email, and more."
/>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<Breadcrumb items={[{ label: 'Contact' }]} />
		<SectionHeading
			title="Contact Us"
			subtitle="We'd love to hear from you. Reach out through any of the channels below."
		/>

		{#if hasContactInfo}
			<!-- Contact Cards -->
			<ScrollReveal>
				{#snippet children()}
					<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{#if settings.address}
							<div class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm text-center">
								<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue/10">
									<svg class="h-6 w-6 text-accent-blue-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
									</svg>
								</div>
								<h3 class="font-semibold text-gray-900">Address</h3>
								<p class="mt-2 text-sm text-gray-600">{settings.address}</p>
							</div>
						{/if}

						{#if settings.phone}
							<div class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm text-center">
								<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue/10">
									<svg class="h-6 w-6 text-accent-blue-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
									</svg>
								</div>
								<h3 class="font-semibold text-gray-900">Phone</h3>
								<a href="tel:{settings.phone}" class="mt-2 inline-block text-sm text-accent-blue-dark hover:underline">
									{settings.phone}
								</a>
							</div>
						{/if}

						{#if settings.email}
							<div class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm text-center">
								<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue/10">
									<svg class="h-6 w-6 text-accent-blue-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
									</svg>
								</div>
								<h3 class="font-semibold text-gray-900">Email</h3>
								<a href="mailto:{settings.email}" class="mt-2 inline-block text-sm text-accent-blue-dark hover:underline">
									{settings.email}
								</a>
							</div>
						{/if}

						{#if settings.facebookUrl}
							<div class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm text-center">
								<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue/10">
									<svg class="h-6 w-6 text-accent-blue-dark" fill="currentColor" viewBox="0 0 24 24">
										<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
									</svg>
								</div>
								<h3 class="font-semibold text-gray-900">Facebook</h3>
								<a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" class="mt-2 inline-block text-sm text-accent-blue-dark hover:underline">
									Visit our page
								</a>
							</div>
						{/if}
					</div>
				{/snippet}
			</ScrollReveal>

			<!-- Google Maps Embed -->
			<ScrollReveal>
				{#snippet children()}
					<div class="mt-12">
						<MapEmbed />
					</div>
				{/snippet}
			</ScrollReveal>
		{:else}
			<div class="mt-16 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
				<svg class="mx-auto mb-4 h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
				</svg>
				<p class="text-gray-500">Contact information coming soon.</p>
				<p class="mt-1 text-sm text-gray-400">Configure contact details in Site Settings through the Sanity Studio.</p>
			</div>
		{/if}
	</div>
</section>
