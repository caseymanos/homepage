<svelte:head>
	<title>Writings</title>
</svelte:head>

<article class="prose">
	<h1>Writings</h1>

	<div class="posts">
		<div class="post placeholder">
			<h2>Coming soon</h2>
			<p class="excerpt">
				Notes on what I'm building at Adapt, agentic systems, and whatever else is on my mind.
				Nothing published yet — check back.
			</p>
		</div>
	</div>
</article>

<style>
	.prose {
		line-height: 1.7;
	}

	.prose h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 3rem;
		line-height: 1.2;
	}

	.posts {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.post {
		display: block;
		padding: 1.5rem;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		transition: all 0.2s ease;
		text-decoration: none;
	}

	.post:hover {
		border-color: var(--accent);
		background: var(--bg-secondary);
		transform: translateY(-2px);
	}

	.post.placeholder {
		cursor: default;
	}

	.post.placeholder:hover {
		border-color: var(--border);
		background: transparent;
		transform: none;
	}

	.post h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
		color: var(--text-primary);
	}

	.excerpt {
		color: var(--text-secondary);
		margin: 0;
		line-height: 1.6;
	}
</style>
