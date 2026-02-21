export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
	schoolName,
	tagline,
	foundedYear,
	address,
	phone,
	email,
	facebookUrl,
	enrollmentUrl,
	heroImages,
	schoolStory,
	milestones[]{ year, title, description, image },
	missionText,
	missionImage,
	visionText,
	visionImage,
	coreValues[]{ title, description },
	founderTribute{ name, role, photo, quote, description },
	anniversaryTagline
}`;

export const latestEventsQuery = `*[_type == "event" && eventDate >= now()] | order(eventDate asc)[0...4]{
	_id,
	title,
	description,
	eventDate,
	endDate,
	location,
	image,
	isFeatured
}`;

export const latestPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc)[0...3]{
	_id,
	title,
	slug,
	excerpt,
	mainImage,
	publishedAt,
	category->{title}
}`;

export const allPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc)[$start...$end]{
	_id,
	title,
	slug,
	excerpt,
	mainImage,
	publishedAt,
	category->{title}
}`;

export const totalPostsQuery = `count(*[_type == "blogPost"])`;

export const postBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
	_id,
	title,
	slug,
	excerpt,
	mainImage,
	publishedAt,
	body,
	category->{title}
}`;

export const pastEventsQuery = `*[_type == "event" && eventDate < now()] | order(eventDate desc)[0...4]{
	_id,
	title,
	description,
	eventDate,
	endDate,
	location,
	image,
	isFeatured
}`;

export const allUpcomingEventsQuery = `*[_type == "event" && eventDate >= now()] | order(eventDate asc){
	_id,
	title,
	description,
	eventDate,
	endDate,
	location,
	image,
	isFeatured
}`;

export const allPastEventsQuery = `*[_type == "event" && eventDate < now()] | order(eventDate desc){
	_id,
	title,
	description,
	eventDate,
	endDate,
	location,
	image,
	isFeatured
}`;

export const eventByIdQuery = `*[_type == "event" && _id == $id][0]{
	_id,
	title,
	description,
	body,
	eventDate,
	endDate,
	location,
	image,
	isFeatured,
	keepslyEventId,
	qrCodeImage
}`;

export const latestGalleryEventsQuery = `*[_type == "event" && defined(keepslyEventId)] | order(eventDate desc)[0...2]{
	_id,
	title,
	eventDate,
	keepslyEventId
}`;

export const eventsWithGalleryQuery = `*[_type == "event" && defined(keepslyEventId)] | order(eventDate desc){
	_id,
	title,
	description,
	eventDate,
	location,
	image,
	keepslyEventId
}`;

export const leadersQuery = `*[_type == "leader"] | order(order asc){
	_id,
	name,
	role,
	category,
	photo,
	bio,
	order
}`;

export const admissionsQuery = `*[_type == "admissions"][0]{
	overview,
	requirements[]{ title, description },
	steps[]{ stepNumber, title, description },
	enrollmentPeriod{ startDate, endDate },
	contactInfo
}`;

export const faqQuery = `*[_type == "faq"] | order(order asc){
	_id,
	question,
	answer,
	category,
	order
}`;

export const allEventsQuery = `*[_type == "event"] | order(eventDate asc){
	_id,
	title,
	description,
	eventDate,
	endDate,
	location,
	image,
	isFeatured
}`;

export const latestFacebookPostsQuery = `*[_type == "facebookPost"] | order(postedAt desc)[0...6]{
	_id,
	content,
	image,
	postUrl,
	postedAt
}`;
