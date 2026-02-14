import { getClient } from '$lib/sanity/client.js';
import { admissionsQuery } from '$lib/sanity/queries.js';

export async function load() {
	const client = getClient();
	if (!client) return { admissions: null };

	try {
		const admissions = await client.fetch(admissionsQuery);
		return { admissions: admissions || null };
	} catch {
		return { admissions: null };
	}
}
