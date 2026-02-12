<script>
	let { children, threshold = 0.1, delay = 0 } = $props();

	let element = $state(null);
	let isVisible = $state(false);

	$effect(() => {
		if (!element) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						if (delay > 0) {
							setTimeout(() => {
								isVisible = true;
							}, delay);
						} else {
							isVisible = true;
						}
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold }
		);

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	});
</script>

<div
	bind:this={element}
	class="transition-all duration-700 ease-out {isVisible
		? 'translate-y-0 opacity-100'
		: 'translate-y-8 opacity-0'}"
>
	{@render children()}
</div>
