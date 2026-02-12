<script>
	import { urlFor } from '$lib/sanity/image.js';

	let { settings = null } = $props();

	let schoolName = $derived(settings?.schoolName || 'Iloilo Integrated School Inc.');
	let tagline = $derived(settings?.tagline || 'Nurturing Young Minds Since 2001');
	let foundedYear = $derived(settings?.foundedYear || 2001);

	let images = $derived(settings?.heroImages ?? []);
	let hasImages = $derived(images.length > 0);
	let hasMultipleImages = $derived(images.length > 1);
	let imageUrls = $derived(images.map((img) => urlFor(img).width(1920).quality(80).url()));

	let currentIndex = $state(0);
	let isPaused = $state(false);
	let timerVersion = $state(0);

	function next() {
		currentIndex = (currentIndex + 1) % images.length;
		timerVersion++;
	}

	function prev() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
		timerVersion++;
	}

	function goTo(index) {
		currentIndex = index;
		timerVersion++;
	}

	$effect(() => {
		if (!hasMultipleImages || isPaused) return;
		// Access timerVersion to reset when it changes
		timerVersion;
		const interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % images.length;
		}, 5000);
		return () => clearInterval(interval);
	});
</script>

<section
	class="relative flex min-h-[70vh] items-center justify-center overflow-hidden"
	aria-label="Hero carousel"
	onmouseenter={() => (isPaused = true)}
	onmouseleave={() => (isPaused = false)}
>
	{#if hasImages}
		<!-- Carousel background images -->
		{#each imageUrls as url, i}
			<div
				class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
				style="background-image: url({url}); opacity: {i === currentIndex ? 1 : 0};"
			></div>
		{/each}
		<!-- Dark overlay for text contrast -->
		<div class="absolute inset-0 bg-black/40"></div>
	{:else}
		<!-- Gradient fallback -->
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
	{/if}

	<!-- Content -->
	<div class="relative z-10 px-6 text-center">
		<img
			src="/images/logo.png"
			alt="{schoolName} Logo"
			class="mx-auto mb-8 h-32 w-32 object-contain drop-shadow-lg"
		/>

		<div
			class="mb-6 inline-block rounded-full border px-4 py-1.5 text-sm font-medium {hasImages
				? 'border-white/40 bg-white/20 text-white'
				: 'border-accent-yellow bg-accent-yellow/40 text-gray-700'}"
		>
			Est. {foundedYear}
		</div>

		<h1
			class="mb-6 font-display text-4xl leading-tight font-extrabold md:text-6xl lg:text-7xl {hasImages
				? 'text-white drop-shadow-lg'
				: 'text-gray-900'}"
		>
			{schoolName}
		</h1>

		<p
			class="mx-auto mb-10 max-w-2xl text-lg md:text-xl {hasImages
				? 'text-white/90 drop-shadow'
				: 'text-gray-600'}"
		>
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
				class="rounded-full border-2 px-8 py-3.5 font-semibold transition {hasImages
					? 'border-white/70 text-white hover:bg-white/20'
					: 'border-accent-blue text-gray-700 hover:bg-accent-blue/20'}"
			>
				Read Our Stories
			</a>
		</div>
	</div>

	<!-- Carousel controls -->
	{#if hasMultipleImages}
		<!-- Arrow buttons -->
		<button
			type="button"
			class="absolute left-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50"
			aria-label="Previous image"
			onclick={prev}
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 19l-7-7 7-7"
				/>
			</svg>
		</button>
		<button
			type="button"
			class="absolute right-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50"
			aria-label="Next image"
			onclick={next}
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 5l7 7-7 7"
				/>
			</svg>
		</button>

		<!-- Dot indicators -->
		<div class="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 gap-2">
			{#each images as _, i}
				<button
					type="button"
					class="h-2.5 w-2.5 cursor-pointer rounded-full transition-all {i === currentIndex
						? 'scale-125 bg-white'
						: 'bg-white/50 hover:bg-white/75'}"
					aria-label="Go to image {i + 1}"
					onclick={() => goTo(i)}
				></button>
			{/each}
		</div>
	{/if}

	<!-- Scroll indicator -->
	<button
		type="button"
		class="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce cursor-pointer rounded-full p-2 transition-colors {hasImages
			? 'hover:bg-white/20'
			: 'hover:bg-gray-900/10'}"
		aria-label="Scroll to What's Happening"
		onclick={() =>
			document.getElementById('whats-happening')?.scrollIntoView({ behavior: 'smooth' })}
	>
		<svg
			class="h-6 w-6 {hasImages ? 'text-white/70' : 'text-gray-400'}"
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
