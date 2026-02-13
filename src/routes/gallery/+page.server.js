import { getClient } from '$lib/sanity/client.js';
import { eventsWithGalleryQuery } from '$lib/sanity/queries.js';
import { fetchKeepslyPhotos } from '$lib/utils/keepsly.js';

export async function load() {
	const client = getClient();
	if (!client) return { galleries: [] };

	try {
		const events = await client.fetch(eventsWithGalleryQuery);
		if (!events?.length) return { galleries: [] };

		const galleries = await Promise.all(
			events.map(async (event) => {
				const { photos } = await fetchKeepslyPhotos(event.keepslyEventId);
				return { ...event, photos };
			})
		);

		return {
			galleries: galleries.filter((g) => g.photos.length > 0)
		};
	} catch {
		return { galleries: [] };
	}
}
