<script lang="ts">
	import { onMount } from 'svelte';
	import type { ProcessedRepo } from '$lib/types/github';
	import { getLanguageColor, formatLinesOfCode } from '$lib/types/github';

	interface Props {
		repos: ProcessedRepo[];
		tenWeeksAgoDate: Date;
	}

	let { repos, tenWeeksAgoDate }: Props = $props();

	let containerEl: HTMLElement;
	let canvasEl: HTMLCanvasElement;
	let mouseX = $state(0.5);
	let mouseY = $state(0.5);
	let scrollY = $state(0);
	let selectedRepo: ProcessedRepo | null = $state(null);
	let hoveredRepo: ProcessedRepo | null = $state(null);

	// Calculate star positions in a spiral galaxy pattern
	function getStarPosition(index: number, total: number) {
		const angle = (index / total) * Math.PI * 4 + Math.PI / 2;
		const radius = 15 + (index / total) * 35;
		const x = 50 + Math.cos(angle) * radius + (Math.random() - 0.5) * 8;
		const y = 50 + Math.sin(angle) * radius * 0.6 + (Math.random() - 0.5) * 8;
		return { x, y, angle };
	}

	// Pre-calculate positions
	const starPositions = $derived(
		repos.map((repo, i) => ({
			...getStarPosition(i, repos.length),
			repo
		}))
	);

	// Group by language for constellation lines
	const languageGroups = $derived(() => {
		const groups: Record<string, typeof starPositions> = {};
		starPositions.forEach((star) => {
			const lang = star.repo.language || 'Other';
			if (!groups[lang]) groups[lang] = [];
			groups[lang].push(star);
		});
		return groups;
	});

	// Recent repos (last 10 weeks) form the "bright cluster"
	const recentStars = $derived(starPositions.filter((s) => s.repo.isWithinLast10Weeks));

	function handleMouseMove(e: MouseEvent) {
		if (!containerEl) return;
		const rect = containerEl.getBoundingClientRect();
		mouseX = (e.clientX - rect.left) / rect.width;
		mouseY = (e.clientY - rect.top) / rect.height;
	}

	function handleScroll() {
		scrollY = window.scrollY;
	}

	// Star size based on LOC
	function getStarSize(loc: number): number {
		if (loc >= 50000) return 28;
		if (loc >= 10000) return 22;
		if (loc >= 2000) return 16;
		if (loc >= 500) return 12;
		return 8;
	}

	// Star glow intensity
	function getGlowIntensity(loc: number, commits: number): number {
		return Math.min(1, (loc / 50000) * 0.7 + (commits / 100) * 0.3);
	}

	// Parallax offset
	const parallaxX = $derived((mouseX - 0.5) * 30);
	const parallaxY = $derived((mouseY - 0.5) * 20);

	// Canvas for background stars
	onMount(() => {
		const ctx = canvasEl.getContext('2d');
		if (!ctx) return;

		const resize = () => {
			canvasEl.width = window.innerWidth;
			canvasEl.height = window.innerHeight * 2;
			drawStars(ctx);
		};

		const drawStars = (ctx: CanvasRenderingContext2D) => {
			ctx.fillStyle = '#0a0a12';
			ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

			// Draw background stars
			for (let i = 0; i < 400; i++) {
				const x = Math.random() * canvasEl.width;
				const y = Math.random() * canvasEl.height;
				const size = Math.random() * 1.5 + 0.5;
				const opacity = Math.random() * 0.8 + 0.2;

				ctx.beginPath();
				ctx.arc(x, y, size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
				ctx.fill();
			}

			// Draw some colored nebula clouds
			const gradient1 = ctx.createRadialGradient(
				canvasEl.width * 0.3,
				canvasEl.height * 0.2,
				0,
				canvasEl.width * 0.3,
				canvasEl.height * 0.2,
				300
			);
			gradient1.addColorStop(0, 'rgba(99, 102, 241, 0.15)');
			gradient1.addColorStop(1, 'transparent');
			ctx.fillStyle = gradient1;
			ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

			const gradient2 = ctx.createRadialGradient(
				canvasEl.width * 0.7,
				canvasEl.height * 0.6,
				0,
				canvasEl.width * 0.7,
				canvasEl.height * 0.6,
				400
			);
			gradient2.addColorStop(0, 'rgba(236, 72, 153, 0.1)');
			gradient2.addColorStop(1, 'transparent');
			ctx.fillStyle = gradient2;
			ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
		};

		resize();
		window.addEventListener('resize', resize);
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('resize', resize);
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div
	class="galaxy-container"
	bind:this={containerEl}
	onmousemove={handleMouseMove}
	role="region"
	aria-label="Project constellation visualization"
>
	<!-- Background canvas -->
	<canvas class="star-canvas" bind:this={canvasEl}></canvas>

	<!-- Floating particles layer -->
	<div class="particles-layer" style="transform: translate({parallaxX * 0.5}px, {parallaxY * 0.5}px)">
		{#each Array(20) as _, i}
			<div
				class="particle"
				style="
					left: {10 + Math.random() * 80}%;
					top: {10 + Math.random() * 80}%;
					animation-delay: {i * 0.3}s;
					animation-duration: {15 + Math.random() * 10}s;
				"
			></div>
		{/each}
	</div>

	<!-- Constellation lines -->
	<svg class="constellation-lines" style="transform: translate({parallaxX}px, {parallaxY}px)">
		{#each Object.entries(languageGroups()) as [lang, stars]}
			{#if stars.length > 1}
				{#each stars.slice(0, -1) as star, i}
					<line
						x1="{star.x}%"
						y1="{star.y}%"
						x2="{stars[i + 1].x}%"
						y2="{stars[i + 1].y}%"
						stroke={getLanguageColor(lang)}
						stroke-width="1"
						stroke-opacity="0.2"
						class="constellation-line"
					/>
				{/each}
			{/if}
		{/each}
	</svg>

	<!-- "Recent Activity" nebula glow -->
	<div
		class="recent-nebula"
		style="
			left: {recentStars.length > 0 ? recentStars.reduce((a, s) => a + s.x, 0) / recentStars.length : 50}%;
			top: {recentStars.length > 0 ? recentStars.reduce((a, s) => a + s.y, 0) / recentStars.length : 30}%;
			transform: translate(-50%, -50%) translate({parallaxX * 1.2}px, {parallaxY * 1.2}px);
		"
	>
		<span class="nebula-label">Last 10 Weeks</span>
	</div>

	<!-- Project stars -->
	<div class="stars-layer" style="transform: translate({parallaxX}px, {parallaxY}px)">
		{#each starPositions as star, i}
			{@const size = getStarSize(star.repo.linesOfCode)}
			{@const glow = getGlowIntensity(star.repo.linesOfCode, star.repo.commitCount)}
			{@const color = getLanguageColor(star.repo.language)}
			<button
				class="star"
				class:recent={star.repo.isWithinLast10Weeks}
				class:hovered={hoveredRepo?.id === star.repo.id}
				class:selected={selectedRepo?.id === star.repo.id}
				style="
					left: {star.x}%;
					top: {star.y}%;
					width: {size}px;
					height: {size}px;
					--star-color: {color};
					--glow-intensity: {glow};
					animation-delay: {i * 0.05}s;
				"
				onmouseenter={() => (hoveredRepo = star.repo)}
				onmouseleave={() => (hoveredRepo = null)}
				onclick={() => (selectedRepo = selectedRepo?.id === star.repo.id ? null : star.repo)}
			>
				<span class="star-core"></span>
				<span class="star-glow"></span>
				{#if star.repo.isWithinLast10Weeks}
					<span class="star-pulse"></span>
				{/if}
			</button>
		{/each}
	</div>

	<!-- Hover tooltip -->
	{#if hoveredRepo && !selectedRepo}
		{@const hovered = hoveredRepo}
		{@const star = starPositions.find((s) => s.repo.id === hovered.id)}
		{#if star}
			<div
				class="star-tooltip"
				style="
					left: {star.x}%;
					top: {star.y}%;
					transform: translate({parallaxX}px, {parallaxY}px) translate(-50%, -120%);
				"
			>
				<span class="tooltip-name">{hovered.displayName}</span>
				<span class="tooltip-stats">
					{formatLinesOfCode(hovered.linesOfCode)} lines · {hovered.commitCount} commits
				</span>
			</div>
		{/if}
	{/if}

	<!-- Selected project detail card -->
	{#if selectedRepo}
		<div class="detail-card">
			<button class="close-btn" onclick={() => (selectedRepo = null)}>×</button>
			<div class="detail-header">
				<div class="detail-language" style="background: {getLanguageColor(selectedRepo.language)}">
					{selectedRepo.language || 'Unknown'}
				</div>
				{#if selectedRepo.isWithinLast10Weeks}
					<span class="detail-recent">Recent</span>
				{/if}
			</div>
			<h2 class="detail-title">{selectedRepo.displayName}</h2>
			{#if selectedRepo.description}
				<p class="detail-description">{selectedRepo.description}</p>
			{/if}
			<div class="detail-stats">
				<div class="detail-stat">
					<span class="stat-value">{formatLinesOfCode(selectedRepo.linesOfCode)}</span>
					<span class="stat-label">lines of code</span>
				</div>
				<div class="detail-stat">
					<span class="stat-value">{selectedRepo.commitCount}</span>
					<span class="stat-label">commits</span>
				</div>
				<div class="detail-stat">
					<span class="stat-value">{selectedRepo.stars}</span>
					<span class="stat-label">stars</span>
				</div>
			</div>
			<a href={selectedRepo.url} target="_blank" rel="noopener noreferrer" class="detail-link">
				View on GitHub →
			</a>
		</div>
	{/if}

	<!-- Stats HUD -->
	<div class="stats-hud">
		<div class="hud-item">
			<span class="hud-value">{repos.length}</span>
			<span class="hud-label">Repositories</span>
		</div>
		<div class="hud-item">
			<span class="hud-value">{(repos.reduce((a, r) => a + r.linesOfCode, 0) / 1000).toFixed(0)}K</span>
			<span class="hud-label">Lines of Code</span>
		</div>
		<div class="hud-item">
			<span class="hud-value">{repos.reduce((a, r) => a + r.commitCount, 0)}</span>
			<span class="hud-label">Commits</span>
		</div>
	</div>

	<!-- Title overlay -->
	<div class="title-overlay">
		<h1 class="galaxy-title">Code Galaxy</h1>
		<p class="galaxy-subtitle">A constellation of {repos.length} projects</p>
		<p class="galaxy-hint">Move your mouse to explore • Click a star for details</p>
	</div>

	<!-- Legend -->
	<div class="legend">
		<h3 class="legend-title">Languages</h3>
		{#each [...new Set(repos.map((r) => r.language).filter(Boolean))] as lang}
			<div class="legend-item">
				<span class="legend-dot" style="background: {getLanguageColor(lang)}"></span>
				<span class="legend-name">{lang}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.galaxy-container {
		position: relative;
		width: 100%;
		min-height: 100vh;
		background: #0a0a12;
		overflow: hidden;
		cursor: crosshair;
	}

	.star-canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
	}

	/* Floating particles */
	.particles-layer {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 1;
	}

	.particle {
		position: absolute;
		width: 3px;
		height: 3px;
		background: rgba(255, 255, 255, 0.4);
		border-radius: 50%;
		animation: drift linear infinite;
	}

	@keyframes drift {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		50% {
			transform: translate(50px, -100px) scale(0.5);
		}
	}

	/* Constellation lines */
	.constellation-lines {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 2;
		transition: transform 0.3s ease-out;
	}

	.constellation-line {
		transition: stroke-opacity 0.3s ease;
	}

	/* Recent nebula glow */
	.recent-nebula {
		position: absolute;
		width: 300px;
		height: 300px;
		background: radial-gradient(
			ellipse at center,
			rgba(99, 102, 241, 0.25) 0%,
			rgba(168, 85, 247, 0.15) 30%,
			transparent 70%
		);
		border-radius: 50%;
		filter: blur(30px);
		pointer-events: none;
		z-index: 3;
		animation: nebula-pulse 4s ease-in-out infinite;
	}

	.nebula-label {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 3px;
		color: rgba(255, 255, 255, 0.5);
		white-space: nowrap;
	}

	@keyframes nebula-pulse {
		0%,
		100% {
			transform: translate(-50%, -50%) scale(1);
			opacity: 0.8;
		}
		50% {
			transform: translate(-50%, -50%) scale(1.1);
			opacity: 1;
		}
	}

	/* Stars layer */
	.stars-layer {
		position: absolute;
		inset: 0;
		z-index: 4;
		transition: transform 0.3s ease-out;
	}

	.star {
		position: absolute;
		transform: translate(-50%, -50%);
		background: transparent;
		border: none;
		padding: 0;
		cursor: pointer;
		animation: star-appear 0.8s ease-out backwards;
	}

	@keyframes star-appear {
		from {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}

	.star-core {
		position: absolute;
		inset: 25%;
		background: var(--star-color);
		border-radius: 50%;
		box-shadow: 0 0 10px var(--star-color);
	}

	.star-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle at center,
			var(--star-color) 0%,
			transparent 70%
		);
		border-radius: 50%;
		opacity: calc(0.3 + var(--glow-intensity) * 0.5);
		transition: opacity 0.3s ease, transform 0.3s ease;
	}

	.star:hover .star-glow,
	.star.hovered .star-glow {
		opacity: 1;
		transform: scale(1.5);
	}

	.star.selected .star-glow {
		opacity: 1;
		transform: scale(2);
		animation: selected-pulse 1.5s ease-in-out infinite;
	}

	@keyframes selected-pulse {
		0%,
		100% {
			transform: scale(2);
		}
		50% {
			transform: scale(2.3);
		}
	}

	.star-pulse {
		position: absolute;
		inset: -50%;
		border: 1px solid var(--star-color);
		border-radius: 50%;
		opacity: 0;
		animation: pulse-ring 2s ease-out infinite;
	}

	@keyframes pulse-ring {
		0% {
			transform: scale(0.5);
			opacity: 0.8;
		}
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}

	.star.recent .star-core {
		box-shadow:
			0 0 15px var(--star-color),
			0 0 30px var(--star-color);
	}

	/* Tooltip */
	.star-tooltip {
		position: absolute;
		background: rgba(10, 10, 18, 0.95);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		padding: 0.75rem 1rem;
		pointer-events: none;
		z-index: 10;
		backdrop-filter: blur(10px);
		animation: tooltip-appear 0.2s ease-out;
	}

	@keyframes tooltip-appear {
		from {
			opacity: 0;
			transform: translate(-50%, -100%);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -120%);
		}
	}

	.tooltip-name {
		display: block;
		font-family: 'Space Mono', monospace;
		font-size: 0.9rem;
		font-weight: 600;
		color: #fff;
		margin-bottom: 0.25rem;
	}

	.tooltip-stats {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.6);
	}

	/* Detail card */
	.detail-card {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(10, 10, 18, 0.95);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 16px;
		padding: 1.5rem 2rem;
		max-width: 400px;
		width: 90%;
		backdrop-filter: blur(20px);
		z-index: 20;
		animation: card-appear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes card-appear {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(20px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0) scale(1);
		}
	}

	.close-btn {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: none;
		border: none;
		color: rgba(255, 255, 255, 0.5);
		font-size: 1.5rem;
		cursor: pointer;
		line-height: 1;
		transition: color 0.2s ease;
	}

	.close-btn:hover {
		color: #fff;
	}

	.detail-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.detail-language {
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: #0a0a12;
	}

	.detail-recent {
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: #a855f7;
	}

	.detail-title {
		font-family: 'Space Mono', monospace;
		font-size: 1.5rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 0.5rem 0;
	}

	.detail-description {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.5;
		margin: 0 0 1rem 0;
	}

	.detail-stats {
		display: flex;
		gap: 1.5rem;
		margin-bottom: 1rem;
	}

	.detail-stat {
		display: flex;
		flex-direction: column;
	}

	.stat-value {
		font-family: 'Space Mono', monospace;
		font-size: 1.25rem;
		font-weight: 700;
		color: #fff;
	}

	.stat-label {
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: rgba(255, 255, 255, 0.5);
	}

	.detail-link {
		display: inline-block;
		font-size: 0.875rem;
		color: #6366f1;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.detail-link:hover {
		color: #818cf8;
	}

	/* Stats HUD */
	.stats-hud {
		position: fixed;
		top: 6rem;
		right: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		z-index: 10;
	}

	.hud-item {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding: 0.5rem 1rem;
		background: rgba(10, 10, 18, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		backdrop-filter: blur(10px);
	}

	.hud-value {
		font-family: 'Space Mono', monospace;
		font-size: 1.5rem;
		font-weight: 700;
		color: #fff;
		line-height: 1;
	}

	.hud-label {
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: rgba(255, 255, 255, 0.5);
	}

	/* Title overlay */
	.title-overlay {
		position: fixed;
		top: 6rem;
		left: 2rem;
		z-index: 10;
	}

	.galaxy-title {
		font-family: 'Space Mono', monospace;
		font-size: 2.5rem;
		font-weight: 700;
		color: #fff;
		margin: 0;
		letter-spacing: -1px;
		text-shadow: 0 0 40px rgba(99, 102, 241, 0.5);
	}

	.galaxy-subtitle {
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.6);
		margin: 0.5rem 0 0 0;
	}

	.galaxy-hint {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.4);
		margin: 1rem 0 0 0;
	}

	/* Legend */
	.legend {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		background: rgba(10, 10, 18, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		padding: 1rem;
		backdrop-filter: blur(10px);
		z-index: 10;
		max-height: 200px;
		overflow-y: auto;
	}

	.legend-title {
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: rgba(255, 255, 255, 0.5);
		margin: 0 0 0.75rem 0;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.legend-item:last-child {
		margin-bottom: 0;
	}

	.legend-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		box-shadow: 0 0 6px currentColor;
	}

	.legend-name {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.7);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.stats-hud {
			top: auto;
			bottom: 6rem;
			right: 1rem;
			flex-direction: row;
			gap: 0.5rem;
		}

		.hud-item {
			padding: 0.4rem 0.6rem;
		}

		.hud-value {
			font-size: 1rem;
		}

		.title-overlay {
			top: 5rem;
			left: 1rem;
		}

		.galaxy-title {
			font-size: 1.75rem;
		}

		.legend {
			display: none;
		}

		.detail-card {
			bottom: 1rem;
			padding: 1rem 1.25rem;
		}
	}
</style>
