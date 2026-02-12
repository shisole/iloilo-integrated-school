<script>
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';
	import LeaderCard from './LeaderCard.svelte';

	let { leaders = [], category, label } = $props();

	let filteredLeaders = $derived(leaders.filter((l) => l.category === category));
</script>

{#if filteredLeaders.length > 0}
	<div class="mb-16">
		<h3 class="mb-8 text-center text-2xl font-bold text-gray-800">{label}</h3>

		<ScrollReveal>
			{#snippet children()}
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{#each filteredLeaders as leader}
						<LeaderCard {leader} />
					{/each}
				</div>
			{/snippet}
		</ScrollReveal>
	</div>
{/if}
