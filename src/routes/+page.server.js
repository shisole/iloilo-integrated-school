import { getClient } from '$lib/sanity/client.js';
import { latestEventsQuery, latestPostsQuery, pastEventsQuery, latestGalleryEventsQuery } from '$lib/sanity/queries.js';
import { fetchKeepslyPhotos } from '$lib/utils/keepsly.js';

export async function load() {
	const client = getClient();
	if (!client) return { events: [], pastEvents: [], posts: [], galleryPreview: [] };

	try {
		const [events, pastEvents, posts, galleryEvents] = await Promise.all([
			client.fetch(latestEventsQuery),
			client.fetch(pastEventsQuery),
			client.fetch(latestPostsQuery),
			client.fetch(latestGalleryEventsQuery)
		]);

		let galleryPreview = [];
		if (galleryEvents?.length) {
			const galleries = await Promise.all(
				galleryEvents.map(async (event) => {
					const { photos } = await fetchKeepslyPhotos(event.keepslyEventId);
					return { ...event, photos };
				})
			);
			galleryPreview = galleries.filter((g) => g.photos.length > 0);
		}

		return {
			events: events || [],
			pastEvents: pastEvents || [],
			posts: posts || [],
			galleryPreview
		};
	} catch {
		return { events: [], pastEvents: [], posts: [], galleryPreview: [] };
	}
}
