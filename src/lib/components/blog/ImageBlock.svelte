<script>
	import { urlFor } from '$lib/sanity/image.js';

	let { portableText } = $props();

	let image = $derived(portableText?.value);
	let imageUrl = $derived(image ? urlFor(image).width(960).quality(80).url() : null);
</script>

{#if imageUrl}
	<figure class="my-8">
		<img
			src={imageUrl}
			alt={image?.alt || ''}
			class="w-full rounded-xl"
			loading="lazy"
		/>
		{#if image?.caption}
			<figcaption class="mt-2 text-center text-sm text-gray-500">
				{image.caption}
			</figcaption>
		{/if}
	</figure>
{/if}
