import { json } from '@sveltejs/kit';
import { fetchKeepslyPhotoPaged } from '$lib/utils/keepsly.js';

export async function GET({ url }) {
	const eventId = url.searchParams.get('eventId');
	const cursor = url.searchParams.get('cursor');

	if (!eventId) return json({ photos: [], totalPhotos: 0, nextCursor: null, hasMore: false });

	try {
		const result = await fetchKeepslyPhotoPaged(eventId, cursor || null);
		return json(result);
	} catch {
		return json({ photos: [], totalPhotos: 0, nextCursor: null, hasMore: false });
	}
}
