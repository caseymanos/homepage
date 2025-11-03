<svelte:head>
	<title>Writings</title>
</svelte:head>

<article class="prose">
	<h1>Writings</h1>

	<div class="posts">
		<a href="/writings/first-post" class="post">
			<h2>Substack coming</h2>
			<p class="date">January 1, 2026</p>
			<p class="excerpt">
				Watch this space i swear im gonna start writing one day
			</p>
		</a>

		<a href="/writings/second-post" class="post">
			<h2>No seriously</h2>
			<p class="date">December 15, 2027</p>
			<p class="excerpt">Want to become more high agency about being high agency so i'm gonna replace these with writings as soon as i finish week 3 of Gauntlet AI</p>
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

	.post h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
		color: var(--text-primary);
	}

	.date {
		color: var(--text-secondary);
		font-size: 0.875rem;
		margin: 0 0 0.75rem 0;
	}

	.excerpt {
		color: var(--text-secondary);
		margin: 0;
		line-height: 1.6;
	}
</style>
