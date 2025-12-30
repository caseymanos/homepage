<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import type { ProcessedRepo } from '$lib/types/github';
	import { getLanguageColor, formatLinesOfCode } from '$lib/types/github';
	import FlightControls from './FlightControls.svelte';
	import StarField from './StarField.svelte';
	import HoloSphere from './HoloSphere.svelte';

	interface Props {
		repos: ProcessedRepo[];
	}

	let { repos }: Props = $props();

	let cameraPosition = $state({ x: -80, y: 15, z: 100 });
	let isControlsLocked = $state(false);

	// Constants for positioning - much larger scale
	const MAX_DEPTH = 4000;

	// Calculate date range
	const dateRange = $derived(() => {
		const dates = repos.map((r) => new Date(r.createdAt).getTime());
		return {
			oldest: new Date(Math.min(...dates)),
			newest: new Date(Math.max(...dates))
		};
	});

	// Calculate max commits for sizing
	const maxCommits = $derived(Math.max(...repos.map((r) => r.commitCount), 1));

	// Fruit placeholder images
	const fruitImages = [
		'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400', // pineapple
		'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400', // banana
		'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', // apple
		'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400', // orange
		'https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=400', // grapes
		'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=400' // strawberry
	];

	// Minimum spacing between planets along Z-axis
	const MIN_PLANET_SPACING = 100;

	// Calculate sphere radius based on commit count - larger spheres
	function getSphereRadius(commitCount: number): number {
		const MIN_RADIUS = 8;
		const MAX_RADIUS = 25;
		const normalized = Math.sqrt(commitCount / maxCommits); // sqrt for better distribution
		return MIN_RADIUS + normalized * (MAX_RADIUS - MIN_RADIUS);
	}

	// Calculate X/Y position - planets on RIGHT side (positive X) for left camera view
	function getXYPosition(index: number, total: number): [number, number] {
		const angle = (index / total) * Math.PI * 2 + index * 0.5;
		const baseRadius = 20 + (index % 3) * 15; // 20-50 unit spread
		// Always positive X (right side of rail) with some variation
		const x = Math.abs(Math.cos(angle)) * baseRadius + 40;
		const y = Math.sin(angle) * 15; // Slight Y variation
		return [x, y];
	}

	// Position spheres - sort by date, then space evenly with minimum gaps
	const sphereData = $derived(() => {
		// Sort repos by date (newest first for Z positioning)
		const sortedRepos = [...repos].sort((a, b) => 
			new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);

		// Calculate Z positions with minimum spacing
		const positions: Array<{
			repo: ProcessedRepo;
			position: [number, number, number];
			radius: number;
			imageUrl: string;
		}> = [];

		let currentZ = 50; // Start near camera

		sortedRepos.forEach((repo, i) => {
			const [x, y] = getXYPosition(i, sortedRepos.length);
			const radius = getSphereRadius(repo.commitCount);
			
			positions.push({
				repo,
				position: [x, y, currentZ] as [number, number, number],
				radius,
				imageUrl: fruitImages[i % fruitImages.length]
			});

			// Move Z back for next planet (negative direction = further back)
			currentZ -= MIN_PLANET_SPACING + radius * 2;
		});

		return positions;
	});

	// Handle position change from camera
	function handlePositionChange(pos: { x: number; y: number; z: number }) {
		cameraPosition = pos;
	}

	// Find the closest repo to the camera within proximity threshold
	const PROXIMITY_THRESHOLD = 120; // Distance to trigger card display
	
	const nearbyRepo = $derived(() => {
		let closest: { repo: ProcessedRepo; distance: number } | null = null;
		
		for (const sphere of sphereData()) {
			const dx = cameraPosition.x - sphere.position[0];
			const dy = cameraPosition.y - sphere.position[1];
			const dz = cameraPosition.z - sphere.position[2];
			const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
			
			if (distance < PROXIMITY_THRESHOLD && distance > sphere.radius) {
				if (!closest || distance < closest.distance) {
					closest = { repo: sphere.repo, distance };
				}
			}
		}
		
		return closest;
	});

	// Month names for date display
	const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

	// Calculate the Z range based on sphere positions
	const zRange = $derived(() => {
		const positions = sphereData();
		if (positions.length === 0) return { min: -MAX_DEPTH, max: 100 };
		const zValues = positions.map(p => p.position[2]);
		return {
			max: Math.max(...zValues),
			min: Math.min(...zValues)
		};
	});

	// Calculate current date from camera Z position (nearest sphere's date)
	const currentDate = $derived(() => {
		const positions = sphereData();
		if (positions.length === 0) return new Date();
		
		// Find the sphere closest to camera Z
		let closest = positions[0];
		let minDist = Math.abs(cameraPosition.z - closest.position[2]);
		
		for (const p of positions) {
			const dist = Math.abs(cameraPosition.z - p.position[2]);
			if (dist < minDist) {
				minDist = dist;
				closest = p;
			}
		}
		
		return new Date(closest.repo.createdAt);
	});

	// Formatted date display
	const currentDateDisplay = $derived(() => {
		const date = currentDate();
		return {
			month: monthNames[date.getMonth()],
			year: date.getFullYear()
		};
	});

	// Timeline progress (0-100) - based on actual sphere positions
	const timelineProgress = $derived(() => {
		const { min, max } = zRange();
		const range = max - min;
		if (range === 0) return 50;
		const normalized = (cameraPosition.z - min) / range;
		return Math.max(0, Math.min(100, normalized * 100));
	});
