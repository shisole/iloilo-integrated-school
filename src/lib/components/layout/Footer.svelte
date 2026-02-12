<script>
	import { SCHOOL_NAME } from '$lib/utils/constants.js';

	let { settings = null } = $props();

	let currentYear = $derived(new Date().getFullYear());
</script>

<footer class="border-t-4 border-accent-blue bg-gray-900 text-gray-300">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid gap-8 md:grid-cols-3">
			<!-- School Info -->
			<div>
				<h3 class="text-lg font-bold text-white">
					{settings?.schoolName || SCHOOL_NAME}
				</h3>
				{#if settings?.address}
					<p class="mt-2 text-sm">{settings.address}</p>
				{:else}
					<p class="mt-2 text-sm">Iloilo City, Philippines</p>
				{/if}
			</div>

			<!-- Contact -->
			<div>
				<h3 class="text-lg font-bold text-white">Contact</h3>
				<div class="mt-2 space-y-1 text-sm">
					{#if settings?.phone}
						<p>
							<span class="text-gray-400">Phone:</span>
							<a href="tel:{settings.phone}" class="hover:text-white transition-colors">
								{settings.phone}
							</a>
						</p>
					{/if}
					{#if settings?.email}
						<p>
							<span class="text-gray-400">Email:</span>
							<a href="mailto:{settings.email}" class="hover:text-white transition-colors">
								{settings.email}
							</a>
						</p>
					{/if}
					{#if !settings?.phone && !settings?.email}
						<p class="text-gray-400">Contact information coming soon.</p>
					{/if}
				</div>
			</div>

			<!-- Social / Links -->
			<div>
				<h3 class="text-lg font-bold text-white">Connect</h3>
				<div class="mt-2 space-y-1 text-sm">
					{#if settings?.facebookUrl}
						<a
							href={settings.facebookUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 transition-colors hover:text-white"
						>
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
								/>
							</svg>
							Facebook
						</a>
					{/if}
				</div>
			</div>
		</div>

		<!-- Copyright -->
		<div class="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
			<p>&copy; {currentYear} {settings?.schoolName || SCHOOL_NAME}. All rights reserved.</p>
		</div>
	</div>
</footer>
