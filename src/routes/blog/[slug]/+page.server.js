import { error } from '@sveltejs/kit';
import { getClient } from '$lib/sanity/client.js';
import { postBySlugQuery } from '$lib/sanity/queries.js';

export async function load({ params }) {
	const client = getClient();
	if (!client) error(503, 'CMS not configured');

	const post = await client.fetch(postBySlugQuery, { slug: params.slug });

	if (!post) {
		error(404, 'Post not found');
	}

	return { post };
}
