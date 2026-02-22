<script>
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';

	let { settings = null } = $props();

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
		}
	];

	let testimonials = $derived(
		settings?.testimonials?.length ? settings.testimonials : fallbackTestimonials
	);
</script>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading
			title="What Parents Say"
			subtitle="Hear from families who call IIS home"
		/>

		<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each testimonials as testimonial, i}
				<ScrollReveal delay={i * 100}>
					{#snippet children()}
						<div class="rounded-2xl border border-gray-100 bg-card p-8 shadow-sm">
							<svg class="mb-4 h-8 w-8 text-accent-yellow" fill="currentColor" viewBox="0 0 24 24">
								<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
							</svg>
							<blockquote class="mb-6 text-gray-700 italic">
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
