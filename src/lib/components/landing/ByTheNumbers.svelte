<script>
	let { settings = null } = $props();

	const fallbackStats = [
		{ value: '25+', label: 'Years of Excellence' },
		{ value: '500+', label: 'Graduates' },
		{ value: '30+', label: 'Dedicated Teachers' },
		{ value: 'DepEd', label: 'Recognized' }
	];

	let stats = $derived(
		settings?.schoolStats?.length ? settings.schoolStats : fallbackStats
	);

	let sectionEl = $state(null);
	let hasAnimated = $state(false);

	// Parse numeric value and suffix from stat value string (e.g., "25+" -> { num: 25, suffix: "+" })
	function parseStatValue(val) {
		const match = String(val).match(/^(\d+)(.*)$/);
		if (match) {
			return { num: parseInt(match[1], 10), suffix: match[2] };
		}
		return { num: null, suffix: '', text: val };
	}

	let animatedValues = $state(Array(4).fill(0));

	$effect(() => {
		if (!sectionEl) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasAnimated) {
					hasAnimated = true;
					animateCountUp();
					observer.unobserve(sectionEl);
				}
			},
			{ threshold: 0.3 }
		);

		observer.observe(sectionEl);

		return () => observer.disconnect();
	});

	function animateCountUp() {
		const duration = 1500;
		const startTime = performance.now();

		function tick(now) {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);

			animatedValues = stats.map((stat) => {
				const parsed = parseStatValue(stat.value);
				if (parsed.num !== null) {
					return Math.round(eased * parsed.num);
				}
				return 0;
			});

			if (progress < 1) {
				requestAnimationFrame(tick);
			}
		}

		requestAnimationFrame(tick);
	}
</script>

<section bind:this={sectionEl} class="bg-accent-blue/5 py-16 md:py-20">
	<div class="mx-auto max-w-5xl px-6">
		<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
			{#each stats as stat, i}
				{@const parsed = parseStatValue(stat.value)}
				<div class="text-center">
					<p class="text-4xl font-extrabold text-accent-blue-dark md:text-5xl">
						{#if parsed.num !== null}
							{hasAnimated ? animatedValues[i] : 0}{parsed.suffix}
						{:else}
							{stat.value}
						{/if}
					</p>
					<p class="mt-2 text-sm font-medium text-gray-600">{stat.label}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
