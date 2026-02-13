<script>
	import { PortableText } from '@portabletext/svelte';
	import SanityImage from '$lib/components/shared/SanityImage.svelte';

	let { content } = $props();
</script>

<div class="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-accent-blue-dark prose-blockquote:border-accent-blue prose-li:text-gray-600">
	<PortableText
		value={content}
		components={{
			types: {
				image: ImageBlock
			}
		}}
	/>
</div>

{#snippet ImageBlock(node)}
	<figure class="my-8">
		<SanityImage
			image={node.value}
			alt={node.value?.alt || ''}
			class="w-full rounded-xl"
		/>
		{#if node.value?.caption}
			<figcaption class="mt-2 text-center text-sm text-gray-500">
				{node.value.caption}
			</figcaption>
		{/if}
	</figure>
{/snippet}
