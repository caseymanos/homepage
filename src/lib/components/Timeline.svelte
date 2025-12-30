<script lang="ts">
	import { onMount } from 'svelte';
	import type { ProcessedRepo } from '$lib/types/github';
	import TimelineCard from './TimelineCard.svelte';
	import TimelineMarker from './TimelineMarker.svelte';

	interface Props {
		repos: ProcessedRepo[];
		tenWeeksAgoDate: Date;
	}

	let { repos, tenWeeksAgoDate }: Props = $props();

	let timelineEl: HTMLElement;
	let observer: IntersectionObserver;

	// Find where to insert the "Last 10 Weeks" marker
	// It goes after all repos within the last 10 weeks
	function getMarkerInsertIndex(): number {
		for (let i = 0; i < repos.length; i++) {
			if (repos[i].pushedAt < tenWeeksAgoDate) {
				return i;
			}
		}
		return repos.length; // All repos are within 10 weeks
	}

	const markerIndex = $derived(getMarkerInsertIndex());

	// Count stats for the last 10 weeks
	const last10WeeksStats = $derived(() => {
		const recentRepos = repos.filter((r) => r.isWithinLast10Weeks);
		return {
			repoCount: recentRepos.length,
			totalLoc: recentRepos.reduce((sum, r) => sum + r.linesOfCode, 0),
			totalCommits: recentRepos.reduce((sum, r) => sum + r.commitCount, 0)
		};
	});

	onMount(() => {
		// IntersectionObserver for scroll-triggered animations
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						// Optionally stop observing after animation
						// observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.15,
				rootMargin: '0px 0px -50px 0px'
			}
		);

		// Observe all timeline items
		if (timelineEl) {
			const items = timelineEl.querySelectorAll('.timeline-item, .timeline-marker');
			items.forEach((item) => observer.observe(item));
		}

		return () => {
			observer.disconnect();
		};
	});
</script>

<div class="timeline" bind:this={timelineEl}>
	<div class="timeline-line"></div>

	{#each repos as repo, index (repo.id)}
		{#if index === markerIndex && markerIndex > 0}
			<TimelineMarker
				startDate={tenWeeksAgoDate}
				stats={last10WeeksStats()}
			/>
		{/if}

		<div class="timeline-item" class:left={index % 2 === 0} class:right={index % 2 !== 0}>
			<div class="timeline-connector">
				<div class="connector-line"></div>
				<div class="connector-dot"></div>
			</div>
			<TimelineCard {repo} side={index % 2 === 0 ? 'left' : 'right'} />
		</div>
	{/each}

	{#if markerIndex === repos.length && repos.length > 0}
		<TimelineMarker
			startDate={tenWeeksAgoDate}
			stats={last10WeeksStats()}
		/>
	{/if}
</div>

<style>
	.timeline {
		position: relative;
		padding: 2rem 0;
		max-width: 1000px;
		margin: 0 auto;
	}

	/* Central vertical line */
	.timeline-line {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 3px;
		background: linear-gradient(
			to bottom,
			transparent 0%,
			var(--border) 2%,
			var(--border) 98%,
			transparent 100%
		);
		transform: translateX(-50%);
	}

	.timeline-item {
		position: relative;
		display: flex;
		align-items: flex-start;
		padding: 1.5rem 0;
		width: 50%;

		/* Animation initial state */
		opacity: 0;
		transition:
			opacity 0.6s ease,
			transform 0.6s ease;
	}

	.timeline-item.left {
		margin-left: 0;
		padding-right: 3rem;
		justify-content: flex-end;
		transform: translateX(-30px);
	}

	.timeline-item.right {
		margin-left: 50%;
		padding-left: 3rem;
		justify-content: flex-start;
		transform: translateX(30px);
	}

	/* Animated visible state - class added via IntersectionObserver */
	:global(.timeline-item.visible) {
		opacity: 1;
		transform: translateX(0);
	}

	/* Connector from card to timeline */
	.timeline-connector {
		position: absolute;
		display: flex;
		align-items: center;
	}

	.timeline-item.left .timeline-connector {
		right: 0;
		flex-direction: row;
	}

	.timeline-item.right .timeline-connector {
		left: 0;
		flex-direction: row-reverse;
	}

	.connector-line {
		width: 2rem;
		height: 2px;
		background: var(--border);
	}

	.connector-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--bg-primary);
		border: 3px solid var(--accent);
		flex-shrink: 0;
		transition: transform 0.3s ease, background 0.3s ease;
	}

	.timeline-item:hover .connector-dot {
		transform: scale(1.3);
		background: var(--accent);
	}

	/* Responsive - single column on mobile */
	@media (max-width: 768px) {
		.timeline-line {
			left: 1.5rem;
		}

		.timeline-item {
			width: 100%;
			padding-left: 4rem !important;
			padding-right: 0 !important;
			margin-left: 0 !important;
		}

		.timeline-item.left,
		.timeline-item.right {
			justify-content: flex-start;
			transform: translateX(30px);
		}

		.timeline-item.left .timeline-connector,
		.timeline-item.right .timeline-connector {
			left: 0;
			right: auto;
			flex-direction: row-reverse;
		}
	}
</style>
