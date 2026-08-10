<svelte:head>
	<title>Writings</title>
</svelte:head>

<article class="prose">
	<h1>Writings</h1>

	<div class="posts">
		<a class="post" href="/writings/6356-claims-104-applied">
			<h2>I Ingested 6,356 Podcast Claims and Applied 104</h2>
			<p class="excerpt">
				Building the pipeline was the easy part. Deciding what to ignore was not.
			</p>
			<p class="meta">9 August 2026</p>
		</a>

		<a class="post" href="/writings/home-was-never-set">
			<h2>$HOME Was Never Set, and Modal Hung for Four Weeks</h2>
			<p class="excerpt">
				A Cloudflare container, an expanduser() call, and why local Docker couldn't reproduce it.
			</p>
			<p class="meta">9 August 2026</p>
		</a>
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

	.meta {
		color: var(--text-secondary);
		font-size: 0.85rem;
		margin: 0.75rem 0 0 0;
	}
</style>
