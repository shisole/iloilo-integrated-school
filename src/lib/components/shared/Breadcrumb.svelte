<script>
	/**
	 * @type {{ items: Array<{ label: string, href?: string }> }}
	 */
	let { items } = $props();
</script>

<nav aria-label="Breadcrumb" class="mb-8">
	<ol class="flex flex-wrap items-center gap-1.5 text-sm">
		<li>
			<a href="/" class="text-gray-500 transition hover:text-gray-800">Home</a>
		</li>
		{#each items as item, i}
			<li class="text-gray-300">/</li>
			{#if item.href && i < items.length - 1}
				<li>
					<a href={item.href} class="text-gray-500 transition hover:text-gray-800">{item.label}</a>
				</li>
			{:else}
				<li class="font-medium text-gray-800">{item.label}</li>
			{/if}
		{/each}
	</ol>
</nav>
