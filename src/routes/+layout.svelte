<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	const navLinks = [
		{ href: '/', label: 'About' },
		{ href: '/resume', label: 'Resume' },
		{ href: '/writings', label: 'Writings' },
		{ href: '/projects', label: 'Projects' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="layout">
	<header>
		<nav>
			<div class="nav-links">
				{#each navLinks as link}
					<a href={link.href} class:active={$page.url.pathname === link.href}>
						{link.label}
					</a>
				{/each}
			</div>
			<ThemeSwitcher />
		</nav>
	</header>

	<main>
		{@render children?.()}
	</main>

	<footer>
		<p>© {new Date().getFullYear()}</p>
	</footer>
</div>

<style>
	.layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		max-width: 65ch;
		margin: 0 auto;
		padding: 2rem 1.5rem;
	}

	header {
		margin-bottom: 4rem;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1.5rem;
	}

	.nav-links {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.nav-links a {
		font-size: 1rem;
		font-weight: 400;
	}

	.nav-links a.active {
		color: var(--accent);
		font-weight: 500;
	}

	main {
		flex: 1;
	}

	footer {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid var(--border);
		color: var(--text-secondary);
		font-size: 0.875rem;
	}

	@media (max-width: 640px) {
		.layout {
			padding: 1.5rem 1rem;
		}

		nav {
			flex-direction: column;
			align-items: flex-start;
		}

		.nav-links {
			gap: 1.5rem;
		}
	}
</style>
