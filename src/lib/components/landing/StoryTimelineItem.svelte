<script>
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';

	let { year, title, description, index = 0 } = $props();
	let isLeft = $derived(index % 2 === 0);
</script>

<ScrollReveal delay={index * 100}>
	{#snippet children()}
		<div class="relative grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-8">
			<!-- Left content (or empty on odd) -->
			<div class="md:text-right {isLeft ? '' : 'md:order-1 md:col-start-3'}">
				{#if isLeft}
					<div class="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm">
						<span class="mb-2 inline-block rounded-full bg-accent-yellow/50 px-3 py-1 text-sm font-bold text-gray-700">
							{year}
						</span>
						<h3 class="mb-2 text-lg font-bold text-gray-900">{title}</h3>
						<p class="text-gray-600">{description}</p>
					</div>
				{/if}
			</div>

			<!-- Timeline line + dot -->
			<div class="hidden flex-col items-center md:flex">
				<div class="h-4 w-0.5 bg-accent-blue/40"></div>
				<div class="h-4 w-4 rounded-full border-2 border-accent-blue bg-card shadow-sm"></div>
				<div class="w-0.5 flex-1 bg-accent-blue/40"></div>
			</div>

			<!-- Right content (or empty on even) -->
			<div class="{isLeft ? '' : 'md:order-none'}">
				{#if !isLeft}
					<div class="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm">
						<span class="mb-2 inline-block rounded-full bg-accent-yellow/50 px-3 py-1 text-sm font-bold text-gray-700">
							{year}
						</span>
						<h3 class="mb-2 text-lg font-bold text-gray-900">{title}</h3>
						<p class="text-gray-600">{description}</p>
					</div>
				{/if}
			</div>

			<!-- Mobile-only year dot -->
			<div class="absolute -left-3 top-6 flex items-center md:hidden">
				<div class="h-3 w-3 rounded-full border-2 border-accent-blue bg-card"></div>
			</div>
		</div>
	{/snippet}
</ScrollReveal>
