<script>
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import StoryTimelineItem from './StoryTimelineItem.svelte';

	const milestones = [
		{
			year: '2001',
			title: 'The Beginning',
			description:
				'Iloilo Integrated School Inc. was founded with a vision to provide quality, accessible education to the children of Iloilo. Starting with just a handful of students, the school opened its doors with heart and determination.'
		},
		{
			year: '2005',
			title: 'Growing Together',
			description:
				'As word spread about our nurturing approach to education, enrollment grew steadily. New classrooms were added, and our dedicated faculty expanded to meet the needs of our growing school family.'
		},
		{
			year: '2010',
			title: 'A Decade of Excellence',
			description:
				'Celebrating ten years of shaping young minds, the school earned recognition for its commitment to holistic education — blending academics, values formation, and creative expression.'
		},
		{
			year: '2018',
			title: 'Embracing Innovation',
			description:
				'The school integrated modern teaching methods and technology into the classroom, preparing students for the demands of the 21st century while staying rooted in Filipino values.'
		},
		{
			year: 'Today',
			title: 'Continuing the Legacy',
			description:
				'With over two decades of service, Iloilo Integrated School continues to be a beacon of learning and growth in the community — nurturing the next generation of leaders, dreamers, and achievers.'
		}
	];
</script>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-4xl px-6">
		<SectionHeading title="Our Story" subtitle="A journey of dedication, growth, and love for learning" />

		<div class="relative mt-16 border-l-2 border-accent-blue/30 pl-6 md:border-l-0 md:pl-0">
			<div class="space-y-8 md:space-y-12">
				{#each milestones as milestone, i}
					<StoryTimelineItem
						year={milestone.year}
						title={milestone.title}
						description={milestone.description}
						index={i}
					/>
				{/each}
			</div>
		</div>
	</div>
</section>