</script>

<div class="space-scene">
	<!-- 3D Canvas -->
	<div class="canvas-wrapper">
		<Canvas>
			<!-- Rail camera controls -->
			<FlightControls 
				onPositionChange={handlePositionChange} 
				speed={60} 
				minZ={zRange().min - 200} 
				maxZ={zRange().max + 100} 
			/>

			<!-- Background stars -->
			<StarField scrollProgress={0} count={5000} />

			<!-- Ambient light -->
			<T.AmbientLight intensity={0.15} />

			<!-- Holographic spheres for each repo -->
			{#each sphereData() as { repo, position, radius, imageUrl } (repo.id)}
				<HoloSphere {repo} {position} {radius} {imageUrl} />
			{/each}
		</Canvas>
	</div>


	<!-- Proximity Info Card -->
	{#if nearbyRepo()}
		{@const nearby = nearbyRepo()!}
		<div class="proximity-card">
			<div class="proximity-header">
				<div class="proximity-language" style="background: {getLanguageColor(nearby.repo.language)}">
					{nearby.repo.language || 'Unknown'}
				</div>
				<span class="proximity-distance">{nearby.distance.toFixed(0)}u away</span>
			</div>
			<h2 class="proximity-title">{nearby.repo.displayName}</h2>
			{#if nearby.repo.description}
				<p class="proximity-description">{nearby.repo.description}</p>
			{/if}
			<div class="proximity-stats">
				<div class="proximity-stat">
					<span class="stat-value">{formatLinesOfCode(nearby.repo.linesOfCode)}</span>
					<span class="stat-label">lines</span>
				</div>
				<div class="proximity-stat">
					<span class="stat-value">{nearby.repo.commitCount}</span>
					<span class="stat-label">commits</span>
				</div>
				<div class="proximity-stat">
					<span class="stat-value">{nearby.repo.stars}</span>
					<span class="stat-label">stars</span>
				</div>
			</div>
			<p class="proximity-hint">🖱️ Click the glowing planet to open GitHub</p>
		</div>
	{/if}

	<!-- Controls hint -->
	<div class="controls-hint">
		<p class="hint-text">Click to enable flight</p>
		<div class="controls-list">
			<span><kbd>W</kbd> Forward</span>
			<span><kbd>S</kbd> Backward</span>
			<span><kbd>Mouse</kbd> Look around</span>
			<span><kbd>Click sphere</kbd> Open GitHub</span>
		</div>
	</div>

	<!-- Stats HUD -->
	<div class="stats-hud">
		<div class="stat">
			<span class="stat-value">{repos.length}</span>
			<span class="stat-label">Projects</span>
		</div>
		<div class="stat">
			<span class="stat-value">{(repos.reduce((a, r) => a + r.linesOfCode, 0) / 1000).toFixed(0)}K</span>
			<span class="stat-label">Lines</span>
		</div>
		<div class="stat">
			<span class="stat-value">{repos.reduce((a, r) => a + r.commitCount, 0)}</span>
			<span class="stat-label">Commits</span>
		</div>
	</div>

	<!-- Sky Timeline HUD -->
	<div class="sky-timeline">
		<div class="sky-date">
			<span class="sky-month">{currentDateDisplay().month}</span>
			<span class="sky-year">{currentDateDisplay().year}</span>
		</div>
		<div class="sky-progress">
			<div class="progress-track">
				<div class="progress-fill" style="width: {timelineProgress()}%"></div>
				<div class="progress-marker" style="left: {timelineProgress()}%"></div>
			</div>
			<div class="progress-labels">
				<span class="progress-label">{dateRange().oldest.getFullYear()}</span>
				<span class="progress-label">{dateRange().newest.getFullYear()}</span>
			</div>
		</div>
	</div>
</div>

<style>
	.space-scene {
		position: relative;
		width: 100%;
		height: 100vh;
		background: #000008;
		overflow: hidden;
	}

	.canvas-wrapper {
		position: absolute;
		inset: 0;
		z-index: 1;
	}

	/* Proximity Info Card */
	.proximity-card {
		position: fixed;
		bottom: 8rem;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(0, 0, 8, 0.9);
		border: 1px solid rgba(99, 102, 241, 0.3);
		border-radius: 16px;
		padding: 1.5rem;
		max-width: 360px;
		backdrop-filter: blur(20px);
		z-index: 15;
		animation: card-slide-in 0.3s ease-out;
		box-shadow: 
			0 0 30px rgba(99, 102, 241, 0.2),
			inset 0 0 30px rgba(99, 102, 241, 0.05);
	}

	@keyframes card-slide-in {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}

	.proximity-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}

	.proximity-language {
		padding: 0.2rem 0.6rem;
		border-radius: 9999px;
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: #000;
	}

	.proximity-distance {
		font-family: 'Space Mono', monospace;
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.5);
	}

	.proximity-title {
		font-family: 'Space Mono', monospace;
		font-size: 1.25rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 0.5rem 0;
		text-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
	}

	.proximity-description {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.5;
		margin: 0 0 1rem 0;
	}

	.proximity-stats {
		display: flex;
		gap: 1.5rem;
		margin-bottom: 0.75rem;
		flex-wrap: nowrap;
	}

	.proximity-stat {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		min-width: 50px;
		white-space: nowrap;
	}

	.proximity-stat .stat-value {
		font-family: 'Space Mono', monospace;
		font-size: 1.1rem;
		font-weight: 700;
		color: #fff;
		line-height: 1.2;
	}

	.proximity-stat .stat-label {
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: rgba(255, 255, 255, 0.5);
		white-space: nowrap;
	}

	.proximity-hint {
		font-size: 0.65rem;
		color: rgba(99, 102, 241, 0.7);
		margin: 0;
		font-style: italic;
	}

	.controls-hint {
		position: fixed;
		bottom: 1.5rem;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		pointer-events: none;
	}

	.hint-text {
		font-family: 'Space Mono', monospace;
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.8);
		margin: 0 0 0.75rem 0;
	}

	.controls-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		font-family: 'Space Mono', monospace;
		font-size: 0.65rem;
		color: rgba(255, 255, 255, 0.5);
	}

	.controls-list kbd {
		display: inline-block;
		padding: 0.15rem 0.4rem;
		margin: 0 0.15rem;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 4px;
		font-family: inherit;
		font-size: 0.6rem;
	}

	.stats-hud {
		position: fixed;
		top: 5rem;
		right: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		z-index: 10;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding: 0.5rem 0.75rem;
		background: rgba(0, 0, 8, 0.7);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		backdrop-filter: blur(10px);
	}

	.stat-value {
		font-family: 'Space Mono', monospace;
		font-size: 1.25rem;
		font-weight: 700;
		color: #fff;
	}

	.stat-label {
		font-size: 0.55rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: rgba(255, 255, 255, 0.5);
	}

	/* Sky Timeline HUD */
	.sky-timeline {
		position: fixed;
		top: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		z-index: 20;
		pointer-events: none;
	}

	.sky-date {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-shadow: 
			0 0 30px rgba(99, 102, 241, 0.8),
			0 0 60px rgba(99, 102, 241, 0.4);
	}

	.sky-month {
		font-family: 'Space Mono', monospace;
		font-size: 3rem;
		font-weight: 700;
		color: #fff;
		letter-spacing: 8px;
		line-height: 1;
	}

	.sky-year {
		font-family: 'Space Mono', monospace;
		font-size: 1.5rem;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.7);
		letter-spacing: 4px;
	}

	.sky-progress {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 200px;
	}

	.progress-track {
		position: relative;
		width: 100%;
		height: 3px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 2px;
		overflow: visible;
	}

	.progress-fill {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		background: linear-gradient(90deg, rgba(99, 102, 241, 0.3), rgba(99, 102, 241, 0.8));
		border-radius: 2px;
		transition: width 0.3s ease-out;
	}

	.progress-marker {
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 10px;
		height: 10px;
		background: #6366f1;
		border-radius: 50%;
		box-shadow: 0 0 10px #6366f1, 0 0 20px rgba(99, 102, 241, 0.5);
		transition: left 0.3s ease-out;
	}

	.progress-labels {
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin-top: 0.25rem;
	}

	.progress-label {
		font-family: 'Space Mono', monospace;
		font-size: 0.6rem;
		color: rgba(255, 255, 255, 0.4);
		letter-spacing: 1px;
	}

	@media (max-width: 768px) {
		.stats-hud {
			top: auto;
			bottom: 5rem;
			right: 1rem;
			flex-direction: row;
			gap: 0.5rem;
		}

		.stat {
			padding: 0.3rem 0.5rem;
		}

		.stat-value {
			font-size: 0.9rem;
		}

		.controls-hint {
			bottom: 1rem;
		}

		.controls-list {
			gap: 0.5rem;
		}

		.proximity-card {
			left: 1rem;
			right: 1rem;
			bottom: 5rem;
			transform: none;
			max-width: none;
			padding: 1rem;
		}

		.proximity-title {
			font-size: 1rem;
		}

		.proximity-description {
			font-size: 0.75rem;
		}

		.sky-timeline {
			top: 1rem;
		}

		.sky-month {
			font-size: 2rem;
			letter-spacing: 4px;
		}

		.sky-year {
			font-size: 1rem;
		}

		.sky-progress {
			width: 150px;
		}
	}
</style>
