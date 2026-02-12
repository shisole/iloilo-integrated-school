import { client } from '$lib/sanity/client.js';
import { leadersQuery } from '$lib/sanity/queries.js';

export async function load() {
	if (!client) return { leaders: [] };

	try {
		const leaders = await client.fetch(leadersQuery);
		return { leaders: leaders || [] };
	} catch {
		return { leaders: [] };
	}
}
