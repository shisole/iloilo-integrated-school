<script>
	import { page } from '$app/state';
	import { fly, fade } from 'svelte/transition';
	import { slide } from 'svelte/transition';

	let { isOpen = false, onClose } = $props();

	let isAboutExpanded = $state(false);

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
				<!-- Home -->
				<a
					href="/"
					onclick={onClose}
					class="rounded-lg px-4 py-3 text-base font-medium transition-colors {isActive('/')
						? 'bg-accent-blue/10 text-accent-blue-dark'
						: 'text-gray-700 hover:bg-gray-50'}"
				>
					Home
				</a>

				<!-- About Us accordion -->
				<div>
					<button
						type="button"
						class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors {isAboutActive
							? 'bg-accent-blue/10 text-accent-blue-dark'
							: 'text-gray-700 hover:bg-gray-50'}"
						onclick={() => (isAboutExpanded = !isAboutExpanded)}
					>
						About Us
						<svg
							class="h-4 w-4 transition-transform {isAboutExpanded ? 'rotate-180' : ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{#if isAboutExpanded}
						<div class="flex flex-col gap-1 pl-4" transition:slide={{ duration: 200 }}>
							{#each aboutDropdown as item}
								<a
									href={item.href}
									onclick={onClose}
									class="rounded-lg px-4 py-2.5 text-sm font-medium transition-colors {page.url.pathname === item.href
										? 'bg-accent-blue/10 text-accent-blue-dark'
										: 'text-gray-600 hover:bg-gray-50'}"
								>
									{item.label}
								</a>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Other nav links -->
				{#each navLinks.slice(1) as link}
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
