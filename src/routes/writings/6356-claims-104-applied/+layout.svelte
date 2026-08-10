<script lang="ts">
	let { children } = $props();
</script>

<article class="post-body">
	{@render children?.()}
</article>

<style>
	.post-body {
		line-height: 1.7;
	}

	.post-body :global(h1) {
		font-size: 2.25rem;
		font-weight: 700;
		line-height: 1.2;
		margin: 0 0 1rem 0;
	}

	.post-body :global(h2) {
		font-size: 1.4rem;
		font-weight: 600;
		line-height: 1.3;
		margin: 3rem 0 1rem 0;
	}

	.post-body :global(p) {
		margin: 0 0 1.5rem 0;
		color: var(--text-primary);
	}

	.post-body :global(a) {
		text-decoration: underline;
	}

	.post-body :global(ul),
	.post-body :global(ol) {
		margin: 0 0 1.5rem 0;
		padding-left: 1.25rem;
	}

	.post-body :global(li) {
		margin-bottom: 0.5rem;
	}

	/* Inline code */
	.post-body :global(code) {
		font-family: var(--font-mono);
		font-size: 0.875em;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		padding: 0.1em 0.35em;
	}

	/* Fenced code blocks: scroll horizontally, never break the page */
	.post-body :global(pre) {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 1rem 1.1rem;
		margin: 0 0 1.5rem 0;
		overflow-x: auto;
		font-size: 0.82rem;
		line-height: 1.6;
	}

	.post-body :global(pre code) {
		background: none;
		border: none;
		padding: 0;
		font-size: inherit;
		white-space: pre;
	}

	.post-body :global(strong) {
		font-weight: 700;
		color: var(--text-primary);
	}
</style>
