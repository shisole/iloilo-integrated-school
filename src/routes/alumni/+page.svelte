<script>
	import SEO from '$lib/components/shared/SEO.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';
	import OfficerCard from '$lib/components/alumni/OfficerCard.svelte';
	import BatchRepTable from '$lib/components/alumni/BatchRepTable.svelte';
	import SpotlightCard from '$lib/components/alumni/SpotlightCard.svelte';

	let { data } = $props();
	let officers = $derived(data.officers);
	let spotlights = $derived(data.spotlights);

	let activeTab = $state('officers');

	// Group officers by category
	let executive = $derived(officers.filter((o) => o.category === 'executive'));
	let business = $derived(officers.filter((o) => o.category === 'business'));
	let batch = $derived(officers.filter((o) => o.category === 'batch'));

	const tabs = [
		{ id: 'officers', label: 'Officers' },
		{ id: 'spotlights', label: 'Spotlights' }
	];
</script>

<SEO title="Alumni" description="Meet the IIS Alumni Club officers and discover stories from our distinguished alumni community." />

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<Breadcrumb items={[{ label: 'Alumni' }]} />
		<SectionHeading title="Alumni" subtitle="IIS Alumni Club" />

		<!-- Tabs -->
		<div class="mt-10 flex justify-center gap-2">
			{#each tabs as tab}
				<button
					type="button"
					onclick={() => (activeTab = tab.id)}
					class="rounded-full px-6 py-2.5 text-sm font-medium transition-colors {activeTab === tab.id
						? 'bg-accent-blue text-white shadow-sm'
						: 'text-gray-600 hover:bg-gray-100'}"
				>
					{tab.label}
				</button>
			{/each}
		</div>

		<!-- Officers Tab -->
		{#if activeTab === 'officers'}
			<div class="mt-12">
				<!-- Executive Officers -->
				<ScrollReveal>
					{#snippet children()}
						<div>
							<h3 class="text-2xl font-bold text-gray-900">Executive Officers</h3>
							<div class="mt-2 h-1 w-12 rounded-full bg-accent-yellow"></div>
							{#if executive.length > 0}
								<div class="mt-8">
									<!-- President featured on top -->
									{#if executive[0]}
										<div class="mx-auto max-w-sm">
											<OfficerCard officer={executive[0]} featured={true} />
										</div>
									{/if}
									<!-- Remaining officers in grid -->
									{#if executive.length > 1}
										<div class="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
											{#each executive.slice(1) as officer}
												<OfficerCard {officer} />
											{/each}
										</div>
									{/if}
								</div>
							{:else}
								<p class="mt-6 text-gray-500">Officer information coming soon.</p>
							{/if}
						</div>
					{/snippet}
				</ScrollReveal>

				<!-- Business Managers -->
				<ScrollReveal>
					{#snippet children()}
						<div class="mt-16">
							<h3 class="text-2xl font-bold text-gray-900">Business Managers</h3>
							<div class="mt-2 h-1 w-12 rounded-full bg-accent-yellow"></div>
							{#if business.length > 0}
								<div class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
									{#each business as officer}
										<OfficerCard {officer} />
									{/each}
								</div>
							{:else}
								<p class="mt-6 text-gray-500">Business manager information coming soon.</p>
							{/if}
						</div>
					{/snippet}
				</ScrollReveal>

				<!-- Batch Representatives -->
				<ScrollReveal>
					{#snippet children()}
						<div class="mt-16">
							<h3 class="text-2xl font-bold text-gray-900">Batch Representatives</h3>
							<div class="mt-2 h-1 w-12 rounded-full bg-accent-yellow"></div>
							{#if batch.length > 0}
								<div class="mt-8">
									<BatchRepTable officers={batch} />
								</div>
							{:else}
								<p class="mt-6 text-gray-500">Batch representative information coming soon.</p>
							{/if}
						</div>
					{/snippet}
				</ScrollReveal>
			</div>
		{/if}

		<!-- Spotlights Tab -->
		{#if activeTab === 'spotlights'}
			<div class="mt-12">
				{#if spotlights.length > 0}
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{#each spotlights as spotlight}
							<ScrollReveal>
								{#snippet children()}
									<SpotlightCard {spotlight} />
								{/snippet}
							</ScrollReveal>
						{/each}
					</div>
				{:else}
					<div class="mt-8 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
						<svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
						</svg>
						<p class="mt-4 text-lg font-medium text-gray-500">Alumni spotlights coming soon</p>
						<p class="mt-1 text-sm text-gray-400">Check back later for stories from our distinguished alumni.</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</section>
