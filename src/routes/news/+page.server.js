import { client } from '$lib/sanity/client.js';
import { allUpcomingEventsQuery, allPastEventsQuery } from '$lib/sanity/queries.js';

export async function load() {
	if (!client) return { upcomingEvents: [], pastEvents: [] };

	try {
		const [upcomingEvents, pastEvents] = await Promise.all([
			client.fetch(allUpcomingEventsQuery),
			client.fetch(allPastEventsQuery)
		]);

		return { upcomingEvents: upcomingEvents || [], pastEvents: pastEvents || [] };
	} catch {
		return { upcomingEvents: [], pastEvents: [] };
	}
}
