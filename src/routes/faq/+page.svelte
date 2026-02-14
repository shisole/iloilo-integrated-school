<script>
	import SEO from '$lib/components/shared/SEO.svelte';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';
	import PortableTextRenderer from '$lib/components/blog/PortableTextRenderer.svelte';
	import { slide } from 'svelte/transition';

	let { data } = $props();

	let openId = $state(null);

	const categories = ['General', 'Enrollment', 'Academics', 'School Life'];

	let groupedFaqs = $derived.by(() => {
		const groups = {};
		for (const faq of data.faqs) {
			const cat = faq.category || 'General';
			if (!groups[cat]) groups[cat] = [];
			groups[cat].push(faq);
		}
		return categories.filter((c) => groups[c]?.length > 0).map((c) => ({ category: c, items: groups[c] }));
	});

	function toggle(id) {
		openId = openId === id ? null : id;
	}
</script>

<SEO
	title="FAQ"
	description="Find answers to frequently asked questions about Iloilo Integrated School Inc."
/>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-4xl px-6">
		<Breadcrumb items={[{ label: 'About', href: '/about' }, { label: 'FAQ' }]} />
		<SectionHeading
			title="Frequently Asked Questions"
			subtitle="Find answers to common questions about our school"
		/>

		{#if groupedFaqs.length > 0}
			<div class="mt-12 space-y-10">
				{#each groupedFaqs as group}
					<ScrollReveal>
						{#snippet children()}
							<div>
								<h3 class="mb-4 text-lg font-bold text-gray-900">{group.category}</h3>
								<div class="space-y-3">
									{#each group.items as faq}
										<div class="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
											<button
												type="button"
												class="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-gray-50"
												onclick={() => toggle(faq._id)}
											>
												<span class="font-medium text-gray-900">{faq.question}</span>
												<svg
													class="h-5 w-5 shrink-0 text-gray-400 transition-transform {openId === faq._id ? 'rotate-180' : ''}"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
												</svg>
											</button>
											{#if openId === faq._id}
												<div class="border-t border-gray-100 px-6 py-4" transition:slide={{ duration: 200 }}>
													<PortableTextRenderer content={faq.answer} />
												</div>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						{/snippet}
					</ScrollReveal>
				{/each}
			</div>
		{:else}
			<div class="mt-16 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
				<svg class="mx-auto mb-4 h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<p class="text-gray-500">No FAQs available yet.</p>
				<p class="mt-1 text-sm text-gray-400">Add frequently asked questions through the Sanity Studio.</p>
			</div>
		{/if}
	</div>
</section>
