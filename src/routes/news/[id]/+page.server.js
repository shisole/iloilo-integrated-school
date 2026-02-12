import { error } from '@sveltejs/kit';
import { client } from '$lib/sanity/client.js';
import { eventByIdQuery } from '$lib/sanity/queries.js';

export async function load({ params }) {
	if (!client) error(503, 'CMS not configured');

	const event = await client.fetch(eventByIdQuery, { id: params.id });

	if (!event) {
		error(404, 'Event not found');
	}

	return { event };
}
