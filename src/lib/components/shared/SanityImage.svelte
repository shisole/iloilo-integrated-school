<script>
	import { urlFor } from '$lib/sanity/image.js';

	let {
		image = null,
		alt = '',
		width = undefined,
		height = undefined,
		class: className = ''
	} = $props();

	let loaded = $state(false);

	let imageUrl = $derived.by(() => {
		if (!image) return null;
		let builder = urlFor(image);
		if (width) builder = builder.width(width);
		if (height) builder = builder.height(height);
		return builder.url();
	});

	function onLoad() {
		loaded = true;
	}

	$effect(() => {
		if (imageUrl) {
			loaded = false;
		}
	});
</script>

{#if imageUrl}
	<div class="relative h-full w-full">
		{#if !loaded}
			<div class="absolute inset-0 animate-skeleton rounded bg-gray-200"></div>
		{/if}
		<img
			src={imageUrl}
			{alt}
			width={width ?? undefined}
			height={height ?? undefined}
			class="{className} transition-opacity duration-300 {loaded ? 'opacity-100' : 'opacity-0'}"
			loading="lazy"
			onload={onLoad}
		/>
	</div>
{/if}
