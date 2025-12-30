<script lang="ts">
	import { formatLinesOfCode } from '$lib/types/github';

	interface Props {
		startDate: Date;
		stats: {
			repoCount: number;
			totalLoc: number;
			totalCommits: number;
		};
	}

	let { startDate, stats }: Props = $props();

	const formattedStartDate = $derived(
		startDate.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric'
		})
	);

	const today = new Date().toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric'
	});
</script>

<div class="timeline-marker">
	<div class="marker-line left"></div>
	<div class="marker-content">
		<div class="marker-badge">
			<span class="marker-title">Last 10 Weeks</span>
			<span class="marker-dates">{formattedStartDate} — {today}</span>
		</div>
		<div class="marker-stats">
			<div class="stat">
				<span class="stat-value">{stats.repoCount}</span>
				<span class="stat-label">projects</span>
			</div>
			<div class="stat-separator">·</div>
			<div class="stat">
				<span class="stat-value">{formatLinesOfCode(stats.totalLoc)}</span>
				<span class="stat-label">lines</span>
			</div>
			<div class="stat-separator">·</div>
			<div class="stat">
				<span class="stat-value">{stats.totalCommits}</span>
				<span class="stat-label">commits</span>
			</div>
		</div>
	</div>
	<div class="marker-line right"></div>
</div>

<style>
	.timeline-marker {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 0;
		position: relative;
		width: 100%;

		/* Animation initial state */
		opacity: 0;
		transform: scale(0.95);
		transition:
			opacity 0.6s ease,
			transform 0.6s ease;
	}

	/* Animated visible state - applied by IntersectionObserver */
	:global(.timeline-marker.visible) {
		opacity: 1;
		transform: scale(1);
	}

	.marker-line {
		flex: 1;
		height: 2px;
		background: linear-gradient(
			90deg,
			var(--accent) 0%,
			var(--accent) 50%,
			transparent 100%
		);
	}

	.marker-line.left {
		background: linear-gradient(
			90deg,
			transparent 0%,
			var(--accent) 50%,
			var(--accent) 100%
		);
	}

	.marker-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 0 1.5rem;
	}

	.marker-badge {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding: 0.75rem 1.5rem;
		background: var(--accent);
		color: var(--bg-primary);
		border-radius: 2rem;
	}

	.marker-title {
		font-size: 0.9rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.marker-dates {
		font-size: 0.7rem;
		opacity: 0.85;
	}

	.marker-stats {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 1rem;
	}

	.stat {
		display: flex;
		align-items: baseline;
		gap: 0.25rem;
	}

	.stat-value {
		font-size: 1rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.stat-label {
		font-size: 0.65rem;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.stat-separator {
		color: var(--text-secondary);
		font-size: 1rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.timeline-marker {
			flex-direction: column;
			gap: 1rem;
		}

		.marker-line {
			display: none;
		}

		.marker-content {
			padding: 0;
		}

		.marker-stats {
			flex-wrap: wrap;
			justify-content: center;
		}
	}
</style>
