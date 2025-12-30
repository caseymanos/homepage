<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ProcessedRepo } from '$lib/types/github';
	import ProjectCard from './ProjectCard.svelte';

	interface Props {
		repos: ProcessedRepo[];
		children?: Snippet;
	}

	let { repos }: Props = $props();
</script>

<div class="masonry-grid">
	{#each repos as repo (repo.id)}
		<div class="grid-item size-{repo.sizeCategory}">
			<ProjectCard {repo} />
		</div>
	{/each}
</div>

<style>
	.masonry-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		grid-auto-rows: minmax(80px, auto);
		gap: 1.5rem;
		padding: 0.5rem 0;
	}

	/* Grid item sizing based on repo importance */
	.grid-item {
		display: flex;
	}

	.grid-item :global(.card) {
		width: 100%;
	}

	/* Large cards span 2 columns and 2 rows */
	.grid-item.size-large {
		grid-column: span 2;
		grid-row: span 2;
	}

	/* Medium cards span 1 column and 2 rows */
	.grid-item.size-medium {
		grid-column: span 1;
		grid-row: span 2;
	}

	/* Small cards take 1x1 */
	.grid-item.size-small {
		grid-column: span 1;
		grid-row: span 1;
	}

	/* Responsive adjustments */
	@media (max-width: 900px) {
		.masonry-grid {
			grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
			gap: 1.25rem;
		}

		/* Large cards go to single column on medium screens */
		.grid-item.size-large {
			grid-column: span 1;
			grid-row: span 2;
		}
	}

	@media (max-width: 600px) {
		.masonry-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		/* All cards single column on mobile */
		.grid-item.size-large,
		.grid-item.size-medium,
		.grid-item.size-small {
			grid-column: span 1;
			grid-row: span 1;
		}
	}
</style>
