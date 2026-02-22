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

	let currentIndex = $state(0);
	let isPaused = $state(false);

	$effect(() => {
		if (testimonials.length <= 1 || isPaused) return;
		const interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % testimonials.length;
		}, 6000);
		return () => clearInterval(interval);
	});

	function goTo(index) {
		currentIndex = index;
	}
</script>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading
			title="What Parents Say"
			subtitle="Hear from families who call IIS home"
		/>

		<ScrollReveal>
			{#snippet children()}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="mx-auto mt-12 max-w-2xl text-center"
					onmouseenter={() => (isPaused = true)}
					onmouseleave={() => (isPaused = false)}
				>
					<svg class="mx-auto mb-6 h-10 w-10 text-accent-yellow" fill="currentColor" viewBox="0 0 24 24">
						<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
					</svg>

					{#key currentIndex}
						<div class="animate-fade-in">
							<blockquote class="mb-6 text-lg text-gray-700 italic md:text-xl">
								"{testimonials[currentIndex].quote}"
							</blockquote>
							<p class="font-bold text-gray-900">{testimonials[currentIndex].name}</p>
							<p class="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
						</div>
					{/key}

					{#if testimonials.length > 1}
						<div class="mt-8 flex items-center justify-center gap-2">
							{#each testimonials as _, i}
								<button
									type="button"
									class="h-2.5 w-2.5 cursor-pointer rounded-full transition-all {i === currentIndex
										? 'scale-125 bg-accent-blue-dark'
										: 'bg-gray-300 hover:bg-gray-400'}"
									aria-label="Go to testimonial {i + 1}"
									onclick={() => goTo(i)}
								></button>
							{/each}
						</div>
					{/if}
				</div>
			{/snippet}
		</ScrollReveal>
	</div>
</section>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.5s ease-out;
	}
</style>
