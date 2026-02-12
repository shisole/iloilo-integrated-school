<script>
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';

	let { settings = null } = $props();
</script>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-4xl px-6">
		<ScrollReveal>
			{#snippet children()}
				<div
					class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-blue/20 via-card to-accent-yellow/20 p-10 text-center shadow-sm md:p-16"
				>
					<!-- Decorative dots -->
					<div class="absolute top-4 left-4 h-16 w-16 rounded-full bg-accent-yellow/30 blur-2xl"></div>
					<div class="absolute right-4 bottom-4 h-16 w-16 rounded-full bg-accent-blue/30 blur-2xl"></div>

					<h2 class="relative mb-4 font-display text-3xl font-extrabold text-gray-900 md:text-4xl">
						Join Our School Family
					</h2>
					<p class="relative mx-auto mb-8 max-w-xl text-gray-600">
						Give your child the gift of quality education rooted in values, creativity, and community.
						Enroll today and become part of the IIS family.
					</p>

					<div class="relative flex flex-col items-center justify-center gap-4 sm:flex-row">
						<a
							href={settings?.enrollmentUrl || '#'}
							class="rounded-full bg-accent-yellow px-8 py-3.5 font-semibold text-gray-800 shadow-lg transition hover:bg-accent-yellow-dark hover:shadow-xl"
						>
							Enroll Now
						</a>
						<a
							href="mailto:{settings?.email || ''}"
							class="rounded-full border-2 border-accent-blue px-8 py-3.5 font-semibold text-gray-700 transition hover:bg-accent-blue/20"
						>
							Contact Us
						</a>
					</div>
				</div>
			{/snippet}
		</ScrollReveal>
	</div>
</section>
