import { createClient } from '@sanity/client';
import { SANITY_CONFIG } from './config.js';

export function getClient() {
	const { projectId, dataset, apiVersion } = SANITY_CONFIG;
	const isSanityConfigured = projectId && /^[a-z0-9-]+$/.test(projectId);
	return isSanityConfigured
		? createClient({
				projectId,
				dataset,
				apiVersion,
				useCdn: true
			})
		: null;
}
