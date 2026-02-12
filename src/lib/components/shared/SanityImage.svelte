<script>
	import { urlFor } from '$lib/sanity/image.js';

	let {
		image = null,
		alt = '',
		width = undefined,
		height = undefined,
		class: className = ''
	} = $props();

	let imageUrl = $derived.by(() => {
		if (!image) return null;
		let builder = urlFor(image);
		if (width) builder = builder.width(width);
		if (height) builder = builder.height(height);
		return builder.url();
	});
</script>

{#if imageUrl}
	<img
		src={imageUrl}
		{alt}
		width={width ?? undefined}
		height={height ?? undefined}
		class={className}
		loading="lazy"
	/>
{/if}
