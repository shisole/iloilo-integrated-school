import { json } from '@sveltejs/kit';
import { client } from '$lib/sanity/client.js';
import { allPostsQuery } from '$lib/sanity/queries.js';
import { POSTS_PER_PAGE } from '$lib/utils/constants.js';

export async function GET({ url }) {
	const page = parseInt(url.searchParams.get('page') || '1');
	const start = (page - 1) * POSTS_PER_PAGE;
	const end = start + POSTS_PER_PAGE;

	if (!client) return json([]);

	try {
		const posts = await client.fetch(allPostsQuery, { start, end });
		return json(posts || []);
	} catch {
		return json([]);
	}
}
