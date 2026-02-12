export function formatDate(dateString) {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

export function formatShortDate(dateString) {
	return new Date(dateString).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric'
	});
}
