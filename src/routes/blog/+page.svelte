<script>
	import SEO from '$lib/components/shared/SEO.svelte';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import BlogList from '$lib/components/blog/BlogList.svelte';
	import LoadMoreButton from '$lib/components/blog/LoadMoreButton.svelte';
	import { POSTS_PER_PAGE } from '$lib/utils/constants.js';

	let { data } = $props();
	let extraPosts = $state([]);
	let currentPage = $state(1);
	let isLoading = $state(false);
	let posts = $derived([...data.posts, ...extraPosts]);
	let hasMore = $derived(posts.length < data.totalPosts);

	async function loadMore() {
		isLoading = true;
		try {
			const res = await fetch(`/api/posts?page=${currentPage + 1}`);
			const newPosts = await res.json();
			extraPosts = [...extraPosts, ...newPosts];
			currentPage += 1;
		} catch (err) {
			console.error('Failed to load more posts:', err);
		} finally {
			isLoading = false;
		}
	}
</script>

<SEO
	title="School News & Updates"
	description="Stay updated with the latest news, stories, and announcements from Iloilo Integrated School Inc."
/>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<Breadcrumb items={[{ label: 'Blog' }]} />
		<SectionHeading
			title="School News & Updates"
			subtitle="Stories, announcements, and highlights from our school community"
		/>

		<div class="mt-12">
			<BlogList {posts} loadingCount={isLoading ? POSTS_PER_PAGE : 0} />
			<LoadMoreButton onclick={loadMore} {isLoading} {hasMore} />
		</div>
	</div>
</section>
