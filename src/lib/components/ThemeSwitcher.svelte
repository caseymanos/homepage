<script lang="ts">
	import { theme } from '$lib/stores/theme.svelte';

	function toggleMode() {
		// Toggle between light and dark (skip auto since it's default behavior)
		if (theme.resolvedMode === 'light') {
			theme.setMode('dark');
		} else {
			theme.setMode('light');
		}
	}
</script>

<button onclick={toggleMode} class="mode-toggle" aria-label="Toggle theme">
	{#if theme.resolvedMode === 'light'}
	☀️
	{:else}
		🌙
	{/if}
</button>

<style>
	.mode-toggle {
		padding: 0.5rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		cursor: pointer;
		font-size: 1.25rem;
		line-height: 1;
		transition: all 0.15s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 2.5rem;
	}

	.mode-toggle:hover {
		background: var(--bg-secondary);
		border-color: var(--accent);
	}
</style>
