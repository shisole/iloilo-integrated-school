<script>
	import SEO from '$lib/components/shared/SEO.svelte';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';

	let { data } = $props();

	const fallbackTestimonials = [
		{
			quote: 'IIS gave my child a second home. The teachers truly care — they know every student by name.',
			name: 'Maria S.',
			role: 'Parent of Grade 3 student'
		},
		{
			quote: 'What I love about IIS is the values they teach. My child comes home kinder, more confident, and excited to learn.',
			name: 'Jose R.',
			role: 'Parent of Grade 5 student'
		},
		{
			quote: "We chose IIS because of their heart. Twenty-five years later, they still treat every family like their own.",
			name: 'Ana L.',
			role: 'Parent of Grade 1 student'
		},
		{
			quote: 'The school feels like family. My children have grown not just academically, but as kind and confident individuals.',
			name: 'Elena D.',
			role: 'Parent of Grade 2 and Grade 6 students'
		},
		{
			quote: 'IIS taught my child that being smart is not just about grades — it is about heart, effort, and kindness.',
			name: 'Carlos M.',
			role: 'Parent of Grade 4 student'
		},
		{
			quote: 'From day one, the teachers made my daughter feel welcome and safe. That is something you cannot put a price on.',
			name: 'Grace T.',
			role: 'Parent of Grade 1 student'
		}
	];

	let testimonials = $derived(
		data.settings?.testimonials?.length ? data.settings.testimonials : fallbackTestimonials
	);

	const accentColors = [
		{ border: 'border-accent-blue/30', bg: 'bg-accent-blue/5', icon: 'text-accent-blue' },
		{ border: 'border-accent-yellow/50', bg: 'bg-accent-yellow/10', icon: 'text-accent-yellow-dark' },
	];
</script>

<SEO
	title="Testimonials"
	description="Hear from parents and families who call Iloilo Integrated School home."
	ogImage={data.settings?.ogImage}
/>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-5xl px-6">
		<Breadcrumb items={[{ label: 'Testimonials' }]} />
		<SectionHeading
			title="What Parents Say"
			subtitle="Stories from families who trust IIS with their children's future"
		/>

		<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each testimonials as testimonial, i}
				{@const colors = accentColors[i % accentColors.length]}
				<ScrollReveal delay={i * 80}>
					{#snippet children()}
						<div class="rounded-2xl border {colors.border} {colors.bg} p-8 shadow-md transition-shadow hover:shadow-lg">
							<svg class="mb-4 h-8 w-8 {colors.icon}" fill="currentColor" viewBox="0 0 24 24">
								<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
							</svg>
							<blockquote class="mb-5 text-gray-700 italic leading-relaxed">
								"{testimonial.quote}"
							</blockquote>
							<div>
								<p class="font-bold text-gray-900">{testimonial.name}</p>
								<p class="text-sm text-gray-500">{testimonial.role}</p>
							</div>
						</div>
					{/snippet}
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>
