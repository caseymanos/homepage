<script lang="ts">
	import type { ProcessedRepo } from '$lib/types/github';

	interface Props {
		repos: ProcessedRepo[];
		cameraZ: number;
		maxDepth: number;
		oldestDate: Date;
		newestDate: Date;
		onDateClick?: (z: number) => void;
	}

	let { repos, cameraZ, maxDepth, oldestDate, newestDate, onDateClick }: Props = $props();

	// Group repos by year and month
	const groupedRepos = $derived(() => {
		const groups: Record<number, Record<number, ProcessedRepo[]>> = {};

		repos.forEach((repo) => {
			const date = new Date(repo.createdAt);
			const year = date.getFullYear();
			const month = date.getMonth();

			if (!groups[year]) groups[year] = {};
			if (!groups[year][month]) groups[year][month] = [];
			groups[year][month].push(repo);
		});

		return groups;
	});

	// Get sorted years (newest first)
	const sortedYears = $derived(() => {
		return Object.keys(groupedRepos())
			.map(Number)
			.sort((a, b) => b - a);
	});

	// Calculate current date from camera Z position
	const currentDate = $derived(() => {
		const totalRange = newestDate.getTime() - oldestDate.getTime();
		// Camera at Z=20 is newest, Z=-maxDepth is oldest
		const normalizedZ = (cameraZ + maxDepth) / (maxDepth + 20);
		const timestamp = oldestDate.getTime() + normalizedZ * totalRange;
		return new Date(Math.max(oldestDate.getTime(), Math.min(newestDate.getTime(), timestamp)));
	});

	// Get nearby repos (within view distance)
	const nearbyRepos = $derived(() => {
		return repos
			.filter((repo) => {
				const repoDate = new Date(repo.createdAt);
				const timeDiff = Math.abs(repoDate.getTime() - currentDate().getTime());
				const oneMonth = 30 * 24 * 60 * 60 * 1000;
				return timeDiff < oneMonth * 2; // Within 2 months
			})
			.slice(0, 5);
	});

	// Month names
	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	// Calculate Z position for a date
	function getZForDate(date: Date): number {
		const totalRange = newestDate.getTime() - oldestDate.getTime();
		const dateAge = date.getTime() - oldestDate.getTime();
		const normalized = dateAge / totalRange;
		return -maxDepth + normalized * (maxDepth + 20);
	}

	// Handle click on a year/month
	function handleDateClick(year: number, month?: number) {
		if (!onDateClick) return;
		const date = month !== undefined ? new Date(year, month, 15) : new Date(year, 6, 1);
		const z = getZForDate(date);
		onDateClick(z);
	}

	// Format current date display
	const currentDateDisplay = $derived(() => {
		const date = currentDate();
		return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
	});
</script>

<div class="timeline-sidebar">
	<div class="sidebar-header">
		<h2 class="sidebar-title">Timeline</h2>
	</div>

	<div class="timeline-list">
		{#each sortedYears() as year}
			<div class="year-group">
				<button class="year-label" onclick={() => handleDateClick(year)}>
					● {year}
				</button>
				<div class="months">
					{#each Object.keys(groupedRepos()[year]).map(Number).sort((a, b) => b - a) as month}
						<button class="month-item" onclick={() => handleDateClick(year, month)}>
							{monthNames[month]} - {groupedRepos()[year][month].length} repo{groupedRepos()[year][month].length > 1 ? 's' : ''}
						</button>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<div class="current-view">
		<h3 class="current-title">Current View</h3>
		<p class="current-date">{currentDateDisplay()}</p>
		{#if nearbyRepos().length > 0}
			<div class="nearby-repos">
				{#each nearbyRepos() as repo}
					<div class="nearby-repo">
						<span class="repo-arrow">▸</span>
						<span class="repo-name">{repo.displayName}</span>
					</div>
				{/each}
			</div>
		{:else}
			<p class="no-repos">No repos nearby</p>
		{/if}
	</div>
</div>

<style>
	.timeline-sidebar {
		position: fixed;
		left: 1.5rem;
		top: 50%;
		transform: translateY(-50%);
		width: 180px;
		max-height: 70vh;
		background: rgba(0, 0, 8, 0.85);
		border: 1px solid rgba(99, 102, 241, 0.3);
		border-radius: 12px;
		padding: 1rem;
		z-index: 20;
		backdrop-filter: blur(10px);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.sidebar-header {
		margin-bottom: 0.75rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.sidebar-title {
		font-family: 'Space Mono', monospace;
		font-size: 0.7rem;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.6);
		text-transform: uppercase;
		letter-spacing: 2px;
		margin: 0;
	}

	.timeline-list {
		flex: 1;
		overflow-y: auto;
		margin-bottom: 0.75rem;
		padding-right: 0.25rem;
	}

	.timeline-list::-webkit-scrollbar {
		width: 4px;
	}

	.timeline-list::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 2px;
	}

	.timeline-list::-webkit-scrollbar-thumb {
		background: rgba(99, 102, 241, 0.5);
		border-radius: 2px;
	}

	.year-group {
		margin-bottom: 0.5rem;
	}

	.year-label {
		display: block;
		width: 100%;
		text-align: left;
		background: none;
		border: none;
		padding: 0.25rem 0;
		font-family: 'Space Mono', monospace;
		font-size: 0.8rem;
		font-weight: 700;
		color: #6366f1;
		cursor: pointer;
		transition: color 0.2s ease;
	}

	.year-label:hover {
		color: #818cf8;
	}

	.months {
		margin-left: 0.75rem;
		border-left: 1px solid rgba(255, 255, 255, 0.1);
		padding-left: 0.5rem;
	}

	.month-item {
		display: block;
		width: 100%;
		text-align: left;
		background: none;
		border: none;
		padding: 0.15rem 0;
		font-family: 'Space Mono', monospace;
		font-size: 0.65rem;
		color: rgba(255, 255, 255, 0.5);
		cursor: pointer;
		transition: color 0.2s ease;
	}

	.month-item:hover {
		color: rgba(255, 255, 255, 0.9);
	}

	.current-view {
		padding-top: 0.75rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.current-title {
		font-family: 'Space Mono', monospace;
		font-size: 0.6rem;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.4);
		text-transform: uppercase;
		letter-spacing: 1px;
		margin: 0 0 0.25rem 0;
	}

	.current-date {
		font-family: 'Space Mono', monospace;
		font-size: 0.9rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 0.5rem 0;
	}

	.nearby-repos {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.nearby-repo {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.repo-arrow {
		font-size: 0.6rem;
		color: #6366f1;
	}

	.repo-name {
		font-family: 'Space Mono', monospace;
		font-size: 0.65rem;
		color: rgba(255, 255, 255, 0.7);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.no-repos {
		font-size: 0.65rem;
		color: rgba(255, 255, 255, 0.3);
		margin: 0;
		font-style: italic;
	}

	@media (max-width: 768px) {
		.timeline-sidebar {
			display: none;
		}
	}
</style>
