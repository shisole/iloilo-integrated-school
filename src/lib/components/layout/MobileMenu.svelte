<script>
	import { page } from '$app/state';
	import { fly, fade } from 'svelte/transition';

	let { isOpen = false, onClose } = $props();

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/leadership', label: 'Leadership' },
		{ href: '/news', label: 'News' },
		{ href: '/blog', label: 'Blog' }
	];

	function isActive(href) {
		if (href === '/') {
			return page.url.pathname === '/';
		}
		return page.url.pathname.startsWith(href);
	}
</script>

{#if isOpen}
	<div class="fixed inset-0 z-50 md:hidden">
		<!-- Backdrop -->
		<button
			type="button"
			class="fixed inset-0 bg-black/40"
			onclick={onClose}
			aria-label="Close menu"
			transition:fade={{ duration: 200 }}
		></button>

		<!-- Drawer -->
		<div
			class="fixed inset-y-0 right-0 w-72 bg-white shadow-xl"
			transition:fly={{ x: 288, duration: 300 }}
		>
			<!-- Close button -->
			<div class="flex items-center justify-end p-4">
				<button
					type="button"
					class="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
					onclick={onClose}
					aria-label="Close menu"
				>
					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Nav links -->
			<nav class="flex flex-col gap-1 px-4">
				{#each navLinks as link}
					<a
						href={link.href}
						onclick={onClose}
						class="rounded-lg px-4 py-3 text-base font-medium transition-colors {isActive(link.href)
							? 'bg-accent-blue/10 text-accent-blue-dark'
							: 'text-gray-700 hover:bg-gray-50'}"
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>
	</div>
{/if}
