import { getClient } from '$lib/sanity/client.js';
import { alumniOfficersQuery, alumniSpotlightsQuery } from '$lib/sanity/queries.js';

export async function load() {
	const client = getClient();
	if (!client) return { officers: [], spotlights: [] };

	try {
		const [officers, spotlights] = await Promise.all([
			client.fetch(alumniOfficersQuery),
			client.fetch(alumniSpotlightsQuery)
		]);
		return {
			officers: officers || [],
			spotlights: spotlights || []
		};
	} catch {
		return { officers: [], spotlights: [] };
	}
}
