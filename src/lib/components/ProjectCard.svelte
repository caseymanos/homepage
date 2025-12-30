<script lang="ts">
	import type { ProcessedRepo } from '$lib/types/github';
	import { getLanguageColor } from '$lib/types/github';

	interface Props {
		repo: ProcessedRepo;
	}

	let { repo }: Props = $props();

	// 3D tilt state
	let rotateX = $state(0);
	let rotateY = $state(0);
	let isHovered = $state(false);
	let glowX = $state(50);
	let glowY = $state(50);

	function handleMouseMove(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;

		// Tilt effect - inverted for natural feel
		rotateX = (y - 0.5) * -15;
		rotateY = (x - 0.5) * 15;

		// Glow position
		glowX = x * 100;
		glowY = y * 100;
	}

	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
		rotateX = 0;
		rotateY = 0;
		glowX = 50;
		glowY = 50;
	}

	// Format date for display
	function formatDate(date: Date): string {
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));

		if (days < 7) return `${days}d ago`;
		if (days < 30) return `${Math.floor(days / 7)}w ago`;
		if (days < 365) return `${Math.floor(days / 30)}mo ago`;
		return `${Math.floor(days / 365)}y ago`;
	}

	// Format size in KB to readable format
	function formatSize(kb: number): string {
		if (kb < 1000) return `${kb} KB`;
		return `${(kb / 1000).toFixed(1)} MB`;
	}

	const languageColor = getLanguageColor(repo.language);
</script>

<a
	href={repo.url}
	target="_blank"
	rel="noopener noreferrer"
	class="card size-{repo.sizeCategory}"
	class:hovered={isHovered}
	onmousemove={handleMouseMove}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	style="
		--rotate-x: {rotateX}deg;
		--rotate-y: {rotateY}deg;
		--glow-x: {glowX}%;
		--glow-y: {glowY}%;
		--lang-color: {languageColor};
	"
>
	<!-- Glow effect layer -->
	<div class="glow-layer"></div>

	<!-- Card content -->
	<div class="card-content">
		<div class="card-header">
			<h3 class="card-title">{repo.displayName}</h3>
			{#if repo.language}
				<span class="language-badge">
					<span class="language-dot"></span>
					{repo.language}
				</span>
			{/if}
		</div>

		{#if repo.description}
			<p class="card-description">{repo.description}</p>
		{/if}

		<!-- Stats overlay - fades in on hover -->
		<div class="stats-overlay">
			<div class="stat">
				<svg class="stat-icon" viewBox="0 0 16 16" fill="currentColor">
					<path
						d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
					/>
				</svg>
				<span>{repo.stars}</span>
			</div>
			<div class="stat">
				<svg class="stat-icon" viewBox="0 0 16 16" fill="currentColor">
					<path
						d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"
					/>
				</svg>
				<span>{repo.forks}</span>
			</div>
			<div class="stat">
				<svg class="stat-icon" viewBox="0 0 16 16" fill="currentColor">
					<path
						d="M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm.5 4.75a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 .37.65l2.5 1.5a.75.75 0 0 0 .77-1.29L8.5 7.69V4.75Z"
					/>
				</svg>
				<span>{formatDate(repo.pushedAt)}</span>
			</div>
			<div class="stat">
				<svg class="stat-icon" viewBox="0 0 16 16" fill="currentColor">
					<path
						d="M3.5 3.75a.25.25 0 0 1 .25-.25h8.5a.25.25 0 0 1 .25.25v8.5a.25.25 0 0 1-.25.25h-8.5a.25.25 0 0 1-.25-.25v-8.5Zm.25-1.75A1.75 1.75 0 0 0 2 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0 0 14 12.25v-8.5A1.75 1.75 0 0 0 12.25 2h-8.5Z"
					/>
				</svg>
				<span>{formatSize(repo.size)}</span>
			</div>
		</div>

		{#if repo.topics.length > 0}
			<div class="topics">
				{#each repo.topics.slice(0, 3) as topic}
					<span class="topic">{topic}</span>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Size indicator bar -->
	<div class="size-indicator"></div>
</a>

<style>
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		background: var(--bg-primary);
		border: 1px solid var(--border);
		border-radius: var(--card-radius, 1rem);
		overflow: hidden;
		text-decoration: none;
		color: inherit;
		transform-style: preserve-3d;
		transform: perspective(1000px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
		transition:
			transform 0.15s var(--transition-smooth, cubic-bezier(0.23, 1, 0.32, 1)),
			box-shadow 0.3s ease,
			border-color 0.3s ease;
		will-change: transform;
		box-shadow: var(--card-shadow, 0 4px 20px rgba(0, 0, 0, 0.08));
	}

	.card:hover {
		box-shadow: var(--card-shadow-hover, 0 20px 40px rgba(0, 0, 0, 0.15));
		border-color: var(--accent);
	}

	/* Size variants for masonry grid */
	.card.size-small {
		min-height: 160px;
	}

	.card.size-medium {
		min-height: 200px;
	}

	.card.size-large {
		min-height: 260px;
	}

	/* Glow layer */
	.glow-layer {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle at var(--glow-x) var(--glow-y),
			rgba(var(--accent-rgb, 0, 0, 0), 0.08) 0%,
			transparent 50%
		);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	.card.hovered .glow-layer {
		opacity: 1;
	}

	/* Card content */
	.card-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1.25rem;
		gap: 0.75rem;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.card-title {
		margin: 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.3;
	}

	.language-badge {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.75rem;
		color: var(--text-secondary);
		white-space: nowrap;
	}

	.language-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--lang-color);
	}

	.card-description {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.5;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card.size-large .card-description {
		-webkit-line-clamp: 3;
	}

	/* Stats overlay */
	.stats-overlay {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: auto;
		opacity: 0;
		transform: translateY(8px);
		transition:
			opacity 0.25s ease,
			transform 0.25s ease;
	}

	.card.hovered .stats-overlay {
		opacity: 1;
		transform: translateY(0);
	}

	.stat {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	.stat-icon {
		width: 14px;
		height: 14px;
		opacity: 0.7;
	}

	/* Topics */
	.topics {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		margin-top: 0.5rem;
	}

	.topic {
		padding: 0.125rem 0.5rem;
		font-size: 0.6875rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 9999px;
		color: var(--text-secondary);
	}

	/* Size indicator bar at bottom */
	.size-indicator {
		height: 3px;
		background: linear-gradient(90deg, var(--lang-color) 0%, var(--lang-color) 100%);
		opacity: 0.6;
		transition: opacity 0.3s ease;
	}

	.card.size-small .size-indicator {
		width: 25%;
	}

	.card.size-medium .size-indicator {
		width: 50%;
	}

	.card.size-large .size-indicator {
		width: 100%;
	}

	.card:hover .size-indicator {
		opacity: 1;
	}
</style>
