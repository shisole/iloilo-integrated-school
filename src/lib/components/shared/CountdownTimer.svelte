<script>
	let { targetDate } = $props();

	let days = $state(0);
	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);
	let isExpired = $state(false);

	function update() {
		const now = Date.now();
		const target = new Date(targetDate).getTime();
		const diff = target - now;

		if (diff <= 0) {
			isExpired = true;
			return;
		}

		days = Math.floor(diff / (1000 * 60 * 60 * 24));
		hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		seconds = Math.floor((diff % (1000 * 60)) / 1000);
	}

	$effect(() => {
		update();
		const interval = setInterval(update, 1000);
		return () => clearInterval(interval);
	});
</script>

{#if !isExpired}
	<div class="rounded-2xl border border-accent-blue/20 bg-accent-blue/5 p-6">
		<p class="mb-4 text-center text-sm font-semibold tracking-wide text-accent-blue-dark uppercase">
			Event starts in
		</p>
		<div class="grid grid-cols-4 gap-3 text-center">
			<div>
				<span class="block font-display text-3xl font-extrabold text-accent-blue-dark md:text-4xl">
					{days}
				</span>
				<span class="text-xs font-medium text-gray-500">Days</span>
			</div>
			<div>
				<span class="block font-display text-3xl font-extrabold text-accent-blue-dark md:text-4xl">
					{String(hours).padStart(2, '0')}
				</span>
				<span class="text-xs font-medium text-gray-500">Hours</span>
			</div>
			<div>
				<span class="block font-display text-3xl font-extrabold text-accent-blue-dark md:text-4xl">
					{String(minutes).padStart(2, '0')}
				</span>
				<span class="text-xs font-medium text-gray-500">Minutes</span>
			</div>
			<div>
				<span class="block font-display text-3xl font-extrabold text-accent-blue-dark md:text-4xl">
					{String(seconds).padStart(2, '0')}
				</span>
				<span class="text-xs font-medium text-gray-500">Seconds</span>
			</div>
		</div>
	</div>
{/if}
