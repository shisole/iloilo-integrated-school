<script>
	let { title, subtitle = '', centered = true } = $props();
</script>

<div class={centered ? 'text-center' : ''}>
	<h2 class="text-3xl font-bold text-gray-900 md:text-4xl">
		{title}
	</h2>
	<div
		class="mt-3 h-1 w-16 rounded-full bg-accent-yellow {centered ? 'mx-auto' : ''}"
	></div>
	{#if subtitle}
		<p class="mt-4 max-w-2xl text-lg text-gray-600 {centered ? 'mx-auto' : ''}">
			{subtitle}
		</p>
	{/if}
</div>
