import { getClient } from '$lib/sanity/client.js';
import { allEventsQuery } from '$lib/sanity/queries.js';

export async function load() {
	const client = getClient();
	if (!client) return { events: [] };

	try {
		const events = await client.fetch(allEventsQuery);
		return { events: events || [] };
	} catch {
		return { events: [] };
	}
}
