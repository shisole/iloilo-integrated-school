const KEEPSLY_API_URL = 'https://keepsly.vercel.app/api/photos';

export async function fetchKeepslyPhotos(eventId) {
	try {
		const res = await fetch(`${KEEPSLY_API_URL}/${eventId}`);
		if (!res.ok) return { photos: [], eventName: '' };

		const data = await res.json();
		return {
			photos: data.photos || [],
			eventName: data.eventName || ''
		};
	} catch {
		return { photos: [], eventName: '' };
	}
}
