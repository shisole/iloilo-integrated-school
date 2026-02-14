import { getClient } from '$lib/sanity/client.js';
import { faqQuery } from '$lib/sanity/queries.js';

export async function load() {
	const client = getClient();
	if (!client) return { faqs: [] };

	try {
		const faqs = await client.fetch(faqQuery);
		return { faqs: faqs || [] };
	} catch {
		return { faqs: [] };
	}
}
