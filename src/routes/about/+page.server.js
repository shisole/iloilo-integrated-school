import { getClient } from '$lib/sanity/client.js';
import { leadersQuery, faqQuery } from '$lib/sanity/queries.js';

export async function load() {
	const client = getClient();
	if (!client) return { leaders: [], faqs: [] };

	try {
		const [leaders, faqs] = await Promise.all([
			client.fetch(leadersQuery),
			client.fetch(faqQuery)
		]);
		return {
			leaders: leaders || [],
			faqs: faqs || []
		};
	} catch {
		return { leaders: [], faqs: [] };
	}
}
