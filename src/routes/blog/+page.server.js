import { client } from '$lib/sanity/client.js';
import { allPostsQuery, totalPostsQuery } from '$lib/sanity/queries.js';
import { POSTS_PER_PAGE } from '$lib/utils/constants.js';

export async function load() {
	if (!client) return { posts: [], totalPosts: 0 };

	try {
		const [posts, totalPosts] = await Promise.all([
			client.fetch(allPostsQuery, { start: 0, end: POSTS_PER_PAGE }),
			client.fetch(totalPostsQuery)
		]);

		return { posts: posts || [], totalPosts: totalPosts || 0 };
	} catch {
		return { posts: [], totalPosts: 0 };
	}
}
