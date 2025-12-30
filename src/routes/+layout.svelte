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
		{ href: '/projects', label: 'Dive' }
	];

	// Projects page uses full-screen immersive layout
	let isImmersive = $derived($page.url.pathname === '/projects');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if isImmersive}
	<!-- Immersive layout for Code Galaxy -->
	<div class="immersive-layout">
		<nav class="floating-nav">
			<div class="nav-links">
				{#each navLinks as link}
					<a href={link.href} class:active={$page.url.pathname === link.href}>
						{link.label}
					</a>
				{/each}
			</div>
		</nav>

		<main class="immersive-main">
			{@render children?.()}
		</main>
	</div>
{:else}
	<!-- Standard layout -->
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
{/if}

<style>
	/* Standard layout */
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

	.layout nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1.5rem;
	}

	.layout .nav-links {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.layout .nav-links a {
		font-size: 1rem;
		font-weight: 400;
	}

	.layout .nav-links a.active {
		color: var(--accent);
		font-weight: 500;
	}

	.layout main {
		flex: 1;
	}

	footer {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid var(--border);
		color: var(--text-secondary);
		font-size: 0.875rem;
	}

	/* Immersive layout for space dive */
	.immersive-layout {
		min-height: 100vh;
		background: #000000;
	}

	.floating-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 1.5rem 2rem;
		background: linear-gradient(to bottom, rgba(10, 10, 18, 0.9) 0%, transparent 100%);
	}

	.floating-nav .nav-links {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.floating-nav .nav-links a {
		font-family: 'Space Mono', monospace;
		font-size: 0.875rem;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.6);
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 1px;
		transition: color 0.2s ease;
	}

	.floating-nav .nav-links a:hover {
		color: #fff;
	}

	.floating-nav .nav-links a.active {
		color: #6366f1;
		font-weight: 700;
	}

	.immersive-main {
		min-height: 100vh;
	}

	@media (max-width: 640px) {
		.layout {
			padding: 1.5rem 1rem;
		}

		.layout nav {
			flex-direction: column;
			align-items: flex-start;
		}

		.layout .nav-links {
			gap: 1.5rem;
		}

		.floating-nav {
			padding: 1rem;
		}

		.floating-nav .nav-links {
			gap: 1rem;
		}

		.floating-nav .nav-links a {
			font-size: 0.75rem;
		}
	}
</style>
