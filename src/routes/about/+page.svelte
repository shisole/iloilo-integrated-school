<script>
	import { urlFor } from '$lib/sanity/image.js';
	import SEO from '$lib/components/shared/SEO.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';

	let { data } = $props();

	let settings = $derived(data.settings);
	let missionText = $derived(
		settings?.missionText ||
			'To provide quality education that nurtures the holistic development of every learner, fostering academic excellence, moral integrity, and social responsibility.'
	);
	let visionText = $derived(
		settings?.visionText ||
			'A leading educational institution that empowers students to become compassionate, innovative, and globally competitive individuals.'
	);
	let missionImageUrl = $derived(
		settings?.missionImage ? urlFor(settings.missionImage).width(960).quality(80).url() : null
	);
	let visionImageUrl = $derived(
		settings?.visionImage ? urlFor(settings.visionImage).width(960).quality(80).url() : null
	);
</script>

<SEO
	title="About Us"
	description="Learn about the mission and vision of Iloilo Integrated School Inc."
/>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<Breadcrumb items={[{ label: 'About Us' }]} />
		<SectionHeading
			title="About Us"
			subtitle="Our mission drives what we do. Our vision inspires where we're going."
		/>

		<!-- Mission -->
		<ScrollReveal>
			<div class="mt-20 flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
				<!-- Mission Image -->
				<div class="w-full lg:w-[60%]">
					{#if missionImageUrl}
						<img
							src={missionImageUrl}
							alt="Our Mission"
							class="h-72 w-full rounded-2xl object-cover shadow-lg sm:h-80 md:h-96"
							loading="lazy"
						/>
					{:else}
						<div
							class="flex h-72 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-yellow/20 shadow-lg sm:h-80 md:h-96"
						>
							<svg
								class="h-20 w-20 text-accent-blue/40"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
								/>
							</svg>
						</div>
					{/if}
				</div>

				<!-- Mission Text -->
				<div class="w-full lg:w-[40%]">
					<span
						class="mb-3 inline-block rounded-full bg-accent-blue/15 px-4 py-1.5 text-sm font-semibold tracking-wide text-accent-blue-dark"
					>
						Our Mission
					</span>
					<h3 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">Mission</h3>
					<p class="text-lg leading-relaxed text-gray-600">{missionText}</p>
				</div>
			</div>
		</ScrollReveal>

		<!-- Vision (reversed layout) -->
		<ScrollReveal>
			<div
				class="mt-20 flex flex-col-reverse items-center gap-10 lg:flex-row lg:gap-16"
			>
				<!-- Vision Text -->
				<div class="w-full lg:w-[40%]">
					<span
						class="mb-3 inline-block rounded-full bg-accent-yellow/30 px-4 py-1.5 text-sm font-semibold tracking-wide text-amber-700"
					>
						Our Vision
					</span>
					<h3 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">Vision</h3>
					<p class="text-lg leading-relaxed text-gray-600">{visionText}</p>
				</div>

				<!-- Vision Image -->
				<div class="w-full lg:w-[60%]">
					{#if visionImageUrl}
						<img
							src={visionImageUrl}
							alt="Our Vision"
							class="h-72 w-full rounded-2xl object-cover shadow-lg sm:h-80 md:h-96"
							loading="lazy"
						/>
					{:else}
						<div
							class="flex h-72 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-accent-yellow/20 to-accent-blue/20 shadow-lg sm:h-80 md:h-96"
						>
							<svg
								class="h-20 w-20 text-accent-yellow-dark/40"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</div>
					{/if}
				</div>
			</div>
		</ScrollReveal>

		<!-- Leadership CTA -->
		<ScrollReveal>
			<div class="mt-20 text-center">
				<a
					href="/about/leadership"
					class="inline-flex items-center gap-2 rounded-full bg-accent-blue/15 px-8 py-3.5 font-semibold text-accent-blue-dark transition hover:bg-accent-blue/25"
				>
					Meet Our Leaders
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
			</div>
		</ScrollReveal>
	</div>
</section>
