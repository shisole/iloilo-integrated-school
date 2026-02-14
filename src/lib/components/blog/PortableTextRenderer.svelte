<script>
	import { PortableText } from '@portabletext/svelte';
	import ImageBlock from './ImageBlock.svelte';

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
