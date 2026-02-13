import { error } from '@sveltejs/kit';
import { getClient } from '$lib/sanity/client.js';
import { eventByIdQuery } from '$lib/sanity/queries.js';
import { fetchKeepslyPhotos } from '$lib/utils/keepsly.js';

export async function load({ params }) {
	const client = getClient();
	if (!client) error(503, 'CMS not configured');

	const event = await client.fetch(eventByIdQuery, { id: params.id });

	if (!event) {
		error(404, 'Event not found');
	}

	let galleryPhotos = [];
	if (event.keepslyEventId) {
		const { photos } = await fetchKeepslyPhotos(event.keepslyEventId);
		galleryPhotos = photos;
	}

	return { event, galleryPhotos };
}
