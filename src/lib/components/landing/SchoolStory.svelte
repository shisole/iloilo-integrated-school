<script>
	import { urlFor } from '$lib/sanity/image.js';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import StoryTimelineItem from './StoryTimelineItem.svelte';

	let { settings = null } = $props();

	const fallbackMilestones = [
		{
			year: '2001',
			title: 'The Birth of a Dream',
			description:
				'Founded with 15 students and a handful of dedicated teachers. A promise that learning would be compassionate, that differences would be honored, and no child would be left unseen.'
		},
		{
			year: '2007',
			title: 'Tested, But Not Broken',
			description:
				'When Typhoon Frank came, the waters rose around the school. Much was lost, but faith remained. IIS rebuilt — not because it was easy, but because giving up was never an option.'
		},
		{
			year: '2020',
			title: 'Surviving the Silence',
			description:
				'Classrooms closed and the world paused. But the mission did not. IIS taught through screens, cared through distance, and kept doors open — not always in buildings, but always in spirit.'
		},
		{
			year: '2023',
			title: 'Honoring Our Founder',
			description:
				'IIS lost Dr. Ronnie Samoro — founder, mentor, and guiding light. He taught that education is love in action, and that a school is built not by walls, but by vision. His dream lives on in all of us.'
		},
		{
			year: '2026',
			title: '25 Years of Hope',
			description:
				'From 15 students to generations of dreamers, leaders, and achievers. Twenty-five years of courage, endurance, and a dream that learned to survive — and to move forward.'
		}
	];

	let milestones = $derived(
		settings?.milestones?.length ? settings.milestones : fallbackMilestones
	);

	let imageRowCounter = $derived.by(() => {
		let counter = 0;
		return milestones.map((m) => {
			const imageUrl = m.image ? urlFor(m.image).width(480).quality(80).url() : null;
			const row = imageUrl ? counter++ : 0;
			return { ...m, imageUrl, imageRow: row };
		});
	});
</script>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-4xl px-6">
		<SectionHeading title="Our Story" subtitle="A journey of dedication, growth, and love for learning" />

		<div class="relative mt-16 border-l-2 border-accent-blue/30 pl-6 md:border-l-0 md:pl-0">
			<div class="space-y-8 md:space-y-12">
				{#each imageRowCounter as milestone, i}
					<StoryTimelineItem
						year={milestone.year}
						title={milestone.title}
						description={milestone.description}
						index={i}
						imageRow={milestone.imageRow}
						imageUrl={milestone.imageUrl}
					/>
				{/each}
			</div>
		</div>
	</div>
</section>
