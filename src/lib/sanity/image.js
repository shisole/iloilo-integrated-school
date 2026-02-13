import imageUrlBuilder from '@sanity/image-url';
import { SANITY_CONFIG } from './config.js';

const builder = SANITY_CONFIG.projectId
	? imageUrlBuilder({ projectId: SANITY_CONFIG.projectId, dataset: SANITY_CONFIG.dataset })
	: null;

export function urlFor(source) {
	if (!builder) return { url: () => '', width: () => ({ height: () => ({ url: () => '' }) }) };
	return builder.image(source).auto('format').quality(80);
}
