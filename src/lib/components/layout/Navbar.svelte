<script>
	import { page } from '$app/state';
	import { SCHOOL_NAME } from '$lib/utils/constants.js';
	import MobileMenu from './MobileMenu.svelte';

	let { settings = null } = $props();

	let isMenuOpen = $state(false);

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

	// Close mobile menu on navigation
	$effect(() => {
		page.url.pathname;
		isMenuOpen = false;
	});
</script>

<header class="sticky top-0 z-50 bg-white shadow-sm">
	<nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
		<!-- Logo and School Name -->
		<a href="/" class="flex items-center gap-3">
			<img src="/images/logo.png" alt={SCHOOL_NAME} class="h-10 w-10 object-contain" />
			<span class="hidden text-lg font-bold text-gray-900 sm:inline">
				{settings?.schoolName || SCHOOL_NAME}
			</span>
		</a>

		<!-- Desktop Nav Links -->
		<div class="hidden items-center gap-8 md:flex">
			{#each navLinks as link}
				<a
					href={link.href}
					class="text-sm font-medium transition-colors {isActive(link.href)
						? 'text-accent-blue-dark border-b-2 border-accent-blue pb-0.5'
						: 'text-gray-600 hover:text-gray-900'}"
				>
					{link.label}
				</a>
			{/each}
		</div>

		<!-- Mobile Hamburger Button -->
		<button
			type="button"
			class="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
			onclick={() => (isMenuOpen = true)}
			aria-label="Open menu"
		>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
			</svg>
		</button>
	</nav>
</header>

<MobileMenu isOpen={isMenuOpen} onClose={() => (isMenuOpen = false)} />
