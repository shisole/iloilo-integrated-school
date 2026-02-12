import { client } from '$lib/sanity/client.js';
import { latestEventsQuery, latestPostsQuery, pastEventsQuery } from '$lib/sanity/queries.js';

export async function load() {
	if (!client) return { events: [], pastEvents: [], posts: [] };

	try {
		const [events, pastEvents, posts] = await Promise.all([
			client.fetch(latestEventsQuery),
			client.fetch(pastEventsQuery),
			client.fetch(latestPostsQuery)
		]);

		return { events: events || [], pastEvents: pastEvents || [], posts: posts || [] };
	} catch {
		return { events: [], pastEvents: [], posts: [] };
	}
}
