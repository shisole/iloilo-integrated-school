<script>
	let { settings = null } = $props();

	let schoolName = $derived(settings?.schoolName || 'Iloilo Integrated School Inc.');
	let tagline = $derived(settings?.tagline || 'Nurturing Young Minds Since 2001');
	let foundedYear = $derived(settings?.foundedYear || 2001);
</script>

<section class="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
	<!-- Background gradient -->
	<div
		class="absolute inset-0 bg-gradient-to-br from-accent-blue/30 via-page to-accent-yellow/20"
	></div>

	<!-- Decorative shapes -->
	<div
		class="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent-yellow/30 blur-3xl"
	></div>
	<div
		class="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-accent-blue/30 blur-3xl"
	></div>

	<!-- Content -->
	<div class="relative z-10 px-6 text-center">
		<img
			src="/images/logo.png"
			alt="{schoolName} Logo"
			class="mx-auto mb-8 h-32 w-32 object-contain drop-shadow-lg"
		/>

		<div
			class="mb-6 inline-block rounded-full border border-accent-yellow bg-accent-yellow/40 px-4 py-1.5 text-sm font-medium text-gray-700"
		>
			Est. {foundedYear}
		</div>

		<h1 class="mb-6 font-display text-4xl leading-tight font-extrabold text-gray-900 md:text-6xl lg:text-7xl">
			{schoolName}
		</h1>

		<p class="mx-auto mb-10 max-w-2xl text-lg text-gray-600 md:text-xl">
			{tagline}
		</p>

		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href={settings?.enrollmentUrl || '#contact'}
				class="rounded-full bg-accent-yellow px-8 py-3.5 font-semibold text-gray-800 shadow-lg transition hover:bg-accent-yellow-dark hover:shadow-xl"
			>
				Enroll Now
			</a>
			<a
				href="/blog"
				class="rounded-full border-2 border-accent-blue px-8 py-3.5 font-semibold text-gray-700 transition hover:bg-accent-blue/20"
			>
				Read Our Stories
			</a>
		</div>
	</div>

	<!-- Scroll indicator -->
	<button
		type="button"
		class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-900/10"
		aria-label="Scroll to What's Happening"
		onclick={() => document.getElementById('whats-happening')?.scrollIntoView({ behavior: 'smooth' })}
	>
		<svg
			class="h-6 w-6 text-gray-400"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M19 14l-7 7m0 0l-7-7m7 7V3"
			/>
		</svg>
	</button>
</section>
