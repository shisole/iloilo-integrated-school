<script>
	import { page } from '$app/state';
	import { SCHOOL_NAME } from '$lib/utils/constants.js';
	import MobileMenu from './MobileMenu.svelte';

	let { settings = null } = $props();

	let isMenuOpen = $state(false);
	let isAboutOpen = $state(false);

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/news', label: 'News' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/gallery', label: 'Gallery' },
		{ href: '/admissions', label: 'Admissions' },
		{ href: '/contact', label: 'Contact' }
	];

	const aboutDropdown = [
		{ href: '/about', label: 'Mission & Vision' },
		{ href: '/about/leadership', label: 'Leadership' },
		{ href: '/calendar', label: 'Calendar' },
		{ href: '/faq', label: 'FAQ' }
	];

	function isActive(href) {
		if (href === '/') {
			return page.url.pathname === '/';
		}
		return page.url.pathname.startsWith(href);
	}

	let isAboutActive = $derived(
		page.url.pathname.startsWith('/about') ||
		page.url.pathname.startsWith('/calendar') ||
		page.url.pathname.startsWith('/faq')
	);

	let isScrolled = $state(false);

	// Close mobile menu on navigation
	$effect(() => {
		page.url.pathname;
		isMenuOpen = false;
	});

	$effect(() => {
		function onScroll() {
			isScrolled = window.scrollY > 50;
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<header class="sticky top-0 z-50 transition-all duration-300 {isScrolled ? 'bg-white/80 shadow-sm backdrop-blur-md' : 'bg-white shadow-sm'}">
	<nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
		<!-- Logo and School Name -->
		<a href="/" class="flex items-center gap-3">
			<img src="/images/logo.png" alt={SCHOOL_NAME} class="h-10 w-10 object-contain" />
			<span class="text-lg font-bold text-gray-900">
				{settings?.schoolName || SCHOOL_NAME}
			</span>
		</a>

		<!-- Desktop Nav Links -->
		<div class="hidden items-center gap-8 md:flex">
			<!-- Home -->
			<a
				href="/"
				class="text-sm font-medium transition-colors {isActive('/')
					? 'text-accent-blue-dark border-b-2 border-accent-blue pb-0.5'
					: 'text-gray-600 hover:text-gray-900'}"
			>
				Home
			</a>

			<!-- About Us dropdown -->
			<div
				class="relative"
				onmouseenter={() => (isAboutOpen = true)}
				onmouseleave={() => (isAboutOpen = false)}
			>
				<a
					href="/about"
					class="flex items-center gap-1 text-sm font-medium transition-colors {isAboutActive
						? 'text-accent-blue-dark border-b-2 border-accent-blue pb-0.5'
						: 'text-gray-600 hover:text-gray-900'}"
				>
					About Us
					<svg
						class="h-4 w-4 transition-transform {isAboutOpen ? 'rotate-180' : ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</a>

				{#if isAboutOpen}
					<div class="absolute left-0 top-full pt-2">
						<div class="w-48 rounded-lg bg-white py-2 shadow-lg ring-1 ring-black/5">
							{#each aboutDropdown as item}
								<a
									href={item.href}
									class="block px-4 py-2 text-sm transition-colors {page.url.pathname === item.href
										? 'bg-accent-blue/10 text-accent-blue-dark'
										: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
								>
									{item.label}
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Other nav links -->
			{#each navLinks.slice(1) as link}
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
