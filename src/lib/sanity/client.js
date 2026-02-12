import { createClient } from '@sanity/client';
import {
	PUBLIC_SANITY_PROJECT_ID,
	PUBLIC_SANITY_DATASET,
	PUBLIC_SANITY_API_VERSION
} from '$env/static/public';

const projectId = PUBLIC_SANITY_PROJECT_ID;
const isSanityConfigured = projectId && /^[a-z0-9-]+$/.test(projectId);

export const client = isSanityConfigured
	? createClient({
			projectId,
			dataset: PUBLIC_SANITY_DATASET || 'production',
			apiVersion: PUBLIC_SANITY_API_VERSION || '2025-02-06',
			useCdn: true
		})
	: null;
