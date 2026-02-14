<script>
	import SEO from '$lib/components/shared/SEO.svelte';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';
	import PortableTextRenderer from '$lib/components/blog/PortableTextRenderer.svelte';

	let { data } = $props();

	let admissions = $derived(data.admissions);
	let settings = $derived(data.settings);

	let enrollmentStatus = $derived.by(() => {
		if (!admissions?.enrollmentPeriod?.startDate || !admissions?.enrollmentPeriod?.endDate) {
			return null;
		}
		const now = new Date();
		const start = new Date(admissions.enrollmentPeriod.startDate);
		const end = new Date(admissions.enrollmentPeriod.endDate);
		if (now >= start && now <= end) return 'open';
		if (now < start) return 'upcoming';
		return 'closed';
	});

	function formatPeriodDate(dateString) {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<SEO
	title="Admissions"
	description="Learn about enrollment requirements, steps, and how to join Iloilo Integrated School Inc."
/>

<section class="py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<Breadcrumb items={[{ label: 'Admissions' }]} />
		<SectionHeading
			title="Admissions"
			subtitle="Everything you need to know about enrolling at our school"
		/>

		{#if admissions}
			<!-- Enrollment Period Banner -->
			{#if enrollmentStatus}
				<ScrollReveal>
					{#snippet children()}
						<div class="mt-12 overflow-hidden rounded-2xl {enrollmentStatus === 'open'
							? 'bg-green-50 border border-green-200'
							: enrollmentStatus === 'upcoming'
								? 'bg-accent-blue/10 border border-accent-blue/20'
								: 'bg-gray-50 border border-gray-200'}">
							<div class="flex flex-col items-center gap-4 px-6 py-8 text-center sm:flex-row sm:text-left">
								<div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full {enrollmentStatus === 'open'
									? 'bg-green-100'
									: enrollmentStatus === 'upcoming'
										? 'bg-accent-blue/20'
										: 'bg-gray-200'}">
									<svg class="h-7 w-7 {enrollmentStatus === 'open'
										? 'text-green-600'
										: enrollmentStatus === 'upcoming'
											? 'text-accent-blue-dark'
											: 'text-gray-500'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
								</div>
								<div>
									<h3 class="text-lg font-bold {enrollmentStatus === 'open'
										? 'text-green-800'
										: enrollmentStatus === 'upcoming'
											? 'text-accent-blue-dark'
											: 'text-gray-700'}">
										{enrollmentStatus === 'open'
											? 'Enrollment is Open!'
											: enrollmentStatus === 'upcoming'
												? 'Enrollment Opening Soon'
												: 'Enrollment Period Has Ended'}
									</h3>
									<p class="mt-1 text-sm {enrollmentStatus === 'open'
										? 'text-green-700'
										: enrollmentStatus === 'upcoming'
											? 'text-accent-blue-dark/70'
											: 'text-gray-500'}">
										{formatPeriodDate(admissions.enrollmentPeriod.startDate)} — {formatPeriodDate(admissions.enrollmentPeriod.endDate)}
									</p>
								</div>
							</div>
						</div>
					{/snippet}
				</ScrollReveal>
			{/if}

			<!-- Overview -->
			{#if admissions.overview}
				<ScrollReveal>
					{#snippet children()}
						<div class="mt-16">
							<PortableTextRenderer content={admissions.overview} />
						</div>
					{/snippet}
				</ScrollReveal>
			{/if}

			<!-- Enrollment Steps -->
			{#if admissions.steps?.length > 0}
				<ScrollReveal>
					{#snippet children()}
						<div class="mt-20">
							<h3 class="text-2xl font-bold text-gray-900">Enrollment Steps</h3>
							<div class="mt-3 h-1 w-16 rounded-full bg-accent-yellow"></div>
							<div class="relative mt-10">
								<!-- Vertical timeline line -->
								<div class="absolute left-6 top-0 bottom-0 w-0.5 bg-accent-blue/20 sm:left-8"></div>

								<div class="space-y-8">
									{#each admissions.steps as step}
										<div class="relative flex gap-5 sm:gap-7">
											<div class="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-blue text-lg font-bold text-white shadow-md sm:h-16 sm:w-16 sm:text-xl">
												{step.stepNumber}
											</div>
											<div class="pt-1 sm:pt-3">
												<h4 class="text-lg font-semibold text-gray-900">{step.title}</h4>
												{#if step.description}
													<p class="mt-1.5 text-gray-600">{step.description}</p>
												{/if}
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					{/snippet}
				</ScrollReveal>
			{/if}

			<!-- Requirements -->
			{#if admissions.requirements?.length > 0}
				<ScrollReveal>
					{#snippet children()}
						<div class="mt-20">
							<h3 class="text-2xl font-bold text-gray-900">Requirements</h3>
							<div class="mt-3 h-1 w-16 rounded-full bg-accent-yellow"></div>
							<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{#each admissions.requirements as req}
									<div class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
										<div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-blue/10">
											<svg class="h-5 w-5 text-accent-blue-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										</div>
										<h4 class="font-semibold text-gray-900">{req.title}</h4>
										{#if req.description}
											<p class="mt-2 text-sm text-gray-600">{req.description}</p>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					{/snippet}
				</ScrollReveal>
			{/if}

			<!-- Contact Info -->
			{#if admissions.contactInfo}
				<ScrollReveal>
					{#snippet children()}
						<div class="mt-20 rounded-2xl bg-gray-50 p-8 text-center">
							<h3 class="text-xl font-bold text-gray-900">Admissions Contact</h3>
							<p class="mt-3 whitespace-pre-line text-gray-600">{admissions.contactInfo}</p>
						</div>
					{/snippet}
				</ScrollReveal>
			{/if}

			<!-- CTA -->
			{#if settings?.enrollmentUrl}
				<ScrollReveal>
					{#snippet children()}
						<div class="mt-12 text-center">
							<a
								href={settings.enrollmentUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-2 rounded-full bg-accent-blue px-8 py-3.5 font-semibold text-white shadow-lg transition hover:bg-accent-blue-dark"
							>
								Enroll Now
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
						</div>
					{/snippet}
				</ScrollReveal>
			{/if}
		{:else}
			<!-- Empty state -->
			<div class="mt-16 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
				<svg class="mx-auto mb-4 h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
				</svg>
				<p class="text-gray-500">Admissions information coming soon.</p>
				<p class="mt-1 text-sm text-gray-400">Add admissions details through the Sanity Studio.</p>
			</div>
		{/if}
	</div>
</section>
