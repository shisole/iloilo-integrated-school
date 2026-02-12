import { getClient } from '$lib/sanity/client.js';
import { siteSettingsQuery } from '$lib/sanity/queries.js';

export async function load() {
	const client = getClient();
	if (!client) return { settings: null };

	try {
		const settings = await client.fetch(siteSettingsQuery);
		return { settings };
	} catch {
		return { settings: null };
	}
}
