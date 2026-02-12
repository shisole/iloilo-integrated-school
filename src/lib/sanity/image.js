import imageUrlBuilder from '@sanity/image-url';
import { client } from './client.js';

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source) {
	if (!builder) return { url: () => '', width: () => ({ height: () => ({ url: () => '' }) }) };
	return builder.image(source);
}
