<script>
	import { PortableText } from '@portabletext/svelte';
	import SanityImage from '$lib/components/shared/SanityImage.svelte';

	let { content } = $props();
</script>

<div class="portable-text">
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

<style>
	.portable-text :global(h1) {
		font-size: 2rem;
		font-weight: 800;
		margin-top: 2rem;
		margin-bottom: 1rem;
		color: #1f2937;
	}
	.portable-text :global(h2) {
		font-size: 1.5rem;
		font-weight: 700;
		margin-top: 1.75rem;
		margin-bottom: 0.75rem;
		color: #1f2937;
	}
	.portable-text :global(h3) {
		font-size: 1.25rem;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
		color: #1f2937;
	}
	.portable-text :global(p) {
		margin-bottom: 1.25rem;
		line-height: 1.75;
		color: #4b5563;
	}
	.portable-text :global(ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin-bottom: 1.25rem;
	}
	.portable-text :global(ol) {
		list-style-type: decimal;
		padding-left: 1.5rem;
		margin-bottom: 1.25rem;
	}
	.portable-text :global(li) {
		margin-bottom: 0.5rem;
		line-height: 1.75;
		color: #4b5563;
	}
	.portable-text :global(blockquote) {
		border-left: 4px solid #9bb8f0;
		padding-left: 1rem;
		margin: 1.5rem 0;
		font-style: italic;
		color: #6b7280;
	}
	.portable-text :global(a) {
		color: #7a9ad4;
		text-decoration: underline;
	}
	.portable-text :global(strong) {
		font-weight: 600;
		color: #1f2937;
	}
</style>
