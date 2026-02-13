<script>
	let { photos = [], onphotoclick } = $props();
</script>

<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4">
	{#each photos as photo, index}
		<button
			type="button"
			class="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
			onclick={() => onphotoclick(index)}
		>
			<img
				src={photo}
				alt="Event photo {index + 1}"
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
			<div class="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"></div>
		</button>
	{/each}
</div>
