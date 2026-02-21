import { PHOTOS_PER_PAGE } from './constants.js';

const KEEPSLY_API_URL = 'https://keepsly.vercel.app/api/photos';

export async function fetchKeepslyPhotos(eventId, { limit, cursor } = {}) {
	try {
		const url = new URL(`${KEEPSLY_API_URL}/${eventId}`);
		if (limit) url.searchParams.set('limit', limit);
		if (cursor) url.searchParams.set('cursor', cursor);

		const res = await fetch(url);
		if (!res.ok) return { photos: [], eventName: '', totalPhotos: 0, nextCursor: null };

		const data = await res.json();
		return {
			photos: data.photos || [],
			eventName: data.eventName || '',
			totalPhotos: data.total || 0,
			nextCursor: data.nextCursor || null
		};
	} catch {
		return { photos: [], eventName: '', totalPhotos: 0, nextCursor: null };
	}
}

export async function fetchKeepslyPhotoPaged(eventId, cursor = null, limit = PHOTOS_PER_PAGE) {
	const { photos, totalPhotos, nextCursor } = await fetchKeepslyPhotos(eventId, { limit, cursor });

	return {
		photos,
		totalPhotos,
		nextCursor,
		hasMore: nextCursor !== null
	};
}
