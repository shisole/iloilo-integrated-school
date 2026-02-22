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
		settings?.testimonials?.length ? settings.testimonials : fallbackTestimonials
	);

	let useMarquee = $derived(testimonials.length >= 4);
	let isPaused = $state(false);
</script>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading
			title="What Parents & Alumni Say"
			subtitle="Hear from families and graduates who call IIS home"
		/>
	</div>

	<ScrollReveal>
		{#snippet children()}
			{#if useMarquee}
				<!-- Marquee: 4+ testimonials, infinite horizontal scroll -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="marquee-container mt-12 overflow-hidden"
					onmouseenter={() => (isPaused = true)}
					onmouseleave={() => (isPaused = false)}
				>
					<div class="marquee-track" class:paused={isPaused}>
						{#each [0, 1] as _set}
							{#each testimonials as testimonial}
								<div class="mx-3 w-80 shrink-0 rounded-2xl border border-gray-100 bg-card p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] md:w-96">
									<svg class="mb-3 h-6 w-6 text-accent-yellow" fill="currentColor" viewBox="0 0 24 24">
										<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
									</svg>
									<blockquote class="mb-4 text-sm text-gray-700 italic">
										"{testimonial.quote}"
									</blockquote>
									<p class="font-bold text-gray-900">{testimonial.name}</p>
									<p class="text-xs text-gray-500">{testimonial.role}</p>
								</div>
							{/each}
						{/each}
					</div>
				</div>
			{:else}
				<!-- Static: fewer than 4 testimonials, centered stack -->
				<div class="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-8 px-6">
					{#each testimonials as testimonial}
						<div class="text-center">
							<svg class="mx-auto mb-4 h-8 w-8 text-accent-yellow" fill="currentColor" viewBox="0 0 24 24">
								<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
							</svg>
							<blockquote class="mb-4 text-lg text-gray-700 italic">
								"{testimonial.quote}"
							</blockquote>
							<p class="font-bold text-gray-900">{testimonial.name}</p>
							<p class="text-sm text-gray-500">{testimonial.role}</p>
						</div>
					{/each}
				</div>
			{/if}

			<div class="mt-10 text-center">
				<a
					href="/testimonials"
					class="inline-flex items-center gap-2 font-semibold text-accent-blue-dark transition hover:gap-3"
				>
					View All Testimonials
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div>
		{/snippet}
	</ScrollReveal>
</section>

<style>
	.marquee-container {
		-webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
		mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
	}

	.marquee-track {
		display: flex;
		width: max-content;
		animation: marquee 40s linear infinite;
	}

	.marquee-track.paused {
		animation-play-state: paused;
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
</style>
