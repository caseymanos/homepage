<script lang="ts">
	import type { ProcessedRepo } from '$lib/types/github';
	import { getLanguageColor, formatLinesOfCode, formatTimelineDate } from '$lib/types/github';

	interface Props {
		repo: ProcessedRepo;
		side: 'left' | 'right';
	}

	let { repo, side }: Props = $props();

	const languageColor = getLanguageColor(repo.language);

	// Calculate bar width as percentage (max at 100K LOC for visual scaling)
	const locBarWidth = $derived(Math.min((repo.linesOfCode / 100000) * 100, 100));

	// Format the date range
	const dateRange = $derived(() => {
		const created = formatTimelineDate(repo.createdAt);
		const lastPush = formatTimelineDate(repo.pushedAt);
		if (created === lastPush) {
			return created;
		}
		return `${created} → ${lastPush}`;
	});
</script>

<a
	href={repo.url}
	target="_blank"
	rel="noopener noreferrer"
	class="card size-{repo.sizeCategory}"
	class:recent={repo.isWithinLast10Weeks}
	style="--lang-color: {languageColor};"
>
	<div class="card-header">
		<h3 class="card-title">{repo.displayName}</h3>
		<span class="date-badge">{dateRange()}</span>
	</div>

	{#if repo.description}
		<p class="card-description">{repo.description}</p>
	{/if}

	<div class="stats-section">
		<div class="loc-stat">
			<span class="loc-value">{formatLinesOfCode(repo.linesOfCode)}</span>
			<span class="loc-label">lines</span>
		</div>
		<div class="stat-divider"></div>
		<div class="commit-stat">
			<span class="commit-value">{repo.commitCount}</span>
			<span class="commit-label">commits</span>
		</div>
		{#if repo.language}
			<div class="stat-divider"></div>
			<div class="language-stat">
				<span class="language-dot"></span>
				<span class="language-name">{repo.language}</span>
			</div>
		{/if}
	</div>

	<!-- Visual LOC bar -->
	<div class="loc-bar-container">
		<div class="loc-bar" style="width: {locBarWidth}%;"></div>
	</div>

	{#if repo.isWithinLast10Weeks}
		<div class="recent-badge">Recent</div>
	{/if}
</a>

<style>
	.card {
		display: block;
		background: var(--bg-primary);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 1.25rem;
		text-decoration: none;
		color: inherit;
		width: 100%;
		max-width: 400px;
		position: relative;
		overflow: hidden;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease,
			border-color 0.3s ease;
	}

	.card:hover {
		transform: translateY(-4px);
		box-shadow: var(--card-shadow-hover, 0 12px 32px rgba(0, 0, 0, 0.15));
		border-color: var(--accent);
	}

	/* Size variants - card height scales with LOC */
	.card.size-minimal {
		min-height: 120px;
	}

	.card.size-small {
		min-height: 140px;
	}

	.card.size-medium {
		min-height: 160px;
	}

	.card.size-large {
		min-height: 180px;
	}

	.card.size-massive {
		min-height: 200px;
		border-width: 2px;
	}

	/* Highlight recent projects */
	.card.recent {
		border-color: var(--accent);
		background: linear-gradient(
			135deg,
			var(--bg-primary) 0%,
			color-mix(in srgb, var(--accent) 5%, var(--bg-primary)) 100%
		);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.75rem;
		margin-bottom: 0.5rem;
	}

	.card-title {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.3;
	}

	.date-badge {
		font-size: 0.7rem;
		color: var(--text-secondary);
		white-space: nowrap;
		padding: 0.2rem 0.5rem;
		background: var(--bg-secondary);
		border-radius: 0.25rem;
	}

	.card-description {
		margin: 0 0 0.75rem 0;
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.stats-section {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.loc-stat,
	.commit-stat {
		display: flex;
		align-items: baseline;
		gap: 0.25rem;
	}

	.loc-value {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.loc-label {
		font-size: 0.7rem;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.commit-value {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.commit-label {
		font-size: 0.65rem;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.stat-divider {
		width: 1px;
		height: 1.5rem;
		background: var(--border);
	}

	.language-stat {
		display: flex;
		align-items: center;
		gap: 0.375rem;
	}

	.language-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--lang-color);
	}

	.language-name {
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	/* LOC bar visualization */
	.loc-bar-container {
		height: 4px;
		background: var(--bg-secondary);
		border-radius: 2px;
		overflow: hidden;
		margin-top: auto;
	}

	.loc-bar {
		height: 100%;
		background: linear-gradient(90deg, var(--lang-color) 0%, var(--accent) 100%);
		border-radius: 2px;
		transition: width 0.6s ease;
	}

	/* Recent badge */
	.recent-badge {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		font-size: 0.6rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		padding: 0.2rem 0.4rem;
		background: var(--accent);
		color: var(--bg-primary);
		border-radius: 0.25rem;
	}

	/* Adjust header when recent badge is present */
	.card.recent .card-header {
		padding-right: 3rem;
	}

	.card.recent .date-badge {
		display: none;
	}
</style>
