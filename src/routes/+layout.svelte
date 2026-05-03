<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="layout">
	<header>
		<ThemeSwitcher />
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
		display: flex;
		justify-content: flex-end;
		margin-bottom: 4rem;
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

	@media (max-width: 640px) {
		.layout {
			padding: 1.5rem 1rem;
		}
	}
</style>
